import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ArrowLeft, Heart, HeartOff, User, Edit2, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { useSyncStore } from '../store';
import { Link } from 'react-router-dom';

export default function AdminDB() {
    const currentUser = useSyncStore(s => s.user);
    const profile = useSyncStore(s => s.profile);
    const partner = useSyncStore(s => s.partner);
    const setPartner = useSyncStore(s => s.setPartner);

    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Initialize mock DB using actual user state + fake users
        const db = [
            { id: currentUser?.id, email: currentUser?.email, display_name: profile?.display_name || 'Admin', status: partner ? 'paired' : 'single', partner_id: partner?.id, isCurrentUser: true },
            { id: partner?.id || 'usr_ext_1', email: partner ? partner.email : 'arjun@syncheart.app', display_name: partner ? (partner as any).display_name || 'Partner' : 'Arjun', status: partner ? 'paired' : 'single', partner_id: currentUser?.id, isPartner: true },
            { id: 'usr_mock_3', email: 'rohan.k@syncheart.app', display_name: 'Rohan', status: 'single', partner_id: null },
            { id: 'usr_mock_4', email: 'meera.s@syncheart.app', display_name: 'Meera', status: 'single', partner_id: null },
        ];
        // Filter out duplicate if partner is null and mock is just placeholder
        setUsers(db.filter(u => u.email));
    }, [currentUser, profile, partner]);

    const handleBreakRelation = (u1_id: string, u2_id: string | null) => {
        if (!u2_id) return;
        if (!confirm("ADMIN OVERRIDE: Are you sure you want to force-break this connection?")) return;

        setUsers(prev => prev.map(u => {
            if (u.id === u1_id || u.id === u2_id) {
                return { ...u, status: 'single', partner_id: null };
            }
            return u;
        }));

        // If current user is involved, sync the actual state
        if (u1_id === currentUser?.id || u2_id === currentUser?.id) {
            const targetPartner = u1_id === currentUser?.id ? u2_id : u1_id;
            setPartner(null);

            try {
                const ws = new WebSocket('ws://localhost:8080');
                ws.onopen = () => {
                    ws.send(JSON.stringify({ type: 'break_sync', partnerId: targetPartner, fromName: 'System Admin' }));
                    ws.close();
                };
            } catch (e) { }
        }
    };

    const handleUpdateName = (id: string) => {
        const newName = prompt("Enter new display name:");
        if (newName) {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, display_name: newName } : u));
        }
    };

    const filteredUsers = users.filter(u => `${u.display_name} ${u.email}`.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-black text-rose-50 pb-32">
            {/* Header */}
            <div className="bg-gradient-to-b from-rose-900 to-black px-6 pt-16 pb-12 shadow-2xl relative border-b border-rose-900/50">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/profile" className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-200 border border-rose-500/20 hover:bg-rose-900/50 transition-all">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                        <ShieldAlert size={16} className="text-red-400" />
                        <span className="text-xs font-black uppercase text-red-400 tracking-widest">Admin Access</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <Database size={40} className="text-rose-400 drop-shadow-[0_0_15px_rgba(255,51,102,0.5)]" />
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">System DB</h1>
                        <p className="text-rose-400/60 font-black uppercase tracking-[0.3em] text-[10px] mt-1">Global Relationship Engine</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-6">
                <div className="relative mb-8">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-500/50" size={20} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full bg-[#1A1A24] border-2 border-rose-900/30 rounded-full py-5 px-16 text-sm font-bold text-white outline-none focus:border-rose-500/50 transition-all placeholder:text-rose-500/30 shadow-2xl"
                    />
                </div>

                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredUsers.map((u, i) => (
                            <motion.div
                                key={u.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#12121A] border-2 border-rose-900/20 p-6 rounded-[30px] shadow-xl relative overflow-hidden group"
                            >
                                {u.isCurrentUser && <div className="absolute top-0 right-0 bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-lg">You</div>}

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-400 border border-rose-500/20">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white">{u.display_name}</h3>
                                            <p className="text-xs text-rose-400/50 font-medium tracking-wide">{u.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleUpdateName(u.id)} className="w-10 h-10 bg-[#1A1A24] rounded-xl flex items-center justify-center text-rose-400 hover:text-white transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-6 bg-black/40 p-4 rounded-2xl border border-rose-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${u.status === 'paired' ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]' : 'bg-gray-600'}`}></div>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-rose-200">
                                            {u.status === 'paired' ? 'Connected' : 'Single'}
                                        </span>
                                    </div>

                                    {u.status === 'paired' ? (
                                        <button
                                            onClick={() => handleBreakRelation(u.id, u.partner_id)}
                                            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest border border-red-500/20"
                                        >
                                            <HeartOff size={14} /> Sever Link
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-rose-500/40 font-black text-[10px] uppercase tracking-widest">
                                            <AlertTriangle size={14} /> Unpaired
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
