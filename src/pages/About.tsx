import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Stellar Dating
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
              О нас
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создаем будущее онлайн-знакомств, помогая людям находить настоящую любовь 
              с помощью передовых технологий и глубокого понимания человеческих отношений.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-12 card-hover">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={48} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Наша миссия</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Stellar Dating создан для того, чтобы каждый человек мог найти свою настоящую любовь. 
                    Мы верим, что каждый заслуживает счастливых отношений, и используем современные 
                    технологии искусственного интеллекта для создания более точных и осмысленных связей.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="BookOpen" size={24} className="mr-2 text-pink-500" />
                  Наша история
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Stellar Dating был основан в 2024 году командой экспертов в области технологий 
                  и психологии отношений. Мы заметили, что существующие приложения для знакомств 
                  фокусируются на внешности, упуская важные аспекты совместимости.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Наша платформа использует уникальный алгоритм, который анализирует не только 
                  предпочтения, но и психологическую совместимость, ценности и жизненные цели.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Star" size={24} className="mr-2 text-purple-500" />
                  Наши ценности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Icon name="Heart" size={16} className="mr-2 mt-1 text-pink-500" />
                    <span className="text-gray-600">Искренность в каждом взаимодействии</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Shield" size={16} className="mr-2 mt-1 text-blue-500" />
                    <span className="text-gray-600">Безопасность и конфиденциальность</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Users" size={16} className="mr-2 mt-1 text-green-500" />
                    <span className="text-gray-600">Инклюзивность и равенство</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Zap" size={16} className="mr-2 mt-1 text-yellow-500" />
                    <span className="text-gray-600">Инновации в технологиях знакомств</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-pink-500 mb-2">50K+</div>
                <div className="text-gray-600">Активных пользователей</div>
              </CardContent>
            </Card>
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">15K+</div>
                <div className="text-gray-600">Успешных пар</div>
              </CardContent>
            </Card>
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">89%</div>
                <div className="text-gray-600">Рейтинг совместимости</div>
              </CardContent>
            </Card>
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">24/7</div>
                <div className="text-gray-600">Поддержка пользователей</div>
              </CardContent>
            </Card>
          </div>

          {/* Team */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-center">
                <Icon name="Users" size={32} className="mx-auto mb-4 text-pink-500" />
                Команда
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Алексей Иванов</h3>
                  <p className="text-gray-600 mb-2">CEO & Основатель</p>
                  <p className="text-sm text-gray-500">15+ лет в IT, эксперт по машинному обучению</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Мария Петрова</h3>
                  <p className="text-gray-600 mb-2">Психолог отношений</p>
                  <p className="text-sm text-gray-500">PhD в психологии, специалист по совместимости</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Дмитрий Козлов</h3>
                  <p className="text-gray-600 mb-2">CTO</p>
                  <p className="text-sm text-gray-500">Архитектор безопасных систем знакомств</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Готовы найти свою любовь?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Присоединяйтесь к тысячам счастливых пар, которые нашли друг друга через Stellar Dating
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="btn-gradient text-lg px-8 py-4"
            >
              <Icon name="Heart" size={24} className="mr-2" />
              Начать знакомиться
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}