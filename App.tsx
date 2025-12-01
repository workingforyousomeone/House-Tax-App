import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { AuthState, LoginCredentials } from './types';
import { USERS } from './data/mockData';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });

  const handleLogin = (creds: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Simulate network request & validate against mock data
    setTimeout(() => {
      const matchedUser = USERS.find(u => 
        u.id === creds.userId && u.password === creds.password
      );

      if (matchedUser) {
        setAuthState({
          isAuthenticated: true,
          user: matchedUser,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid User ID or Password.',
        }));
      }
    }, 1000);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#001e0f] font-sans">
      
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001e0f] via-[#022c19] to-[#0f3d2a]" />
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full min-h-screen flex flex-col items-center ${authState.isAuthenticated ? 'justify-start pt-6 pb-6' : 'justify-center p-4'}`}>
        {authState.isAuthenticated && authState.user ? (
          <Dashboard user={authState.user} onLogout={handleLogout} />
        ) : (
          <div className="w-full flex items-center justify-center">
             <LoginForm 
                onLogin={handleLogin} 
                isLoading={authState.isLoading} 
                error={authState.error} 
              />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;