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
    const gamificationLevel = 'New Bloom';

    const [distance, setDistance] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const handleSendNudge = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF2A5F', '#E5A93C', '#FF7096']
        });
        alert(`💖 Nudge sent${partnerName ? ` to ${partnerName}` : ''}!`);
    };

    const fetchLiveLocation = () => {
        if (!partnerName) {
            alert("Sync with a partner first to see live distance!");
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
                    alert("Location access denied. Please enable location services.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setIsLocating(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark pb-32">
            {/* Romantic Hero Header */}
            <div className="bg-mesh-romantic px-8 pt-16 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 p-10 opacity-5 animate-heartbeat">
                    <Heart size={200} fill="white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-2 mb-6">
                        {partnerName ? (
                            <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                                {partnerName} is Local
                            </span>
                        ) : (
                            <span className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border border-white/5">
                                Single Frequency
                            </span>
                        )}
                    </div>
                    <h1 className="text-5xl font-serif text-white tracking-wide leading-none mb-3 italic">
                        Hello, {profile?.display_name?.split(' ')[0] || 'Lover'}
                    </h1>
                    <p className="text-white/50 text-sm font-medium leading-relaxed max-w-[280px]">
                        Your connection frequency is <span className="text-primary font-bold">Radiant</span> today.
                    </p>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="px-6 -mt-10 space-y-6 relative z-20">

                {/* 1. Main Sync Card - Elevated */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="premium-card p-8 relative overflow-hidden group bg-black/40"
                >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-[40px] mix-blend-screen" />

                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                            <Heart size={28} className="animate-heartbeat" fill="currentColor" />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Couples Sync</p>
                            <h2 className="text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,42,95,0.4)]">98<span className="text-2xl text-white/50">%</span></h2>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-accent relative"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shine_2s_infinite]" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                            <span>Deep Attunement</span>
                            <span className="text-accent">{gamificationLevel}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSendNudge}
                        className="w-full mt-8 bg-primary/10 border border-primary/20 text-white py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.4em] shadow-lg hover:bg-primary/20 hover:border-primary/40 transition-all relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10">Send Heart Pulse</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                </motion.div>

                {/* 2. 2x2 Feature Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Item 1: Whispers */}
                    <Link to="/chat" className="premium-card p-6 flex flex-col items-center text-center group bg-black/20">
                        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <MessageCircle size={22} />
                        </div>
                        <h4 className="font-bold text-white tracking-wide text-sm">Whispers</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">Secret Chat</p>
                    </Link>

                    {/* Item 2: Rituals */}
                    <Link to="/activities" className="premium-card p-6 flex flex-col items-center text-center group bg-black/20">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <Sparkles size={22} />
                        </div>
                        <h4 className="font-bold text-white tracking-wide text-sm">Rituals</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">Play Area</p>
                    </Link>

                    {/* Item 3: Live Distance */}
                    <button
                        onClick={distance ? () => window.open('https://www.google.com/maps/dir/?api=1', '_blank') : fetchLiveLocation}
                        disabled={isLocating}
                        className="premium-card p-6 flex flex-col items-center text-center group bg-black/20 transition-all active:scale-95"
                    >
                        <div className={`w-12 h-12 ${distance ? 'bg-primary/20 text-primary' : 'bg-sky-500/10 text-sky-400'} rounded-2xl border ${distance ? 'border-primary/20' : 'border-sky-500/10'} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                            {distance ? <Navigation size={22} className="animate-pulse" /> : <MapPin size={22} />}
                        </div>
                        <h4 className="font-bold text-white tracking-wide text-sm">Distance</h4>
                        <p className="text-[9px] uppercase font-black text-rose-400/80 mt-1 tracking-[0.2em]">
                            {isLocating ? 'Locating...' : distance ? `${distance} miles` : 'Find Partner'}
                        </p>
                    </button>

                    {/* Item 4: Calendar */}
                    <Link to="/memories" className="premium-card p-6 flex flex-col items-center text-center group bg-black/20">
                        <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <Calendar size={22} />
                        </div>
                        <h4 className="font-bold text-white tracking-wide text-sm">Calendar</h4>
                        <p className="text-[9px] uppercase font-black text-white/30 mt-1 tracking-[0.2em]">{partnerName ? 'Next: 12 Days' : 'Sync First'}</p>
                    </Link>
                </div>

                {/* 3. Daily Intention Card */}
                <div className="premium-card p-8 bg-gradient-to-br from-[#1A1A1F] to-[#09090B] border border-white/5 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Calendar size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-serif text-white mb-2 tracking-wide italic">Next Milestone</h3>
                        <p className="text-white/40 text-[13px] font-medium mb-8 leading-relaxed max-w-[260px]">
                            {partnerName ? `${partnerName}'s Birthday is coming up.` : "Capture your first memory together to start the timeline."}
                        </p>
                        <Link to="/memories" className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                <Calendar size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Open Memories</span>
                            <ArrowRight size={16} className="ml-auto text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </div>

                {/* 4. Feature Showcase */}
                <div className="pt-8 pb-4 border-t border-white/5 mt-8">
                    <h2 className="font-serif italic text-2xl text-white mb-2">Deep Hearts.</h2>
                    <p className="text-white/40 text-xs font-medium mb-8 max-w-[280px]">Everything you need to nurture a conscious and lasting bond.</p>

                    <div className="space-y-3">
                        {[
                            { icon: Activity, title: "Bio-Sync", desc: "Shared wellness frequency", col: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" },
                            { icon: Flame, title: "Intensity", desc: "Passionate rituals", col: "bg-rose-500/10 text-rose-400 border-rose-500/10" },
                            { icon: HeartHandshake, title: "Support", desc: "Emotional intelligence", col: "bg-blue-500/10 text-blue-400 border-blue-500/10" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-5 text-left bg-black/20 border border-white/5 rounded-3xl p-4 hover:bg-black/30 transition-colors">
                                <div className={`w-12 h-12 rounded-2xl ${item.col} border flex items-center justify-center`}>
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm tracking-wide">{item.title}</h4>
                                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
