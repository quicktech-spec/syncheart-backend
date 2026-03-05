import { motion } from 'framer-motion';
import {
    Flower2,
    Wind,
    Moon,
    Heart,
    ChevronLeft,
    Play,
    Zap,
    BrainCircuit,
    Sparkles,
    Activity,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CLASSES = [
    {
        id: 1,
        title: "Golden Hour Flow",
        subtitle: "Yoga with Adriene",
        duration: "22 min",
        level: "Beginner",
        category: "Yoga",
        color: "text-amber-500",
        bg: "bg-amber-50",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Deep Presence",
        subtitle: "Headspace Sessions",
        duration: "10 min",
        level: "All Levels",
        category: "Meditation",
        color: "text-purple-600",
        bg: "bg-purple-50",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Intimacy Breathing",
        subtitle: "Couple Connection",
        duration: "15 min",
        level: "Advanced",
        category: "Breathwork",
        color: "text-rose-500",
        bg: "bg-rose-50",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
    }
];

export default function Wellness() {
    return (
        <div className="min-h-screen bg-cream text-romantic pb-32 relative overflow-hidden">

            {/* Cinematic Header */}
            <div className="relative h-[45vh] overflow-hidden rounded-b-[70px] shadow-2xl">
                <img
                    src="https://images.unsplash.com/photo-1524673317465-9ec49b068da2?auto=format&fit=crop&w=1200"
                    className="w-full h-full object-cover grayscale-[20%] brightness-90 animate-float"
                    alt="Wellness"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-romantic/80 via-transparent to-transparent"></div>

                <div className="absolute top-12 left-8 right-8 flex justify-between items-center z-20">
                    <Link to="/" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-300">
                        <BrainCircuit size={24} />
                    </div>
                </div>

                <div className="absolute bottom-12 left-10 z-20">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-glow"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Atmosphere Calibrated</span>
                    </div>
                    <h1 className="section-header text-white text-5xl mb-2">Mind & Rhythm.</h1>
                    <p className="text-white/60 font-medium tracking-wide text-lg max-w-[280px] italic">Synchronizing your internal frequencies.</p>
                </div>
            </div>

            <div className="px-6 -mt-12 relative z-30 space-y-10">
                {/* Daily Energy Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="premium-card p-8 bg-white"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1">Global Health Sync</h3>
                            <p className="text-3xl font-black text-romantic tracking-tighter italic leading-none">Vitality Flow</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-500 shadow-inner">
                            <Activity size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <p className="text-5xl font-black text-romantic tracking-tighter mb-1">84<span className="text-sm font-black text-romantic/30 ml-1">%</span></p>
                            <p className="text-[10px] font-black text-romantic/20 uppercase tracking-widest">Shared Energy</p>
                        </div>
                        <div>
                            <p className="text-5xl font-black text-romantic tracking-tighter mb-1">12<span className="text-sm font-black text-romantic/30 ml-1">min</span></p>
                            <p className="text-[10px] font-black text-romantic/20 uppercase tracking-widest">Zen Streak</p>
                        </div>
                    </div>

                    <button className="w-full bg-emerald-500 text-white py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                        Calibrate Bio-Sync
                    </button>
                </motion.div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <h2 className="section-header text-romantic text-2xl">Daily Rituals</h2>
                    <Sparkles size={22} className="text-accent animate-heartbeat" />
                </div>

                {/* Rituals Grid */}
                <div className="space-y-6">
                    {CLASSES.map((ritual, index) => (
                        <motion.div
                            key={ritual.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="premium-card overflow-hidden group cursor-pointer"
                        >
                            <div className="flex p-5 gap-6">
                                <div className="w-32 h-32 rounded-[25px] overflow-hidden relative shadow-lg flex-shrink-0">
                                    <img src={ritual.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ritual.title} />
                                    <div className="absolute inset-0 bg-romantic/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play size={28} fill="white" className="text-white" />
                                    </div>
                                </div>

                                <div className="flex-1 py-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${ritual.bg} ${ritual.color}`}>
                                            {ritual.category}
                                        </span>
                                        <Users size={16} className="text-romantic/10" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight mb-1 text-romantic">{ritual.title}</h3>
                                    <p className="text-romantic/30 text-[10px] font-bold uppercase tracking-widest mb-4">{ritual.subtitle}</p>

                                    <div className="flex items-center gap-4 text-romantic/20 text-[10px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 font-black"><Wind size={12} /> {ritual.duration}</span>
                                        <span className="flex items-center gap-1.5 font-black"><Zap size={12} /> {ritual.level}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Night Routines */}
                <div className="mt-16 bg-romantic rounded-[60px] p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 blur-3xl bg-white/20 translate-y-1/2"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-inner">
                            <Moon size={40} className="text-white animate-pulse" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-white mb-4">Dream State.</h2>
                        <p className="text-white/50 font-medium text-lg leading-relaxed mb-10 italic">"Sleep is the silent bridge between two souls."</p>
                        <button className="w-full bg-white text-romantic py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] active:scale-95 transition-all">
                            Enter Dream Sync
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
