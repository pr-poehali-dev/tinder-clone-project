import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Stellar Dating',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    minAge: 18,
    maxAge: 99,
    maxPhotosPerUser: 6,
    maxDistance: 100,
    enablePremium: true,
    premiumPrice: 999,
    autoModeration: true,
    enablePushNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false
  });

  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'payments'>('general');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    // В реальном приложении здесь будет отправка на сервер
    alert('Настройки сохранены!');
  };

  const ToggleSwitch = ({ checked, onChange, label, description }: any) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-pink-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'text', min, max, suffix }: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min}
          max={max}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  const GeneralTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Основные настройки</h3>
        <div className="space-y-4">
          <InputField
            label="Название сайта"
            value={settings.siteName}
            onChange={(value: string) => handleSettingChange('siteName', value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Минимальный возраст"
              value={settings.minAge}
              onChange={(value: number) => handleSettingChange('minAge', value)}
              type="number"
              min={18}
              max={99}
              suffix="лет"
            />
            <InputField
              label="Максимальный возраст"
              value={settings.maxAge}
              onChange={(value: number) => handleSettingChange('maxAge', value)}
              type="number"
              min={18}
              max={99}
              suffix="лет"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Максимум фото на профиль"
              value={settings.maxPhotosPerUser}
              onChange={(value: number) => handleSettingChange('maxPhotosPerUser', value)}
              type="number"
              min={1}
              max={10}
              suffix="фото"
            />
            <InputField
              label="Максимальное расстояние поиска"
              value={settings.maxDistance}
              onChange={(value: number) => handleSettingChange('maxDistance', value)}
              type="number"
              min={1}
              max={500}
              suffix="км"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Режимы работы</h3>
        <div className="space-y-1">
          <ToggleSwitch
            checked={settings.maintenanceMode}
            onChange={(value: boolean) => handleSettingChange('maintenanceMode', value)}
            label="Режим обслуживания"
            description="Временно закрыть сайт для пользователей"
          />
          <ToggleSwitch
            checked={settings.allowRegistration}
            onChange={(value: boolean) => handleSettingChange('allowRegistration', value)}
            label="Разрешить регистрацию"
            description="Позволить новым пользователям регистрироваться"
          />
          <ToggleSwitch
            checked={settings.autoModeration}
            onChange={(value: boolean) => handleSettingChange('autoModeration', value)}
            label="Автоматическая модерация"
            description="Включить автоматическую проверку контента"
          />
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Верификация пользователей</h3>
        <div className="space-y-1">
          <ToggleSwitch
            checked={settings.requireEmailVerification}
            onChange={(value: boolean) => handleSettingChange('requireEmailVerification', value)}
            label="Обязательная верификация email"
            description="Требовать подтверждение email при регистрации"
          />
          <ToggleSwitch
            checked={settings.requirePhoneVerification}
            onChange={(value: boolean) => handleSettingChange('requirePhoneVerification', value)}
            label="Обязательная верификация телефона"
            description="Требовать подтверждение номера телефона"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Безопасность данных</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">SSL сертификат</p>
                <p className="text-xs text-green-700">Активен и действителен</p>
              </div>
            </div>
            <Icon name="CheckCircle" size={20} className="text-green-600" />
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Database" size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Шифрование БД</p>
                <p className="text-xs text-blue-700">AES-256 шифрование включено</p>
              </div>
            </div>
            <Icon name="CheckCircle" size={20} className="text-blue-600" />
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Key" size={20} className="text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">Двухфакторная аутентификация</p>
                <p className="text-xs text-purple-700">Для администраторов</p>
              </div>
            </div>
            <Button size="sm" variant="outline">Настроить</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Уведомления пользователей</h3>
        <div className="space-y-1">
          <ToggleSwitch
            checked={settings.enablePushNotifications}
            onChange={(value: boolean) => handleSettingChange('enablePushNotifications', value)}
            label="Push-уведомления"
            description="Уведомления в браузере и мобильном приложении"
          />
          <ToggleSwitch
            checked={settings.enableEmailNotifications}
            onChange={(value: boolean) => handleSettingChange('enableEmailNotifications', value)}
            label="Email уведомления"
            description="Отправка уведомлений на почту"
          />
          <ToggleSwitch
            checked={settings.enableSMSNotifications}
            onChange={(value: boolean) => handleSettingChange('enableSMSNotifications', value)}
            label="SMS уведомления"
            description="Отправка SMS на номер телефона"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Шаблоны уведомлений</h3>
        <div className="space-y-4">
          {[
            { type: 'new_match', name: 'Новый мэтч', enabled: true },
            { type: 'new_message', name: 'Новое сообщение', enabled: true },
            { type: 'profile_view', name: 'Просмотр профиля', enabled: false },
            { type: 'weekly_digest', name: 'Еженедельная сводка', enabled: true }
          ].map((template) => (
            <div key={template.type} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{template.name}</p>
                <p className="text-xs text-gray-500">Шаблон: {template.type}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  template.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.enabled ? 'Включен' : 'Отключен'}
                </span>
                <Button size="sm" variant="outline">Редактировать</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PaymentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Премиум подписка</h3>
        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.enablePremium}
            onChange={(value: boolean) => handleSettingChange('enablePremium', value)}
            label="Включить премиум функции"
            description="Разрешить пользователям покупать премиум подписку"
          />
          
          <InputField
            label="Цена премиум подписки (месяц)"
            value={settings.premiumPrice}
            onChange={(value: number) => handleSettingChange('premiumPrice', value)}
            type="number"
            min={1}
            suffix="₽"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Способы оплаты</h3>
        <div className="space-y-4">
          {[
            { name: 'Банковские карты', provider: 'Stripe', status: 'active', icon: 'CreditCard' },
            { name: 'Apple Pay', provider: 'Apple', status: 'active', icon: 'Smartphone' },
            { name: 'Google Pay', provider: 'Google', status: 'inactive', icon: 'Smartphone' },
            { name: 'PayPal', provider: 'PayPal', status: 'inactive', icon: 'DollarSign' }
          ].map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={payment.icon as any} size={20} className="text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{payment.name}</p>
                  <p className="text-xs text-gray-500">{payment.provider}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  payment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {payment.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
                <Button size="sm" variant="outline">
                  {payment.status === 'active' ? 'Настроить' : 'Включить'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'general', label: 'Основные', icon: 'Settings' },
    { id: 'security', label: 'Безопасность', icon: 'Shield' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Настройки системы</h2>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white"
        >
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>

      {/* Табы */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon name={tab.icon as any} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Контент табов */}
      {activeTab === 'general' && <GeneralTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'payments' && <PaymentsTab />}
    </div>
  );
}