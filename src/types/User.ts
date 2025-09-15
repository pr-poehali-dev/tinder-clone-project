export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  bio: string;
  location: {
    city: string;
    distance?: number;
  };
  photos: string[];
  interests: string[];
  preferences: {
    ageRange: {
      min: number;
      max: number;
    };
    maxDistance: number;
    lookingFor: 'serious' | 'casual' | 'friendship' | 'anything';
    genderPreference: 'men' | 'women' | 'everyone';
  };
  personalInfo: {
    height?: number;
    education?: string;
    occupation?: string;
    relationshipStatus: 'single' | 'divorced' | 'complicated';
    hasChildren: boolean;
    wantsChildren: 'yes' | 'no' | 'maybe';
    smoking: 'never' | 'sometimes' | 'regularly';
    drinking: 'never' | 'socially' | 'regularly';
    religion?: string;
    languages: string[];
  };
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    vk?: string;
  };
  verified: boolean;
  premium: boolean;
  lastActive: Date;
  createdAt: Date;
}