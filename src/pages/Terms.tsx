import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Terms() {
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
              Условия использования
            </h1>
            <p className="text-lg text-gray-600">
              Последнее обновление: 15 сентября 2024 года
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="FileText" size={24} className="mr-2 text-blue-500" />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Добро пожаловать в Stellar Dating! Настоящие Условия использования ("Условия") 
                регулируют использование вами нашего сервиса знакомств, включая мобильные 
                приложения, веб-сайт и все связанные услуги.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Используя наш сервис, вы соглашаетесь соблюдать эти Условия. Если вы не 
                согласны с любой частью данных условий, пожалуйста, не используйте наш сервис.
              </p>
            </CardContent>
          </Card>

          {/* Account Requirements */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="UserCheck" size={24} className="mr-2 text-green-500" />
                Требования к аккаунту
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-3">Для использования Stellar Dating вы должны:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Быть не младше 18 лет</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Предоставить точную и актуальную информацию о себе</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Использовать только свои настоящие фотографии</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Иметь только один активный аккаунт</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-1 text-green-500" />
                  <span>Не быть ранее заблокированным нашим сервисом</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Shield" size={24} className="mr-2 text-red-500" />
                Правила поведения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-3 text-red-600">ЗАПРЕЩАЕТСЯ:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Неприемлемый контент:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Оскорбления и угрозы</li>
                    <li>• Дискриминация по любому признаку</li>
                    <li>• Порнографический контент</li>
                    <li>• Спам и реклама</li>
                    <li>• Ложная информация</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Мошенничество:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Использование чужих фотографий</li>
                    <li>• Создание фальшивых профилей</li>
                    <li>• Просьбы о деньгах</li>
                    <li>• Коммерческая деятельность</li>
                    <li>• Сбор личных данных</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Icon name="AlertTriangle" size={20} className="mr-2 text-red-500" />
                  <span className="font-semibold text-red-700">Нарушение правил</span>
                </div>
                <p className="text-red-600 text-sm">
                  Нарушение правил может привести к предупреждению, временной блокировке 
                  или полному удалению аккаунта без возможности восстановления.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="CreditCard" size={24} className="mr-2 text-purple-500" />
                Платные услуги и подписки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Premium подписка включает:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Icon name="Star" size={16} className="mr-2 text-yellow-500" />
                      <span>Безлимитные лайки</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Eye" size={16} className="mr-2 text-blue-500" />
                      <span>Просмотр кто лайкнул</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Video" size={16} className="mr-2 text-green-500" />
                      <span>Видео и аудио звонки</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Filter" size={16} className="mr-2 text-purple-500" />
                      <span>Расширенные фильтры</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Условия оплаты:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Автоматическое продление подписки</li>
                    <li>• Отмена в любое время</li>
                    <li>• Возврат в течение 14 дней</li>
                    <li>• Безопасная обработка платежей</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Safety */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Lock" size={24} className="mr-2 text-blue-600" />
                Конфиденциальность и безопасность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Защита данных:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Icon name="Shield" size={16} className="mr-2 text-green-500" />
                      <span>Шифрование всех данных</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Eye" size={16} className="mr-2 text-blue-500" />
                      <span>Контроль приватности профиля</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="AlertCircle" size={16} className="mr-2 text-orange-500" />
                      <span>Система жалоб и блокировок</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Ваша безопасность:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Никогда не передавайте личные данные</li>
                    <li>• Встречайтесь в общественных местах</li>
                    <li>• Сообщайте о подозрительном поведении</li>
                    <li>• Доверяйте своей интуиции</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Copyright" size={24} className="mr-2 text-gray-600" />
                Интеллектуальная собственность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Права Stellar Dating:</h3>
                  <p className="text-gray-600">
                    Весь контент сервиса, включая дизайн, логотипы, алгоритмы подбора 
                    и программное обеспечение, защищен авторским правом и является 
                    собственностью Stellar Dating.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ваши права на контент:</h3>
                  <p className="text-gray-600">
                    Вы сохраняете права на свои фотографии и контент, но предоставляете 
                    нам лицензию на их использование в рамках работы сервиса.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="XCircle" size={24} className="mr-2 text-red-600" />
                Прекращение использования
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Вы можете:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Удалить аккаунт в любое время</li>
                    <li>• Отменить подписку</li>
                    <li>• Скачать свои данные</li>
                    <li>• Запросить полное удаление</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Мы можем:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Заблокировать за нарушения</li>
                    <li>• Приостановить сервис</li>
                    <li>• Изменить функционал</li>
                    <li>• Обновить условия</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Scale" size={24} className="mr-2 text-purple-600" />
                Ограничение ответственности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Icon name="AlertTriangle" size={20} className="mr-2 text-yellow-600" />
                    <span className="font-semibold text-yellow-700">Важно понимать</span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Stellar Dating предоставляет платформу для знакомств, но не гарантирует 
                    результаты и не несет ответственности за действия других пользователей.
                  </p>
                </div>
                
                <ul className="space-y-2 text-gray-600">
                  <li>• Мы не проверяем личность всех пользователей</li>
                  <li>• Не гарантируем точность информации в профилях</li>
                  <li>• Не несем ответственности за встречи в реальной жизни</li>
                  <li>• Не возмещаем косвенные убытки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Edit" size={24} className="mr-2 text-green-600" />
                Изменения в условиях
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Мы можем обновлять эти Условия использования время от времени. 
                Существенные изменения будут доведены до вашего сведения через:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Icon name="Bell" size={16} className="mr-2 text-blue-500" />
                  <span>Уведомления в приложении</span>
                </li>
                <li className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2 text-green-500" />
                  <span>Электронная почта</span>
                </li>
                <li className="flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-2 text-orange-500" />
                  <span>Объявления на сайте</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Headphones" size={24} className="mr-2 text-blue-500" />
                Поддержка и вопросы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Если у вас есть вопросы об этих Условиях использования или нужна помощь 
                с использованием сервиса, свяжитесь с нашей службой поддержки:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2 text-blue-500" />
                  <span className="text-gray-600">support@stellardating.com</span>
                </div>
                <div className="flex items-center">
                  <Icon name="MessageCircle" size={16} className="mr-2 text-green-500" />
                  <span className="text-gray-600">Чат в приложении 24/7</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2 text-purple-500" />
                  <span className="text-gray-600">+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="HelpCircle" size={16} className="mr-2 text-orange-500" />
                  <span className="text-gray-600">FAQ и помощь</span>
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