import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import UsersManagement from './UsersManagement';
import MatchesManagement from './MatchesManagement';
import Statistics from './Statistics';
import Settings from './Settings';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'users' | 'matches' | 'statistics' | 'settings';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMatches: 0,
    todayMatches: 0,
    totalMessages: 0,
    reportedUsers: 0
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    // В реальном приложении здесь будет запрос к API
    setStats({
      totalUsers: 1247,
      activeUsers: 342,
      totalMatches: 5834,
      todayMatches: 23,
      totalMessages: 18456,
      reportedUsers: 7
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLoginTime');
    onLogout();
  };

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'matches', label: 'Мэтчи', icon: 'Heart' },
    { id: 'statistics', label: 'Статистика', icon: 'BarChart3' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ];

  const StatCard = ({ title, value, icon, color, change }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% за сегодня
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Обзор системы</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Всего пользователей"
                  value={stats.totalUsers}
                  icon="Users"
                  color="bg-blue-500"
                  change={5.2}
                />
                <StatCard
                  title="Активные пользователи"
                  value={stats.activeUsers}
                  icon="UserCheck"
                  color="bg-green-500"
                  change={12.1}
                />
                <StatCard
                  title="Всего мэтчей"
                  value={stats.totalMatches}
                  icon="Heart"
                  color="bg-pink-500"
                  change={8.7}
                />
                <StatCard
                  title="Мэтчи сегодня"
                  value={stats.todayMatches}
                  icon="Zap"
                  color="bg-yellow-500"
                  change={-2.3}
                />
                <StatCard
                  title="Сообщений отправлено"
                  value={stats.totalMessages}
                  icon="MessageCircle"
                  color="bg-purple-500"
                  change={15.8}
                />
                <StatCard
                  title="Жалобы"
                  value={stats.reportedUsers}
                  icon="AlertTriangle"
                  color="bg-red-500"
                  change={-10.5}
                />
              </div>

              {/* Быстрые действия */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setActiveTab('users')}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                  >
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить пользователя
                  </Button>
                  <Button
                    onClick={() => setActiveTab('matches')}
                    className="bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200"
                  >
                    <Icon name="Eye" size={16} className="mr-2" />
                    Модерация фото
                  </Button>
                  <Button
                    onClick={() => setActiveTab('statistics')}
                    className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт данных
                  </Button>
                  <Button
                    onClick={() => setActiveTab('settings')}
                    className="bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки системы
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return <UsersManagement />;

      case 'matches':
        return <MatchesManagement />;

      case 'statistics':
        return <Statistics />;

      case 'settings':
        return <Settings />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-sm text-gray-600">Stellar Dating Administration</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Icon name="Clock" size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date().toLocaleString('ru-RU')}
              </span>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Боковое меню */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon 
                      name={item.icon as any} 
                      size={20} 
                      className={activeTab === item.id ? 'text-white' : 'text-gray-500'} 
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}