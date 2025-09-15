import { User } from '@/types/User';

const STORAGE_KEYS = {
  USER: 'lovematch_user',
  TOKEN: 'lovematch_token',
  PROFILE_DATA: 'lovematch_profile_data'
};

export const storage = {
  saveUser: (user: User, token?: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      if (token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      }
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  },

  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userData) return null;
      
      const user = JSON.parse(userData);
      return {
        ...user,
        lastActive: new Date(user.lastActive),
        createdAt: new Date(user.createdAt)
      };
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  updateUserProfile: (updates: Partial<User>): boolean => {
    try {
      const currentUser = storage.getUser();
      if (!currentUser) return false;
      
      const updatedUser = {
        ...currentUser,
        ...updates,
        lastActive: new Date()
      };
      
      return storage.saveUser(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  },

  clearUserData: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.PROFILE_DATA);
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  },

  createDefaultUser: (email: string, name: string): User => {
    return {
      id: Date.now().toString(),
      email,
      name,
      age: 25,
      bio: '',
      location: {
        city: 'Москва'
      },
      photos: [],
      interests: [],
      preferences: {
        ageRange: {
          min: 18,
          max: 35
        },
        maxDistance: 50,
        lookingFor: 'serious',
        genderPreference: 'everyone'
      },
      personalInfo: {
        relationshipStatus: 'single',
        hasChildren: false,
        wantsChildren: 'maybe',
        smoking: 'never',
        drinking: 'socially',
        languages: ['Русский']
      },
      verified: false,
      premium: false,
      lastActive: new Date(),
      createdAt: new Date()
    };
  }
};