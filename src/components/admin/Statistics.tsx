import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface StatData {
  period: string;
  users: number;
  matches: number;
  messages: number;
  revenue: number;
}

export default function Statistics() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [chartData, setChartData] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalUsers: 1247,
    activeUsers: 342,
    totalMatches: 5834,
    todayMatches: 23,
    totalMessages: 18456,
    averageSessionTime: '12:34',
    conversionRate: 15.2,
    retentionRate: 68.5
  });

  useEffect(() => {
    loadStatistics();
  }, [timeRange]);

  const loadStatistics = async () => {
    setLoading(true);
    
    // Мок данные для графиков
    const mockData: StatData[] = [
      { period: '01.09', users: 45, matches: 12, messages: 156, revenue: 2400 },
      { period: '02.09', users: 52, matches: 18, messages: 203, revenue: 3200 },
      { period: '03.09', users: 38, matches: 9, messages: 124, revenue: 1800 },
      { period: '04.09', users: 67, matches: 24, messages: 287, revenue: 4100 },
      { period: '05.09', users: 58, matches: 21, messages: 245, revenue: 3600 },
      { period: '06.09', users: 43, matches: 15, messages: 189, revenue: 2700 },
      { period: '07.09', users: 72, matches: 28, messages: 312, revenue: 4800 }
    ];

    setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 800);
  };

  const StatCard = ({ title, value, change, icon, color, suffix = '' }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <Icon 
                name={change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={`mr-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}
              />
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-gray-500 text-sm ml-1">за месяц</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const SimpleChart = ({ data, title, dataKey, color }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item: any, index: number) => {
          const maxValue = Math.max(...data.map((d: any) => d[dataKey]));
          const percentage = (item[dataKey] / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-12 text-xs text-gray-600">{item.period}</div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-xs text-gray-900 text-right font-medium">
                {item[dataKey]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const UserActivityChart = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Активность пользователей</h3>
        <div className="flex space-x-2">
          {['day', 'week', 'month', 'year'].map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? 'default' : 'outline'}
              onClick={() => setTimeRange(range as any)}
            >
              {range === 'day' ? 'День' : 
               range === 'week' ? 'Неделя' :
               range === 'month' ? 'Месяц' : 'Год'}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SimpleChart
            data={chartData}
            title="Новые пользователи"
            dataKey="users"
            color="bg-blue-500"
          />
          <SimpleChart
            data={chartData}
            title="Новые мэтчи"
            dataKey="matches"
            color="bg-pink-500"
          />
          <SimpleChart
            data={chartData}
            title="Сообщения"
            dataKey="messages"
            color="bg-green-500"
          />
        </div>
      )}
    </div>
  );

  const TopUsersTable = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Топ активных пользователей</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Пользователь</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Мэтчи</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Сообщения</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Активность</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Анна Петрова', matches: 47, messages: 324, activity: '95%' },
              { name: 'Иван Сидоров', matches: 42, messages: 298, activity: '89%' },
              { name: 'Мария Козлова', matches: 38, messages: 267, activity: '84%' },
              { name: 'Алексей Волков', matches: 35, messages: 245, activity: '78%' },
              { name: 'Елена Смирнова', matches: 33, messages: 223, activity: '76%' }
            ].map((user, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{user.matches}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{user.messages}</td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-green-600">{user.activity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Статистика и аналитика</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт отчета
          </Button>
          <Button variant="outline">
            <Icon name="Settings" size={16} className="mr-2" />
            Настроить уведомления
          </Button>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Всего пользователей"
          value={totalStats.totalUsers}
          change={12.5}
          icon="Users"
          color="bg-blue-500"
        />
        <StatCard
          title="Активные пользователи"
          value={totalStats.activeUsers}
          change={8.3}
          icon="UserCheck"
          color="bg-green-500"
        />
        <StatCard
          title="Всего мэтчей"
          value={totalStats.totalMatches}
          change={15.7}
          icon="Heart"
          color="bg-pink-500"
        />
        <StatCard
          title="Сообщений отправлено"
          value={totalStats.totalMessages}
          change={-2.1}
          icon="MessageCircle"
          color="bg-purple-500"
        />
      </div>

      {/* Дополнительные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Среднее время сессии"
          value={totalStats.averageSessionTime}
          change={5.2}
          icon="Clock"
          color="bg-orange-500"
        />
        <StatCard
          title="Конверсия в мэтч"
          value={totalStats.conversionRate}
          change={3.1}
          icon="Target"
          color="bg-indigo-500"
          suffix="%"
        />
        <StatCard
          title="Удержание пользователей"
          value={totalStats.retentionRate}
          change={-1.8}
          icon="Users"
          color="bg-teal-500"
          suffix="%"
        />
        <StatCard
          title="Мэтчи сегодня"
          value={totalStats.todayMatches}
          change={25.3}
          icon="Zap"
          color="bg-yellow-500"
        />
      </div>

      {/* График активности */}
      <UserActivityChart />

      {/* Топ пользователи */}
      <TopUsersTable />

      {/* Аналитика по времени */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Активность по часам</h3>
          <div className="space-y-2">
            {[
              { time: '00:00-06:00', activity: 15 },
              { time: '06:00-12:00', activity: 45 },
              { time: '12:00-18:00', activity: 75 },
              { time: '18:00-24:00', activity: 95 }
            ].map((hour, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-gray-600">{hour.time}</div>
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: `${hour.activity}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 text-right">{hour.activity}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">География пользователей</h3>
          <div className="space-y-3">
            {[
              { city: 'Москва', users: 487, percentage: 39 },
              { city: 'Санкт-Петербург', users: 312, percentage: 25 },
              { city: 'Екатеринбург', users: 156, percentage: 12 },
              { city: 'Новосибирск', users: 134, percentage: 11 },
              { city: 'Казань', users: 98, percentage: 8 },
              { city: 'Другие', users: 60, percentage: 5 }
            ].map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">{location.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{location.users}</span>
                  <span className="text-xs text-gray-500">({location.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}