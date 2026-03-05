import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { subscribeToWS } from './utils/wsProvider';
import { Home, Lightbulb, MessageCircleHeart, Gamepad2, User, Flame, BrainCircuit } from 'lucide-react';
import Wellness from './pages/Wellness';
import Sensual from './pages/Sensual';
import { useSyncStore } from './store';
import { getAvatarUrl } from './utils/avatar';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import { LoveLanguage, Mood, Journal, Goals, AccountSettings, PrivacySettings, NotificationSettings, RelationshipSettings } from './pages/Placeholders';
import Memories from './pages/Memories';
import Connect from './pages/Connect';
import LuxuryChat from './pages/Chat';
import Activities from './pages/Activities';
import AdminDB from './pages/AdminDB';

const AppLogo = () => (
  <div className="relative flex items-center justify-center w-8 h-8 mr-2 overflow-visible drop-shadow-xl">
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      {/* Central Heart */}
      <path d="M50 75 C 50 75, 25 50, 25 35 C 25 22, 35 15, 45 22 C 48 24, 50 30, 50 35 C 50 30, 52 24, 55 22 C 65 15, 75 22, 75 35 C 75 50, 50 75, 50 75 Z" fill="url(#heartGrad)" style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,51,102,0.8))' }} className="animate-pulse" />
      {/* Cupping Hands Ribbon */}
      <path d="M 15 50 C 30 75, 50 85, 50 85 C 50 85, 70 75, 85 50 C 75 40, 65 65, 50 70 C 35 65, 25 40, 15 50 Z" fill="url(#handRight)" opacity="0.95" />
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF3366" /><stop offset="100%" stopColor="#C026D3" /></linearGradient>
        <linearGradient id="handRight" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFB000" /><stop offset="100%" stopColor="#FF537A" /></linearGradient>
      </defs>
    </svg>
  </div>
);

const TopNav = () => {
  const user = useSyncStore(s => s.user);
  const customAvatar = useSyncStore(s => s.customAvatar);

  return (
    <div className="sticky top-0 z-[100] px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-rose-100/50 shadow-sm">
      <Link to="/" className="flex items-center hover:scale-105 transition-transform active:scale-95">
        <AppLogo />
        <span className="font-black text-romantic tracking-tighter text-2xl">SYNCH</span>
      </Link>
      <Link to="/profile">
        <div className="w-10 h-10 rounded-full border-2 border-rose-500/20 overflow-hidden shadow-sm transition-all hover:scale-110 active:scale-95">
          <img
            src={customAvatar || getAvatarUrl(user?.id)}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getAvatarUrl(user?.id);
            }}
          />
        </div>
      </Link>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[100]">
      <div className="bg-white/90 backdrop-blur-2xl border border-rose-100 p-2.5 rounded-[40px] flex justify-around shadow-[0_15px_40px_rgba(255,51,102,0.12)]">
        <Link to="/" className={`p-4 rounded-[28px] transition-all duration-300 ${location.pathname === '/' ? 'bg-romantic text-white shadow-lg shadow-rose-900/20 scale-110' : 'text-romantic/30 hover:text-romantic/60'}`}>
          <Home size={22} strokeWidth={2.5} />
        </Link>
        <Link to="/activities" className={`p-4 rounded-[28px] transition-all duration-300 ${location.pathname === '/activities' ? 'bg-primary text-white shadow-lg shadow-rose-500/20 scale-110' : 'text-romantic/30 hover:text-romantic/60'}`}>
          <Gamepad2 size={22} strokeWidth={2.5} />
        </Link>
        <Link to="/chat" className={`p-4 rounded-[28px] transition-all duration-300 ${location.pathname === '/chat' ? 'bg-primary text-white shadow-lg shadow-rose-500/20 scale-110' : 'text-romantic/30 hover:text-romantic/60'}`}>
          <MessageCircleHeart size={22} strokeWidth={2.5} />
        </Link>
        <Link to="/wellness" className={`p-4 rounded-[28px] transition-all duration-300 ${location.pathname === '/wellness' ? 'bg-romantic text-white shadow-lg shadow-rose-900/20 scale-110' : 'text-romantic/30 hover:text-romantic/60'}`}>
          <BrainCircuit size={22} strokeWidth={2.5} />
        </Link>
        <Link to="/profile" className={`p-4 rounded-[28px] transition-all duration-300 ${location.pathname === '/profile' ? 'bg-primary text-white shadow-lg shadow-rose-500/20 scale-110' : 'text-romantic/30 hover:text-romantic/60'}`}>
          <User size={22} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
};


const Layout = () => {
  return (
    <div className="min-h-[100dvh] bg-cream w-full max-w-md mx-auto relative shadow-2xl flex flex-col">
      <style>{`
        @keyframes riseUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.5) rotate(20deg); opacity: 0; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.97); }
        }
      `}</style>
      <TopNav />
      <div className="flex-1 pb-24 relative">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

function App() {
  const user = useSyncStore(s => s.user);
  const setProfile = useSyncStore(s => s.setProfile);
  const setPartner = useSyncStore(s => s.setPartner);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('syncheart_onboarding')) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      const headers = { Authorization: `Bearer ${user.id}` };

      axios.get(`${BASE_URL}/api/v1/users/me`, { headers })
        .then(res => setProfile(res.data))
        .catch(() => { });

      axios.get(`${BASE_URL}/api/v1/users/me/relationship`, { headers })
        .then(res => {
          if (res.data?.data?.partner) {
            setPartner(res.data.data.partner);
          } else {
            setPartner(null);
          }
        })
        .catch(() => { setPartner(null); });

      // Global Network Listener for Real-Time Sync Breaking
      const unsubscribe = subscribeToWS((data) => {
        if (data.type === 'break_sync' && data.partnerId === user.id) {
          setPartner(null);
          alert(`💔 ${data.fromName || 'Your partner'} has disconnected the sync frequency.`);
        }
      });
      return () => unsubscribe();
    }
  }, [user?.id]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('syncheart_onboarding', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="bg-black min-h-screen text-white flex justify-center">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          {!user ? (
            <Route path="*" element={<Login />} />
          ) : (
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/chat" element={<LuxuryChat />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/sensual" element={<Sensual />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDB />} />

              {/* Linked Routes */}
              <Route path="/memories" element={<Memories />} />
              <Route path="/love-language" element={<LoveLanguage />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings/account" element={<AccountSettings />} />
              <Route path="/settings/privacy" element={<PrivacySettings />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/settings/relationship" element={<RelationshipSettings />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
