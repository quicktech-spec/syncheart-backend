import { motion } from 'framer-motion';
import {
    Flame,
    Heart,
    ChevronLeft,
    Sparkles,
    Zap,
    Lock,
    Eye,
    Moon,
    Waves,
    Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CARDS = [
    {
        title: "Deep Whispers",
        desc: "Voice-driven intimacy exercises.",
        icon: Waves,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        locked: false
    },
    {
        title: "Sensory Journey",
        desc: "Haptic-guided connection rituals.",
        icon: Eye,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        locked: true
    },
    {
        title: "Moonlight Ritual",
        desc: "End-of-day connection routine.",
        icon: Moon,
        color: "text-amber-500",
        bg: "bg-amber-400/10",
        locked: false
    }
];

export default function Sensual() {
    return (
        <div className="min-h-screen bg-[#0F0F1A] text-white pb-32 font-sans relative overflow-hidden">
            {/* Background Mesh Glows - Deep Red/Purple */}
            <div className="glow-circle w-[500px] h-[500px] bg-rose-600/10 -top-40 -right-20" />
            <div className="glow-circle w-[400px] h-[400px] bg-purple-900/10 bottom-20 -left-20" />

            {/* Premium Header */}
            <div className="bg-mesh-pink rounded-b-[70px] px-10 pt-20 pb-24 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-16 relative z-10">
                    <Link to="/" className="w-14 h-14 glass rounded-3xl flex items-center justify-center text-white/50 hover:text-white transition-colors animate-float">
                        <ChevronLeft size={28} />
                    </Link>
                    <div className="w-14 h-14 glass rounded-3xl flex items-center justify-center text-rose-500 shadow-rose-500/20">
                        <Flame size={28} />
                    </div>
                </div>

                <h1 className="text-6xl font-black tracking-tighter mb-4 text-white relative z-10 leading-none">Intensity.</h1>
                <p className="text-white/40 font-medium tracking-wide text-xl max-w-[280px] relative z-10 italic">Nurturing the magnetic pull between two hearts.</p>

                <div className="absolute top-1/2 right-[-20px] opacity-10 blur-xl">
                    <Heart size={200} className="text-white" fill="white" />
                </div>
            </div>

            <div className="px-8 -mt-12 relative z-20 space-y-8">
                {/* Connection Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-[50px] p-10 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden group"
                >
                    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform">
                        <Target size={200} className="text-rose-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Atmosphere Sync</h3>
                                <p className="text-4xl font-black text-gradient leading-tight">Sync Level: Ultra</p>
                            </div>
                            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                                <Sparkles size={24} />
                            </div>
                        </div>

                        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-12 border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '92%' }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500"
                            />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20">
                            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> AES-256 Intimacy Shield</span>
                            <span className="text-white/60">Next Goal: Deep Connection</span>
                        </div>
                    </div>
                </motion.div>

                {/* Ritual Selection */}
                <div className="grid grid-cols-1 gap-6 pb-20">
                    {CARDS.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass rounded-[40px] p-8 border border-white/5 flex items-center justify-between transition-all duration-500 shadow-xl group hover:bg-white/[0.03] ${card.locked ? 'opacity-50 grayscale' : 'cursor-pointer'}`}
                        >
                            <div className="flex items-center gap-6 relative z-10">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:rotate-12 ${card.bg} border border-white/5 shadow-inner ${card.color}`}>
                                    <card.icon size={30} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl tracking-tight text-white">{card.title}</span>
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1 pr-10">{card.desc}</span>
                                </div>
                            </div>

                            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/20 group-hover:border-white/30 group-hover:text-white transition-all">
                                {card.locked ? <Lock size={20} /> : <Zap size={22} className="text-rose-500" />}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Float CTA */}
            <div className="fixed bottom-28 left-0 right-0 px-10 z-[100]">
                <button className="w-full bg-white text-[#0F0F1A] py-7 rounded-[35px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4">
                    Send Magnetic Pulse <Flame size={20} className="text-rose-600 animate-pulse fill-rose-600" />
                </button>
            </div>
        </div>
    );
}
