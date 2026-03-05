import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Plus,
    Calendar,
    Heart,
    MapPin,
    Trash2,
    X,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Memory {
    id: number;
    title: string;
    date: string;
    description: string;
    location: string;
    imageUrl: string;
    category: string;
}

const MEMORIES_DATA: Memory[] = [
    {
        id: 1,
        title: "Golden Hour Reflection",
        date: "Oct 12, 2023",
        description: "The sand was so warm and the colors of the sky were unreal. We stayed until the last sliver of light disappeared.",
        location: "Malibu Pier, CA",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        category: "Travel"
    },
    {
        id: 2,
        title: "Eternal Anniversary",
        date: "Nov 04, 2023",
        description: "Celebrating two years of absolute magic at our spot. The candlelight made everything feel like a dream.",
        location: "La Bella Vita",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        category: "Date Night"
    },
    {
        id: 3,
        title: "Canyon Whispers",
        date: "Jan 15, 2024",
        description: "Waking up early was worth it for this view. Your smile was brighter than the sun peaking over the ridge.",
        location: "Runyon Canyon",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        category: "Adventure"
    },
    {
        id: 4,
        title: "Sacred Rainy Sunday",
        date: "Feb 12, 2024",
        description: "Hot chocolate, thick blankets, and the soft pitter-patter on the roof. Pure, unadulterated bliss.",
        location: "Home Sanctuary",
        imageUrl: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&w=800&q=80",
        category: "Home"
    }
];

export default function Memories() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

    const categories = ["All", "Travel", "Date Night", "Adventure", "Home"];

    const filteredMemories = selectedCategory === "All"
        ? MEMORIES_DATA
        : MEMORIES_DATA.filter(m => m.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#0F0F1A] text-white pb-32 font-sans relative">
            {/* Background Mesh Glows */}
            <div className="glow-circle w-[300px] h-[300px] bg-purple-600/10 -top-20 -right-20" />
            <div className="glow-circle w-[250px] h-[250px] bg-pink-500/10 bottom-20 -left-20" />

            {/* Premium Header */}
            <div className="bg-mesh-purple rounded-b-[60px] px-8 pt-16 pb-20 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-12 relative z-10">
                    <Link to="/" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-colors">
                        <Plus size={24} />
                    </button>
                </div>

                <h1 className="text-5xl font-black tracking-tighter mb-4 text-gradient relative z-10">The Timeline.</h1>
                <p className="text-white/40 font-medium tracking-wide text-lg max-w-[260px] relative z-10">Every frame a story, every story a heartbeat.</p>
            </div>

            {/* Category Filter - Glass Pills */}
            <div className="px-6 -mt-10 relative z-20 overflow-x-auto">
                <div className="flex space-x-3 pb-4" style={{ scrollbarWidth: 'none' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl ${selectedCategory === cat
                                ? "bg-white text-[#0F0F1A] scale-105 shadow-white/10"
                                : "glass text-white/40 border border-white/10 hover:bg-white/[0.05]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Premium Memory List */}
            <div className="px-6 mt-12 space-y-10">
                {filteredMemories.map((memory, index) => (
                    <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                        onClick={() => setSelectedMemory(memory)}
                        className="glass rounded-[50px] overflow-hidden border border-white/5 group cursor-pointer shadow-2xl hover:border-white/20 transition-all duration-500"
                    >
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={memory.imageUrl}
                                alt={memory.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent opacity-60"></div>

                            <div className="absolute top-6 right-6 px-5 py-2.5 bg-black/40 backdrop-blur-xl rounded-[20px] text-white/90 text-[10px] font-black uppercase tracking-widest border border-white/5">
                                {memory.date}
                            </div>

                            <div className="absolute bottom-6 left-8 flex items-center gap-3">
                                <span className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                                    {memory.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-10 pt-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-3xl font-black tracking-tighter text-white group-hover:text-pink-500 transition-colors">
                                    {memory.title}
                                </h3>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/20 hover:text-pink-500 transition-colors">
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-white/40 text-lg font-medium leading-relaxed mb-8 line-clamp-2">
                                {memory.description}
                            </p>

                            <div className="flex items-center text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                                <MapPin size={14} className="mr-2 text-pink-500" />
                                {memory.location}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredMemories.length === 0 && (
                <div className="px-6 py-20 text-center">
                    <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-6 text-white/10 shadow-inner">
                        <Sparkles size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">No captures found</h3>
                    <p className="text-white/30 text-lg">Change filters or add a new core memory.</p>
                </div>
            )}

            {/* Absolute Premium Detail View */}
            <AnimatePresence>
                {selectedMemory && (selectedMemory as any) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-[#0F0F1A] w-full max-w-2xl rounded-[60px] overflow-hidden shadow-2xl relative border border-white/5"
                        >
                            <button
                                onClick={() => setSelectedMemory(null)}
                                className="absolute top-8 right-8 z-50 w-14 h-14 glass-light hover:bg-white rounded-full flex items-center justify-center text-[#0F0F1A] transition-all"
                            >
                                <X size={26} />
                            </button>

                            <div className="h-[45vh] relative">
                                <img
                                    src={selectedMemory.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt={selectedMemory.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={16} className="text-pink-500" />
                                        <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Core Memory Refined</span>
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tighter text-white">{selectedMemory.title}</h2>
                                </div>
                            </div>

                            <div className="p-12">
                                <div className="flex items-center gap-6 mb-10 overflow-x-auto no-scrollbar">
                                    <div className="flex items-center gap-3 whitespace-nowrap">
                                        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-pink-500">
                                            <Calendar size={20} />
                                        </div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-white/30">Capture<br /><span className="text-white/80">{selectedMemory.date}</span></p>
                                    </div>
                                    <div className="flex items-center gap-3 whitespace-nowrap">
                                        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-emerald-400">
                                            <MapPin size={20} />
                                        </div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-white/30">Location<br /><span className="text-white/80">{selectedMemory.location}</span></p>
                                    </div>
                                </div>

                                <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
                                    {selectedMemory.description}
                                </p>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-white text-[#0F0F1A] py-6 rounded-[30px] font-black shadow-2xl active:scale-95 transition-transform uppercase tracking-widest text-xs">
                                        Relive Frequency
                                    </button>
                                    <button className="w-20 h-20 glass text-red-500 rounded-[30px] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl">
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
