import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, Lightbulb, Flame } from 'lucide-react';
import { useSyncStore } from './store';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import { Memories, LoveLanguage, Mood, Journal, Goals, AccountSettings, PrivacySettings, NotificationSettings, RelationshipSettings } from './pages/Placeholders';

const AppLogo = () => (
  <div className="relative flex items-center justify-center w-8 h-8 mr-2">
    {/* SynchHeart Logo Representation */}
    <div className="absolute w-5 h-5 rounded-full bg-[#FF3366] left-0 top-1 mix-blend-screen opacity-90 shadow-[0_0_10px_rgba(255,51,102,0.6)] animate-pulse"></div>
    <div className="absolute w-5 h-5 rounded-full bg-[#FFB000] right-0 bottom-1 mix-blend-screen opacity-90 shadow-[0_0_10px_rgba(255,176,0,0.6)]"></div>
  </div>
);

const TopNav = () => {
  return (
    <div className="sticky top-0 z-50 px-6 py-5 flex items-center justify-between bg-[#1E1E2C]/80 backdrop-blur-xl border-b border-[#2C2C3E] shadow-lg">
      <Link to="/" className="flex items-center hover:scale-105 transition-transform">
        <AppLogo />
        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-widest text-xl drop-shadow-md">SynchHeart</span>
      </Link>
      <Link to="/profile">
        <div className="w-12 h-12 rounded-full border-[3px] border-[#FF3366] overflow-hidden shadow-[0_0_15px_rgba(255,51,102,0.4)] transition-transform hover:scale-110 active:scale-95 group relative relative cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover group-hover:brightness-110" />
        </div>
      </Link>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E2C]/90 backdrop-blur-3xl border-t border-[#2C2C3E] p-4 pb-6 flex justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.6)] z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === '/' ? 'text-[#FF3366] scale-110 drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]' : 'text-gray-500 hover:text-gray-300 hover:scale-105'}`}>
        <Home size={26} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
      </Link>
      <Link to="/connect" className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === '/connect' ? 'text-[#00D68F] scale-110 drop-shadow-[0_0_8px_rgba(0,214,143,0.8)]' : 'text-gray-500 hover:text-gray-300 hover:scale-105'}`}>
        <Heart size={26} strokeWidth={location.pathname === '/connect' ? 2.5 : 2} />
      </Link>
      <Link to="/insights" className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === '/insights' ? 'text-[#FFB000] scale-110 drop-shadow-[0_0_8px_rgba(255,176,0,0.8)]' : 'text-gray-500 hover:text-gray-300 hover:scale-105'}`}>
        <Lightbulb size={26} strokeWidth={location.pathname === '/insights' ? 2.5 : 2} />
      </Link>
      <Link to="/sensual" className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === '/sensual' ? 'text-[#8A2BE2] scale-110 drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]' : 'text-gray-500 hover:text-gray-300 hover:scale-105'}`}>
        <Flame size={26} strokeWidth={location.pathname === '/sensual' ? 2.5 : 2} />
      </Link>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="h-screen bg-[#1E1E2C] overflow-hidden w-full max-w-md mx-auto relative shadow-2xl sm:border sm:border-[#2C2C3E] flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-y-auto pb-24 relative" style={{ scrollbarWidth: 'none' }}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

function App() {
  const user = useSyncStore(s => s.user);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('syncheart_onboarding')) {
      setShowOnboarding(true);
    }
  }, []);

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
              <Route path="/insights" element={<Insights />} />
              <Route path="/profile" element={<Profile />} />

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
