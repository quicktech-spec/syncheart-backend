import React from 'react';
import { Camera, ChevronLeft, ArrowRight, Heart, HeartHandshake, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 mb-8 sticky top-0 bg-[#1E1E2C]/80 backdrop-blur-md p-4 -mx-6 -mt-6 z-50">
        <Link to={-1 as any} className="p-3 bg-[#2C2C3E] rounded-full hover:bg-white/10 transition-colors shadow-lg">
            <ChevronLeft size={24} className="text-white" />
        </Link>
        <h1 className="text-2xl font-black text-white px-2 drop-shadow-md tracking-wide">{title}</h1>
    </div>
);

export const Memories = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Our Memories" />
        <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((img, i) => (
                <div key={i} className="h-48 rounded-[24px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:scale-105 transition-all">
                    <img src={`https://picsum.photos/400/500?random=${i + 20}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="font-black text-sm text-white">Memory {i + 1}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const LoveLanguage = () => {
    const [cardIndex, setCardIndex] = useState(0);
    const questions = ["I love receiving thoughtful gifts.", "I feel loved when my partner helps with chores.", "I need deep, uninterrupted conversations."];

    const handleSwipe = () => {
        if (cardIndex < questions.length) setCardIndex(cardIndex + 1);
    };

    if (cardIndex >= questions.length) return (
        <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white flex flex-col items-center">
            <BackHeader title="DNA Results" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-gradient-to-br from-[#FF3366]/20 to-[#FFB000]/20 p-8 rounded-[32px] border border-white/10 shadow-[0_0_30px_rgba(255,51,102,0.2)] text-center mt-10 relative overflow-hidden">
                <Compass size={64} className="mx-auto mb-6 text-[#FFB000]" />
                <h2 className="text-4xl font-black mb-4 tracking-tighter drop-shadow-md">Quality Time</h2>
                <p className="text-gray-300 font-medium">Your primary love language revolves around giving and receiving undivided attention.</p>
            </motion.div>
        </div>
    );

    return (
        <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white flex flex-col items-center overflow-hidden">
            <BackHeader title="DNA Quiz" />
            <p className="text-gray-400 mt-4 tracking-wide text-sm font-bold uppercase mb-10">Question {cardIndex + 1} of 3</p>

            <div className="relative w-full h-80 flex items-center justify-center">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => { if (Math.abs(info.offset.x) > 50) handleSwipe(); }}
                    className="absolute bg-[#2C2C3E] w-full max-w-sm h-72 rounded-[32px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 text-center cursor-grab active:cursor-grabbing"
                    whileTap={{ scale: 0.95 }}
                >
                    <HeartHandshake size={48} className="text-[#FF3366] mb-6 drop-shadow-sm" />
                    <h3 className="text-2xl font-black tracking-tight leading-snug">{questions[cardIndex]}</h3>
                    <p className="text-gray-500 font-bold text-xs tracking-widest uppercase absolute bottom-6">Swipe left or right to answer</p>
                </motion.div>
            </div>
        </div>
    );
};

export const Mood = () => {
    const [saved, setSaved] = useState(false);
    const sliderY = useMotionValue(0); // 0 to 200 (down is negative visually here but let's constrain 0 to 200)
    // -100 to 100 range

    // Map motion value to a 1-10 string
    const score = useTransform(sliderY, [100, -100], [1, 10]);
    const glowColor = useTransform(sliderY, [100, -100], ["rgba(255,20,50,0.8)", "rgba(0,214,143,0.8)"]);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => window.history.back(), 1500);
    };

    if (saved) return (
        <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white flex flex-col items-center justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-[#00D68F]/20 p-8 rounded-full shadow-[0_0_50px_rgba(0,214,143,0.4)]">
                <Heart size={64} className="text-[#00D68F] animate-pulse drop-shadow-md" />
            </motion.div>
            <h2 className="text-3xl font-black mt-8 tracking-wide drop-shadow-md">Sync Score Updated!</h2>
            <p className="text-gray-400 mt-2">Your current mood has been shared securely.</p>
        </div>
    );

    return (
        <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white flex flex-col items-center">
            <BackHeader title="Daily Check-In" />

            <p className="text-gray-300 font-bold tracking-wide mt-4 mb-10 text-center text-lg">How connected do you feel today?</p>

            {/* Interactive Slider Track */}
            <div className="relative w-4 h-64 bg-[#2C2C3E] rounded-full flex flex-col items-center justify-center shadow-inner border border-white/5 mb-16">

                {/* Visual Label Top / Bottom */}
                <span className="absolute -top-8 text-[#00D68F] font-black text-sm tracking-widest uppercase">Deeply</span>
                <span className="absolute -bottom-8 text-[#FF3366] font-black text-sm tracking-widest uppercase">Distant</span>

                {/* Draggable glowing orb */}
                <motion.div
                    drag="y"
                    dragConstraints={{ top: -100, bottom: 100 }}
                    dragElastic={0.1}
                    style={{ y: sliderY, boxShadow: useTransform(glowColor, (c) => `0 0 30px 10px ${c}`) }}
                    className="absolute w-16 h-16 rounded-full bg-white cursor-grab active:cursor-grabbing border-[4px] border-[#1E1E2C] flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.p className="text-[#1E1E2C] font-black text-xl mb-0 pointer-events-none">
                        {/* Round numeric score visually inside orb */}
                        <motion.span>{useTransform(score, v => Math.round(v))}</motion.span>
                    </motion.p>
                </motion.div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="w-full max-w-xs bg-gradient-to-r from-[#00D68F] to-[#00b377] p-4 rounded-full font-black text-lg tracking-widest uppercase shadow-[0_10px_30px_rgba(0,214,143,0.3)] mt-8"
            >
                Sync My Mood
            </motion.button>
        </div>
    );
};

export const Journal = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Reflection Journal" />
        <textarea className="w-full h-64 bg-[#2C2C3E] rounded-3xl p-6 text-white border border-white/10 focus:border-[#8A2BE2] outline-none shadow-xl mt-4 max-h-screen" placeholder="How are you feeling about your relationship today?..."></textarea>
    </div>
);

export const Goals = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Growth Goals" />
        <div className="bg-[#2C2C3E] p-6 rounded-3xl shadow-xl border border-white/5">
            <label className="flex items-center gap-4 text-lg font-bold text-gray-200">
                <input type="checkbox" className="w-6 h-6 rounded-full border-gray-500 text-[#00D68F] focus:ring-[#00D68F] bg-transparent" />
                Listen without interrupting
            </label>
        </div>
    </div>
);

export const AccountSettings = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Account Settings" />
        <p className="text-gray-400 text-center mt-10">Account configuration coming soon.</p>
    </div>
);

export const RelationshipSettings = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Relationship Settings" />
        <p className="text-gray-400 text-center mt-10 font-black">Configure Partner Pairing</p>
    </div>
);

export const PrivacySettings = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Privacy Details" />
        <p className="text-gray-400 text-center mt-10">Data encrypted via AES-256 on Postgres.</p>
    </div>
);

export const NotificationSettings = () => (
    <div className="p-6 pt-12 min-h-screen bg-[#1E1E2C] text-white">
        <BackHeader title="Notifications" />
        <p className="text-gray-400 text-center mt-10">Push notifications currently disabled.</p>
    </div>
);
