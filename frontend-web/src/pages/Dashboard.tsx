import { useState } from 'react';
import { useSyncStore } from '../store';
import { Heart, MessageCircle, Sparkles, Calendar, Activity, Flame, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Dashboard() {
    const partner = useSyncStore(s => s.partner);
    const profile = useSyncStore(s => s.profile);
    const partnerName = partner ? (partner as any).display_name || partner.email.split('@')[0] : null;

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
            {/* Dark Header */}
            <div style={{
                padding: '80px 32px 60px 32px',
                borderBottomLeftRadius: '40px',
                borderBottomRightRadius: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                background: 'linear-gradient(180deg, rgba(255,42,95,0.15) 0%, rgba(9,9,11,1) 100%)'
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
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }} className="animate-pulse" />
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{partnerName} Synchronized</span>
                            </div>
                        ) : (
                            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(30px)', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>Single Resonance</span>
                            </div>
                        )}
                    </div>
                    <h1 style={{ fontSize: '48px', fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
                        Hello, {profile?.display_name?.split(' ')[0] || 'Member'}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 500 }}>
                        Bonds are <span style={{ color: '#FF2A5F', fontWeight: 900, textTransform: 'uppercase' }}>Deep</span> today.
                    </p>
                </motion.div>
            </div>

            {/* Grid and Hub */}
            <div style={{ padding: '0 24px', marginTop: '-30px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 20 }}>
                {/* Main Card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{
                        padding: '32px',
                        background: 'rgba(20,20,25,1)',
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,42,95,0.1)', border: '1px solid rgba(255,42,95,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2A5F' }}>
                            <Heart size={30} className="animate-heartbeat" fill="currentColor" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Energy</p>
                            <h2 style={{ fontSize: '56px', fontWeight: 900, letterSpacing: '-0.05em', color: 'white', lineHeight: 1 }}>98<span style={{ fontSize: '20px', color: '#FF2A5F' }}>%</span></h2>
                        </div>
                    </div>

                    <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden', marginBottom: '12px' }}>
                        <motion.div style={{ width: '98%', height: '100%', background: 'linear-gradient(90deg, #FF2A5F, #FF7096)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,42,95,0.6)' }}>
                        <span>Harmonic Alignment</span>
                        <span>Radiant Peak</span>
                    </div>

                    <button
                        onClick={handleSendNudge}
                        style={{ width: '100%', marginTop: '32px', backgroundColor: '#FF2A5F', color: 'white', padding: '22px', border: 'none', borderRadius: '24px', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', boxShadow: '0 10px 20px rgba(255,42,95,0.3)', cursor: 'pointer' }}
                    >
                        Send Heart Pulse
                    </button>
                </motion.div>

                {/* 2x2 Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {[
                        { icon: MessageCircle, label: 'Whispers', sub: 'Chat', link: '/chat', color: '#818cf8' },
                        { icon: Sparkles, label: 'Rituals', sub: 'Games', link: '/activities', color: '#fbbf24' },
                        { icon: Navigation, label: 'Distance', sub: distance ? `${distance}mi` : 'Trace', custom: true, color: '#FF2A5F' },
                        { icon: Calendar, label: 'Chronicle', sub: 'Birthdays', link: '/memories', color: '#fb7185' }
                    ].map((item, i) => (
                        <div key={i}>
                            {item.custom ? (
                                <button onClick={distance ? () => window.open('https://www.google.com/maps', '_blank') : fetchLiveLocation} style={{ width: '100%', background: 'none', border: 'none', padding: 0 }}>
                                    <div style={{ background: 'rgba(25,25,30,1)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
                                        <div style={{ width: '40px', height: '40px', margin: '0 auto 12px auto', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', color: item.color }}>
                                            <item.icon size={20} />
                                        </div>
                                        <h4 style={{ color: 'white', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{item.label}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', textTransform: 'uppercase', marginTop: '4px' }}>{isLocating ? '...' : item.sub}</p>
                                    </div>
                                </button>
                            ) : (
                                <Link to={item.link || '/'} style={{ textDecoration: 'none' }}>
                                    <div style={{ background: 'rgba(25,25,30,1)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
                                        <div style={{ width: '40px', height: '40px', margin: '0 auto 12px auto', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', color: item.color }}>
                                            <item.icon size={20} />
                                        </div>
                                        <h4 style={{ color: 'white', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{item.label}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', textTransform: 'uppercase', marginTop: '4px' }}>{item.sub}</p>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer items */}
                <div style={{ marginTop: '20px' }}>
                    {[
                        { icon: Activity, title: 'Bio-Sync', sub: 'Emotional Waves', color: '#10b981' },
                        { icon: Flame, title: 'Intensity', sub: 'Soul Pulse', color: '#f43f5e' }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '20px', marginBottom: '12px' }}>
                            <div style={{ color: item.color }}><item.icon size={18} /></div>
                            <div>
                                <h5 style={{ color: 'white', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase' }}>{item.title}</h5>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', textTransform: 'uppercase' }}>{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}