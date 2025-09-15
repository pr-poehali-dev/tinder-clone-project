import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import EditProfile from '@/components/EditProfile';
import { User } from '@/types/User';
import { storage } from '@/utils/storage';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

export default function UserProfile({ user, onLogout, onUserUpdate }: UserProfileProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveProfile = (updatedUser: User) => {
    storage.saveUser(updatedUser);
    onUserUpdate(updatedUser);
  };

  const getCompletionPercentage = () => {
    const fields = [
      user.bio,
      user.location.city,
      user.interests.length > 0,
      user.personalInfo.education,
      user.personalInfo.occupation,
      user.personalInfo.languages.length > 0,
      user.photos.length > 0
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
            Профиль
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Мой профиль
              <Button 
                onClick={() => setShowEditProfile(true)}
                variant="outline" 
                size="sm"
                className="ml-4"
              >
                <Icon name="Edit" size={16} className="mr-1" />
                Редактировать
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Основная информация */}
            <div className="flex items-start space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.photos[0]} />
                <AvatarFallback className="text-2xl">{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-xl">{user.name}, {user.age}</h3>
                  {user.verified && (
                    <Icon name="CheckCircle" size={20} className="text-blue-500" />
                  )}
                  {user.premium && (
                    <Icon name="Crown" size={20} className="text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-2">
                  <Icon name="MapPin" size={16} className="inline mr-1" />
                  {user.location.city}
                </p>
                <p className="text-gray-700">{user.bio || 'Добавьте описание о себе'}</p>
                
                {/* Прогресс заполнения профиля */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Заполнено профиля</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Интересы */}
            {user.interests.length > 0 && (
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Icon name="Heart" size={18} className="mr-2" />
                    Интересы
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Личная информация */}
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Icon name="User" size={18} className="mr-2" />
                  Личная информация
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {user.personalInfo.height && (
                    <div>
                      <span className="text-gray-600">Рост:</span>
                      <span className="ml-2">{user.personalInfo.height} см</span>
                    </div>
                  )}
                  {user.personalInfo.education && (
                    <div>
                      <span className="text-gray-600">Образование:</span>
                      <span className="ml-2">{user.personalInfo.education}</span>
                    </div>
                  )}
                  {user.personalInfo.occupation && (
                    <div>
                      <span className="text-gray-600">Профессия:</span>
                      <span className="ml-2">{user.personalInfo.occupation}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Семейное положение:</span>
                    <span className="ml-2">
                      {user.personalInfo.relationshipStatus === 'single' ? 'Холост/не замужем' :
                       user.personalInfo.relationshipStatus === 'divorced' ? 'В разводе' : 'Все сложно'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Дети:</span>
                    <span className="ml-2">{user.personalInfo.hasChildren ? 'Есть' : 'Нет'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Хочу детей:</span>
                    <span className="ml-2">
                      {user.personalInfo.wantsChildren === 'yes' ? 'Да' :
                       user.personalInfo.wantsChildren === 'no' ? 'Нет' : 'Возможно'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Предпочтения */}
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Icon name="Settings" size={18} className="mr-2" />
                  Предпочтения в знакомствах
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Возраст партнера:</span>
                    <span className="ml-2">{user.preferences.ageRange.min}-{user.preferences.ageRange.max} лет</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Расстояние:</span>
                    <span className="ml-2">до {user.preferences.maxDistance} км</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ищу:</span>
                    <span className="ml-2">
                      {user.preferences.lookingFor === 'serious' ? 'Серьезные отношения' :
                       user.preferences.lookingFor === 'casual' ? 'Легкие знакомства' :
                       user.preferences.lookingFor === 'friendship' ? 'Дружба' : 'Открыт(а) ко всему'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Пол партнера:</span>
                    <span className="ml-2">
                      {user.preferences.genderPreference === 'men' ? 'Мужчины' :
                       user.preferences.genderPreference === 'women' ? 'Женщины' : 'Все'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Языки */}
            {user.personalInfo.languages.length > 0 && (
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Icon name="Languages" size={18} className="mr-2" />
                    Языки
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.personalInfo.languages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Настройки и статус */}
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Верификация</Label>
                    <div className="flex items-center gap-2">
                      <Switch checked={user.verified} disabled />
                      {user.verified && (
                        <Icon name="CheckCircle" size={18} className="text-blue-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Геолокация</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Премиум статус</Label>
                    {user.premium ? (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Icon name="Crown" size={14} className="mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Базовый
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={() => setShowEditProfile(true)}
                className="btn-gradient flex-1"
              >
                <Icon name="Edit" size={18} className="mr-2" />
                Редактировать профиль
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline" 
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showEditProfile && (
        <EditProfile
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}
    </>
  );
}