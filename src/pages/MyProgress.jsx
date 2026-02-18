import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Star, Trophy, Target, Award, Hash, Plus, Minus, Shapes, LayoutGrid } from 'lucide-react';

const MyProgress = () => {
    const { gameState } = useGame();

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
                <section className="game-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <Star fill="var(--color-secondary)" color="var(--color-secondary)" size={32} />
                        <h3 style={{ fontSize: '1.8rem' }}>Total Stars</h3>
                    </div>
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--color-secondary)' }}>
                        {gameState.stars}
                    </div>
                    <p style={{ marginTop: '1rem', fontWeight: '700', color: 'var(--color-success)' }}>
                        Super Star! 🌟
                    </p>
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
                <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem', color: 'var(--color-primary)' }}>My Achievement Badges</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {gameState.stars > 0 && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="game-card"
                            style={{ width: '160px', padding: '1.5rem' }}
                        >
                            <div style={{ background: 'var(--color-primary)22', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Award size={48} color="var(--color-primary)" />
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: '800' }}>First Star!</span>
                        </motion.div>
                    )}
                    {gameState.stars >= 50 && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="game-card"
                            style={{ width: '160px', padding: '1.5rem' }}
                        >
                            <div style={{ background: 'var(--color-secondary)22', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Trophy size={48} color="var(--color-secondary)" />
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: '800' }}>Star Collector</span>
                        </motion.div>
                    )}
                    {Object.values(gameState.progress).some(lvls => Object.values(lvls).some(v => v === 100)) && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="game-card"
                            style={{ width: '160px', padding: '1.5rem' }}
                        >
                            <div style={{ background: 'var(--color-success)22', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Award size={48} color="var(--color-success)" />
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: '800' }}>Game Master</span>
                        </motion.div>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default MyProgress;
