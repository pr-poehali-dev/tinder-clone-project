import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  user1_name: string;
  user2_name: string;
  user1_photo: string;
  user2_photo: string;
  created_at: string;
  messages_count: number;
  last_message_at: string;
  is_active: boolean;
  reported: boolean;
}

interface ReportedPhoto {
  id: number;
  user_name: string;
  photo_url: string;
  report_reason: string;
  reported_at: string;
  reported_by: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function MatchesManagement() {
  const [activeTab, setActiveTab] = useState<'matches' | 'reports'>('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [reportedPhotos, setReportedPhotos] = useState<ReportedPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // Мок данные для мэтчей
    const mockMatches: Match[] = [
      {
        id: 1,
        user1_name: 'Анна Петрова',
        user2_name: 'Иван Сидоров',
        user1_photo: '/api/placeholder/60/60',
        user2_photo: '/api/placeholder/60/60',
        created_at: '2024-09-15',
        messages_count: 25,
        last_message_at: '2024-09-18',
        is_active: true,
        reported: false
      },
      {
        id: 2,
        user1_name: 'Мария Козлова',
        user2_name: 'Алексей Волков',
        user1_photo: '/api/placeholder/60/60',
        user2_photo: '/api/placeholder/60/60',
        created_at: '2024-09-10',
        messages_count: 3,
        last_message_at: '2024-09-12',
        is_active: false,
        reported: true
      }
    ];

    // Мок данные для жалоб
    const mockReports: ReportedPhoto[] = [
      {
        id: 1,
        user_name: 'Подозрительный пользователь',
        photo_url: '/api/placeholder/100/100',
        report_reason: 'Неподходящее содержимое',
        reported_at: '2024-09-17',
        reported_by: 'Анна Петрова',
        status: 'pending'
      },
      {
        id: 2,
        user_name: 'Другой пользователь',
        photo_url: '/api/placeholder/100/100',
        report_reason: 'Фейковое фото',
        reported_at: '2024-09-16',
        reported_by: 'Иван Сидоров',
        status: 'pending'
      }
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setReportedPhotos(mockReports);
      setLoading(false);
    }, 1000);
  };

  const handleBreakMatch = async (matchId: number) => {
    setMatches(matches.map(match => 
      match.id === matchId ? { ...match, is_active: false } : match
    ));
  };

  const handlePhotoModeration = async (photoId: number, action: 'approve' | 'reject') => {
    setReportedPhotos(reportedPhotos.map(photo =>
      photo.id === photoId ? { ...photo, status: action === 'approve' ? 'approved' : 'rejected' } : photo
    ));
  };

  const MatchesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Активные мэтчи</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={14} className="mr-1" />
            Фильтры
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-1" />
            Экспорт
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка мэтчей...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Участники</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата мэтча</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Активность</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <img
                            src={match.user1_photo}
                            alt={match.user1_name}
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                          />
                          <img
                            src={match.user2_photo}
                            alt={match.user2_name}
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {match.user1_name} & {match.user2_name}
                          </p>
                          <p className="text-xs text-gray-500">ID: {match.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(match.created_at).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{match.messages_count} сообщений</p>
                        <p className="text-gray-500">
                          Последнее: {new Date(match.last_message_at).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          match.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {match.is_active ? 'Активен' : 'Неактивен'}
                        </span>
                        {match.reported && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Есть жалобы
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Eye" size={14} className="mr-1" />
                        Детали
                      </Button>
                      {match.is_active && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleBreakMatch(match.id)}
                        >
                          <Icon name="X" size={14} className="mr-1" />
                          Разорвать
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Статистика мэтчей */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{matches.length}</div>
          <div className="text-sm text-blue-700">Всего мэтчей</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {matches.filter(m => m.is_active).length}
          </div>
          <div className="text-sm text-green-700">Активных</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {matches.filter(m => m.reported).length}
          </div>
          <div className="text-sm text-red-700">С жалобами</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(matches.reduce((sum, m) => sum + m.messages_count, 0) / matches.length) || 0}
          </div>
          <div className="text-sm text-purple-700">Среднее сообщений</div>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Модерация фотографий</h3>
        <div className="text-sm text-gray-600">
          {reportedPhotos.filter(p => p.status === 'pending').length} ожидают модерации
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка жалоб...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportedPhotos.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img
                  src={report.photo_url}
                  alt="Reported content"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{report.user_name}</h4>
                  <p className="text-sm text-gray-600">Жалоба от: {report.reported_by}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Причина:</p>
                  <p className="text-sm text-gray-600">{report.report_reason}</p>
                </div>

                <div className="text-xs text-gray-500">
                  {new Date(report.reported_at).toLocaleString('ru-RU')}
                </div>

                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  report.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {report.status === 'pending' ? 'Ожидает' :
                   report.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                </div>

                {report.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handlePhotoModeration(report.id, 'approve')}
                    >
                      <Icon name="Check" size={14} className="mr-1" />
                      Одобрить
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handlePhotoModeration(report.id, 'reject')}
                    >
                      <Icon name="X" size={14} className="mr-1" />
                      Отклонить
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Статистика модерации */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {reportedPhotos.filter(p => p.status === 'pending').length}
          </div>
          <div className="text-sm text-yellow-700">Ожидают модерации</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {reportedPhotos.filter(p => p.status === 'approved').length}
          </div>
          <div className="text-sm text-green-700">Одобрено</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {reportedPhotos.filter(p => p.status === 'rejected').length}
          </div>
          <div className="text-sm text-red-700">Отклонено</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление мэтчами и модерация</h2>
      </div>

      {/* Табы */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('matches')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'matches'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon name="Heart" size={16} className="mr-2 inline" />
            Мэтчи ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon name="AlertTriangle" size={16} className="mr-2 inline" />
            Жалобы ({reportedPhotos.filter(p => p.status === 'pending').length})
          </button>
        </nav>
      </div>

      {activeTab === 'matches' ? <MatchesTab /> : <ReportsTab />}
    </div>
  );
}