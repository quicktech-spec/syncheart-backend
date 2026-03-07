import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { subscribeToWS } from './utils/wsProvider';
import { Home, MessageCircleHeart, Gamepad2, User, BrainCircuit } from 'lucide-react';
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
      <path d="M50 75 C 50 75, 25 50, 25 35 C 25 22, 35 15, 45 22 C 48 24, 50 30, 50 35 C 50 30, 52 24, 55 22 C 65 15, 75 22, 75 35 C 75 50, 50 75, 50 75 Z" fill="url(#heartGrad)" style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,51,102,0.8))' }} className="animate-pulse" />
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
    <div className="sticky top-0 z-[100] px-6 py-5 flex items-center justify-between bg-black/40 backdrop-blur-2xl border-b border-white/5">
      <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform active:scale-95 group">
        <AppLogo />
        <span className="font-serif italic text-white tracking-widest text-xl group-hover:text-primary transition-colors uppercase">Synch</span>
      </Link>
      <Link to="/profile">
        <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shadow-2xl transition-all hover:scale-110 active:scale-95 hover:border-primary/50 hover:shadow-primary/20">
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] z-[100]">
      <div className="bg-[#18181B]/80 backdrop-blur-3xl border border-white/10 p-2 rounded-[32px] flex justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link to="/" className={`p-3.5 rounded-[24px] transition-all duration-300 ${location.pathname === '/' ? 'bg-white/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] scale-110' : 'text-white/40 hover:text-white/80'}`}>
          <Home size={20} strokeWidth={2.5} />
        </Link>
        <Link to="/activities" className={`p-3.5 rounded-[24px] transition-all duration-300 ${location.pathname === '/activities' ? 'bg-white/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] scale-110' : 'text-white/40 hover:text-white/80'}`}>
          <Gamepad2 size={20} strokeWidth={2.5} />
        </Link>
        <Link to="/chat" className={`p-3.5 rounded-[24px] transition-all duration-300 ${location.pathname === '/chat' ? 'bg-white/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] scale-110' : 'text-white/40 hover:text-white/80'}`}>
          <MessageCircleHeart size={20} strokeWidth={2.5} />
        </Link>
        <Link to="/wellness" className={`p-3.5 rounded-[24px] transition-all duration-300 ${location.pathname === '/wellness' ? 'bg-white/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] scale-110' : 'text-white/40 hover:text-white/80'}`}>
          <BrainCircuit size={20} strokeWidth={2.5} />
        </Link>
        <Link to="/profile" className={`p-3.5 rounded-[24px] transition-all duration-300 ${location.pathname === '/profile' ? 'bg-white/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] scale-110' : 'text-white/40 hover:text-white/80'}`}>
          <User size={20} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
};


const Layout = () => {
  return (
    <div className="min-h-[100dvh] bg-cream w-full max-w-md mx-auto relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col border-x border-white/5 overflow-hidden">
      <TopNav />
      <div className="flex-1 pb-28 relative overflow-y-auto">
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

      const unsubscribe = subscribeToWS((data) => {
        if (data.type === 'break_sync' && data.partnerId === user.id) {
          setPartner(null);
          alert(`💔 ${data.fromName || 'Your partner'} has disconnected the sync frequency.`);
        }
      });
      return () => unsubscribe();
    }
  }, [user?.id, setProfile, setPartner]);

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
