import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Hash, Plus, Minus, Shapes, LayoutGrid, Star } from 'lucide-react';

const games = [
    {
        id: 'numberWorld',
        title: 'Number World',
        icon: Hash,
        color: '#8e7dbe',
        path: '/numbers',
        description: 'Learn to count cute things!'
    },
    {
        id: 'additionQuest',
        title: 'Addition Quest',
        icon: Plus,
        color: '#67b99a',
        path: '/addition',
        description: 'Add friends together!'
    },
    {
        id: 'subtractionJourney',
        title: 'Subtraction Journey',
        icon: Minus,
        color: '#ef6461',
        path: '/subtraction',
        description: 'Watch friends float away!'
    },
    {
        id: 'shapeAdventure',
        title: 'Shape Adventure',
        icon: Shapes,
        color: '#f4d06f',
        path: '/shapes',
        description: 'Match the friendly shapes!'
    },
    {
        id: 'patternPlay',
        title: 'Pattern Play',
        icon: LayoutGrid,
        color: '#ff8811',
        path: '/patterns',
        description: 'What comes next?'
    },
];

const GameHub = () => {
    const { gameState, setDifficulty } = useGame();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '1rem 0' }}
        >
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    Hello, {gameState.player.name || 'Friend'}!
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', opacity: 0.7 }}>
                    Choose an adventure to start learning!
                </p>
                <div style={{ width: '80px', height: '4px', background: 'var(--color-secondary)', margin: '1rem auto 0', borderRadius: '2px' }} />
            </header>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                paddingBottom: '2rem'
            }}>
                {games.map((game, index) => {
                    const Icon = game.icon;
                    const gameProgress = gameState.progress[game.id] || 0;

                    return (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(game.path)}
                            className="game-card"
                            style={{ cursor: 'pointer', flex: '1 1 320px', maxWidth: '400px' }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: 'var(--radius-lg)',
                                background: `${game.color}22`,
                                color: game.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <Icon size={40} strokeWidth={2.5} />
                            </div>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                                {game.title}
                            </h3>

                            <p style={{ fontSize: '1rem', color: 'var(--color-text)', opacity: 0.6, marginBottom: '1.5rem' }}>
                                {game.description}
                            </p>

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                background: '#f1f3f5',
                                borderRadius: 'var(--radius-sm)',
                                padding: '4px',
                                marginBottom: '1.5rem',
                                gap: '4px'
                            }}>
                                {['easy', 'medium', 'hard'].map((level) => {
                                    const isSelected = (gameState.selections?.[game.id] || 'easy') === level;
                                    return (
                                        <button
                                            key={level}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDifficulty(game.id, level);
                                            }}
                                            style={{
                                                flex: 1,
                                                minHeight: '36px',
                                                fontSize: '0.8rem',
                                                padding: '0',
                                                background: isSelected ? 'white' : 'transparent',
                                                color: isSelected ? game.color : '#adb5bd',
                                                boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                                border: isSelected ? `1px solid ${game.color}22` : '1px solid transparent'
                                            }}
                                        >
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{
                                width: '100%',
                                marginTop: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '700' }}>
                                    <span>{(gameState.selections?.[game.id] || 'easy').toUpperCase()} Progress</span>
                                    <span style={{ color: 'var(--color-success)' }}>{gameProgress[gameState.selections?.[game.id] || 'easy'] || 0}%</span>
                                </div>
                                <div className="progress-container">
                                    <div className="progress-bar" style={{ width: `${gameProgress[gameState.selections?.[game.id] || 'easy'] || 0}%`, backgroundColor: game.color }} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default GameHub;
