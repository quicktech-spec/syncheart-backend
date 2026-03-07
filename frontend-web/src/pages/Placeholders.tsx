import { ChevronLeft, Heart, HeartHandshake, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageTemplate = ({ title }: { title: string; children?: any }) => (
    <div className="min-h-screen bg-[#09090B] pb-32">
        <div className="bg-mesh-romantic px-8 pt-16 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden border-b border-white/5 mb-8">
            <Link to="/profile" className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors mb-8 relative z-10">
                <ChevronLeft size={24} />
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                <h1 className="text-4xl font-serif text-white tracking-wide italic leading-none mb-3">{title}</h1>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Synch Deep Resonance</p>
            </motion.div>
        </div>
        <div className="px-6 space-y-6">
            <div className="premium-card p-10 flex flex-col items-center text-center border border-white/5">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-[30px] flex items-center justify-center mb-8 border border-primary/20 animate-heartbeat">
                    <Heart size={40} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Evolving Your Bond</h2>
                <p className="text-white/40 text-sm font-medium leading-relaxed italic mb-8">
                    This resonance field is currently being meticulously calibrated to provide the deepest emotional attunement.
                </p>
                <Link to="/" className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-[20px] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all">
                    Back to Hub
                </Link>
            </div>
        </div>
    </div>
);

export const LoveLanguage = () => <PageTemplate title="Love Languages" />;
export const Mood = () => <PageTemplate title="Emotional Frequency" />;
export const Journal = () => <PageTemplate title="Heart Notes" />;
export const Goals = () => <PageTemplate title="Shared Horizon" />;

const SettingToggle = ({ label, icon: Icon, desc }: any) => (
    <button onClick={() => alert("Setting changed! ✨")} className="flex items-center justify-between w-full p-6 premium-card bg-white/5 border border-white/5 group text-left">
        <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all border border-white/10">
                <Icon size={20} />
            </div>
            <div>
                <p className="font-bold text-white tracking-wide text-sm">{label}</p>
                <p className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em] mt-0.5">{desc}</p>
            </div>
        </div>
        <Compass size={18} className="text-white/10 group-hover:text-primary transition-colors" />
    </button>
);

export const AccountSettings = () => (
    <PageTemplate title="Frequency Registry">
        <div className="space-y-4 px-6 mt-[-2rem]">
            <SettingToggle label="Update Identity" icon={Heart} desc="Manage your bio" />
            <SettingToggle label="Account Key" icon={HeartHandshake} desc="Privacy and security" />
        </div>
    </PageTemplate>
);
export const PrivacySettings = () => <PageTemplate title="Shadow Privacy" />;
export const NotificationSettings = () => <PageTemplate title="Pulse Alerts" />;
export const RelationshipSettings = () => <PageTemplate title="Bond Calibration" />;
