import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Volume2, VolumeX, Star, Trophy, Rocket, Cloud, Heart, Info } from 'lucide-react';

const NavBar = () => {
    const { gameState, toggleSound } = useGame();
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isHub = location.pathname === '/hub';

    return (
        <nav style={{
            padding: 'var(--spacing-md) var(--spacing-lg)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: '80px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flex: 1 }}>
                {!isHome && (
                    <button
                        onClick={() => navigate(isHub ? '/' : '/hub')}
                        style={{
                            background: '#f1f3f5',
                            width: '50px',
                            height: '50px',
                            padding: 0,
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--color-text)'
                        }}
                        title="Go Back"
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}

                {!isHome && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--color-primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                            {React.createElement(
                                {
                                    star: Star,
                                    rocket: Rocket,
                                    rainbow: Cloud,
                                    heart: Heart
                                }[gameState.player.avatar] || Star,
                                { size: 20, fill: 'currentColor' }
                            )}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-primary)' }}
                        >
                            {gameState.player.name}'s Adventure
                        </motion.div>
                    </div>
                )}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                background: '#f8f9fa',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '2px solid #e9ecef'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div
                        key={gameState.stars}
                        initial={{ scale: 1.5, color: '#ff8811' }}
                        animate={{ scale: 1, color: '#f4d06f' }}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Star fill="#f4d06f" size={24} color="#f4d06f" />
                    </motion.div>
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', minWidth: '30px' }}>
                        {gameState.stars}
                    </span>
                </div>

                <div style={{ width: '2px', height: '24px', background: '#dee2e6' }} />

                <button
                    onClick={toggleSound}
                    style={{
                        background: 'none',
                        padding: '0.5rem',
                        minHeight: 'auto',
                        color: gameState.settings.sound ? 'var(--color-primary)' : '#adb5bd',
                        boxShadow: 'none'
                    }}
                >
                    {gameState.settings.sound ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>

                <div style={{ width: '2px', height: '24px', background: '#dee2e6' }} />

                <button
                    onClick={() => navigate('/progress')}
                    style={{
                        background: 'none',
                        padding: '0.5rem',
                        minHeight: 'auto',
                        color: 'var(--color-success)',
                        boxShadow: 'none'
                    }}
                    title="My Progress"
                >
                    <Trophy size={24} />
                </button>

                <div style={{ width: '2px', height: '24px', background: '#dee2e6' }} />

                <button
                    onClick={() => navigate('/about')}
                    style={{
                        background: 'none',
                        padding: '0.5rem',
                        minHeight: 'auto',
                        color: 'var(--color-primary)',
                        boxShadow: 'none'
                    }}
                    title="About Project"
                >
                    <Info size={24} />
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
