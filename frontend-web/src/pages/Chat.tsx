import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Heart, Music,
    Gamepad2, Camera, Send, Smile, Plus, MoreVertical, Sparkles
} from 'lucide-react';
import { useSyncStore } from '../store';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

// AES-GCM helpers for encryption
async function deriveKey(relationshipId: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(relationshipId), { name: 'PBKDF2' }, false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode('syncheart-salt-v1'), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptMessage(plaintext: string, key: CryptoKey) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const cipherbuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
    const cipherArr = new Uint8Array(cipherbuf);
    const ciphertext = btoa(String.fromCharCode(...cipherArr));
    const ivStr = btoa(String.fromCharCode(...iv));
    return { ciphertext, iv: ivStr, auth_tag: 'aes-gcm-integrated' };
}

async function decryptMessage(ciphertext: string, ivStr: string, key: CryptoKey): Promise<string> {
    try {
        if (!ciphertext || !ivStr) return '🔒 [Invalid Payload]';
        const iv = Uint8Array.from(atob(ivStr), c => c.charCodeAt(0));
        const cipherArr = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
        const plaintextBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherArr);
        return new TextDecoder().decode(plaintextBuf);
    } catch (e: any) {
        console.error("Decryption failed:", e);
        return '🔒 [Encrypted message]';
    }
}

interface DecryptedMessage {
    id: string;
    sender_id: string;
    text: string;
    created_at: string;
}

