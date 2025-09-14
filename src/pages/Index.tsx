import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

export default function Index() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Привет! Как дела?', time: '14:30' },
    { id: 2, sender: 'me', text: 'Привет! Всё отлично, а у тебя?', time: '14:32' },
    { id: 3, sender: 'other', text: 'Тоже хорошо! Может встретимся на кофе?', time: '14:35' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('lovematch_user');
      const storedToken = localStorage.getItem('lovematch_token');
      
      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('lovematch_user');
          localStorage.removeItem('lovematch_token');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('lovematch_user');
    localStorage.removeItem('lovematch_token');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100">
          {/* Landing Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-pink-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  LoveMatch
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAuthModal(true)}
                  className="border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  Войти
                </Button>
                <Button 
                  onClick={() => setShowAuthModal(true)}
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
                Более 10 000 пользователей уже нашли свою половинку в LoveMatch
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
                onClick={() => setShowAuthModal(true)}
                className="btn-gradient text-lg px-8 py-4 animate-heart-beat"
              >
                <Icon name="Heart" size={24} className="mr-2" />
                Начать знакомиться
              </Button>
            </div>
          </main>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  const profiles = [
    {
      id: 1,
      name: 'Анна',
      age: 25,
      bio: 'Люблю путешествия и фотографию 📸',
      location: 'Москва, 2 км',
      image: '/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg',
      interests: ['Путешествия', 'Фотография', 'Йога'],
      verified: true,
      premium: false
    },
    {
      id: 2,
      name: 'Дмитрий',
      age: 28,
      bio: 'IT-специалист, занимаюсь спортом 💪',
      location: 'Москва, 5 км',
      image: '/img/6220b645-c25f-4715-b8b2-5f385d2cb1c3.jpg',
      interests: ['Спорт', 'Технологии', 'Кино'],
      verified: true,
      premium: true
    },
    {
      id: 3,
      name: 'Мария',
      age: 23,
      bio: 'Художница и любитель кофе ☕',
      location: 'Москва, 3 км',
      image: '/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg',
      interests: ['Искусство', 'Кофе', 'Музыка'],
      verified: false,
      premium: true
    }
  ];

  const handleLike = () => {
    if (Math.random() > 0.5) {
      setMatches([...matches, profiles[currentCardIndex].id]);
    }
    nextCard();
  };

  const handleDislike = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < profiles.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        sender: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              LoveMatch
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-gray-600 hover:text-pink-500 transition-colors">Поиск</button>
            <button className="text-gray-600 hover:text-pink-500 transition-colors">Избранное</button>
            <button 
              onClick={() => setShowChat(!showChat)}
              className="text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-1"
            >
              <Icon name="MessageCircle" size={18} />
              <span>Чат</span>
              {matches.length > 0 && (
                <Badge className="bg-red-500 text-white text-xs">{matches.length}</Badge>
              )}
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                  Профиль
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Мой профиль</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}, {user.age}</h3>
                      <p className="text-gray-600">{user.city}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Верификация</Label>
                      <Switch checked={user.verified} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Геолокация</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Премиум статус</Label>
                      {user.premium ? (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Pro
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Базовый
                        </Badge>
                      )}
                    </div>
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={handleLogout}
                        variant="outline" 
                        className="w-full text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Icon name="LogOut" size={18} className="mr-2" />
                        Выйти
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto mb-8 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="discover" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Icon name="Search" size={16} />
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Icon name="Heart" size={16} />
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Icon name="MessageCircle" size={16} />
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Icon name="Calendar" size={16} />
            </TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <Icon name="Crown" size={16} />
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                Найди свою любовь
              </h1>
              <p className="text-gray-600 text-lg">Более 10 000 пользователей уже нашли свою половинку</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Card className="w-80 h-96 overflow-hidden shadow-2xl card-hover animate-scale-in">
                  <div className="relative h-full">
                    <img 
                      src={profiles[currentCardIndex]?.image} 
                      alt={profiles[currentCardIndex]?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {profiles[currentCardIndex]?.verified && (
                        <Badge className="bg-blue-500 text-white">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Верифицирован
                        </Badge>
                      )}
                      {profiles[currentCardIndex]?.premium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          <Icon name="Crown" size={12} className="mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>

                    <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {profiles[currentCardIndex]?.name}, {profiles[currentCardIndex]?.age}
                          </h3>
                          <p className="text-sm opacity-90 flex items-center">
                            <Icon name="MapPin" size={14} className="mr-1" />
                            {profiles[currentCardIndex]?.location}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <Icon name="MoreHorizontal" size={20} />
                        </Button>
                      </div>
                      
                      <p className="text-sm mb-3 opacity-90">{profiles[currentCardIndex]?.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profiles[currentCardIndex]?.interests.map((interest, idx) => (
                          <Badge key={idx} className="bg-white/20 text-white text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-6 mt-6">
                  <Button
                    onClick={handleDislike}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <Icon name="X" size={24} />
                  </Button>
                  
                  <Button
                    onClick={handleLike}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-heart-beat"
                  >
                    <Icon name="Heart" size={28} />
                  </Button>
                  
                  <Button
                    size="lg"
                    className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <Icon name="Star" size={24} />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Ваши совпадения</h2>
              <p className="text-gray-600">У вас {matches.length} новых совпадений!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((matchId) => {
                const profile = profiles.find(p => p.id === matchId);
                return profile ? (
                  <Card key={matchId} className="overflow-hidden card-hover animate-scale-in">
                    <div className="relative h-48">
                      <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                        <p className="text-sm opacity-90">{profile.location}</p>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                        <Icon name="Heart" size={12} className="mr-1" />
                        Match!
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-3">{profile.bio}</p>
                      <Button className="w-full btn-gradient">
                        Написать сообщение
                      </Button>
                    </CardContent>
                  </Card>
                ) : null;
              })}
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Сообщения</h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="h-96 flex flex-col">
                <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg" />
                      <AvatarFallback>А</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Анна</h3>
                      <p className="text-sm text-gray-600">онлайн</p>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <Button size="icon" variant="ghost">
                        <Icon name="Phone" size={18} />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Icon name="Video" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          message.sender === 'me'
                            ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-pink-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Написать сообщение..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} className="btn-gradient">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Мероприятия</h2>
              <p className="text-gray-600">Присоединяйтесь к интересным событиям</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'Speed Dating', date: '15 октября', participants: 24, location: 'Центр Москвы' },
                { title: 'Винная дегустация', date: '20 октября', participants: 18, location: 'Винотека' },
                { title: 'Мастер-класс по танцам', date: '25 октября', participants: 12, location: 'Танц-студия' }
              ].map((event, idx) => (
                <Card key={idx} className="card-hover animate-fade-in">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p className="flex items-center">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        {event.date}
                      </p>
                      <p className="flex items-center">
                        <Icon name="MapPin" size={16} className="mr-2" />
                        {event.location}
                      </p>
                      <p className="flex items-center">
                        <Icon name="Users" size={16} className="mr-2" />
                        {event.participants} участников
                      </p>
                    </div>
                    <Button className="w-full btn-gradient">
                      Присоединиться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                LoveMatch Premium
              </h2>
              <p className="text-gray-600">Получите максимум от знакомств</p>
            </div>
            
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-gray-200 card-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Базовый</h3>
                  <div className="text-3xl font-bold mb-4">
                    Бесплатно
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      5 лайков в день
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Базовые фильтры
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Стандартный чат
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    {user.premium ? 'Текущий план' : 'Активен'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold">
                  Популярный
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Icon name="Crown" size={20} className="mr-2 text-yellow-500" />
                    Premium
                  </h3>
                  <div className="text-3xl font-bold mb-4">
                    ₽999 <span className="text-sm font-normal text-gray-600">/мес</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Безлимитные лайки
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Расширенные фильтры
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Видео и аудио звонки
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Кто лайкнул вас
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={16} className="mr-2 text-green-500" />
                      Приоритет в поиске
                    </li>
                  </ul>
                  <Button className="w-full mt-6 btn-gradient">
                    {user.premium ? 'Текущий план' : 'Подключить Premium'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="w-14 h-14 rounded-full btn-gradient shadow-lg animate-bounce-slow">
          <Icon name="Zap" size={24} />
        </Button>
      </div>
    </div>
  );
}