import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';
import LandingPage from '@/components/LandingPage';
import UserProfile from '@/components/UserProfile';
import DiscoverTab from '@/components/DiscoverTab';
import MatchesTab from '@/components/MatchesTab';
import ChatTab from '@/components/ChatTab';
import EventsTab from '@/components/EventsTab';
import PremiumTab from '@/components/PremiumTab';

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
        <LandingPage onShowAuth={() => setShowAuthModal(true)} />
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

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
            <UserProfile user={user} onLogout={handleLogout} />
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

          <TabsContent value="discover">
            <DiscoverTab 
              profiles={profiles}
              currentCardIndex={currentCardIndex}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesTab matches={matches} profiles={profiles} />
          </TabsContent>

          <TabsContent value="chat">
            <ChatTab 
              messages={messages}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={sendMessage}
            />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumTab user={user} />
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