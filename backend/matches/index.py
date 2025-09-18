"""
Backend function for match system - swipes, likes, matches
Handles: swipe actions, get potential matches, get user matches
Args: event with httpMethod, body; context with request_id  
Returns: HTTP response with match data
"""

import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, Field, ValidationError
from datetime import datetime, date

# Pydantic models
class SwipeAction(BaseModel):
    swiper_id: int = Field(..., gt=0)
    swiped_id: int = Field(..., gt=0) 
    is_like: bool

class MatchFilters(BaseModel):
    user_id: int = Field(..., gt=0)
    max_distance: Optional[int] = Field(50, ge=1, le=200)
    age_min: Optional[int] = Field(18, ge=18, le=99)
    age_max: Optional[int] = Field(99, ge=18, le=99)
    gender: Optional[str] = Field(None, pattern='^(male|female|other)$')

def get_db_connection():
    """Get database connection using DATABASE_URL from environment"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not found")
    
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def calculate_age(birthday: date) -> int:
    """Calculate age from birthday"""
    today = date.today()
    return today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
            action = body_data.get('action', 'swipe')
            
            if action == 'swipe':
                # Handle swipe action
                swipe_data = SwipeAction(**body_data)
                
                # Prevent self-swipe
                if swipe_data.swiper_id == swipe_data.swiped_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Cannot swipe on yourself'})
                    }
                
                # Check if already swiped
                cur.execute("""
                    SELECT id FROM user_swipes 
                    WHERE swiper_id = %s AND swiped_id = %s
                """, (swipe_data.swiper_id, swipe_data.swiped_id))
                
                existing_swipe = cur.fetchone()
                if existing_swipe:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Already swiped on this user'})
                    }
                
                # Record the swipe
                cur.execute("""
                    INSERT INTO user_swipes (swiper_id, swiped_id, is_like)
                    VALUES (%s, %s, %s)
                """, (swipe_data.swiper_id, swipe_data.swiped_id, swipe_data.is_like))
                
                is_match = False
                match_id = None
                
                # Check for mutual like (match)
                if swipe_data.is_like:
                    cur.execute("""
                        SELECT id FROM user_swipes 
                        WHERE swiper_id = %s AND swiped_id = %s AND is_like = TRUE
                    """, (swipe_data.swiped_id, swipe_data.swiper_id))
                    
                    mutual_like = cur.fetchone()
                    if mutual_like:
                        # Create match (ensure user1_id < user2_id)
                        user1_id = min(swipe_data.swiper_id, swipe_data.swiped_id)
                        user2_id = max(swipe_data.swiper_id, swipe_data.swiped_id)
                        
                        cur.execute("""
                            INSERT INTO matches (user1_id, user2_id)
                            VALUES (%s, %s)
                            RETURNING id
                        """, (user1_id, user2_id))
                        
                        match_result = cur.fetchone()
                        match_id = match_result['id']
                        is_match = True
                        
                        # Create chat for the match
                        cur.execute("""
                            INSERT INTO chats (match_id)
                            VALUES (%s)
                        """, (match_id,))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'message': 'Swipe recorded successfully',
                        'is_match': is_match,
                        'match_id': match_id
                    })
                }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            action = params.get('action', 'potential')
            
            if action == 'potential':
                # Get potential matches for user
                user_id = params.get('user_id')
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_id parameter is required'})
                    }
                
                # Get user's preferences
                cur.execute("""
                    SELECT gender, interested_in, max_distance, age_min, age_max, 
                           location_lat, location_lng, birthday
                    FROM user_profiles 
                    WHERE user_id = %s
                """, (user_id,))
                
                user_prefs = cur.fetchone()
                if not user_prefs:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'User profile not found'})
                    }
                
                # Build query for potential matches
                filters = []
                values = [user_id, user_id]  # For NOT IN clauses
                
                # Filter by user's interested_in preference
                if user_prefs['interested_in'] and user_prefs['interested_in'] != 'both':
                    filters.append("p.gender = %s")
                    values.append(user_prefs['interested_in'])
                
                # Filter by age preferences
                if user_prefs['age_min'] and user_prefs['age_max']:
                    # Calculate birth year range
                    current_year = datetime.now().year
                    max_birth_year = current_year - user_prefs['age_min']
                    min_birth_year = current_year - user_prefs['age_max']
                    
                    filters.append("EXTRACT(YEAR FROM p.birthday) BETWEEN %s AND %s")
                    values.extend([min_birth_year, max_birth_year])
                
                where_clause = ""
                if filters:
                    where_clause = "AND " + " AND ".join(filters)
                
                # Get potential matches
                cur.execute(f"""
                    SELECT DISTINCT u.id, p.first_name, p.last_name, p.birthday, p.bio, 
                           p.job_title, p.city, p.gender,
                           ph.photo_url as primary_photo
                    FROM users u
                    JOIN user_profiles p ON u.id = p.user_id
                    LEFT JOIN user_photos ph ON u.id = ph.user_id AND ph.is_primary = TRUE
                    WHERE u.id != %s
                    AND u.id NOT IN (
                        SELECT swiped_id FROM user_swipes WHERE swiper_id = %s
                    )
                    AND p.is_profile_complete = TRUE
                    AND u.is_banned = FALSE
                    {where_clause}
                    ORDER BY RANDOM()
                    LIMIT 20
                """, values)
                
                potential_matches = cur.fetchall()
                
                # Add calculated age to each match
                matches_with_age = []
                for match in potential_matches:
                    match_dict = dict(match)
                    if match['birthday']:
                        match_dict['age'] = calculate_age(match['birthday'])
                    matches_with_age.append(match_dict)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'potential_matches': matches_with_age,
                        'count': len(matches_with_age)
                    })
                }
            
            elif action == 'my_matches':
                # Get user's matches
                user_id = params.get('user_id')
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_id parameter is required'})
                    }
                
                cur.execute("""
                    SELECT m.id as match_id, m.created_at as matched_at,
                           CASE 
                               WHEN m.user1_id = %s THEN m.user2_id 
                               ELSE m.user1_id 
                           END as other_user_id,
                           p.first_name, p.last_name, p.birthday, p.bio,
                           ph.photo_url as primary_photo,
                           c.id as chat_id, c.last_message_at,
                           (SELECT COUNT(*) FROM messages msg WHERE msg.chat_id = c.id AND msg.is_read = FALSE AND msg.sender_id != %s) as unread_count
                    FROM matches m
                    JOIN user_profiles p ON (
                        CASE 
                            WHEN m.user1_id = %s THEN p.user_id = m.user2_id 
                            ELSE p.user_id = m.user1_id 
                        END
                    )
                    LEFT JOIN user_photos ph ON p.user_id = ph.user_id AND ph.is_primary = TRUE
                    LEFT JOIN chats c ON m.id = c.match_id
                    WHERE (m.user1_id = %s OR m.user2_id = %s)
                    AND m.is_active = TRUE
                    ORDER BY c.last_message_at DESC, m.created_at DESC
                """, (user_id, user_id, user_id, user_id, user_id))
                
                matches = cur.fetchall()
                
                # Add calculated age to each match
                matches_with_age = []
                for match in matches:
                    match_dict = dict(match)
                    if match['birthday']:
                        match_dict['age'] = calculate_age(match['birthday'])
                    matches_with_age.append(match_dict)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'matches': matches_with_age,
                        'count': len(matches_with_age)
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