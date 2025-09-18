import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (adminAuth === 'true' && loginTime) {
      // Проверяем, не истекла ли сессия (24 часа)
      const sessionExpiry = 24 * 60 * 60 * 1000; // 24 часа
      const isSessionValid = Date.now() - parseInt(loginTime) < sessionExpiry;
      
      if (isSessionValid) {
        setIsAuthenticated(true);
      } else {
        // Сессия истекла
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminLoginTime');
        setIsAuthenticated(false);
      }
    }
    
    setIsLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </>
  );
}