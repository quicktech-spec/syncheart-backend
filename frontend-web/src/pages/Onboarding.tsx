import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
    {
        icon: <Heart size={100} style={{ color: '#FF2A5F' }} className="animate-heartbeat" fill="currentColor" />,
        title: "Conscious Hearts.",
        description: "Track your relationship DNA over time and unlock a deeper, more intimate emotional connection."
    },
    {
        icon: <Sparkles size={100} style={{ color: '#E5A93C' }} className="animate-float" fill="currentColor" />,
        title: "Micro-Moments.",
        description: "Small nudges, daily check-ins, and shared journaling designed to nurture your bond effortlessly."
    },
    {
        icon: <Lock size={100} style={{ color: '#FF7096' }} className="animate-float" fill="currentColor" />,
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#09090B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', zIndex: 50, color: 'white', overflow: 'hidden' }}>
            {/* Ambient Background Glows */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        filter: 'blur(150px)',
                        pointerEvents: 'none',
                        background: [
                            'radial-gradient(circle, #FF2A5F 0%, transparent 70%)',
                            'radial-gradient(circle, #E5A93C 0%, transparent 70%)',
                            'radial-gradient(circle, #FF7096 0%, transparent 70%)'
                        ][step]
                    }}
                />
            </AnimatePresence>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '360px', position: 'relative', zIndex: 10 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                    >
                        <div style={{ marginBottom: '56px' }}>
                            {slides[step].icon}
                        </div>
                        <h1 style={{ fontSize: '36px', fontFamily: 'serif', fontStyle: 'italic', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                            {slides[step].title}
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500, padding: '0 32px', lineHeight: 1.6, fontSize: '18px', fontStyle: 'italic' }}>
                            {slides[step].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div style={{ width: '100%', maxWidth: '360px', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                {/* Dots indicator */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '56px' }}>
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === step ? 48 : 12,
                                opacity: i === step ? 1 : 0.2,
                                backgroundColor: i === step ? '#FF2A5F' : 'rgba(255,255,255,0.2)'
                            }}
                            style={{ h: '8px', borderRadius: '100px', height: '8px' }}
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    style={{
                        width: '100%',
                        backgroundColor: '#FF2A5F',
                        color: 'white',
                        padding: '24px',
                        borderRadius: '30px',
                        fontWeight: 900,
                        fontSize: '12px',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        border: 'none',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        cursor: 'pointer'
                    }}
                >
                    {step === slides.length - 1 ? "Enter Heart" : "Synchronize"} <ArrowRight size={20} />
                </motion.button>
            </div>
        </div>
    );
}
