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

interface DiscoverTabProps {
  profiles: Profile[];
  currentCardIndex: number;
  onLike: () => void;
  onDislike: () => void;
}

export default function DiscoverTab({ profiles, currentCardIndex, onLike, onDislike }: DiscoverTabProps) {
  const currentProfile = profiles[currentCardIndex];

  if (!currentProfile) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            Найди свою любовь
          </h1>
          <p className="text-gray-600 text-lg">Более 10 000 пользователей уже нашли свою половинку</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Нет доступных профилей</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
          Найди свою любовь
        </h1>
        <p className="text-gray-600 text-lg">Более 10 000 пользователей уже нашли свою половинку</p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <Card className="w-80 h-96 overflow-hidden shadow-2xl card-hover animate-scale-in">
            <div className="relative h-full">
              <img 
                src={currentProfile.image} 
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {currentProfile.verified && (
                  <Badge className="bg-blue-500 text-white">
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Верифицирован
                  </Badge>
                )}
                {currentProfile.premium && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Icon name="Crown" size={12} className="mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {currentProfile.name}, {currentProfile.age}
                    </h3>
                    <p className="text-sm opacity-90 flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {currentProfile.location}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Icon name="MoreHorizontal" size={20} />
                  </Button>
                </div>
                
                <p className="text-sm mb-3 opacity-90">{currentProfile.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentProfile.interests.map((interest, idx) => (
                    <Badge key={idx} className="bg-white/20 text-white text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-6">
            <Button
              onClick={onDislike}
              size="lg"
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Icon name="X" size={24} />
            </Button>
            
            <Button
              onClick={onLike}
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-heart-beat"
            >
              <Icon name="Heart" size={28} />
            </Button>
            
            <Button
              size="lg"
              className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Icon name="Star" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}