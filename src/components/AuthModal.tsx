import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    city: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Math.random(),
      name: 'Елена',
      email: loginData.email,
      age: 26,
      city: 'Москва',
      avatar: '/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg',
      premium: true,
      verified: true,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('lovematch_user', JSON.stringify(userData));
    localStorage.setItem('lovematch_token', 'auth_token_' + Date.now());
    
    onLogin(userData);
    setIsLoading(false);
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = {
      id: Math.random(),
      name: registerData.name,
      email: registerData.email,
      age: parseInt(registerData.age) || 25,
      city: registerData.city || 'Москва',
      avatar: '/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg',
      premium: false,
      verified: false,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('lovematch_user', JSON.stringify(userData));
    localStorage.setItem('lovematch_token', 'auth_token_' + Date.now());
    
    onLogin(userData);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Добро пожаловать в LoveMatch!</h2>
          <p className="text-pink-100">Найдите свою половинку уже сегодня</p>
        </div>

        <div className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    'Войти'
                  )}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm text-gray-600">
                    Забыли пароль?
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="register-name">Имя</Label>
                    <Input
                      id="register-name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-age">Возраст</Label>
                    <Input
                      id="register-age"
                      type="number"
                      min="18"
                      max="99"
                      value={registerData.age}
                      onChange={(e) => setRegisterData({...registerData, age: e.target.value})}
                      placeholder="25"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="register-city">Город</Label>
                  <Input
                    id="register-city"
                    value={registerData.city}
                    onChange={(e) => setRegisterData({...registerData, city: e.target.value})}
                    placeholder="Москва"
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-confirm">Повторите пароль</Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    'Зарегистрироваться'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">или</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Icon name="Mail" size={18} className="mr-2" />
                Войти через Google
              </Button>
              
              <Button variant="outline" className="w-full">
                <Icon name="Facebook" size={18} className="mr-2" />
                Войти через Facebook
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}