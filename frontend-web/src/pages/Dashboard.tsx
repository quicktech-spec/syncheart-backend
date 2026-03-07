import { useState } from 'react';
import { useSyncStore } from '../store';
import { Heart, MessageCircle, Sparkles, Calendar, ArrowRight, Activity, Flame, HeartHandshake, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Dashboard() {
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const partnerName = partner ? (partner as any).display_name || partner.email.split('@')[0] : null;
    const gamificationLevel = 'Radiant Peak';

    const [distance, setDistance] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const handleSendNudge = () => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#FF2A5F', '#E5A93C', '#FF7096']
        });
        alert(`💖 Frequency Pulse sent${partnerName ? ` to ${partnerName}` : ''}!`);
    };

    const fetchLiveLocation = () => {
        if (!partnerName) {
            alert("Sync with a partner first to see live resonance!");
            return;
        }
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setTimeout(() => {
                        const mockMiles = (Math.random() * 5 + 0.1).toFixed(1);
                        setDistance(mockMiles);
                        setIsLocating(false);
                    }, 1500);
                },
                () => {
                    alert("Location access denied. Please enable resonance sensors.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Resonance tracking not supported by your device.");
            setIsLocating(false);
        }
    };

    return (
        <div className="min-h-screen pb-32" style={{ backgroundColor: '#09090B' }}>
            {/* Pro-Level Header */}
            <div className="bg-mesh-romantic px-8 pt-20 pb-20 rounded-b-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 animate-heartbeat">
                    <Heart size={240} fill="white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 mb-6">
                        {partnerName ? (
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{partnerName} Synchronized</span>
                            </div>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Single Resonance</span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-6xl font-serif text-white tracking-tight leading-none mb-4 italic">
                        Hello, {profile?.display_name?.split(' ')[0] || 'Member'}
                    </h1>
                    <p className="text-white/60 text-lg font-medium tracking-wide">
                        Bonds are <span className="text-primary font-black uppercase">Deep</span> today.
                    </p>
                </motion.div>
            </div>

            {/* Connection Status Grid */}
            <div className="px-6 -mt-10 space-y-6 relative z-20">

                {/* Main Sync Card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="luxury-box p-8 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(30,30,35,0.8) 0%, rgba(15,15,20,0.9) 100%)' }}
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-3xl flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                            <Heart size={32} className="animate-heartbeat" fill="currentColor" />
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Sync Energy</p>
                            <h2 className="text-6xl font-black text-white tracking-tighter">98<span className="text-3xl text-primary">%</span></h2>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className="h-full bg-gradient-to-r from-primary via-primary to-accent relative"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">
                            <span>Harmonic Alignment</span>
                            <span className="text-white/40">{gamificationLevel}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSendNudge}
                        className="w-full mt-10 bg-primary text-white py-6 rounded-[28px] font-black text-[12px] uppercase tracking-[0.5em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Send Heart Pulse
                    </button>
                </motion.div>

                {/* 2x2 Feature Hub */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Item 1: Whispers */}
                    <Link to="/chat" className="luxury-box p-7 flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-3xl border border-indigo-500/20 flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                            <MessageCircle size={24} />
                        </div>
                        <h4 className="font-black text-white tracking-wider text-sm uppercase">Whispers</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">Private Sanctum</p>
                    </Link>

                    {/* Item 2: Rituals */}
                    <Link to="/activities" className="luxury-box p-7 flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-3xl border border-amber-500/20 flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white">
                            <Sparkles size={24} />
                        </div>
                        <h4 className="font-black text-white tracking-wider text-sm uppercase">Rituals</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">Play Rituals</p>
                    </Link>

                    {/* Item 3: Live Resonance (Distance) */}
                    <button
                        onClick={distance ? () => window.open('https://www.google.com/maps/dir/?api=1', '_blank') : fetchLiveLocation}
                        disabled={isLocating}
                        className="luxury-box p-7 flex flex-col items-center text-center group"
                    >
                        <div className={`w-14 h-14 ${distance ? 'bg-primary text-white' : 'bg-sky-500/10 text-sky-400'} rounded-3xl border ${distance ? 'border-primary' : 'border-sky-500/20'} flex items-center justify-center mb-5 transition-all group-hover:scale-110`}>
                            {distance ? <Navigation size={24} className="animate-pulse" /> : <MapPin size={24} />}
                        </div>
                        <h4 className="font-black text-white tracking-wider text-sm uppercase">Resonance</h4>
                        <p className="text-[9px] uppercase font-black text-primary mt-1 tracking-[0.2em]">
                            {isLocating ? 'Locating...' : distance ? `${distance} miles` : 'Trace Partner'}
                        </p>
                    </button>

                    {/* Item 4: Shared Timeline (Calendar) */}
                    <Link to="/memories" className="luxury-box p-7 flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-3xl border border-rose-500/20 flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white">
                            <Calendar size={24} />
                        </div>
                        <h4 className="font-black text-white tracking-wider text-sm uppercase">Chronicle</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">{partnerName ? '12 Days Left' : 'Trace First'}</p>
                    </Link>
                </div>

                {/* Feature Showcase */}
                <div className="pt-12 pb-10 border-t border-white/10 mt-10">
                    <h2 className="font-serif italic text-4xl text-white mb-4">Deep Hearts.</h2>
                    <p className="text-white/50 text-base font-medium mb-10 max-w-[280px]">Your shared emotional ecosystem.</p>

                    <div className="space-y-4">
                        {[
                            { icon: Activity, title: "Bio-Sync", desc: "Emotional waves tracking", col: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" },
                            { icon: Flame, title: "Intensity", desc: "Heartbeat synchronize", col: "bg-rose-500/10 text-rose-400 border-rose-500/10" },
                            { icon: HeartHandshake, title: "Support", desc: "Soul resonance", col: "bg-blue-500/10 text-blue-400 border-blue-500/10" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 glass p-6 rounded-[32px] border border-white/5">
                                <div className={`w-14 h-14 rounded-2xl ${item.col} border flex items-center justify-center shadow-inner`}>
                                    <item.icon size={22} />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-base tracking-wide uppercase">{item.title}</h4>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
