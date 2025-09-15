import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { User } from '@/types/User';

interface EditProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
}

export default function EditProfile({ user, onSave, onClose }: EditProfileProps) {
  const [formData, setFormData] = useState<User>({ ...user });
  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof User],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.personalInfo.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          languages: [...prev.personalInfo.languages, newLanguage.trim()]
        }
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        languages: prev.personalInfo.languages.filter(l => l !== language)
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Редактировать профиль</h2>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Возраст</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Расскажите о себе..."
                  className="min-h-24"
                />
              </div>
              <div>
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange('location.city', e.target.value)}
                  placeholder="Ваш город"
                />
              </div>
            </CardContent>
          </Card>

          {/* Интересы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Heart" size={20} className="mr-2" />
                Интересы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="cursor-pointer">
                    {interest}
                    <Icon 
                      name="X" 
                      size={14} 
                      className="ml-1" 
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Добавить интерес"
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button onClick={addInterest} variant="outline">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Предпочтения */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Settings" size={20} className="mr-2" />
                Предпочтения в знакомствах
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Возраст партнера</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={formData.preferences.ageRange.min}
                      onChange={(e) => handleInputChange('preferences.ageRange.min', parseInt(e.target.value))}
                      placeholder="От"
                    />
                    <span>—</span>
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={formData.preferences.ageRange.max}
                      onChange={(e) => handleInputChange('preferences.ageRange.max', parseInt(e.target.value))}
                      placeholder="До"
                    />
                  </div>
                </div>
                <div>
                  <Label>Максимальное расстояние (км)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.preferences.maxDistance}
                    onChange={(e) => handleInputChange('preferences.maxDistance', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Ищу</Label>
                  <Select 
                    value={formData.preferences.lookingFor} 
                    onValueChange={(value) => handleInputChange('preferences.lookingFor', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serious">Серьезные отношения</SelectItem>
                      <SelectItem value="casual">Легкие знакомства</SelectItem>
                      <SelectItem value="friendship">Дружба</SelectItem>
                      <SelectItem value="anything">Открыт(а) ко всему</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Пол партнера</Label>
                  <Select 
                    value={formData.preferences.genderPreference} 
                    onValueChange={(value) => handleInputChange('preferences.genderPreference', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Мужчины</SelectItem>
                      <SelectItem value="women">Женщины</SelectItem>
                      <SelectItem value="everyone">Все</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Личная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Info" size={20} className="mr-2" />
                Личная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Рост (см)</Label>
                  <Input
                    type="number"
                    min="140"
                    max="220"
                    value={formData.personalInfo.height || ''}
                    onChange={(e) => handleInputChange('personalInfo.height', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="Ваш рост"
                  />
                </div>
                <div>
                  <Label>Образование</Label>
                  <Input
                    value={formData.personalInfo.education || ''}
                    onChange={(e) => handleInputChange('personalInfo.education', e.target.value)}
                    placeholder="Ваше образование"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Профессия</Label>
                  <Input
                    value={formData.personalInfo.occupation || ''}
                    onChange={(e) => handleInputChange('personalInfo.occupation', e.target.value)}
                    placeholder="Ваша профессия"
                  />
                </div>
                <div>
                  <Label>Семейное положение</Label>
                  <Select 
                    value={formData.personalInfo.relationshipStatus} 
                    onValueChange={(value) => handleInputChange('personalInfo.relationshipStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Холост/не замужем</SelectItem>
                      <SelectItem value="divorced">В разводе</SelectItem>
                      <SelectItem value="complicated">Все сложно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Дети</Label>
                  <Select 
                    value={formData.personalInfo.hasChildren ? 'yes' : 'no'} 
                    onValueChange={(value) => handleInputChange('personalInfo.hasChildren', value === 'yes')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Есть дети</SelectItem>
                      <SelectItem value="no">Нет детей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Хочу детей</Label>
                  <Select 
                    value={formData.personalInfo.wantsChildren} 
                    onValueChange={(value) => handleInputChange('personalInfo.wantsChildren', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Да</SelectItem>
                      <SelectItem value="no">Нет</SelectItem>
                      <SelectItem value="maybe">Возможно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Курение</Label>
                  <Select 
                    value={formData.personalInfo.smoking} 
                    onValueChange={(value) => handleInputChange('personalInfo.smoking', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Не курю</SelectItem>
                      <SelectItem value="sometimes">Иногда</SelectItem>
                      <SelectItem value="regularly">Регулярно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Алкоголь</Label>
                  <Select 
                    value={formData.personalInfo.drinking} 
                    onValueChange={(value) => handleInputChange('personalInfo.drinking', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Не пью</SelectItem>
                      <SelectItem value="socially">Социально</SelectItem>
                      <SelectItem value="regularly">Регулярно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Религия</Label>
                  <Input
                    value={formData.personalInfo.religion || ''}
                    onChange={(e) => handleInputChange('personalInfo.religion', e.target.value)}
                    placeholder="Ваша религия"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Языки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Languages" size={20} className="mr-2" />
                Языки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.personalInfo.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="cursor-pointer">
                    {language}
                    <Icon 
                      name="X" 
                      size={14} 
                      className="ml-1" 
                      onClick={() => removeLanguage(language)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Добавить язык"
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                />
                <Button onClick={addLanguage} variant="outline">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Социальные сети */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Share2" size={20} className="mr-2" />
                Социальные сети
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Instagram</Label>
                  <Input
                    value={formData.socialMedia?.instagram || ''}
                    onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label>Telegram</Label>
                  <Input
                    value={formData.socialMedia?.telegram || ''}
                    onChange={(e) => handleInputChange('socialMedia.telegram', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label>VK</Label>
                  <Input
                    value={formData.socialMedia?.vk || ''}
                    onChange={(e) => handleInputChange('socialMedia.vk', e.target.value)}
                    placeholder="vk.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave} className="btn-gradient">
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  );
}