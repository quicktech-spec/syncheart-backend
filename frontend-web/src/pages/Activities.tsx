import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Music, Tv, Activity, ChevronRight, ChevronLeft, Search, Play, Dumbbell, Flower2, HeartPulse, Sparkles, BrainCircuit, Heart, Mic, Phone } from 'lucide-react';
import { useSyncStore } from '../store';
import { useRef } from 'react';
import { subscribeToWS, sendWS } from '../utils/wsProvider';

type ActivitySpace = 'home' | 'music' | 'movies' | 'fitness' | 'games';

export default function Activities() {
    const profile = useSyncStore(s => s.profile);
    const partner = useSyncStore(s => s.partner);
    const partnerName = partner ? (partner as any).display_name || partner.email.split('@')[0] : 'your partner';
    const [activeSpace, setActiveSpace] = useState<ActivitySpace>('home');

    // --- Media Sync & WebRTC State ---
    const [inviteState, setInviteState] = useState<'idle' | 'sending' | 'waiting_response' | 'declined' | 'watching_together'>('idle');
    const [incomingInvite, setIncomingInvite] = useState<any>(null);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const inviteTimeoutRef = useRef<any>(null);

    const tabIdRef = useRef(Math.random().toString(36).substring(2, 9));
    const tabId = tabIdRef.current;

    useEffect(() => {
        const unsubscribe = subscribeToWS((data) => {
            if (data.type === 'invite' && data.fromTab !== tabId) {
                setIncomingInvite(data);
            }
            if (data.type === 'invite_response' && data.toTab === tabId) {
                clearTimeout(inviteTimeoutRef.current);
                if (data.accepted) {
                    setInviteState('watching_together');
                    setShowVideoCall(true);
                    startVideo();
                } else {
                    setInviteState('declined');
                }
            }
        });

        return () => unsubscribe();
    }, [tabId]);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        } catch (e) { console.error('No video', e); }
    };

    const sendInvite = (media: any, activityType: string) => {
        setInviteState('waiting_response');

        sendWS({
            type: 'invite',
            fromTab: tabId,
            fromId: profile?.id,
            fromName: profile?.display_name || 'Your partner',
            media,
            activityType,
            timestamp: Date.now()
        });

        // Fallback for single-player testing: decline after 5 seconds if no response
        inviteTimeoutRef.current = setTimeout(() => {
            setInviteState('declined');
        }, 5000);
    };

    const acceptInvite = () => {
        if (!incomingInvite) return;

        sendWS({
            type: 'invite_response',
            toTab: incomingInvite.fromTab,
            accepted: true,
            timestamp: Date.now()
        });

        setActiveSpace(incomingInvite.activityType);
        setInviteState('watching_together');
        setShowVideoCall(true);
        startVideo();
        setIncomingInvite(null);
    };

    const rejectInvite = () => {
        if (!incomingInvite) return;

        sendWS({
            type: 'invite_response',
            toTab: incomingInvite.fromTab,
            accepted: false,
            timestamp: Date.now()
        });

        setIncomingInvite(null);
    };

    const activities = [
        { id: 'music', title: 'Acoustic Pulse', desc: 'Sync your frequency with Spotify DNA', icon: Music, color: 'text-amber-500', bg: 'bg-amber-50', active: true },
        { id: 'movies', title: 'Cinema Sync', desc: 'Real-time theater for two', icon: Tv, color: 'text-pink-500', bg: 'bg-pink-50', active: true },
        { id: 'fitness', title: 'Bio-Rhythm', desc: 'Shared wellness endorphin flow', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', active: true },
        { id: 'games', title: 'Neural Play', desc: 'Sync challenges (Coming soon)', icon: Gamepad2, color: 'text-indigo-500', bg: 'bg-indigo-50', active: false },
    ];

    // --- Music State ---
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownResults, setDropdownResults] = useState<any[]>([]);

    const [activeQueue, setActiveQueue] = useState<any[]>([
        { id: '1', trackName: 'Perfect', artistName: 'Ed Sheeran', artworkUrl100: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', previewUrl: '' },
        { id: '2', trackName: 'Lover', artistName: 'Taylor Swift', artworkUrl100: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647', previewUrl: '' }
    ]);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (searchQuery.trim().length > 1) {
                setIsSearching(true);
                setShowDropdown(true);
                try {
                    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=5`);
                    const data = await res.json();
                    if (data.results) {
                        setDropdownResults(data.results.map((r: any) => ({
                            id: r.trackId,
                            trackName: r.trackName,
                            artistName: r.artistName,
                            artworkUrl100: r.artworkUrl100,
                            previewUrl: r.previewUrl
                        })));
                    }
                } catch (e) { console.error('API error:', e); }
                setIsSearching(false);
            } else {
                setShowDropdown(false);
                setDropdownResults([]);
            }
        }, 500);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    const handleSelectSong = (song: any) => {
        setActiveQueue(prev => [song, ...prev.filter(s => s.id !== song.id)]);
        setShowDropdown(false);
        setSearchQuery("");
        sendInvite(song, 'music');
    };

    const renderMusicView = () => (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col">
            <h2 className="section-header text-romantic mb-8 text-white">Listen Together.</h2>

            <div className="premium-card p-6 mb-8 relative z-50">
                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                        placeholder="Search for a frequency..."
                        className="w-full bg-black/40 border-2 border-transparent focus:border-primary/10 rounded-full py-5 px-16 text-sm font-black text-white outline-none transition-all placeholder:text-white/20"
                    />

                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-[80px] left-0 right-0 bg-[#121214] border-2 border-white/5 rounded-[35px] shadow-2xl overflow-hidden z-[100]"
                            >
                                {isSearching ? (
                                    <div className="p-10 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em] italic">Scanning Waves...</div>
                                ) : dropdownResults.length > 0 ? (
                                    dropdownResults.map((t, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleSelectSong(t)}
                                            className="flex items-center gap-5 p-5 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-all"
                                        >
                                            <img src={t.artworkUrl100} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Art" />
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-black text-white text-md truncate">{t.trackName}</p>
                                                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest truncate">{t.artistName}</p>
                                            </div>
                                            <ChevronRight size={18} className="text-white/20" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em] italic">No Signal Found</div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pb-32">
                <p className="text-white/30 font-black text-[10px] uppercase tracking-[0.3em] px-4 mb-4">Frequency History</p>
                {activeQueue.map((t, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="premium-card p-5 flex items-center gap-5 group cursor-pointer"
                        onClick={() => sendInvite(t, 'music')}
                    >
                        <div className="relative">
                            <img src={t.artworkUrl100} className="w-20 h-20 rounded-2xl shadow-md object-cover" alt="Art" />
                            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity flex-col gap-1">
                                <Play fill="white" size={24} className="text-white" />
                                <span className="text-[8px] text-white font-black uppercase tracking-widest">Live Sync</span>
                            </div>
                        </div>
                        <div className="flex-1 truncate">
                            <p className="font-black text-white text-lg truncate">{t.trackName}</p>
                            <p className="text-white/30 text-[10px] uppercase font-black tracking-widest truncate mt-0.5">{t.artistName}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary shadow-inner">
                            <Music size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    const handleWatchMovie = () => {
        sendInvite({ title: "Shared Cinema" }, 'movies');
    };

    const renderMoviesView = () => (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col">
            <h2 className="section-header text-white mb-8">Cinema Sync.</h2>
            <div className="w-full bg-black rounded-[50px] overflow-hidden shadow-2xl border-4 border-white/5 aspect-video mb-10 relative">
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&modestbranding=1`} title="YouTube" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="absolute top-0 left-0 w-full h-full opacity-90"></iframe>
                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                <div className="absolute bottom-6 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-glow"></div>
                    <p className="text-[10px] font-black uppercase text-white tracking-[0.2em]">{inviteState === 'watching_together' ? 'Partner Synced' : 'Ready to Sync'}</p>
                </div>
            </div>

            {inviteState === 'watching_together' ? (
                <div className="premium-card p-10 bg-primary text-white">
                    <h3 className="text-2xl font-black mb-3 tracking-tight">Watching With {partnerName}</h3>
                    <p className="text-white/60 text-sm font-medium leading-relaxed italic">Enjoy the film. Your video connection is active.</p>
                </div>
            ) : (
                <div className="premium-card p-10">
                    <h3 className="text-2xl font-black mb-3 tracking-tight text-white">Virtual Theater</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 italic">Experience the magic of shared viewing. Your frequencies are perfectly calibrated.</p>
                    <div className="flex gap-4">
                        <input placeholder="Search Cinema..." className="flex-1 bg-black/40 border-2 border-transparent focus:border-primary/10 rounded-full py-5 px-8 text-sm font-black text-white outline-none transition-all placeholder:text-white/20" />
                        <button onClick={handleWatchMovie} className="bg-primary text-white px-8 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Invite</button>
                    </div>
                </div>
            )}
        </motion.div>
    );

    const renderFitnessView = () => (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col">
            <h2 className="section-header text-white mb-8">Bio Rhythm.</h2>

            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="premium-card p-8 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-inner group-hover:rotate-12 transition-transform">
                        <HeartPulse size={32} />
                    </div>
                    <p className="text-5xl font-black tracking-tighter text-white mb-1 leading-none">0</p>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Sync Steps</p>
                </div>
                <div className="premium-card p-8 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-purple-500/10 text-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner group-hover:rotate-12 transition-transform">
                        <Flower2 size={32} />
                    </div>
                    <p className="text-5xl font-black tracking-tighter text-white mb-1 leading-none">0<span className="text-sm font-black">m</span></p>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Flow Time</p>
                </div>
            </div>

            <p className="text-white/30 font-black text-[10px] uppercase tracking-[0.3em] px-4 mb-6 italic text-center">Synchronized Rituals</p>
            <div className="space-y-6 mb-32 px-2">
                {[
                    { title: "Morning Flow", inst: "Adriene", id: "VaoV1PrYft4", icon: Flower2, col: "bg-purple-500/10 text-purple-400" },
                    { title: "Couples HIIT", inst: "MadFit", id: "M0uO8X3_tEA", icon: Dumbbell, col: "bg-emerald-500/10 text-emerald-400" }
                ].map((vid, i) => (
                    <div key={i} className="premium-card p-5 flex gap-6 items-center group">
                        <div className="w-28 h-20 bg-black rounded-2xl overflow-hidden relative shadow-md">
                            <img src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all group-hover:scale-110" alt="Class" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play fill="white" size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-lg text-white mb-1 leading-tight">{vid.title}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{vid.inst}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl ${vid.col} flex items-center justify-center shadow-inner`}>
                            <vid.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-cream text-white p-6 pt-12 relative overflow-x-hidden">
            <AnimatePresence mode="wait">
                {activeSpace === 'home' ? (
                    <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 z-10 relative text-white">
                        <div className="flex items-center justify-between mb-12 px-2">
                            <div className="flex items-center gap-3">
                                <BrainCircuit className="text-white/30" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Activity Hub</span>
                            </div>
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl shadow-sm flex items-center justify-center text-primary animate-heartbeat">
                                <Sparkles size={20} />
                            </div>
                        </div>

                        <h1 className="section-header text-white mb-6">Play Area.</h1>
                        <p className="text-white/40 font-medium tracking-wide text-lg max-w-[280px] mb-12 italic leading-tight">
                            "Shared play is the shortest distance between two souls."
                        </p>

                        <div className="grid grid-cols-1 gap-6 mb-32">
                            {activities.map((act, i) => (
                                <motion.div
                                    key={act.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    onClick={() => act.active && setActiveSpace(act.id as any)}
                                    className={`premium-card p-10 flex items-center justify-between transition-all duration-500 relative overflow-hidden group border border-white/5 ${act.active ? 'cursor-pointer' : 'opacity-40 pointer-events-none grayscale'}`}
                                >
                                    <div className="flex items-center gap-8 relative z-10">
                                        <div className={`w-20 h-20 rounded-[30px] flex items-center justify-center transition-all duration-500 group-hover:rotate-12 bg-white/5 border-2 border-white/10 shadow-inner ${act.color}`}>
                                            <act.icon size={36} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-3xl tracking-tighter text-white italic leading-none">{act.title}</span>
                                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2 pr-6 leading-relaxed">{act.desc}</span>
                                        </div>
                                    </div>
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <ChevronRight size={24} />
                                    </div>
                                    <div className={`absolute top-0 right-0 w-2 h-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary`}></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col z-10 w-full h-full relative">
                        <button onClick={() => setActiveSpace('home')} className="flex items-center gap-4 text-white/40 hover:text-white mb-12 font-black uppercase tracking-[0.4em] text-[10px] bg-white/5 border border-white/10 px-8 py-5 rounded-full shadow-sm transition-all w-fit">
                            <ChevronLeft size={16} /> Hub Core
                        </button>
                        {activeSpace === 'music' && renderMusicView()}
                        {activeSpace === 'movies' && renderMoviesView()}
                        {activeSpace === 'fitness' && renderFitnessView()}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Modals and Overlays --- */}

            {/* Incoming Invite Overlay */}
            <AnimatePresence>
                {incomingInvite && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex justify-center items-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#121214] border border-white/10 rounded-[50px] p-10 max-w-sm w-full text-center shadow-[0_20px_60px_rgba(255,42,95,0.3)]">
                            <Heart size={60} className="text-primary animate-heartbeat mx-auto mb-6 drop-shadow-lg" fill="currentColor" />
                            <h2 className="section-header text-white mb-3 text-3xl font-serif italic">{incomingInvite.fromName}</h2>
                            <p className="text-white/60 mb-10 font-medium">Invited you to sync a {incomingInvite.activityType === 'music' ? 'live audio stream' : 'cinema experience'}.</p>

                            <div className="flex gap-4">
                                <button onClick={rejectInvite} className="flex-1 py-5 bg-white/5 rounded-[25px] font-black text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all border border-white/5">Decline</button>
                                <button onClick={acceptInvite} className="flex-1 py-5 bg-primary text-white rounded-[25px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all">Accept</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Waiting for Response Overlay */}
            <AnimatePresence>
                {inviteState === 'waiting_response' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex justify-center items-center p-6">
                        <motion.div className="bg-[#121214] border border-white/10 rounded-[50px] p-12 max-w-sm w-full text-center shadow-2xl">
                            <div className="w-20 h-20 mx-auto mb-8 rounded-full border-[6px] border-primary border-t-transparent animate-spin"></div>
                            <h2 className="section-header text-white mb-3 text-2xl font-serif italic">Pinging {partnerName}.</h2>
                            <p className="text-white/50 font-medium italic">Waiting for them to tune into your frequency...</p>
                            <button onClick={() => { setInviteState('idle'); clearTimeout(inviteTimeoutRef.current); }} className="mt-8 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Cancel Request</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Declined / Busy Overlay */}
            <AnimatePresence>
                {inviteState === 'declined' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex justify-center items-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#121214] border border-white/10 rounded-[50px] p-10 max-w-sm w-full text-center shadow-2xl">
                            <div className="w-20 h-20 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Tv size={32} className="text-white/30" />
                            </div>
                            <h2 className="section-header text-white mb-4 text-3xl font-serif italic">Busy right now.</h2>
                            <p className="text-white/60 mb-10 font-medium leading-relaxed italic">{partnerName} can't join the sync at the moment. Would you like to continue on your own?</p>

                            <div className="flex gap-4">
                                <button onClick={() => setInviteState('idle')} className="flex-1 py-5 bg-white/5 border border-white/5 rounded-[25px] font-black text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all">Cancel</button>
                                <button onClick={() => { setInviteState('watching_together'); setShowVideoCall(false); /* Start alone */ }} className="flex-1 py-5 bg-primary text-white rounded-[25px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all">Solo Mode</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PiP Video Call Overlay */}
            <AnimatePresence>
                {showVideoCall && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        className="fixed bottom-24 right-6 w-36 h-52 bg-[#0F0F1A] rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-4 border-white z-[150] cursor-grab active:cursor-grabbing group"
                    >
                        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-glow"></div>
                            <span className="text-[8px] font-black uppercase text-white tracking-widest">{partnerName}</span>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex justify-center items-center text-white border border-white/20 hover:bg-white/40"><Mic size={16} /></button>
                            <button onClick={() => { setShowVideoCall(false); setInviteState('idle'); }} className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white shadow-lg hover:bg-romantic"><Phone className="rotate-[135deg]" size={16} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
