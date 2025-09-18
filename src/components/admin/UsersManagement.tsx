import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  city: string;
  is_verified: boolean;
  is_banned: boolean;
  created_at: string;
  last_active: string;
  total_matches: number;
  photos_count: number;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'banned' | 'unverified'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: 1,
          email: 'anna@example.com',
          first_name: 'Анна',
          last_name: 'Петрова',
          age: 25,
          city: 'Москва',
          is_verified: true,
          is_banned: false,
          created_at: '2024-01-15',
          last_active: '2024-09-18',
          total_matches: 23,
          photos_count: 4
        },
        {
          id: 2,
          email: 'ivan@example.com',
          first_name: 'Иван',
          last_name: 'Сидоров',
          age: 28,
          city: 'СПб',
          is_verified: false,
          is_banned: false,
          created_at: '2024-02-20',
          last_active: '2024-09-17',
          total_matches: 12,
          photos_count: 2
        },
        {
          id: 3,
          email: 'spam@example.com',
          first_name: 'Спам',
          last_name: 'Ботов',
          age: 35,
          city: 'Нигде',
          is_verified: false,
          is_banned: true,
          created_at: '2024-03-10',
          last_active: '2024-03-11',
          total_matches: 0,
          photos_count: 1
        }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  };

  const handleBanUser = async (userId: number, ban: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_banned: ban } : user
    ));
    // В реальном приложении здесь будет запрос к API
  };

  const handleVerifyUser = async (userId: number, verify: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_verified: verify } : user
    ));
    // В реальном приложении здесь будет запрос к API
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (filterStatus) {
      case 'verified':
        matchesFilter = user.is_verified && !user.is_banned;
        break;
      case 'banned':
        matchesFilter = user.is_banned;
        break;
      case 'unverified':
        matchesFilter = !user.is_verified && !user.is_banned;
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const UserModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Профиль пользователя</h3>
            <Button
              onClick={() => setShowUserModal(false)}
              variant="outline"
              size="sm"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Имя</label>
                <p className="text-lg">{selectedUser.first_name} {selectedUser.last_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Возраст</label>
                <p className="text-lg">{selectedUser.age} лет</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Город</label>
                <p className="text-lg">{selectedUser.city}</p>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{selectedUser.total_matches}</p>
                <p className="text-sm text-blue-700">Мэтчей</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{selectedUser.photos_count}</p>
                <p className="text-sm text-green-700">Фото</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.floor((Date.now() - new Date(selectedUser.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-sm text-purple-700">Дней на сайте</p>
              </div>
            </div>

            {/* Статусы */}
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedUser.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedUser.is_verified ? 'Верифицирован' : 'Не верифицирован'}
              </div>
              
              {selectedUser.is_banned && (
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Заблокирован
                </div>
              )}
            </div>

            {/* Действия */}
            <div className="flex space-x-3">
              {!selectedUser.is_verified && (
                <Button
                  onClick={() => handleVerifyUser(selectedUser.id, true)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Верифицировать
                </Button>
              )}
              
              {selectedUser.is_banned ? (
                <Button
                  onClick={() => handleBanUser(selectedUser.id, false)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Icon name="Unlock" size={16} className="mr-2" />
                  Разблокировать
                </Button>
              ) : (
                <Button
                  onClick={() => handleBanUser(selectedUser.id, true)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Icon name="Lock" size={16} className="mr-2" />
                  Заблокировать
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление пользователями</h2>
        <Button className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
          <Icon name="UserPlus" size={16} className="mr-2" />
          Добавить пользователя
        </Button>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по имени или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'Все' },
              { key: 'verified', label: 'Верифицированные' },
              { key: 'unverified', label: 'Не верифицированные' },
              { key: 'banned', label: 'Заблокированные' }
            ].map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key as any)}
                variant={filterStatus === filter.key ? 'default' : 'outline'}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Список пользователей */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка пользователей...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Пользователь
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Активность
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Мэтчи
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.age} лет, {user.city}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.is_verified ? 'Верифицирован' : 'Не верифицирован'}
                        </span>
                        {user.is_banned && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Заблокирован
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Регистрация: {new Date(user.created_at).toLocaleDateString('ru-RU')}</div>
                      <div>Активность: {new Date(user.last_active).toLocaleDateString('ru-RU')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.total_matches}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Детали
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-blue-700">Всего пользователей</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.is_verified).length}
          </div>
          <div className="text-sm text-green-700">Верифицированных</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {users.filter(u => u.is_banned).length}
          </div>
          <div className="text-sm text-red-700">Заблокированных</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => new Date(u.last_active) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
          </div>
          <div className="text-sm text-purple-700">Активных за неделю</div>
        </div>
      </div>

      {showUserModal && <UserModal />}
    </div>
  );
}