import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
    {
        icon: <Heart size={64} className="text-[#FF3366] drop-shadow-[0_0_20px_rgba(255,51,102,0.8)]" />,
        title: "Understand Your Partner",
        description: "Track your relationship DNA over time and unlock a deeper, more intimate emotional connection."
    },
    {
        icon: <Sparkles size={64} className="text-[#FFB000] drop-shadow-[0_0_20px_rgba(255,176,0,0.8)]" />,
        title: "Daily Micro-Moments",
        description: "Small nudges, daily check-ins, and shared journaling designed to nurture your bond effortlessly."
    },
    {
        icon: <Lock size={64} className="text-[#00D68F] drop-shadow-[0_0_20px_rgba(0,214,143,0.8)]" />,
        title: "Secure & Private",
        description: "All your shared memories and conflict resolution notes are protected by AES-256 encryption."
    }
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < slides.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 bg-[#1E1E2C] flex flex-col items-center justify-center p-6 z-50 text-white overflow-hidden">
            {/* Ambient Backgrounds */}
            <motion.div
                className="absolute w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen"
                animate={{
                    background: [
                        'radial-gradient(circle, rgba(255,51,102,0.8) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(255,176,0,0.8) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(0,214,143,0.8) 0%, transparent 70%)'
                    ][step],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1.5 }}
            />

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-8"
                        >
                            {slides[step].icon}
                        </motion.div>
                        <h1 className="text-3xl font-black mb-4 tracking-tight drop-shadow-md">
                            {slides[step].title}
                        </h1>
                        <p className="text-gray-400 font-medium px-4 leading-relaxed">
                            {slides[step].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full max-w-sm mb-12 flex flex-col items-center relative z-10">
                {/* Dots indicator */}
                <div className="flex gap-3 mb-10">
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === step ? 32 : 8,
                                backgroundColor: i === step ? '#fff' : '#4b4b60'
                            }}
                            className="h-2 rounded-full transition-all duration-300"
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-[#FF3366] to-[#FFB000] text-white py-4 rounded-full font-black text-lg tracking-widest uppercase shadow-[0_10px_30px_rgba(255,51,102,0.4)] flex items-center justify-center gap-2"
                >
                    {step === slides.length - 1 ? "Start Journey" : "Continue"} <ArrowRight size={20} />
                </motion.button>
            </div>
        </div>
    );
}
