import { useState } from 'react';
import { useSyncStore } from '../store';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Lock, Sparkles, LogIn, UserPlus, ChevronRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

export default function Login() {
    const setUser = useSyncStore(s => s.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/register';
            const res = await axios.post(`${BASE_URL}${endpoint}`, { email, password });
            setUser({ id: res.data.access_token, email });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed. Please verify your frequency.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#09090B] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Luxury Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -mr-40 -mt-40 mix-blend-screen opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] -ml-20 -mb-20 mix-blend-screen opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mesh-romantic opacity-20 pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-[32px] flex items-center justify-center mb-6 shadow-2xl border border-white/10 relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Heart size={48} className="text-primary animate-heartbeat relative z-10" fill="currentColor" />
                    </div>
                    <h1 className="text-5xl font-serif italic text-white tracking-[0.2em] mb-2 uppercase">Synch</h1>
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-white/10" />
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Deep Resonance</span>
                        <div className="h-[1px] w-8 bg-white/10" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="premium-card p-10 bg-black/40 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                >
                    <div className="flex gap-4 mb-10 p-1.5 bg-white/5 rounded-[24px] border border-white/5">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${isLogin ? 'text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}
                        >
                            {isLogin && <motion.div layoutId="auth-tab" className="absolute inset-0 bg-white/10" />}
                            <span className="relative z-10">Sign In</span>
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${!isLogin ? 'text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}
                        >
                            {!isLogin && <motion.div layoutId="auth-tab" className="absolute inset-0 bg-white/10" />}
                            <span className="relative z-10">Join</span>
                        </button>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-[11px] font-bold text-red-400 text-center flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={14} className="text-red-400" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Emotional Identity (Email)"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border-2 border-white/5 focus:border-primary/20 rounded-[24px] py-5 px-16 text-sm font-bold text-white outline-none transition-all placeholder:text-white/10 shadow-inner"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Neural Key (Password)"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border-2 border-white/5 focus:border-primary/20 rounded-[24px] py-5 px-16 text-sm font-bold text-white outline-none transition-all placeholder:text-white/10 shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="relative py-6 flex items-center justify-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.5em]">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                                        {isLogin ? "Authenticate" : "Form Connection"}
                                        <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>
                </motion.div>

                <div className="mt-12 flex flex-col items-center gap-2">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] italic">
                        {isLogin ? "Neural Link Protected" : "Encrypted Connection Ritual"}
                    </p>
                    <div className="flex gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-accent animate-pulse delay-75" />
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-150" />
                    </div>
                </div>
            </div>
        </div>
    );
}
