import { useState, useEffect } from 'react';
import { useSyncStore } from '../store';
import { Heart, MessageCircle, Sparkles, Calendar, Share2, ArrowRight, Activity, Flame, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

export default function Dashboard() {
    const user = useSyncStore(s => s.user);
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const partnerName = partner ? (partner as any).display_name || partner.email.split('@')[0] : 'your partner';
    const [gamificationLevel, setGamificationLevel] = useState('New Bloom');
    const [isPartnerLive, setIsPartnerLive] = useState(true); // placeholder for WebSocket logic

    const handleSendNudge = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF3366', '#FFB000', '#63001A']
        });
        alert(`💖 Nudge sent to ${partnerName}!`);
    };

    return (
        <div className="min-h-screen bg-cream pb-32">
            {/* Romantic Hero Header */}
            <div className="bg-mesh-romantic px-8 pt-16 pb-24 rounded-b-[70px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 animate-heartbeat">
                    <Heart size={200} fill="white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        {isPartnerLive ? (
                            <span className="bg-white/90 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-primary shadow-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {partnerName} is Local
                            </span>
                        ) : (
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20">
                                Neural Sync Active
                            </span>
                        )}
                    </div>
                    <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-4 italic">
                        Hello, {profile?.display_name?.split(' ')[0] || 'Lover'}
                    </h1>
                    <p className="text-white/60 text-xl font-medium max-w-[280px] leading-tight">
                        Your connection frequency is <span className="text-white font-black underline decoration-accent underline-offset-4">Radiant</span> today.
                    </p>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="px-6 -mt-10 space-y-8">

                {/* 1. Main Sync Card - Elevated */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="premium-card p-8 relative overflow-hidden group border-2 border-primary/5"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary animate-heartbeat">
                            <Heart size={36} fill="currentColor" />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-romantic/30">Couples Sync</p>
                            <h2 className="text-5xl font-black text-romantic tracking-tighter">98%</h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="h-4 bg-rose-50 rounded-full overflow-hidden border border-rose-100">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-romantic"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-romantic/40">
                            <span>Deep Attunement</span>
                            <span className="text-primary">Level: {gamificationLevel}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSendNudge}
                        className="w-full mt-10 bg-primary text-white py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:bg-romantic transition-all"
                    >
                        Send Heart Pulse
                    </button>
                </motion.div>

                {/* 2. Mini Grid Features */}
                <div className="grid grid-cols-2 gap-6">
                    <Link to="/chat" className="premium-card p-6 flex flex-col items-center text-center group">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
                            <MessageCircle size={24} />
                        </div>
                        <h4 className="font-black text-romantic tracking-tight">Whispers</h4>
                        <p className="text-[10px] uppercase font-bold text-romantic/30 mt-1 tracking-widest">Secret Chat</p>
                    </Link>

                    <Link to="/activities" className="premium-card p-6 flex flex-col items-center text-center group">
                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
                            <Sparkles size={24} />
                        </div>
                        <h4 className="font-black text-romantic tracking-tight">Rituals</h4>
                        <p className="text-[10px] uppercase font-bold text-romantic/30 mt-1 tracking-widest">Play Area</p>
                    </Link>
                </div>

                {/* 3. Daily Intention Card */}
                <div className="premium-card p-8 bg-romantic text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calendar size={100} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2 tracking-tight">Evening Ritual</h3>
                        <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed italic">
                            "The deepest connection happens in the smallest moments of presence."
                        </p>
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                            <Calendar size={18} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest">Plan Date Night</span>
                            <ArrowRight size={16} className="ml-auto" />
                        </div>
                    </div>
                </div>

                {/* 4. Feature Showcase (Inspired by Reference) */}
                <div className="py-10 text-center">
                    <h2 className="section-header text-romantic mb-4">Deep Hearts.</h2>
                    <p className="text-romantic/30 font-medium mb-10 max-w-[280px] mx-auto italic">Everything you need to nurture a conscious and lasting bond.</p>

                    <div className="space-y-6">
                        {[
                            { icon: Activity, title: "Bio-Sync", desc: "Shared wellness frequency tracking.", col: "bg-emerald-50 text-emerald-500" },
                            { icon: Flame, title: "Intensity", desc: "Passionate connection rituals.", col: "bg-rose-50 text-rose-500" },
                            { icon: HeartHandshake, title: "Support", desc: "AI-driven emotional intelligence.", col: "bg-blue-50 text-blue-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 text-left premium-card p-6">
                                <div className={`w-14 h-14 rounded-2xl ${item.col} flex items-center justify-center shadow-inner`}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-romantic tracking-tight">{item.title}</h4>
                                    <p className="text-[10px] font-bold text-romantic/30 uppercase tracking-widest mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
