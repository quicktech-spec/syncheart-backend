import React, { useState } from 'react';
import { Camera, Settings, LogOut, Bell, Shield, Heart, HeartHandshake, Smile, BookHeart, Target, Flame, CalendarHeart, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useSyncStore } from '../store';
import { Link } from 'react-router-dom';

export default function Profile() {
    const setUser = useSyncStore(s => s.setUser);
    const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/150?u=a042581f4e29026024d");

    const handleLogout = () => {
        setUser(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePic(url);
        }
    };

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-white pb-12 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-80 bg-gradient-to-b from-[#FF3366]/20 to-transparent pointer-events-none blur-3xl" />
            <div className="absolute top-40 right-0 w-64 h-64 bg-[#00D68F]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 px-6 pt-6">
                {/* Header / Avatar */}
                <div className="flex flex-col items-center mt-2 mb-10 group relative">
                    <label className="relative mb-4 cursor-pointer block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3366] to-[#FFB000] rounded-full blur-lg opacity-40 animate-pulse scale-110 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div className="relative w-36 h-36 rounded-full border-[3px] border-[#2C2C3E] object-cover shadow-[0_10px_35px_rgba(255,51,102,0.4)] group-hover:scale-105 transition-transform duration-500 ease-out overflow-hidden">
                            <img
                                src={profilePic}
                                className="w-full h-full object-cover"
                                alt="Profile"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="text-white mb-1" size={28} />
                                <span className="text-white text-xs font-bold tracking-wider">CHANGE</span>
                            </div>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md">Shubham</h1>
                    <div className="flex items-center gap-2 mt-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-xl">
                        <Heart size={16} className="text-[#FF3366] fill-current animate-pulse drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]" />
                        <span className="text-sm font-semibold tracking-wide text-gray-200">Together since Oct 2021</span>
                    </div>
                </div>

                {/* Relationship Snapshot Card */}
                <div className="bg-gradient-to-br from-[#2C2C3E] to-[#252535] border border-white/5 rounded-[32px] p-6 mb-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#FF3366]/20 to-[#FFB000]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <h2 className="text-[#FF3366] font-black text-[11px] uppercase tracking-[0.3em] mb-6 opacity-90 drop-shadow-sm">Relationship Snapshot</h2>

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Sync Score</p>
                            <p className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-sm">94<span className="text-3xl text-gray-500">%</span></p>
                        </div>
                        {/* Heart Match Indicator */}
                        <div className="relative w-24 h-24 rounded-full bg-[#1E1E2C] flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border border-white/5">
                            <svg className="absolute w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(255,51,102,0.5)]">
                                <circle cx="48" cy="48" r="42" stroke="#2C2C3E" strokeWidth="6" fill="none" />
                                <circle cx="48" cy="48" r="42" stroke="url(#neonGrad)" strokeWidth="8" fill="none" strokeDasharray="264" strokeDashoffset="15" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FF3366" />
                                        <stop offset="100%" stopColor="#FFB000" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Heart size={36} className="text-[#FF3366] fill-[#FF3366] drop-shadow-[0_0_12px_rgba(255,51,102,0.8)]" />
                        </div>
                    </div>

                    <div className="flex gap-4 relative z-10">
                        <div className="flex-1 bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5 shadow-lg hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <div className="bg-gradient-to-br from-[#FFB000]/20 to-[#FF3366]/10 p-3 rounded-xl shadow-[inset_0_0_10px_rgba(255,176,0,0.2)] text-[#FFB000]">
                                <Flame size={22} className="fill-[#FFB000]/80 drop-shadow-[0_0_5px_rgba(255,176,0,0.8)]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Streak</p>
                                <p className="font-black text-white text-lg tracking-tight">12 Days</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5 shadow-lg hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <div className="bg-gradient-to-br from-[#8A2BE2]/20 to-[#FF3366]/10 p-3 rounded-xl shadow-[inset_0_0_10px_rgba(138,43,226,0.2)] text-[#8A2BE2]">
                                <CalendarHeart size={22} className="drop-shadow-[0_0_5px_rgba(138,43,226,0.8)]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Anniv</p>
                                <p className="font-black text-white text-lg tracking-tight">45 Days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-2">Intimate Actions</h2>
                <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                        { icon: HeartHandshake, title: "My Love Language", gradient: "from-[#FF3366] to-[#ffaa00]", color: "text-white", path: "/love-language", shadow: "shadow-[#FF3366]/40" },
                        { icon: Smile, title: "My Current Mood", gradient: "from-[#00D68F] to-[#00b377]", color: "text-white", path: "/mood", shadow: "shadow-[#00D68F]/40" },
                        { icon: BookHeart, title: "Reflection Journal", gradient: "from-[#8A2BE2] to-[#b366ff]", color: "text-white", path: "/journal", shadow: "shadow-[#8A2BE2]/40" },
                        { icon: Target, title: "Growth Goals", gradient: "from-[#FFB000] to-[#ff8c00]", color: "text-white", path: "/goals", shadow: "shadow-[#FFB000]/40" }
                    ].map((btn, i) => (
                        <Link
                            to={btn.path}
                            key={i}
                            className={`bg-gradient-to-br ${btn.gradient} p-[1px] rounded-[24px] group overflow-hidden shadow-lg ${btn.shadow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95`}
                        >
                            <div className="bg-[#2C2C3E]/95 backdrop-blur-xl rounded-[23px] p-5 h-full flex flex-col items-start gap-4 transition-colors group-hover:bg-[#2C2C3E]/80">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${btn.gradient} text-white shadow-lg`}>
                                    <btn.icon size={26} strokeWidth={2.5} />
                                </div>
                                <span className="font-black text-sm text-gray-100 leading-tight tracking-wide">{btn.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* About Me Section - Pill Shapes */}
                <h2 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-2">About Me</h2>
                <div className="space-y-3 mb-10">
                    {[
                        { label: "Nickname", value: "Shubby", icon: Heart },
                        { label: "Birthday", value: "Nov 12", icon: CalendarHeart },
                        { label: "Love Language", value: "Quality Time", icon: HeartHandshake },
                        { label: "Attachment Style", value: "Secure", icon: Shield },
                        { label: "Fav Memory", value: "Our first roadtrip", icon: ImageIcon },
                    ].map((item, i) => (
                        <div key={i} className="group bg-[#2C2C3E]/80 border border-white/5 rounded-full px-6 py-4 flex flex-row items-center justify-between backdrop-blur-md shadow-lg hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all cursor-pointer hover:scale-[1.01] active:scale-95">
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400 group-hover:text-[#FF3366] transition-colors"><item.icon size={18} /></div>
                                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">{item.label}</span>
                            </div>
                            <span className="text-white font-black text-right truncate pl-4">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Our Memories Scroll */}
                <div className="flex items-center justify-between mb-4 ml-2 mr-2">
                    <h2 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em]">Our Memories</h2>
                    <Link to="/memories" className="text-[#FF3366] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center">See All <ChevronRight size={14} /></Link>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory pr-6 pl-2" style={{ scrollbarWidth: 'none' }}>
                    {[1, 2, 3].map((img, i) => (
                        <Link to="/memories" key={i} className="min-w-[200px] h-56 rounded-[32px] overflow-hidden snap-center relative border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,51,102,0.3)] transition-all duration-300">
                            <img src={`https://picsum.photos/400/500?random=${i + 15}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="Memory" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2C] via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-0 w-full p-5">
                                <p className="text-white text-lg font-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{['Bali Trip', 'Our 1st Anniv', 'Cozy Sunday'][i]}</p>
                                <p className="text-[#FFB000] text-xs font-bold mt-1 tracking-wider uppercase">— 2023</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Minimal Settings */}
                <div className="bg-[#2C2C3E]/80 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-md shadow-xl mb-8 mt-4">
                    {[
                        { icon: Settings, label: "Account Overview", color: "text-[#00D68F]", bg: "bg-[#00D68F]/10", path: "/settings/account" },
                        { icon: Shield, label: "Privacy Details", color: "text-[#FFB000]", bg: "bg-[#FFB000]/10", path: "/settings/privacy" },
                        { icon: Bell, label: "Notification Rules", color: "text-[#8A2BE2]", bg: "bg-[#8A2BE2]/10", path: "/settings/notifications" },
                        { icon: Heart, label: "Relationship Settings", color: "text-[#FF3366]", bg: "bg-[#FF3366]/10", path: "/settings/relationship" },
                    ].map((item, i) => (
                        <Link to={item.path} key={i} className="w-full group flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-all active:bg-white/10">
                            <div className="flex items-center gap-4">
                                <div className={`${item.color} ${item.bg} p-2.5 rounded-full group-hover:scale-110 transition-transform`}><item.icon size={20} /></div>
                                <span className="text-white font-bold tracking-wide">{item.label}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="w-full group flex items-center gap-4 p-5 hover:bg-[#FF3366]/10 transition-all active:bg-[#FF3366]/20">
                        <div className="text-[#FF3366] bg-[#FF3366]/10 p-2.5 rounded-full group-hover:scale-110 transition-transform"><LogOut size={20} /></div>
                        <span className="font-black text-[#FF3366] tracking-widest uppercase text-sm">Log Out</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
