import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onShowAuth: () => void;
}

export default function LandingPage({ onShowAuth }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100">
      {/* Landing Header */}
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
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onShowAuth}
              className="border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              Войти
            </Button>
            <Button 
              onClick={onShowAuth}
              className="btn-gradient"
            >
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Landing Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            Найди свою любовь
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Более 10 000 пользователей уже нашли свою половинку в Stellar Dating
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Умный поиск</h3>
                <p className="text-gray-600">Находите людей по интересам и совместимости</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
                <p className="text-gray-600">Верифицированные профили и защищенные данные</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Живое общение</h3>
                <p className="text-gray-600">Чат, видеозвонки и реальные встречи</p>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            size="lg"
            onClick={onShowAuth}
            className="btn-gradient text-lg px-8 py-4 animate-heart-beat"
          >
            <Icon name="Heart" size={24} className="mr-2" />
            Начать знакомиться
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  Stellar Dating
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Найдите настоящую любовь с помощью нашей умной платформы знакомств. 
                Безопасно, современно, эффективно.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Icon name="Mail" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Icon name="Phone" size={20} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-pink-500 transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                    Карьера
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                    Блог
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-pink-500 transition-colors">
                    Условия использования
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                    Безопасность
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-pink-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Stellar Dating. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}