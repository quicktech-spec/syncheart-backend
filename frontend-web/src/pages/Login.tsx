import { useState } from 'react';
import { useSyncStore } from '../store';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Lock, Sparkles, LogIn, UserPlus } from 'lucide-react';

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
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-cream flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Mesh Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-romantic/5 rounded-full blur-[100px] -ml-20 -mb-20" />

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center mb-10"
                >
                    <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mb-6 shadow-2xl border border-rose-50 animate-float">
                        <Heart size={40} className="text-primary animate-heartbeat" fill="currentColor" />
                    </div>
                    <h1 className="section-header text-romantic italic mb-2">SYNCH</h1>
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-accent" />
                        <p className="text-romantic/30 text-[10px] font-black uppercase tracking-[0.3em]">Conscious Connection</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="premium-card p-10 bg-white/95 backdrop-blur-xl border-2 border-rose-50 shadow-[0_40px_80px_rgba(255,51,102,0.08)]"
                >
                    <div className="flex gap-4 mb-10 p-1.5 bg-rose-50/50 rounded-[22px] border border-rose-100/50">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white text-romantic shadow-sm' : 'text-romantic/30 hover:text-romantic/50'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white text-romantic shadow-sm' : 'text-romantic/30 hover:text-romantic/50'}`}
                        >
                            Join
                        </button>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-rose-50 border border-primary/10 rounded-2xl p-4 text-xs font-bold text-primary text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-romantic/20">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-rose-50/30 border-2 border-transparent focus:border-primary/10 rounded-[24px] py-5 px-16 text-sm font-black text-romantic outline-none transition-all placeholder:text-romantic/20"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-romantic/20">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-rose-50/30 border-2 border-transparent focus:border-primary/10 rounded-[24px] py-5 px-16 text-sm font-black text-romantic outline-none transition-all placeholder:text-romantic/20"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-romantic text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-romantic/20 flex items-center justify-center gap-4 transition-all"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>{isLogin ? <LogIn size={18} /> : <UserPlus size={18} />} {isLogin ? "Authenticate" : "Forge Bond"}</>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                <p className="mt-12 text-center text-romantic/30 text-[10px] font-black uppercase tracking-[0.2em] italic">
                    {isLogin ? "Neural Link Protected" : "Encrypted Connection Ritual"}
                </p>
            </div>
        </div>
    );
}
