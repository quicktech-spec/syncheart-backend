import React, { useState } from 'react';
import { Heart, Activity, Flame, ChevronRight, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Dashboard() {
    const [isNudgeModalOpen, setNudgeModalOpen] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendNudge = (emoji: string) => {
        // Trigger confetti from bottom
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 1 },
            colors: ['#FF3366', '#FFB000', '#00D68F']
        });
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setNudgeModalOpen(false);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-8 text-white relative h-full flex flex-col"
        >
            <h1 className="text-3xl font-black tracking-tighter mb-8 drop-shadow-md">Good morning, Shubham.</h1>

            {/* Sync Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-[#FF3366] to-[#ff6b9a] rounded-3xl p-8 mb-6 relative overflow-hidden shadow-[0_20px_40px_rgba(255,51,102,0.4)] transition-shadow duration-300 group"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute top-0 right-0 p-8 opacity-20"
                >
                    <Heart size={140} />
                </motion.div>
                <div className="absolute bottom-[-50px] left-[-20px] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex flex-col items-start gap-2">
                    <p className="font-bold text-white/80 uppercase tracking-[0.2em] text-[10px] drop-shadow-sm">Couples Sync</p>
                    <p className="text-7xl font-black drop-shadow-lg tracking-tighter">94<span className="text-3xl">%</span></p>
                    <p className="text-xs font-bold bg-black/20 px-4 py-2 text-white rounded-full mt-2 shadow-inner backdrop-blur-md border border-white/10">You are deeply connected today.</p>
                </div>
            </motion.div>

            {/* Daily Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Link to="/mood" className="bg-[#2C2C3E]/80 backdrop-blur-lg border border-white/5 hover:bg-[#3d3d52]/90 hover:border-white/20 transition-all duration-300 p-6 rounded-3xl flex flex-col gap-4 items-center group shadow-xl hover:-translate-y-1 hover:shadow-2xl active:scale-95">
                    <div className="bg-gradient-to-br from-[#00D68F]/20 to-[#00b377]/10 p-5 rounded-2xl text-[#00D68F] shadow-[inset_0_0_15px_rgba(0,214,143,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(0,214,143,0.8)] transition-all">
                        <Activity size={32} />
                    </div>
                    <span className="font-black text-gray-100 tracking-wide">Daily Check-in</span>
                </Link>
                <Link to="/love-language" className="bg-[#2C2C3E]/80 backdrop-blur-lg border border-white/5 hover:bg-[#3d3d52]/90 hover:border-white/20 transition-all duration-300 p-6 rounded-3xl flex flex-col gap-4 items-center group shadow-xl hover:-translate-y-1 hover:shadow-2xl active:scale-95">
                    <div className="bg-gradient-to-br from-[#8A2BE2]/20 to-[#6610f2]/10 p-5 rounded-2xl text-[#8A2BE2] shadow-[inset_0_0_15px_rgba(138,43,226,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(138,43,226,0.8)] transition-all">
                        <Flame size={32} />
                    </div>
                    <span className="font-black text-gray-100 tracking-wide">Start DNA Quiz</span>
                </Link>
            </div>

            {/* Tasks Queue */}
            <h2 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-2 flex items-center gap-2">Up Next <span className="text-[#FF3366] drop-shadow-[0_0_5px_rgba(255,51,102,0.8)]">✦</span></h2>
            <div className="space-y-4">
                <Link to="/journal" className="block bg-[#2C2C3E]/80 backdrop-blur-md border border-white/5 p-5 rounded-3xl flex justify-between items-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group">
                    <div>
                        <p className="font-bold text-white tracking-wide">Review 'Conflict Log' notes.</p>
                        <p className="text-xs text-[#FFB000] font-bold mt-1 tracking-wider uppercase">— 10 mins ago</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3366] transition-colors duration-300 shadow-inner">
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                </Link>
                <div onClick={() => setNudgeModalOpen(true)} className="bg-[#2C2C3E]/80 backdrop-blur-md border border-white/5 p-5 rounded-3xl flex justify-between items-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group">
                    <div>
                        <p className="font-bold text-white tracking-wide">Send a 'Thinking of you' nudge.</p>
                        <p className="text-xs text-[#FFB000] font-bold mt-1 tracking-wider uppercase">— Suggested</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3366] transition-colors duration-300 shadow-inner">
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>

            {/* Interactive Nudge Modal */}
            <AnimatePresence>
                {isNudgeModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gradient-to-br from-[#2C2C3E] to-[#1E1E2C] w-full max-w-sm rounded-[32px] p-8 relative border border-white/10 shadow-[0_20px_60px_rgba(255,51,102,0.3)] text-center"
                        >
                            <button onClick={() => setNudgeModalOpen(false)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10">
                                <X size={20} className="text-white/50" />
                            </button>

                            {!sent ? (
                                <>
                                    <h3 className="text-2xl font-black mb-2 text-white drop-shadow-md">Send a Nudge</h3>
                                    <p className="text-sm text-gray-400 mb-8 font-medium">Let your partner know you're thinking of them right now.</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {['❤️ Love you!', '🔥 So hot', '🫂 Need a hug', '☕ Coffee later?'].map((txt, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleSendNudge(txt)}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-4 shadow-inner text-2xl"
                                            >
                                                {txt.split(' ')[0]}
                                                <div className="text-xs font-bold text-gray-300 mt-2 tracking-wide uppercase">{txt.split(' ').slice(1).join(' ')}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input type="text" placeholder="Write a custom note..." className="w-full bg-black/30 border border-white/10 rounded-full py-4 px-6 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3366] shadow-inner" />
                                        <button onClick={() => handleSendNudge('custom')} className="absolute right-2 top-2 bottom-2 bg-[#FF3366] rounded-full p-2 w-10 h-10 flex items-center justify-center hover:scale-105 active:scale-95 shadow-md">
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="py-12"
                                >
                                    <Heart size={64} className="text-[#00D68F] mx-auto mb-4 animate-pulse drop-shadow-[0_0_20px_rgba(0,214,143,0.8)]" />
                                    <h3 className="text-2xl font-black mb-2 text-white">Nudge Delivered!</h3>
                                    <p className="text-sm text-gray-400 font-medium">Their phone just lit up.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
