import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Rocket, Cloud, Heart } from 'lucide-react';
import { useGame } from '../context/GameContext';

const CharacterGuide = ({ message, expression = 'happy', position = 'right' }) => {
    const { gameState } = useGame();

    const avatars = {
        star: { icon: Star, color: '#f4d06f' },
        rocket: { icon: Rocket, color: '#8e7dbe' },
        rainbow: { icon: Cloud, color: '#67b99a' },
        heart: { icon: Heart, color: '#ef6461' },
    };

    const selectedAvatar = avatars[gameState.player.avatar] || avatars.star;
    const Icon = selectedAvatar.icon;

    return (
        <div style={{
            display: 'flex',
            flexDirection: position === 'right' ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: '1rem',
            margin: '2rem 0',
            padding: '1rem',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow)',
            position: 'relative',
            overflow: 'visible'
        }}>
            <motion.div
                animate={{
                    y: [0, -5, 0],
                    rotate: expression === 'excited' ? [0, 5, -5, 0] : 0
                }}
                transition={{
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 0.5, repeat: expression === 'excited' ? Infinity : 0 }
                }}
                style={{
                    width: '60px',
                    height: '60px',
                    background: selectedAvatar.color,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                }}
            >
                <Icon size={32} fill="currentColor" />
            </motion.div>

            <div style={{ flex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={message}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                            margin: 0
                        }}
                    >
                        {message}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Speech bubble tail approach */}
            <div style={{
                position: 'absolute',
                [position === 'right' ? 'left' : 'right']: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                [position === 'right' ? 'borderRight' : 'borderLeft']: '10px solid white',
                display: 'none' /* Simple layout for now */
            }} />
        </div>
    );
};

export default CharacterGuide;
