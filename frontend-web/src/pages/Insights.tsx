import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', uv: 80, pv: 2400, amt: 2400 },
    { name: 'Tue', uv: 85, pv: 1398, amt: 2210 },
    { name: 'Wed', uv: 70, pv: 9800, amt: 2290 },
    { name: 'Thu', uv: 88, pv: 3908, amt: 2000 },
    { name: 'Fri', uv: 92, pv: 4800, amt: 2181 },
    { name: 'Sat', uv: 95, pv: 3800, amt: 2500 },
    { name: 'Sun', uv: 90, pv: 4300, amt: 2100 },
];

export default function Insights() {
    return (
        <div className="p-6 pt-12 overflow-y-auto w-full text-white bg-[#1E1E2C] min-h-screen pb-24">
            <h1 className="text-3xl font-black mb-8 tracking-tighter">AI Insights</h1>

            <div className="bg-[#2C2C3E] p-6 rounded-3xl mb-6 shadow-xl border border-gray-700/30 w-full">
                <h2 className="text-[#00D68F] font-bold tracking-widest text-sm uppercase mb-6">Emotional Graph (Weekly)</h2>

                <div className="w-full h-64 -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3d3d52" vertical={false} />
                            <XAxis dataKey="name" stroke="#8E8E93" tick={{ fill: '#8E8E93', fontSize: 12 }} />
                            <YAxis stroke="#8E8E93" tick={{ fill: '#8E8E93', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1E1E2C', borderRadius: '12px', border: '1px solid #3d3d52' }} />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#00D68F"
                                strokeWidth={4}
                                dot={{ fill: '#1E1E2C', r: 5, strokeWidth: 2 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-[#2C2C3E] p-6 rounded-3xl mb-6 shadow-xl border border-gray-700/30">
                <h2 className="text-[#8A2BE2] font-bold tracking-widest text-sm uppercase mb-2">Compatibility Trend</h2>
                <p className="text-5xl font-black text-white mb-2">High</p>
                <p className="text-gray-400 text-sm leading-relaxed italic">Your communication styles are overlapping perfectly this week. Consider spending intentional quality time this weekend.</p>
            </div>

            <div className="bg-gradient-to-r from-transparent to-[#FF3366]/10 p-6 rounded-3xl border border-[#FF3366]/20">
                <h2 className="text-[#FF3366] font-bold tracking-widest text-sm uppercase mb-2">Drift Prediction</h2>
                <p className="text-white text-lg font-medium leading-relaxed">The AI has analyzed your 14-day logs. We predict a <b>Low</b> emotional drift right now. Keep up the open triggers conversations!</p>
            </div>
        </div>
    );
}
