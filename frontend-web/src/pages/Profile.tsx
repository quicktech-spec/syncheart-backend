import { useState } from 'react';
import { useSyncStore } from '../store';
import { Camera, ChevronLeft, Settings, Database, Edit2, Check, X, Copy, Heart, Award, ArrowRight, Shield, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAvatarUrl } from '../utils/avatar';
import axios from 'axios';
import { sendWS } from '../utils/wsProvider';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

export default function Profile() {
    const user = useSyncStore(s => s.user);
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const profilePic = useSyncStore(s => s.customAvatar);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profile || {});

    const handleImageUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            useSyncStore.getState().setCustomAvatar(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveProfile = async () => {
        try {
            const payload = {
                display_name: editForm.display_name,
                birthday: editForm.birthday,
                love_language: editForm.love_language,
                attachment_style: editForm.attachment_style,
            };

            await axios.patch(`${BASE_URL}/api/v1/users/me`, payload, {
                headers: { Authorization: `Bearer ${user?.id}` }
            });

            useSyncStore.getState().setProfile({ ...profile, ...payload });
            setIsEditing(false);
            alert("Settings updated!");
        } catch (e: any) {
            if (e.response?.status === 401) {
                alert("Your session expired. Re-authenticating...");
                useSyncStore.getState().setUser(null);
                window.location.href = '/';
                return;
            }
            alert(`Failed to save changes: ${e.response?.data?.message || e.message}`);
            console.error(e);
        }
    };

    const handleLogout = () => {
        useSyncStore.getState().setUser(null);
        localStorage.removeItem('syncheart-store');
        window.location.href = '/';
    };

    const handleBreakSync = async () => {
        if (!confirm("Are you sure you want to disconnect your heart frequency from your partner? This is permanent.")) return;
        try {
            await axios.post(`${BASE_URL}/api/v1/users/break-sync`, {}, {
                headers: { Authorization: `Bearer ${user?.id}` }
            });

            sendWS({
                type: 'break_sync',
                partnerId: partner?.id,
                fromName: profile?.display_name || 'Your partner'
            });

            useSyncStore.getState().setPartner(null);
            alert("Frequency disconnected.");
        } catch (e) {
            alert("Failed to disconnect. Try again.");
        }
    };

    return (
        <div className="min-h-screen bg-cream text-white pb-32">

            {/* Romantic Profile Header */}
            <div className="bg-mesh-romantic pt-16 pb-24 px-8 rounded-b-[60px] shadow-2xl relative overflow-hidden border-b border-white/5">
                <div className="flex items-center justify-between mb-12 relative z-10">
                    <Link to="/" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="flex gap-3">
                        <Link to="/admin" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-[0_0_15px_rgba(255,42,95,0.2)] hover:bg-white/10 transition-colors">
                            <Database size={20} />
                        </Link>
                        <button className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center relative z-10">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] p-1.5 bg-white/10 backdrop-blur-xl shadow-2xl relative border border-white/20 rotate-3 transition-transform group-hover:rotate-0">
                            <div className="w-full h-full rounded-[34px] overflow-hidden">
                                <img
                                    src={profilePic || getAvatarUrl(user?.id)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(user?.id); }}
                                />
                            </div>
                            <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-[14px] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all outline outline-4 outline-[#09090B]">
                                <Camera size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>

                    <h1 className="text-4xl font-serif mt-8 tracking-wide text-white italic">{profile?.display_name || "Lover"}</h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Shared Frequency Hub</p>
                </div>
            </div>

            <div className="px-6 -mt-10 space-y-6 relative z-20">

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-5">
                    <div className="premium-card p-6 flex flex-col items-center group border border-white/5">
                        <div className="text-primary mb-3 animate-heartbeat">
                            <Heart size={28} fill="currentColor" />
                        </div>
                        <h4 className="text-3xl font-black text-white tracking-tighter leading-none">0</h4>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mt-1.5">Sync Score</p>
                    </div>

                    <div className="premium-card p-6 flex flex-col items-center group border border-white/5">
                        <div className="text-accent mb-3 drop-shadow-[0_0_10px_rgba(229,169,60,0.5)]">
                            <Award size={28} />
                        </div>
                        <h4 className="text-3xl font-black text-white tracking-tighter leading-none">Pro</h4>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mt-1.5">Status</p>
                    </div>
                </div>

                {/* Information Section */}
                <div className="premium-card p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-serif text-white text-xl italic tracking-wide">Profile Settings</h2>
                        <button onClick={() => { setEditForm(profile || {}); setIsEditing(true); }} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
                            <Edit2 size={16} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: "Language", value: profile?.love_language || "Not set", icon: HeartHandshake, col: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
                            { label: "Rhythm", value: profile?.attachment_style || "Not set", icon: Shield, col: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                                <div className={`w-12 h-12 rounded-[16px] ${item.col} border flex items-center justify-center shadow-inner`}>
                                    <item.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-0.5">{item.label}</p>
                                    <span className="text-sm font-bold text-white/80">{item.value}</span>
                                </div>
                                <ArrowRight size={16} className="text-white/10 mr-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Sync Hub */}
                <div className="premium-card p-8 border border-white/5 bg-gradient-to-br from-[#1E1E24]/60 to-[#121214]/60">
                    <h3 className="text-xl font-serif mb-6 tracking-wide text-white italic">Sync Your Partner</h3>
                    <p className="text-[10px] font-black text-white/40 mb-3 tracking-[0.2em] uppercase">Your Exclusive Key</p>
                    <div className="bg-black/40 border border-white/5 rounded-[24px] p-5 flex items-center gap-4 mb-6">
                        <span className="flex-1 text-2xl font-black tracking-widest text-primary font-mono">{profile?.invite_code || "••••••"}</span>
                        <button
                            onClick={() => { navigator.clipboard.writeText(profile?.invite_code); alert('Key Copied! 💘'); }}
                            className="w-12 h-12 bg-white/10 rounded-[14px] flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/10"
                        >
                            <Copy size={18} />
                        </button>
                    </div>
                    {!partner ? (
                        <div className="mt-8 space-y-4">
                            <input
                                id="syncInput"
                                placeholder="Enter their key..."
                                className="w-full bg-black/40 rounded-[20px] py-4 px-6 font-bold text-white placeholder:text-white/20 outline-none border border-white/10 focus:border-primary/50 focus:bg-white/5 transition-all text-center tracking-widest uppercase"
                            />
                            <button
                                onClick={async () => {
                                    const code = (document.getElementById('syncInput') as HTMLInputElement).value;
                                    try {
                                        const res = await axios.post(`${BASE_URL}/api/v1/users/sync-couple`, { invite_code: code }, { headers: { Authorization: `Bearer ${user?.id}` } });
                                        if (res.data?.partner) {
                                            useSyncStore.getState().setPartner(res.data.partner);
                                            alert(" Hearts Synced! ✨");
                                            window.location.reload();
                                        }
                                    } catch (e: any) {
                                        if (e.response?.status === 409) {
                                            try {
                                                const d = await axios.get(`${BASE_URL}/api/v1/users/me/relationship`, { headers: { Authorization: `Bearer ${user?.id}` } });
                                                if (d.data?.data?.partner) {
                                                    useSyncStore.getState().setPartner(d.data.data.partner);
                                                    alert("Connection Restored! You were already paired on the server.");
                                                } else {
                                                    alert("System Sync Collision. Connection state corrupted.");
                                                }
                                            } catch (err) {
                                                alert("Could not restore connection.");
                                            }
                                        } else {
                                            alert(e.response?.data?.message || 'Synch failed.');
                                        }
                                    }
                                }}
                                className="w-full bg-gradient-to-r from-primary to-accent text-white py-5 rounded-[20px] font-black text-[10px] uppercase tracking-[0.4em] shadow-lg hover:brightness-110 transition-all"
                            >
                                Integrate Hearts
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8 space-y-4">
                            <div className="bg-black/40 rounded-[24px] p-6 text-center border border-primary/20">
                                <Heart size={24} className="text-primary mx-auto mb-3 animate-pulse drop-shadow-[0_0_10px_rgba(255,42,95,0.5)]" fill="currentColor" />
                                <p className="text-[10px] font-black text-white/40 mb-1 uppercase tracking-widest">Currently Synced With</p>
                                <p className="text-xl font-bold text-white tracking-wide">{(partner as any).display_name || partner.email}</p>
                            </div>
                            <button
                                onClick={handleBreakSync}
                                className="w-full bg-red-500/10 text-red-500 py-5 rounded-[20px] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                            >
                                Break Sync
                            </button>
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full py-5 rounded-[24px] bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all border border-white/10"
                    >
                        Disconnect App (Log Out)
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex justify-center items-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#121214] rounded-[40px] p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(255,42,95,0.2)] border border-white/10 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-8 px-2">
                                <h2 className="font-serif text-white text-2xl italic tracking-wide mb-0">Edit Profile</h2>
                                <button onClick={() => setIsEditing(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"><X size={18} /></button>
                            </div>

                            <div className="space-y-5 mb-8">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-4 mb-2 block">Display Name</label>
                                    <input value={editForm.display_name || ''} onChange={e => setEditForm({ ...editForm, display_name: e.target.value })} className="w-full bg-black/50 rounded-[20px] py-4 px-6 font-bold text-white outline-none border border-white/5 focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-4 mb-2 block">Birthday (Age)</label>
                                    <input type="date" value={editForm.birthday ? new Date(editForm.birthday).toISOString().split('T')[0] : ''} onChange={e => setEditForm({ ...editForm, birthday: e.target.value })} className="w-full bg-black/50 rounded-[20px] py-4 px-6 font-bold text-white outline-none border border-white/5 focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-4 mb-2 block">Love Language</label>
                                    <select value={editForm.love_language || ''} onChange={e => setEditForm({ ...editForm, love_language: e.target.value })} className="w-full bg-black/50 rounded-[20px] py-4 px-6 font-bold text-white outline-none border border-white/5 focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner [color-scheme:dark]">
                                        <option value="">Select...</option>
                                        <option value="Words of Affirmation">Words of Affirmation</option>
                                        <option value="Acts of Service">Acts of Service</option>
                                        <option value="Receiving Gifts">Receiving Gifts</option>
                                        <option value="Quality Time">Quality Time</option>
                                        <option value="Physical Touch">Physical Touch</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-4 mb-2 block">Attachment Style</label>
                                    <select value={editForm.attachment_style || ''} onChange={e => setEditForm({ ...editForm, attachment_style: e.target.value })} className="w-full bg-black/50 rounded-[20px) py-4 px-6 font-bold text-white outline-none border border-white/5 focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner [color-scheme:dark]">
                                        <option value="">Select...</option>
                                        <option value="Secure">Secure</option>
                                        <option value="Anxious">Anxious</option>
                                        <option value="Avoidant">Avoidant</option>
                                        <option value="Disorganized">Disorganized</option>
                                    </select>
                                </div>
                            </div>

                            <button onClick={handleSaveProfile} className="w-full bg-primary text-white py-5 rounded-[20px] font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,42,95,0.3)] hover:brightness-110 transition-all flex justify-center items-center gap-2">
                                <Check size={16} strokeWidth={3} /> Save Impact
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
