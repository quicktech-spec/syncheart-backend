import React, { useState } from 'react';
import { useSyncStore } from '../store';
import axios from 'axios';

export default function Login() {
    const setUser = useSyncStore(s => s.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        try {
            // Try login
            const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
            setUser({ id: res.data.access_token, email: email });
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 404) {
                try {
                    // If not found or invalid, maybe register them
                    const regRes = await axios.post(`${BASE_URL}/api/v1/auth/register`, { email, password });
                    setUser({ id: regRes.data.access_token, email: email });
                } catch (regErr: any) {
                    setError(regErr.response?.data?.message || 'Failed to authenticate');
                }
            } else {
                setError(err.response?.data?.message || 'Server error');
            }
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1E1E2C] to-black min-h-screen">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">SynchHeart</h1>
                    <p className="text-gray-400">Reconnect deeply.</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    {error && <p className="text-[#FF3366] text-sm text-center bg-[#FF3366]/10 py-2 rounded-lg">{error}</p>}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-[#2C2C3E] text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#00D68F] transition-all"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-[#2C2C3E] text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#00D68F] transition-all"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#00D68F] hover:bg-emerald-500 text-[#1E1E2C] font-black p-4 rounded-xl transition-all shadow-lg shadow-[#00D68F]/20">
                        Sign In / Register
                    </button>
                </form>
            </div>
        </div>
    );
}
