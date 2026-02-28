import { useState, useEffect } from 'react';
import { useSyncStore } from '../store';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

// Floating heart particle
function HeartParticle({ style }: { style: React.CSSProperties }) {
    return (
        <div style={style} className="heart-particle">
            ♥
        </div>
    );
}

export default function Login() {
    const setUser = useSyncStore(s => s.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [particles] = useState(() =>
        Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 18 + 10}px`,
            duration: `${Math.random() * 8 + 6}s`,
            delay: `${Math.random() * 6}s`,
            opacity: Math.random() * 0.35 + 0.1,
        }))
    );

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
            setUser({ id: res.data.access_token, email });
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 404 || err.response?.status === 400) {
                try {
                    const regRes = await axios.post(`${BASE_URL}/api/v1/auth/register`, { email, password });
                    setUser({ id: regRes.data.access_token, email });
                } catch (regErr: any) {
                    setError(regErr.response?.data?.message || 'Failed to authenticate');
                }
            } else {
                setError(err.response?.data?.message || 'Server error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #1a0a1e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}>

            {/* Animated glowing orbs */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%',
                width: '500px', height: '500px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,83,112,0.25) 0%, transparent 70%)',
                animation: 'floatOrb 8s ease-in-out infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '-15%', right: '-10%',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
                animation: 'floatOrb 10s ease-in-out infinite reverse',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: '30%', right: '5%',
                width: '300px', height: '300px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,165,80,0.15) 0%, transparent 70%)',
                animation: 'floatOrb 7s ease-in-out infinite 2s',
                pointerEvents: 'none',
            }} />

            {/* Floating heart particles */}
            {particles.map(p => (
                <HeartParticle key={p.id} style={{
                    position: 'absolute',
                    left: p.left,
                    bottom: '-30px',
                    fontSize: p.size,
                    color: `rgba(255, 100, 140, ${p.opacity})`,
                    animation: `riseUp ${p.duration} ease-in infinite`,
                    animationDelay: p.delay,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }} />
            ))}

            {/* Main glass card */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '420px',
                margin: '20px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '28px',
                padding: '44px 40px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    {/* SVG Logo - SynchHeart infinity-heart */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '86px', height: '86px',
                        background: 'linear-gradient(135deg, rgba(255,83,112,0.2), rgba(147,51,234,0.2))',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,100,140,0.4)',
                        marginBottom: '16px',
                        boxShadow: '0 0 40px rgba(255,83,112,0.3)',
                    }}>
                        <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff537a" />
                                    <stop offset="100%" stopColor="#9333ea" />
                                </linearGradient>
                            </defs>
                            {/* Left heart lobe */}
                            <path d="M50 78 C50 78 12 55 12 33 C12 20 22 12 35 18 C41 21 46 27 50 34 C54 27 59 21 65 18 C78 12 88 20 88 33 C88 55 50 78 50 78Z" fill="url(#hg)" opacity="0.9" />
                            {/* Infinity overlay */}
                            <path d="M25 50 C25 44 30 40 36 40 C42 40 47 44 50 50 C53 56 58 60 64 60 C70 60 75 56 75 50 C75 44 70 40 64 40 C58 40 53 44 50 50 C47 56 42 60 36 60 C30 60 25 56 25 50Z"
                                stroke="rgba(255,255,255,0.7)" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        margin: '0 0 6px 0',
                        background: 'linear-gradient(90deg, #ff8fa3, #e879f9, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.5px',
                    }}>SynchHeart</h1>

                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontWeight: '500',
                    }}>Shared Love & Connection</p>
                </div>

                {/* Tab Toggle */}
                <div style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '4px',
                    marginBottom: '28px',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}>
                    {['Sign In', 'Register'].map((label, i) => (
                        <button key={label} onClick={() => { setIsLogin(i === 0); setError(''); }}
                            style={{
                                flex: 1, padding: '9px', border: 'none', cursor: 'pointer',
                                borderRadius: '9px', fontSize: '14px', fontWeight: '600',
                                transition: 'all 0.25s ease',
                                background: (i === 0) === isLogin
                                    ? 'linear-gradient(135deg, #ff537a, #9333ea)'
                                    : 'transparent',
                                color: (i === 0) === isLogin ? '#fff' : 'rgba(255,255,255,0.5)',
                                boxShadow: (i === 0) === isLogin ? '0 4px 14px rgba(255,83,122,0.4)' : 'none',
                            }}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tagline */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '24px',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '13px',
                    lineHeight: '1.5',
                }}>
                    {isLogin
                        ? '💑 Welcome back. Your partner is waiting.'
                        : '🌹 Start your journey together today.'}
                </div>

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {error && (
                        <div style={{
                            background: 'rgba(255,83,112,0.12)',
                            border: '1px solid rgba(255,83,112,0.3)',
                            borderRadius: '10px',
                            padding: '11px 14px',
                            color: '#ff8fa3',
                            fontSize: '13px',
                            textAlign: 'center',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Email field */}
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                            fontSize: '16px', pointerEvents: 'none',
                        }}>📧</span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '13px',
                                padding: '14px 14px 14px 42px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = 'rgba(255,83,112,0.6)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(255,83,112,0.12)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Password field */}
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                            fontSize: '16px', pointerEvents: 'none',
                        }}>🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={8}
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '13px',
                                padding: '14px 14px 14px 42px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = 'rgba(255,83,112,0.6)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(255,83,112,0.12)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            background: isLoading
                                ? 'rgba(255,83,112,0.4)'
                                : 'linear-gradient(135deg, #ff537a 0%, #c026d3 60%, #7c3aed 100%)',
                            border: 'none',
                            borderRadius: '13px',
                            padding: '15px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            marginTop: '4px',
                            boxShadow: isLoading ? 'none' : '0 8px 30px rgba(255,83,112,0.45)',
                            transition: 'transform 0.15s, box-shadow 0.15s',
                            letterSpacing: '0.3px',
                        }}
                        onMouseEnter={e => { if (!isLoading) { (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(255,83,112,0.55)'; } }}
                        onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'none'; (e.target as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(255,83,112,0.45)'; }}
                    >
                        {isLoading ? '✨ Connecting...' : isLogin ? '💑 Sign In Together' : '🌹 Begin Our Journey'}
                    </button>
                </form>

                {/* Footer tagline */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}>
                    <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>♥ forever</span>
                    <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
                </div>
            </div>

            {/* Keyframe styles */}
            <style>{`
        @keyframes riseUp {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.5) rotate(20deg); opacity: 0; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -40px) scale(1.05); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }
        .heart-particle {
          will-change: transform, opacity;
        }
        input::placeholder { color: rgba(255,255,255,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(48,43,99,0.9) inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>
        </div>
    );
}
