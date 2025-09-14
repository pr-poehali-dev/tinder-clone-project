import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  location: string;
  image: string;
  interests: string[];
  verified: boolean;
  premium: boolean;
}

interface MatchesTabProps {
  matches: number[];
  profiles: Profile[];
}

export default function MatchesTab({ matches, profiles }: MatchesTabProps) {
  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Ваши совпадения</h2>
        <p className="text-gray-600">У вас {matches.length} новых совпадений!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((matchId) => {
          const profile = profiles.find(p => p.id === matchId);
          return profile ? (
            <Card key={matchId} className="overflow-hidden card-hover animate-scale-in">
              <div className="relative h-48">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                  <p className="text-sm opacity-90">{profile.location}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                  <Icon name="Heart" size={12} className="mr-1" />
                  Match!
                </Badge>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3">{profile.bio}</p>
                <Button className="w-full btn-gradient">
                  Написать сообщение
                </Button>
              </CardContent>
            </Card>
          ) : null;
        })}
      </div>
    </div>
  );
}