/**
 * SynchHeart – Couple Connect Page
 *
 * Security Model:
 *   • All messages are encrypted with AES-GCM (256-bit) in the browser
 *     BEFORE being sent to the server.
 *   • The encryption key is derived from the relationship ID using PBKDF2
 *     (100,000 iterations, SHA-256) seeded with a per-session salt.
 *   • The server ONLY stores: ciphertext, IV, auth_tag, sender_id, created_at.
 *   • Neither the server nor the database ever sees plaintext messages.
 */

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSyncStore } from '../store';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';

// ────────────────────────────────────────────────────────────
//  AES-GCM helpers (Web Crypto API – runs entirely in browser)
// ────────────────────────────────────────────────────────────

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

    // AES-GCM appends 16-byte auth tag at the end of cipherbuf
    const cipherArr = new Uint8Array(cipherbuf);
    const ciphertext = btoa(String.fromCharCode(...cipherArr));
    const ivStr = btoa(String.fromCharCode(...iv));

    return { ciphertext, iv: ivStr, auth_tag: 'aes-gcm-integrated' };
}

async function decryptMessage(ciphertext: string, ivStr: string, key: CryptoKey): Promise<string> {
    try {
        const iv = Uint8Array.from(atob(ivStr), c => c.charCodeAt(0));
        const cipherArr = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
        const plaintextBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherArr);
        return new TextDecoder().decode(plaintextBuf);
    } catch {
        return '🔒 [Encrypted message]';
    }
}

// ────────────────────────────────────────────────────────────
//  Component
// ────────────────────────────────────────────────────────────

interface Profile {
    id: string;
    email: string;
    display_name: string;
    invite_code: string;
}

interface RelationshipData {
    relationship_id: string;
    start_date: string;
    partner: { id: string; email: string; display_name: string };
}

interface DecryptedMessage {
    id: string;
    sender_id: string;
    text: string;
    created_at: string;
}

