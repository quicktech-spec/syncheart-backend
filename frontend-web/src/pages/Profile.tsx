import { useState, useEffect } from 'react';
import {
    Camera, Settings, LogOut, Heart, HeartHandshake, Shield,
    CalendarHeart, ChevronLeft, Copy, User, Sparkles,
    Edit2, Check, Share2, Award, ArrowRight, Database
} from 'lucide-react';
import { useSyncStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAvatarUrl } from '../utils/avatar';
import { motion } from 'framer-motion';
import { sendWS } from '../utils/wsProvider';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

export default function Profile() {
    const user = useSyncStore(s => s.user);
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const setProfile = useSyncStore(s => s.setProfile);
    const customAvatar = useSyncStore(s => s.customAvatar);
    const setCustomAvatar = useSyncStore(s => s.setCustomAvatar);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>({});
    const [profilePic, setProfilePic] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.id) return;
        setProfilePic(customAvatar || getAvatarUrl(user.id));

        axios.get(`${BASE_URL}/api/v1/users/me`, {
            headers: { Authorization: `Bearer ${user.id}` }
        }).then(res => {
            setProfile(res.data);
            setEditForm(res.data);
        }).catch(err => console.error(err));
    }, [user?.id, customAvatar]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Compression Logic to prevent localStorage limits
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality
                setProfilePic(dataUrl);
                setCustomAvatar(dataUrl);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleSaveProfile = async () => {
        try {
            await axios.put(`${BASE_URL}/api/v1/users/me`, editForm, {
                headers: { Authorization: `Bearer ${user?.id}` }
            });
            setProfile(editForm);
            setIsEditing(false);
            alert("Settings updated!");
        } catch (e) {
            alert("Failed to save changes.");
        }
    };

    const handleBreakSync = async () => {
        if (!confirm("Are you sure you want to break your romantic sync?! This cannot be undone.")) return;

        try {
            await axios.delete(`${BASE_URL}/api/v1/users/me/relationship`, {
                headers: { Authorization: `Bearer ${user?.id}` }
            });

            // Send Realtime Notification
            sendWS({ type: 'break_sync', partnerId: partner?.id, fromName: profile?.display_name });

            useSyncStore.getState().setPartner(null);
            alert("Sync Broken. Your connection has been severed.");
        } catch (e) {
            alert("Failed to break relationship. Please try again.");
            console.error(e);
        }
    };

    const handleLogout = () => {
        useSyncStore.getState().setUser(null);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-cream text-romantic pb-32">

            {/* Romantic Profile Header */}
            <div className="bg-mesh-romantic pt-16 pb-28 px-8 rounded-b-[70px] shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-12 relative z-10">
                    <Link to="/" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="flex gap-3">
                        <Link to="/admin" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white/40 transition-all">
                            <Database size={20} />
                        </Link>
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center relative z-10">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full p-2 bg-white shadow-2xl relative">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-rose-50 shadow-inner">
                                <img
                                    src={profilePic || getAvatarUrl(user?.id)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(user?.id); }}
                                />
                            </div>
                            <label className="absolute bottom-1 right-1 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all border-4 border-white">
                                <Camera size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black mt-6 tracking-tighter text-white italic">{profile?.display_name || "Lover"}</h1>
                    <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mt-2">Shared Frequency Hub</p>
                </div>
            </div>

            <div className="px-8 -mt-10 space-y-10 relative z-20">

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="premium-card p-8 flex flex-col items-center group">
                        <div className="text-primary mb-4 animate-heartbeat">
                            <Heart size={32} fill="currentColor" />
                        </div>
                        <h4 className="text-4xl font-black text-romantic tracking-tighter leading-none">0</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-romantic/30 mt-1">Sync Score</p>
                    </div>

                    <div className="premium-card p-8 flex flex-col items-center group">
                        <div className="text-rose-900 mb-4 scale-110">
                            <Award size={32} />
                        </div>
                        <h4 className="text-4xl font-black text-romantic tracking-tighter leading-none">Pro</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-romantic/30 mt-1">Status</p>
                    </div>
                </div>

                {/* Information Section */}
                <div>
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h2 className="section-header text-romantic text-2xl">Profile Link</h2>
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform">
                                <Edit2 size={16} />
                            </button>
                        ) : (
                            <button onClick={handleSaveProfile} className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-sm hover:scale-110 transition-transform">
                                <Check size={16} />
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {[
                            { key: 'love_language', label: "Language", value: profile?.love_language || "Not set", icon: HeartHandshake, col: "bg-rose-50 text-rose-500" },
                            { key: 'attachment_style', label: "Rhythm", value: profile?.attachment_style || "Not set", icon: Shield, col: "bg-orange-50 text-orange-600" }
                        ].map((item, i) => (
                            <div key={i} className="premium-card p-6 flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl ${item.col} flex items-center justify-center shadow-inner`}>
                                    <item.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-romantic/30 mb-0.5">{item.label}</p>
                                    {isEditing ? (
                                        <input
                                            value={editForm[item.key] || ''}
                                            onChange={e => setEditForm({ ...editForm, [item.key]: e.target.value })}
                                            className="w-full bg-cream rounded-lg px-2 py-1 font-bold text-romantic outline-none border-b-2 border-primary/20"
                                        />
                                    ) : (
                                        <span className="text-lg font-black text-romantic/80">{item.value}</span>
                                    )}
                                </div>
                                <ArrowRight size={18} className="text-romantic/10" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Sync Hub */}
                <div className="premium-card p-10 bg-white border-2 border-rose-50">
                    <h3 className="text-2xl font-black mb-6 tracking-tight text-romantic">Sync Your Partner</h3>
                    <p className="text-xs font-bold text-romantic/40 mb-3 tracking-widest uppercase">Your Exclusive Key</p>
                    <div className="bg-rose-50 rounded-[30px] p-6 flex items-center gap-4 mb-4">
                        <span className="flex-1 text-3xl font-black tracking-[0.2em] text-primary">{profile?.invite_code || "••••••"}</span>
                        <button
                            onClick={() => { navigator.clipboard.writeText(profile?.invite_code); alert('Key Copied! 💘'); }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform"
                        >
                            <Copy size={20} />
                        </button>
                    </div>
                    {!partner ? (
                        <div className="mt-10 space-y-4">
                            <input
                                id="syncInput"
                                placeholder="Enter their key..."
                                className="w-full bg-cream rounded-[24px] py-5 px-8 font-black text-romantic outline-none border-2 border-transparent focus:border-primary/20 transition-all"
                            />
                            <button
                                onClick={() => {
                                    const code = (document.getElementById('syncInput') as HTMLInputElement).value;
                                    axios.post(`${BASE_URL}/api/v1/users/sync-couple`, { invite_code: code }, { headers: { Authorization: `Bearer ${user?.id}` } })
                                        .then(res => {
                                            if (res.data?.partner) {
                                                useSyncStore.getState().setPartner(res.data.partner);
                                                alert(" Hearts Synced! ✨");
                                                window.location.reload();
                                            }
                                        }).catch(e => alert(e.response?.data?.message || 'Synch failed.'));
                                }}
                                className="w-full bg-romantic text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-primary transition-all"
                            >
                                Integrate Hearts
                            </button>
                        </div>
                    ) : (
                        <div className="mt-10 space-y-4">
                            <div className="bg-cream rounded-[24px] p-6 text-center border-2 border-rose-50 border-dashed">
                                <Heart size={24} className="text-primary mx-auto mb-3 animate-pulse" fill="currentColor" />
                                <p className="text-sm font-black text-romantic/60 mb-1">Currently Synced With</p>
                                <p className="text-2xl font-black text-romantic tracking-tight">{(partner as any).display_name || partner.email}</p>
                            </div>
                            <button
                                onClick={handleBreakSync}
                                className="w-full bg-rose-50 text-rose-500 py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all border border-rose-100"
                            >
                                Break Relationship Sync
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full py-6 rounded-[32px] bg-rose-50 text-rose-300 font-black text-[10px] uppercase tracking-[0.4em] hover:text-rose-500 transition-all border border-rose-100/50"
                >
                    Disconnect Frequency
                </button>
            </div>
        </div>
    );
}
