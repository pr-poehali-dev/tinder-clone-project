import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

export default function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
          Профиль
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Мой профиль</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user.name}, {user.age}</h3>
              <p className="text-gray-600">{user.city}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Верификация</Label>
              <Switch checked={user.verified} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Геолокация</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Премиум статус</Label>
              {user.premium ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Pro
                </Badge>
              ) : (
                <Badge variant="outline">
                  Базовый
                </Badge>
              )}
            </div>
            <div className="pt-4 border-t">
              <Button 
                onClick={onLogout}
                variant="outline" 
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}