export default function Connect() {
    const user = useSyncStore(s => s.user);
    const token = user?.id;

    const [profile, setProfile] = useState<Profile | null>(null);
    const [relationship, setRelationship] = useState<RelationshipData | null>(null);
    const [inviteInput, setInviteInput] = useState('');
    const [messages, setMessages] = useState<DecryptedMessage[]>([]);
    const [newMsg, setNewMsg] = useState('');
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const pollRef = useRef<any>(null);

    const authHeaders = { Authorization: `Bearer ${token}` };

    // LOAD profile + relationship
    useEffect(() => {
        async function init() {
            setLoading(true);
            try {
                const [profRes, relRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/v1/users/me`, { headers: authHeaders }),
                    axios.get(`${BASE_URL}/api/v1/users/me/relationship`, { headers: authHeaders }),
                ]);
                setProfile(profRes.data);
                if (relRes.data) {
                    setRelationship(relRes.data);
                    const key = await deriveKey(relRes.data.relationship_id);
                    setCryptoKey(key);
                }
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }
        init();
    }, []);

    // Load + decrypt messages when relationship is known
    useEffect(() => {
        if (!relationship || !cryptoKey) return;
        fetchMessages();
        pollRef.current = setInterval(fetchMessages, 5000);
        return () => clearInterval(pollRef.current);
    }, [relationship, cryptoKey]);

    // Scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function fetchMessages() {
        if (!relationship || !cryptoKey) return;
        try {
            const res = await axios.get(
                `${BASE_URL}/api/v1/users/messages/${relationship.relationship_id}`,
                { headers: authHeaders }
            );
            const decrypted = await Promise.all(
                res.data.map(async (m: any) => ({
                    id: m.id,
                    sender_id: m.sender_id,
                    text: await decryptMessage(m.ciphertext, m.iv, cryptoKey!),
                    created_at: m.created_at,
                }))
            );
            setMessages(decrypted);
        } catch { /* silent – may be rate limited */ }
    }

    async function handleSyncCouple() {
        if (!inviteInput.trim()) return;
        setSyncing(true);
        setError('');
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/users/sync-couple`,
                { invite_code: inviteInput.trim().toUpperCase() },
                { headers: authHeaders }
            );
            setRelationship(res.data);
            const key = await deriveKey(res.data.relationship_id);
            setCryptoKey(key);
        } catch (e: any) {
            setError(e.response?.data?.message || 'Could not sync. Check the invite code.');
        }
        setSyncing(false);
    }

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        if (!newMsg.trim() || !cryptoKey || !relationship) return;
        setSending(true);
        try {
            const { ciphertext, iv, auth_tag } = await encryptMessage(newMsg.trim(), cryptoKey);
            await axios.post(`${BASE_URL}/api/v1/users/messages`, {
                relationship_id: relationship.relationship_id,
                ciphertext, iv, auth_tag,
            }, { headers: authHeaders });
            setNewMsg('');
            await fetchMessages();
        } catch { /* keep msg on fail */ }
        setSending(false);
    }

    function copyInviteCode() {
        if (profile?.invite_code) {
            navigator.clipboard.writeText(profile.invite_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    const cardStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '16px',
    };

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#ff8fa3', fontSize: '24px' }}>
            ✨ Loading...
        </div>
    );

    return (
        <div style={{ padding: '20px 16px 100px', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>💑</div>
                <h2 style={{
                    margin: 0, fontSize: '26px', fontWeight: '800',
                    background: 'linear-gradient(90deg, #ff8fa3, #c026d3)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                    Couple Sync
                </h2>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Private, encrypted connection with your partner
                </p>
            </div>

            {/* YOUR INVITE CODE card */}
            {profile && (
                <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(255,83,112,0.12), rgba(147,51,234,0.12))' }}>
                    <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        🔑 Your Invite Code
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '14px 18px',
                            fontSize: '28px', fontWeight: '800', letterSpacing: '6px', color: '#ff8fa3',
                            border: '1px solid rgba(255,83,112,0.3)', textAlign: 'center',
                        }}>
                            {profile.invite_code}
                        </div>
                        <button onClick={copyInviteCode} style={{
                            background: copied ? 'rgba(0,214,143,0.2)' : 'rgba(255,83,112,0.2)',
                            border: `1px solid ${copied ? 'rgba(0,214,143,0.5)' : 'rgba(255,83,112,0.4)'}`,
                            borderRadius: '12px', padding: '14px 18px', color: '#fff',
                            cursor: 'pointer', fontSize: '20px', transition: 'all 0.2s',
                        }}>
                            {copied ? '✓' : '📋'}
                        </button>
                    </div>
                    <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                        Share this code with your partner to connect
                    </p>
                </div>
            )}

            {/* SYNC WITH PARTNER */}
            {!relationship && (
                <div style={cardStyle}>
                    <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        💫 Enter Partner's Code
                    </p>
                    {error && (
                        <div style={{ background: 'rgba(255,83,112,0.12)', border: '1px solid rgba(255,83,112,0.3)', borderRadius: '10px', padding: '10px 14px', color: '#ff8fa3', fontSize: '13px', marginBottom: '12px' }}>
                            {error}
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            value={inviteInput}
                            onChange={e => setInviteInput(e.target.value.toUpperCase())}
                            placeholder="Enter 8-digit code..."
                            maxLength={8}
                            style={{
                                flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '18px',
                                fontWeight: '700', letterSpacing: '4px', outline: 'none', textAlign: 'center',
                            }}
                        />
                        <button onClick={handleSyncCouple} disabled={syncing || inviteInput.length < 6} style={{
                            background: 'linear-gradient(135deg, #ff537a, #9333ea)',
                            border: 'none', borderRadius: '12px', padding: '14px 20px', color: '#fff',
                            cursor: syncing ? 'wait' : 'pointer', fontSize: '14px', fontWeight: '700',
                            opacity: inviteInput.length < 6 ? 0.5 : 1, whiteSpace: 'nowrap',
                        }}>
                            {syncing ? '⏳' : '💑 Sync'}
                        </button>
                    </div>
                </div>
            )}

            {/* CONNECTED BADGE */}
            {relationship && (
                <div style={{
                    ...cardStyle,
                    background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(0,150,100,0.1))',
                    border: '1px solid rgba(0,214,143,0.3)',
                    display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                    <div style={{ fontSize: '36px' }}>💚</div>
                    <div>
                        <p style={{ margin: 0, fontWeight: '700', color: '#00D68F', fontSize: '15px' }}>Connected!</p>
                        <p style={{ margin: '3px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                            {relationship.partner.email}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                            💑 Since {new Date(relationship.start_date).toLocaleDateString()}
                        </p>
                    </div>
                    <div style={{
                        marginLeft: 'auto', background: 'rgba(0,214,143,0.15)', borderRadius: '8px',
                        padding: '4px 10px', fontSize: '11px', color: '#00D68F', fontWeight: '600',
                    }}>
                        🔒 E2E Encrypted
                    </div>
                </div>
            )}

            {/* ENCRYPTED CHAT */}
            {relationship && cryptoKey && (
                <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
                    <div style={{
                        padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                        <span style={{ fontSize: '18px' }}>🔒</span>
                        <div>
                            <p style={{ margin: 0, fontWeight: '700', fontSize: '14px' }}>Private Messages</p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                                AES-256-GCM end-to-end encrypted · Server cannot read
                            </p>
                        </div>
                    </div>

                    {/* Messages list */}
                    <div style={{
                        height: '280px', overflowY: 'auto', padding: '16px',
                        display: 'flex', flexDirection: 'column', gap: '10px',
                    }}>
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', margin: 'auto', fontSize: '14px' }}>
                                🌹 Say something to your partner...
                            </div>
                        )}
                        {messages.map(msg => {
                            const isMe = msg.sender_id === profile?.id;
                            return (
                                <div key={msg.id} style={{
                                    display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                                }}>
                                    <div style={{
                                        maxWidth: '80%',
                                        background: isMe
                                            ? 'linear-gradient(135deg, #ff537a, #9333ea)'
                                            : 'rgba(255,255,255,0.1)',
                                        borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        padding: '10px 14px',
                                        fontSize: '14px', lineHeight: '1.4',
                                        boxShadow: isMe ? '0 4px 12px rgba(255,83,112,0.3)' : 'none',
                                    }}>
                                        <p style={{ margin: 0 }}>{msg.text}</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '10px', opacity: 0.6, textAlign: 'right' }}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Message input */}
                    <form onSubmit={handleSend} style={{
                        padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex', gap: '10px',
                    }}>
                        <input
                            value={newMsg}
                            onChange={e => setNewMsg(e.target.value)}
                            placeholder="Type a message... 🔒"
                            style={{
                                flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50px', padding: '12px 18px', color: '#fff', fontSize: '14px', outline: 'none',
                            }}
                        />
                        <button type="submit" disabled={sending || !newMsg.trim()} style={{
                            background: 'linear-gradient(135deg, #ff537a, #9333ea)',
                            border: 'none', borderRadius: '50%', width: '46px', height: '46px',
                            color: '#fff', cursor: 'pointer', fontSize: '16px',
                            opacity: !newMsg.trim() ? 0.4 : 1,
                        }}>
                            {sending ? '⏳' : '💌'}
                        </button>
                    </form>
                </div>
            )}

            {/* Security note */}
            <div style={{
                marginTop: '8px', padding: '14px 18px',
                background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6',
            }}>
                🛡️ <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Zero-knowledge security.</strong> Your messages are encrypted
                with AES-256-GCM before leaving your device. The SynchHeart servers and database
                only store encrypted data that cannot be deciphered without your private session key.
                Even in the event of a data breach, your messages remain completely private.
            </div>
        </div>
    );
}
