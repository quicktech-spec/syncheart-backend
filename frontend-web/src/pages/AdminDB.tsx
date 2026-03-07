import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ArrowLeft, HeartOff, User, Edit2, ShieldAlert, AlertTriangle } from 'lucide-react';
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
        <div className="min-h-screen bg-[#09090B] text-white pb-32">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#1E1E24] to-[#09090B] px-6 pt-16 pb-12 shadow-2xl relative border-b border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/profile" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-all">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                        <ShieldAlert size={16} className="text-red-400" />
                        <span className="text-[10px] font-black uppercase text-red-400 tracking-widest">Admin Access</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <Database size={40} className="text-primary drop-shadow-[0_0_15px_rgba(255,42,95,0.5)]" />
                    <div>
                        <h1 className="text-4xl font-serif text-white italic">Heart Registry</h1>
                        <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] mt-1">Global Connection Engine</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-6">
                <div className="relative mb-8">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full bg-black/40 border-2 border-white/5 rounded-full py-5 px-16 text-sm font-bold text-white outline-none focus:border-primary/50 transition-all placeholder:text-white/20 shadow-2xl"
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
                                className="premium-card p-6 flex flex-col border border-white/5 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{u.display_name}</h3>
                                            <p className="text-xs text-white/40 font-medium tracking-wide">{u.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleUpdateName(u.id)} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${u.status === 'paired' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-white/20'}`}></div>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-white/40">
                                            {u.status === 'paired' ? 'Paired' : 'Single'}
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
                                        <div className="flex items-center gap-2 text-white/20 font-black text-[10px] uppercase tracking-widest">
                                            <AlertTriangle size={14} /> Unlinked
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
