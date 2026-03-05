import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Zap, BarChart3, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
    { name: 'Mon', uv: 80 },
    { name: 'Tue', uv: 85 },
    { name: 'Wed', uv: 70 },
    { name: 'Thu', uv: 88 },
    { name: 'Fri', uv: 92 },
    { name: 'Sat', uv: 95 },
    { name: 'Sun', uv: 90 },
];

export default function Insights() {
    return (
        <div className="min-h-screen bg-[#0F0F1A] text-white pb-32 relative font-sans">
            {/* Background Glows */}
            <div className="glow-circle w-[300px] h-[300px] bg-emerald-500/10 -top-20 -left-20" />
            <div className="glow-circle w-[300px] h-[300px] bg-purple-600/10 bottom-20 -right-20" />

            {/* Header */}
            <div className="bg-mesh-purple rounded-b-[60px] px-8 pt-16 pb-20 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-12 relative z-10">
                    <Link to="/" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-emerald-400">
                        <BrainCircuit size={24} />
                    </div>
                </div>

                <h1 className="text-5xl font-black tracking-tighter mb-4 text-gradient relative z-10">Core Stats.</h1>
                <p className="text-white/40 font-medium tracking-wide text-lg max-w-[260px] relative z-10">AI-driven emotional intelligence reports.</p>
            </div>

            <div className="px-6 -mt-10 relative z-20 space-y-6">
                {/* Main Graph Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass rounded-[40px] p-8 border border-white/10 shadow-2xl overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-emerald-400 font-black tracking-[0.2em] text-[10px] uppercase mb-1">Frequency Index</h2>
                            <p className="text-2xl font-black text-white tracking-tighter">Weekly Harmony</p>
                        </div>
                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-emerald-400">
                            <BarChart3 size={20} />
                        </div>
                    </div>

                    <div className="w-full h-64 -ml-2 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.2)"
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 900 }}
                                    axisLine={false}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(15,15,26,0.9)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        color: '#fff'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#00D68F"
                                    strokeWidth={5}
                                    dot={{ fill: '#00D68F', r: 0 }}
                                    activeDot={{ r: 8, fill: '#00D68F', stroke: '#fff', strokeWidth: 2 }}
                                    animationDuration={2000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Growth: +12.4%</span>
                        </div>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Period: Last 7 Days</span>
                    </div>
                </motion.div>

                {/* Compatibility Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-[40px] p-8 border border-white/10 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <Sparkles size={100} className="text-purple-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-purple-400 font-bold tracking-widest text-[10px] uppercase mb-2">Compatibility Trend</h2>
                        <p className="text-5xl font-black text-white mb-4 tracking-tighter italic">High Frequency</p>
                        <p className="text-white/40 text-lg font-medium leading-relaxed italic">Your communication styles are overlapping perfectly this week. High quality intentional moments detected.</p>
                    </div>
                </motion.div>

                {/* Drift Prediction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-mesh-pink rounded-[40px] p-10 border border-white/5 shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <BrainCircuit size={18} className="text-white" />
                            <h2 className="text-white font-black tracking-widest text-[10px] uppercase">Drift Prediction</h2>
                        </div>
                        <p className="text-white text-2xl font-black tracking-tighter leading-tight">
                            The AI predicts a <span className="underline decoration-pink-300">minimal</span> emotional drift. Keep the frequency active!
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
