import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
    {
        icon: <Heart size={100} className="text-primary animate-heartbeat" fill="currentColor" />,
        title: "Conscious Hearts.",
        description: "Track your relationship DNA over time and unlock a deeper, more intimate emotional connection."
    },
    {
        icon: <Sparkles size={100} className="text-accent animate-float" fill="currentColor" />,
        title: "Micro-Moments.",
        description: "Small nudges, daily check-ins, and shared journaling designed to nurture your bond effortlessly."
    },
    {
        icon: <Lock size={100} className="text-romantic animate-float" fill="currentColor" />,
        title: "Shared Sanctum.",
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
        <div className="fixed inset-0 bg-cream flex flex-col items-center justify-center p-10 z-50 text-romantic overflow-hidden">
            {/* Ambient Background Glows */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="absolute w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
                    style={{
                        background: [
                            'radial-gradient(circle, #FF3366 0%, transparent 70%)',
                            'radial-gradient(circle, #FFB000 0%, transparent 70%)',
                            'radial-gradient(circle, #63001A 0%, transparent 70%)'
                        ][step]
                    }}
                />
            </AnimatePresence>

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="mb-14">
                            {slides[step].icon}
                        </div>
                        <h1 className="section-header text-romantic mb-6">
                            {slides[step].title}
                        </h1>
                        <p className="text-romantic/60 font-medium px-8 leading-relaxed text-lg italic">
                            {slides[step].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full max-w-sm mb-16 flex flex-col items-center relative z-10">
                {/* Dots indicator */}
                <div className="flex gap-4 mb-14">
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === step ? 48 : 12,
                                opacity: i === step ? 1 : 0.2,
                                backgroundColor: i === step ? '#FF3366' : '#3D0014'
                            }}
                            className="h-2 rounded-full transition-all duration-500"
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="w-full bg-romantic text-white py-6 rounded-[30px] font-black text-xs tracking-[0.4em] uppercase shadow-2xl shadow-rose-900/20 flex items-center justify-center gap-4 transition-all"
                >
                    {step === slides.length - 1 ? "Enter Heart" : "Synchronize"} <ArrowRight size={20} />
                </motion.button>
            </div>
        </div>
    );
}
