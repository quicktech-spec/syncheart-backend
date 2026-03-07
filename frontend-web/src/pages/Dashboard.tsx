import { useState } from 'react';
import { useSyncStore } from '../store';
import { Heart, MessageCircle, Sparkles, Calendar, Activity, Flame, HeartHandshake, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Dashboard() {
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const partnerName = partner ? (partner as any).display_name || partner.email.split('@')[0] : null;
    const gamificationLevel = 'Radiant Peak';

    const [distance, setDistance] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const handleSendNudge = () => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#FF2A5F', '#E5A93C', '#FF7096']
        });
        alert(`💖 Frequency Pulse sent${partnerName ? ` to ${partnerName}` : ''}!`);
    };

    const fetchLiveLocation = () => {
        if (!partnerName) {
            alert("Sync with a partner first to see live resonance!");
            return;
        }
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setTimeout(() => {
                        const mockMiles = (Math.random() * 5 + 0.1).toFixed(1);
                        setDistance(mockMiles);
                        setIsLocating(false);
                    }, 1500);
                },
                () => {
                    alert("Location access denied. Please enable resonance sensors.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Resonance tracking not supported by your browser.");
            setIsLocating(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#09090B', minHeight: '100vh', paddingBottom: '120px', color: '#FFFFFF', position: 'relative' }}>
            {/* Dark Header with Gradient Overlays */}
            <div style={{
                padding: '80px 32px 60px 32px',
                borderBottomLeftRadius: '40px',
                borderBottomRightRadius: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                background: 'linear-gradient(180deg, rgba(255,42,95,0.15) 0%, rgba(9,9,11,1) 100%), #09090B'
            }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', opacity: 0.05 }} className="animate-heartbeat">
                    <Heart size={280} fill="white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        {partnerName ? (
                            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 15px rgba(74,222,128,0.8)' }} className="animate-pulse" />
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white' }}>{partnerName} Synchronized</span>
                            </div>
                        ) : (
                            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(30px)', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>Single Resonance</span>
                            </div>
                        )}
                    </div>
                    <h1 style={{ fontSize: '48px', fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px', color: 'white' }}>
                        Hello, {profile?.display_name?.split(' ')[0] || 'Member'}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 500 }}>
                        Bonds are <span style={{ color: '#FF2A5F', fontWeight: 900, textTransform: 'uppercase' }}>Deep</span> today.
                    </p>
                </motion.div>
            </div>

            {/* Content Hub */}
            <div style={{ padding: '0 24px', marginTop: '-30px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 20 }}>

                {/* Main Sync Card - Luxurious Dark */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        padding: '32px',
                        background: 'linear-gradient(135deg, rgba(30,30,35,0.9) 0%, rgba(15,15,20,1) 100%)',
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,42,95,0.15)', border: '1px solid rgba(255,42,95,0.3)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2A5F' }}>
                            <Heart size={30} className="animate-heartbeat" fill="currentColor" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Sync Energy</p>
                            <h2 style={{ fontSize: '56px', fontWeight: 900, letterSpacing: '-0.05em', color: 'white', lineHeight: 1 }}>98<span style={{ fontSize: '20px', color: '#FF2A5F' }}>%</span></h2>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ height: '6px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 2, ease: "circOut" }}
                                style={{ height: '100%', background: 'linear-gradient(90deg, #FF2A5F, #FF7096)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,42,95,0.7)' }}>
                            <span>Harmonic Alignment</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{gamificationLevel}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSendNudge}
                        style={{ width: '100%', marginTop: '32px', backgroundColor: '#FF2A5F', color: 'white', padding: '22px', borderRadius: '24px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.4em', border: 'none', boxShadow: '0 15px 30px rgba(255,42,95,0.4)', cursor: 'pointer' }}
                    >
                        Send Heart Pulse
                    </button>
                </motion.div>

                {/* 2x2 Feature Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {/* Item 1: Whispers */}
                    <Link to="/chat" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(99,102,241,0.1)', color: '#818cf8', borderRadius: '18px', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                <MessageCircle size={22} />
                            </div>
                            <h4 style={{ fontWeight: 900, color: 'white', letterSpacing: '0.05em', fontSize: '13px', textTransform: 'uppercase' }}>Whispers</h4>
                            <p style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 900, color: 'rgba(255,255,255,0.3)', marginTop: '4px', letterSpacing: '0.15em' }}>Private Sanctum</p>
                        </div>
                    </Link>

                    {/* Item 2: Rituals */}
                    <Link to="/activities" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(245,158,11,0.1)', color: '#fbbf24', borderRadius: '18px', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                <Sparkles size={22} />
                            </div>
                            <h4 style={{ fontWeight: 900, color: 'white', letterSpacing: '0.05em', fontSize: '13px', textTransform: 'uppercase' }}>Rituals</h4>
                            <p style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 900, color: 'rgba(255,255,255,0.3)', marginTop: '4px', letterSpacing: '0.15em' }}>Play Rituals</p>
                        </div>
                    </Link>

                    {/* Item 3: Live Resonance */}
                    <button
                        onClick={distance ? () => window.open('https://www.google.com/maps/dir/?api=1', '_blank') : fetchLiveLocation}
                        disabled={isLocating}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <div style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                            <div style={{ width: '50px', height: '50px', backgroundColor: distance ? '#FF2A5F' : 'rgba(14,165,233,0.1)', color: distance ? 'white' : '#38bdf8', borderRadius: '18px', border: distance ? '1px solid #FF2A5F' : '1px solid rgba(14,165,233,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                {distance ? <Navigation size={22} className="animate-pulse" /> : <MapPin size={22} />}
                            </div>
                            <h4 style={{ fontWeight: 900, color: 'white', letterSpacing: '0.05em', fontSize: '13px', textTransform: 'uppercase' }}>Resonance</h4>
                            <p style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 900, color: '#FF2A5F', marginTop: '4px', letterSpacing: '0.15em' }}>
                                {isLocating ? 'Locating...' : distance ? `${distance} miles` : 'Trace Partner'}
                            </p>
                        </div>
                    </button>

                    {/* Item 4: Chronicle */}
                    <Link to="/memories" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(244,63,94,0.1)', color: '#fb7185', borderRadius: '18px', border: '1px solid rgba(244,63,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                <Calendar size={22} />
                            </div>
                            <h4 style={{ fontWeight: 900, color: 'white', letterSpacing: '0.05em', fontSize: '13px', textTransform: 'uppercase' }}>Chronicle</h4>
                            <p style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 900, color: 'rgba(255,255,255,0.3)', marginTop: '4px', letterSpacing: '0.15em' }}>{partnerName ? '12 Days Left' : 'Sync First'}</p>
                        </div>
                    </Link>
                </div>

                {/* Footer Section */}
                <div style={{ padding: '40px 0 20px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '20px' }}>
                    <h2 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '36px', color: 'white', marginBottom: '12px' }}>Deep Hearts.</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 500, marginBottom: '32px', maxWidth: '280px' }}>Everything you need to nurture a conscious and lasting bond.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { icon: Activity, title: "Bio-Sync", desc: "Shared Wellness Tracking", col: "#10b981", bg: "rgba(16,185,129,0.1)" },
                            { icon: Flame, title: "Intensity", desc: "Heartbeat synchronize", col: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
                            { icon: HeartHandshake, title: "Support", desc: "Soul resonance", col: "#3b82f6", bg: "rgba(59,130,246,0.1)" }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: item.bg, color: item.col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <item.icon size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontWeight: 900, color: 'white', fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.title}</h4>
                                    <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '2px' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}