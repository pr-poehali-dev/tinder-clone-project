import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Privacy() {
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
              Политика конфиденциальности
            </h1>
            <p className="text-lg text-gray-600">
              Последнее обновление: 15 сентября 2024 года
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Shield" size={24} className="mr-2 text-blue-500" />
                Введение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Stellar Dating ("мы", "наша компания", "наш сервис") серьезно относится к защите 
                вашей конфиденциальности. Данная Политика конфиденциальности описывает, как мы 
                собираем, используем, храним и защищаем вашу личную информацию при использовании 
                нашего сервиса знакомств.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Database" size={24} className="mr-2 text-green-500" />
                Какую информацию мы собираем
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Информация профиля</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Имя, возраст, пол и фотографии</li>
                  <li>Биография и личные интересы</li>
                  <li>Образование и профессиональная информация</li>
                  <li>Предпочтения в отношениях</li>
                  <li>Геолокационные данные (с вашего согласия)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Техническая информация</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>IP-адрес и информация об устройстве</li>
                  <li>Тип браузера и операционная система</li>
                  <li>Журналы активности и аналитические данные</li>
                  <li>Cookies и аналогичные технологии отслеживания</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Коммуникационные данные</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Сообщения между пользователями</li>
                  <li>Информация о лайках и совпадениях</li>
                  <li>Обращения в службу поддержки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Target" size={24} className="mr-2 text-purple-500" />
                Как мы используем вашу информацию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <Icon name="Heart" size={16} className="mr-2 mt-1 text-pink-500" />
                  <span>Предоставление услуг подбора совместимых партнеров</span>
                </li>
                <li className="flex items-start">
                  <Icon name="MessageCircle" size={16} className="mr-2 mt-1 text-blue-500" />
                  <span>Обеспечение безопасной коммуникации между пользователями</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Shield" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Предотвращение мошенничества и обеспечение безопасности</span>
                </li>
                <li className="flex items-start">
                  <Icon name="BarChart" size={16} className="mr-2 mt-1 text-yellow-500" />
                  <span>Улучшение алгоритмов подбора и качества сервиса</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Bell" size={16} className="mr-2 mt-1 text-purple-500" />
                  <span>Отправка уведомлений о новых совпадениях и сообщениях</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Headphones" size={16} className="mr-2 mt-1 text-red-500" />
                  <span>Предоставление клиентской поддержки</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Share2" size={24} className="mr-2 text-orange-500" />
                Передача данных третьим лицам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Мы НЕ продаем, НЕ сдаем в аренду и НЕ передаем вашу личную информацию 
                третьим лицам без вашего явного согласия, за исключением следующих случаев:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Icon name="AlertTriangle" size={16} className="mr-2 mt-1 text-red-500" />
                  <span>По требованию закона или судебного решения</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Shield" size={16} className="mr-2 mt-1 text-blue-500" />
                  <span>For защиты наших прав и безопасности пользователей</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Wrench" size={16} className="mr-2 mt-1 text-gray-500" />
                  <span>Поставщикам технических услуг (с соглашениями о конфиденциальности)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Lock" size={24} className="mr-2 text-blue-600" />
                Безопасность данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Технические меры защиты:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Шифрование данных SSL/TLS</li>
                    <li>• Двухфакторная аутентификация</li>
                    <li>• Регулярные аудиты безопасности</li>
                    <li>• Защищенные серверы и база данных</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Организационные меры:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ограниченный доступ к данным</li>
                    <li>• Обучение персонала</li>
                    <li>• Политики конфиденциальности</li>
                    <li>• Регулярное обновление систем</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="User" size={24} className="mr-2 text-green-600" />
                Ваши права
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Icon name="Eye" size={16} className="mr-2 text-blue-500" />
                    <span className="text-gray-600">Просмотр ваших данных</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Edit" size={16} className="mr-2 text-green-500" />
                    <span className="text-gray-600">Редактирование информации</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Download" size={16} className="mr-2 text-purple-500" />
                    <span className="text-gray-600">Скачивание данных</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Icon name="Trash2" size={16} className="mr-2 text-red-500" />
                    <span className="text-gray-600">Удаление аккаунта</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="XCircle" size={16} className="mr-2 text-orange-500" />
                    <span className="text-gray-600">Отзыв согласия</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Mail" size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Обращение в поддержку</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Cookie" size={24} className="mr-2 text-yellow-600" />
                Использование Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Мы используем cookies и аналогичные технологии для улучшения работы сервиса:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon name="Settings" size={24} className="mx-auto mb-2 text-gray-500" />
                  <h4 className="font-semibold mb-1">Функциональные</h4>
                  <p className="text-sm text-gray-600">Сохранение настроек</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon name="BarChart" size={24} className="mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold mb-1">Аналитические</h4>
                  <p className="text-sm text-gray-600">Анализ использования</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon name="Target" size={24} className="mx-auto mb-2 text-pink-500" />
                  <h4 className="font-semibold mb-1">Рекламные</h4>
                  <p className="text-sm text-gray-600">Персонализация</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Mail" size={24} className="mr-2 text-blue-500" />
                Связаться с нами
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Если у вас есть вопросы о данной Политике конфиденциальности или 
                обработке ваших персональных данных, свяжитесь с нами:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2 text-blue-500" />
                  <span className="text-gray-600">privacy@stellardating.com</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2 text-green-500" />
                  <span className="text-gray-600">+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2 text-red-500" />
                  <span className="text-gray-600">Москва, ул. Тверская, 1</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-2 text-purple-500" />
                  <span className="text-gray-600">Пн-Пт: 9:00-18:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="btn-gradient"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}