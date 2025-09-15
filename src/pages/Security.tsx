import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Stellar Dating
            </span>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
              На главную
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            Безопасность
          </h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Защита данных</h2>
              <p className="text-gray-600 mb-4">
                Мы используем современные технологии шифрования для защиты ваших персональных данных. 
                Все данные передаются по защищенному протоколу HTTPS и хранятся в зашифрованном виде.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>256-битное шифрование AES для хранения данных</li>
                <li>SSL/TLS сертификаты для безопасной передачи данных</li>
                <li>Регулярные аудиты безопасности</li>
                <li>Двухфакторная аутентификация</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Модерация контента</h2>
              <p className="text-gray-600 mb-4">
                Наша команда модераторов работает круглосуточно, чтобы обеспечить безопасную среду для знакомств:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Проверка всех фотографий перед публикацией</li>
                <li>Автоматическая фильтрация нежелательного контента</li>
                <li>Система жалоб и быстрое реагирование</li>
                <li>Блокировка подозрительных аккаунтов</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Верификация профилей</h2>
              <p className="text-gray-600 mb-4">
                Мы проверяем подлинность пользователей, чтобы минимизировать количество фальшивых аккаунтов:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Проверка номера телефона</li>
                <li>Проверка документов для премиум аккаунтов</li>
                <li>Анализ поведения пользователей</li>
                <li>Система рейтингов и отзывов</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Конфиденциальность</h2>
              <p className="text-gray-600 mb-4">
                Ваша приватность - наш приоритет:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Гибкие настройки приватности профиля</li>
                <li>Возможность скрыть профиль от поиска</li>
                <li>Контроль видимости ваших данных</li>
                <li>Анонимный режим просмотра</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Что делать в случае проблемы?</h2>
              <p className="text-gray-600 mb-4">
                Если вы столкнулись с неподобающим поведением или подозрительной активностью:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Используйте кнопку "Пожаловаться" в профиле пользователя</li>
                <li>Заблокируйте нежелательные контакты</li>
                <li>Обратитесь в службу поддержки: security@stellardating.com</li>
                <li>Сохраните скриншоты как доказательство</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link to="/">
              <Button className="btn-gradient">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}