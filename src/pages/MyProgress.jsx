import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Star, Trophy, Target, Award, Hash, Plus, Minus, Shapes, LayoutGrid, Rocket, Zap, Heart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyProgress = () => {
    const { gameState, resetGame } = useGame();
    const navigate = useNavigate();

    const handleReset = () => {
        if (window.confirm("Are you sure you want to delete ALL your hard-earned stars and progress? This cannot be undone!")) {
            resetGame();
            navigate('/');
        }
    };

    const gameIcons = {
        numberWorld: Hash,
        additionQuest: Plus,
        subtractionJourney: Minus,
        shapeAdventure: Shapes,
        patternPlay: LayoutGrid
    };

    const gameTitles = {
        numberWorld: 'Number World',
        additionQuest: 'Addition Quest',
        subtractionJourney: 'Subtraction Journey',
        shapeAdventure: 'Shape Adventure',
        patternPlay: 'Pattern Play'
    };

    const badgesList = [
        { id: 'first', label: 'First Star!', icon: Award, color: 'var(--color-primary)', requirement: gameState.stars > 0, hint: 'Earn your very first star!' },
        { id: 'rising', label: 'Rising Star', icon: Zap, color: 'var(--color-accent)', requirement: gameState.stars >= 20, hint: 'Collect 20 stars total' },
        { id: 'collector', label: 'Star Collector', icon: Trophy, color: 'var(--color-secondary)', requirement: gameState.stars >= 50, hint: 'Collect 50 stars total' },
        { id: 'explorer', label: 'Math Explorer', icon: Rocket, color: 'var(--color-primary)', requirement: gameState.stars >= 100, hint: 'Collect 100 stars total' },
        { id: 'hero', label: 'Math Hero', icon: Heart, color: '#ef6461', requirement: gameState.stars >= 250, hint: 'Collect 250 stars total' },
        { id: 'master', label: 'Game Master', icon: Award, color: 'var(--color-success)', requirement: Object.values(gameState.progress).some(lvls => Object.values(lvls).some(v => v === 100)), hint: 'Finish any game 100%' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '1rem 0' }}
        >
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'var(--color-secondary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 16px rgba(244, 208, 111, 0.4)'
                }}>
                    <Trophy size={50} color="white" fill="white" />
                </div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>
                    {gameState.player.name}'s Achievement Wall
                </h2>
                <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
                    Look at everything you've learned!
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Stats Grid */}
                <section className="game-card" style={{ padding: '2rem', minHeight: '300px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        position: 'absolute',
                        right: '-20px',
                        bottom: '-20px',
                        opacity: 0.05,
                        transform: 'rotate(-15deg)'
                    }}>
                        <Star size={200} fill="var(--color-secondary)" />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', zIndex: 1, width: '100%', justifyContent: 'center' }}>
                        <Star fill="var(--color-secondary)" color="var(--color-secondary)" size={32} />
                        <h3 style={{ fontSize: '1.8rem' }}>Total Stars</h3>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                        <motion.div
                            key={gameState.stars}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ fontSize: '5.5rem', fontWeight: '900', color: 'var(--color-secondary)', textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        >
                            {gameState.stars}
                        </motion.div>
                        <p style={{ marginTop: '1rem', fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-success)', background: 'var(--color-success)11', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)' }}>
                            Super Star Journey! 🌟
                        </p>
                    </div>
                </section>

                {/* Progress Grid */}
                <section className="game-card" style={{ padding: '2rem', flex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', alignSelf: 'flex-start' }}>
                        <Target color="var(--color-primary)" size={32} />
                        <h3 style={{ fontSize: '1.8rem' }}>Learning Progress</h3>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {Object.entries(gameState.progress).map(([key, levels]) => {
                            const Icon = gameIcons[key];
                            const avgValue = Math.round((levels.easy + levels.medium + levels.hard) / 3);

                            return (
                                <div key={key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '700' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{
                                                padding: '8px',
                                                background: 'var(--color-bg)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--color-primary)'
                                            }}>
                                                <Icon size={24} />
                                            </div>
                                            <span style={{ fontSize: '1.2rem' }}>{gameTitles[key]}</span>
                                        </div>
                                        <span style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{avgValue}% Total</span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '0.5rem' }}>
                                        {['easy', 'medium', 'hard'].map(lvl => (
                                            <div key={lvl} style={{ fontSize: '0.8rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', opacity: 0.7 }}>
                                                    <span>{lvl.toUpperCase()}</span>
                                                    <span>{levels[lvl]}%</span>
                                                </div>
                                                <div className="progress-container" style={{ height: '6px' }}>
                                                    <div className="progress-bar" style={{
                                                        width: `${levels[lvl]}%`,
                                                        background: lvl === 'easy' ? 'var(--color-success)' : lvl === 'medium' ? 'var(--color-secondary)' : 'var(--color-accent)'
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <section style={{ marginTop: '4rem', borderTop: '2px solid #f1f3f5', paddingTop: '3rem' }}>
                <h3 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '1rem', color: 'var(--color-primary)' }}>My Treasure Chest</h3>
                <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.7, fontSize: '1.1rem' }}>Earn stars to unlock all the badges!</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2.5rem',
                    flexWrap: 'wrap',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {badgesList.map((badge) => {
                        const Icon = badge.icon;
                        const isUnlocked = badge.requirement;

                        return (
                            <motion.div
                                key={badge.id}
                                whileHover={isUnlocked ? { scale: 1.05, rotate: [0, -5, 5, 0] } : {}}
                                className="game-card"
                                style={{
                                    width: '200px',
                                    padding: '2rem 1rem',
                                    filter: isUnlocked ? 'none' : 'grayscale(100%)',
                                    opacity: isUnlocked ? 1 : 0.6,
                                    border: isUnlocked ? `3px solid ${badge.color}66` : '3px solid transparent',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div style={{
                                    background: isUnlocked ? `${badge.color}22` : '#f1f3f5',
                                    padding: '1.2rem',
                                    borderRadius: '50%',
                                    marginBottom: '1rem',
                                    transition: 'all 0.3s',
                                    alignSelf: 'center'
                                }}>
                                    <Icon size={48} color={isUnlocked ? badge.color : '#adb5bd'} />
                                </div>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '800',
                                        color: isUnlocked ? 'var(--color-text)' : '#adb5bd',
                                        marginBottom: '0.4rem'
                                    }}>
                                        {badge.label}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: isUnlocked ? 'var(--color-success)' : '#adb5bd',
                                        lineHeight: '1.3'
                                    }}>
                                        {isUnlocked ? 'Earned! 🏆' : `To earn: ${badge.hint}`}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <div style={{ marginTop: '5rem', textAlign: 'center', padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--color-error)', fontWeight: '800' }}>Danger Zone</h4>
                <p style={{ opacity: 0.6, marginBottom: '1.5rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                    If you want to start your MathWorld adventure from the very beginning, you can reset all your stars and progress here.
                </p>
                <button
                    onClick={handleReset}
                    className="btn-primary"
                    style={{ background: 'var(--color-error)', boxShadow: '0 4px 0 #b94a48', gap: '0.5rem', padding: '0 2.5rem' }}
                >
                    <Trash2 size={22} /> Reset All Progress
                </button>
            </div>
        </motion.div>
    );
};

export default MyProgress;
