"""
Backend function for user authentication and registration
Handles: registration, login, profile creation/update
Args: event with httpMethod, body; context with request_id
Returns: HTTP response with user data or error
"""

import json
import os
import hashlib
import secrets
import re
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, Field, EmailStr, ValidationError

# Pydantic models for validation
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    birthday: Optional[str] = None  # YYYY-MM-DD format
    gender: Optional[str] = Field(None, pattern='^(male|female|other)$')
    interested_in: Optional[str] = Field(None, pattern='^(male|female|both)$')
    bio: Optional[str] = Field(None, max_length=1000)
    job_title: Optional[str] = Field(None, max_length=200)
    company: Optional[str] = Field(None, max_length=200)
    education: Optional[str] = Field(None, max_length=200)
    height: Optional[int] = Field(None, ge=100, le=250)
    city: Optional[str] = Field(None, max_length=100)

def get_db_connection():
    """Get database connection using DATABASE_URL from environment"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not found")
    
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def hash_password(password: str) -> str:
    """Hash password using SHA-256 with salt"""
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{password_hash}"

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    try:
        salt, stored_hash = hashed.split(':')
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return password_hash == stored_hash
    except:
        return False

def generate_token() -> str:
    """Generate secure random token"""
    return secrets.token_urlsafe(32)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action', 'login')
            
            if action == 'register':
                # User registration
                user_data = UserRegister(**body_data)
                
                # Check if user already exists
                cur.execute("SELECT id FROM users WHERE email = %s", (user_data.email,))
                if cur.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'User with this email already exists'})
                    }
                
                # Create user
                password_hash = hash_password(user_data.password)
                verification_token = generate_token()
                
                cur.execute("""
                    INSERT INTO users (email, phone, password_hash, verification_token)
                    VALUES (%s, %s, %s, %s) RETURNING id, email, created_at
                """, (user_data.email, user_data.phone, password_hash, verification_token))
                
                user = cur.fetchone()
                
                # Create profile
                cur.execute("""
                    INSERT INTO user_profiles (user_id, first_name, last_name)
                    VALUES (%s, %s, %s) RETURNING id
                """, (user['id'], user_data.first_name, user_data.last_name))
                
                profile = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'message': 'User registered successfully',
                        'user_id': user['id'],
                        'email': user['email'],
                        'profile_id': profile['id'],
                        'verification_token': verification_token
                    })
                }
            
            elif action == 'login':
                # User login
                login_data = UserLogin(**body_data)
                
                # Find user
                cur.execute("""
                    SELECT u.id, u.email, u.password_hash, u.is_verified, u.is_banned,
                           p.first_name, p.last_name, p.is_profile_complete
                    FROM users u
                    LEFT JOIN user_profiles p ON u.id = p.user_id
                    WHERE u.email = %s
                """, (login_data.email,))
                
                user = cur.fetchone()
                if not user or not verify_password(login_data.password, user['password_hash']):
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Invalid email or password'})
                    }
                
                if user['is_banned']:
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Account is banned'})
                    }
                
                # Update last active
                cur.execute("UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = %s", (user['id'],))
                conn.commit()
                
                # Generate session token
                session_token = generate_token()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'message': 'Login successful',
                        'user_id': user['id'],
                        'email': user['email'],
                        'first_name': user['first_name'],
                        'last_name': user['last_name'],
                        'is_verified': user['is_verified'],
                        'is_profile_complete': user['is_profile_complete'],
                        'session_token': session_token
                    })
                }
        
        elif method == 'PUT':
            # Update user profile
            body_data = json.loads(event.get('body', '{}'))
            user_id = body_data.get('user_id')
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id is required'})
                }
            
            profile_data = ProfileUpdate(**body_data)
            
            # Build dynamic update query
            update_fields = []
            values = []
            
            for field, value in profile_data.dict(exclude_unset=True).items():
                if field != 'user_id' and value is not None:
                    update_fields.append(f"{field} = %s")
                    values.append(value)
            
            if update_fields:
                values.append(user_id)
                cur.execute(f"""
                    UPDATE user_profiles 
                    SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
                    WHERE user_id = %s
                    RETURNING id, is_profile_complete
                """, values)
                
                result = cur.fetchone()
                
                # Check if profile is now complete
                cur.execute("""
                    SELECT COUNT(*) as complete_fields
                    FROM user_profiles 
                    WHERE user_id = %s 
                    AND first_name IS NOT NULL 
                    AND birthday IS NOT NULL 
                    AND gender IS NOT NULL 
                    AND interested_in IS NOT NULL
                """, (user_id,))
                
                complete_check = cur.fetchone()
                is_complete = complete_check['complete_fields'] > 0
                
                if is_complete and not result['is_profile_complete']:
                    cur.execute("""
                        UPDATE user_profiles 
                        SET is_profile_complete = TRUE 
                        WHERE user_id = %s
                    """, (user_id,))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'message': 'Profile updated successfully',
                        'is_profile_complete': is_complete
                    })
                }
        
        elif method == 'GET':
            # Get user profile
            params = event.get('queryStringParameters', {}) or {}
            user_id = params.get('user_id')
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id parameter is required'})
                }
            
            cur.execute("""
                SELECT u.id, u.email, u.phone, u.is_verified, u.created_at, u.last_active,
                       p.first_name, p.last_name, p.birthday, p.gender, p.interested_in,
                       p.bio, p.job_title, p.company, p.education, p.height, p.city,
                       p.max_distance, p.age_min, p.age_max, p.is_profile_complete
                FROM users u
                LEFT JOIN user_profiles p ON u.id = p.user_id
                WHERE u.id = %s AND u.is_banned = FALSE
            """, (user_id,))
            
            user = cur.fetchone()
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'})
                }
            
            # Get user photos
            cur.execute("""
                SELECT photo_url, is_primary, order_index
                FROM user_photos 
                WHERE user_id = %s 
                ORDER BY is_primary DESC, order_index ASC
            """, (user_id,))
            
            photos = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'user': dict(user),
                    'photos': [dict(photo) for photo in photos]
                })
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Validation error', 'details': e.errors()})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }
    finally:
        if 'conn' in locals():
            conn.close()