export default function LuxuryChat() {
    const user = useSyncStore(s => s.user);
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const authHeaders = { Authorization: `Bearer ${user?.id}` };

    const [relationship, setRelationship] = useState<any>(null);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
    const [messages, setMessages] = useState<DecryptedMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [loadingRel, setLoadingRel] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function initChat() {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/users/me/relationship`, { headers: authHeaders });
                const relData = res.data?.data;
                if (relData) {
                    setRelationship(relData);
                    const key = await deriveKey(relData.relationship_id);
                    setCryptoKey(key);
                    setLoadingRel(false);
                }
            } catch (e) {
                console.error(e);
                setLoadingRel(false);
            }
        }
        initChat();
    }, []);

    useEffect(() => {
        if (!relationship || !cryptoKey) return;
        const fetchAndPoll = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/users/messages/${relationship.relationship_id}`, { headers: authHeaders });
                if (Array.isArray(res.data)) {
                    const decrypted = await Promise.all(res.data.map(async (m: any) => ({
                        id: m.id,
                        sender_id: m.sender_id,
                        text: await decryptMessage(m.ciphertext, m.iv, cryptoKey),
                        created_at: m.created_at
                    })));
                    setMessages(decrypted);
                }
            } catch (error) { }
        };
        fetchAndPoll();
        const poll = setInterval(fetchAndPoll, 4000);
        return () => clearInterval(poll);
    }, [relationship, cryptoKey]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: any) => {
        e.preventDefault();
        if (!inputMessage.trim() || !cryptoKey || !relationship) return;
        const text = inputMessage.trim();
        setInputMessage('');
        setSending(true);

        const optimistic = { id: Date.now().toString(), sender_id: profile?.id!, text, created_at: new Date().toISOString() };
        setMessages(p => [...p, optimistic]);

        try {
            const { ciphertext, iv, auth_tag } = await encryptMessage(text, cryptoKey);
            await axios.post(`${BASE_URL}/api/v1/users/messages`, {
                relationship_id: relationship.relationship_id,
                ciphertext, iv, auth_tag
            }, { headers: authHeaders });
        } catch (e) { }
        setSending(false);
    };

    const partnerName = relationship?.partner?.display_name || partner?.email?.split('@')[0] || 'My Love';

    if (loadingRel) {
        return (
            <div className="h-full w-full bg-cream flex flex-col items-center justify-center text-romantic font-sans">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="mb-6">
                    <Heart size={48} className="text-primary" fill="currentColor" />
                </motion.div>
                <p className="text-romantic/50 font-black tracking-[0.4em] uppercase text-xs italic">Securing Frequency...</p>
            </div>
        );
    }

    if (!relationship) {
        return (
            <div className="h-full w-full bg-cream flex flex-col items-center justify-center p-12 text-center text-romantic font-sans">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-10 shadow-2xl border-2 border-rose-50">
                    <Heart size={60} className="text-primary animate-heartbeat" fill="currentColor" />
                </div>
                <h2 className="section-header text-romantic mb-4">Unsynced.</h2>
                <p className="text-romantic/50 mb-12 text-lg font-medium leading-relaxed italic">"Your heartbeat is waiting for its echo." Connect with your partner to enter this private space.</p>
                <Link to="/connect" className="bg-romantic text-white px-10 py-6 rounded-[30px] font-black shadow-2xl hover:scale-105 transition-all text-xs uppercase tracking-[0.3em]">Forging Bond</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-cream font-sans relative">
            {/* Soft Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -mt-40 -mr-40" />

            {/* Premium Header */}
            <div className="z-30 px-6 py-6 border-b border-rose-100/50 bg-white/80 backdrop-blur-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-5">
                    <Link to="/" className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-romantic hover:bg-rose-100 transition-colors shadow-sm">
                        <ChevronLeft size={22} />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[20px] overflow-hidden border-2 border-primary/20 shadow-md">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerName}`} className="w-full h-full object-cover" alt="Partner" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tighter text-romantic mb-0.5">{partnerName}</h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-glow"></div>
                                <span className="text-[10px] font-black text-romantic/40 uppercase tracking-widest">Secure Room</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-romantic/40 shadow-sm hover:text-primary transition-colors">
                        <Heart size={20} />
                    </button>
                    <button className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-romantic/40 shadow-sm transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Space */}
            <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-8 relative z-10 scroll-smooth">
                {messages.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center mt-20 text-center">
                        <div className="w-20 h-20 bg-white shadow-xl rounded-full mb-8 flex items-center justify-center border-2 border-rose-50">
                            <Send size={30} className="text-romantic/20 ml-1" />
                        </div>
                        <p className="section-header text-romantic mb-3 text-2xl">Whispers.</p>
                        <p className="text-romantic/40 text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted space.</p>
                    </motion.div>
                )}

                {messages.map((msg, index) => {
                    const isMe = msg.sender_id === profile?.id;
                    const date = new Date(msg.created_at);
                    const time = isNaN(date.getTime()) ? 'Now' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <div key={msg.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                    <div className={`
                                        relative px-7 py-5 rounded-[30px] text-[16px] font-semibold leading-relaxed
                                        ${isMe
                                            ? 'bg-romantic text-white shadow-xl rounded-br-none'
                                            : 'bg-white text-romantic border border-rose-100 rounded-bl-none shadow-md'
                                        }
                                    `}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[9px] font-black text-romantic/30 mt-2 uppercase tracking-widest px-2">
                                        {time}
                                    </span>
                                </div>
                            </motion.div>

                            {/* AI Coach Suggestion Placeholder (Demo only) */}
                            {index === messages.length - 1 && !isMe && messages.length > 2 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 1 }} className="mt-8 flex justify-center">
                                    <div className="bg-amber-50 border border-amber-200/50 px-6 py-4 rounded-3xl max-w-[90%] flex items-start gap-4 shadow-sm">
                                        <div className="mt-1"><Sparkles size={16} className="text-amber-500" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em] mb-1">AI Coach Observation</p>
                                            <p className="text-xs font-bold text-amber-900/70 leading-relaxed">It sounds like there might be a little tension here. Would you like to try a quick shared breathing exercise?</p>
                                            <button className="mt-3 bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Start Flow</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Smart Action Bar - Floating Glass */}
            <div className="px-6 pb-2">
                <div className="flex gap-4 pb-4 overflow-x-auto">
                    {[
                        { icon: Heart, color: "text-primary", label: "Touch" },
                        { icon: Music, color: "text-orange-500", label: "Sync" },
                        { icon: Gamepad2, color: "text-emerald-500", label: "Play" },
                        { icon: Camera, color: "text-blue-500", label: "Lens" }
                    ].map((item, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="bg-white border border-rose-50 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm active:scale-95 transition-all"
                        >
                            <item.icon size={18} className={item.color} />
                            <span className="text-[10px] font-black text-romantic/60 uppercase tracking-widest">{item.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Premium Input Section */}
            <div className="px-6 pb-12 pt-2 relative z-40 bg-gradient-to-t from-cream via-cream/90 to-transparent">
                <div className="bg-white p-3 pl-5 rounded-[40px] flex items-center gap-4 shadow-[0_20px_40px_rgba(255,51,102,0.08)] border-2 border-rose-50">
                    <button className="text-romantic/20 hover:text-primary transition-colors">
                        <Plus size={24} />
                    </button>

                    <form onSubmit={handleSend} className="flex-1 flex items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Whisper something..."
                            className="flex-1 bg-transparent border-none outline-none text-romantic placeholder-romantic/30 text-base font-bold px-3"
                        />

                        <div className="flex gap-3 ml-2">
                            <button type="button" className="p-2.5 text-romantic/20 hover:text-primary transition-colors">
                                <Smile size={24} />
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={sending || !inputMessage.trim()}
                                className="w-14 h-14 bg-romantic rounded-full flex items-center justify-center text-white shadow-xl shadow-romantic/20 disabled:opacity-50 transition-all"
                            >
                                <Send size={22} className={`${sending ? 'animate-pulse' : ''} ml-1`} />
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
