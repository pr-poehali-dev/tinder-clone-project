import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PremiumTabProps {
  user: any;
}

export default function PremiumTab({ user }: PremiumTabProps) {
  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          LoveMatch Premium
        </h2>
        <p className="text-gray-600">Получите максимум от знакомств</p>
      </div>
      
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-200 card-hover">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Базовый</h3>
            <div className="text-3xl font-bold mb-4">
              Бесплатно
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                5 лайков в день
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Базовые фильтры
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Стандартный чат
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-6">
              {user.premium ? 'Текущий план' : 'Активен'}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold">
            Популярный
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Crown" size={20} className="mr-2 text-yellow-500" />
              Premium
            </h3>
            <div className="text-3xl font-bold mb-4">
              ₽999 <span className="text-sm font-normal text-gray-600">/мес</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Безлимитные лайки
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Расширенные фильтры
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Видео и аудио звонки
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Кто лайкнул вас
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="mr-2 text-green-500" />
                Приоритет в поиске
              </li>
            </ul>
            <Button className="w-full mt-6 btn-gradient">
              {user.premium ? 'Текущий план' : 'Подключить Premium'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}