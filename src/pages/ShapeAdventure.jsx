import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import CharacterGuide from '../components/CharacterGuide';
import { Circle, Square, Triangle, Star, Heart, Hexagon } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '../utils/sounds';

const shapes = [
    { id: 'circle', icon: Circle, name: 'Circle', color: '#ef6461' },
    { id: 'square', icon: Square, name: 'Square', color: '#8e7dbe' },
    { id: 'triangle', icon: Triangle, name: 'Triangle', color: '#67b99a' },
    { id: 'star', icon: Star, name: 'Star', color: '#f4d06f' },
    { id: 'heart', icon: Heart, name: 'Heart', color: '#ff8811' },
    { id: 'hexagon', icon: Hexagon, name: 'Hexagon', color: '#4cc9f0' },
];

const ShapeAdventure = () => {
    const { gameState, addStars, updateGameProgress } = useGame();
    const navigate = useNavigate();
    const difficulty = gameState.selections?.shapeAdventure || 'easy';

    const [targetShape, setTargetShape] = useState(shapes[0]);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('Find the matching shape!');
    const [isCorrect, setIsCorrect] = useState(null);
    const [round, setRound] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (round > 10) {
            setIsGameOver(true);
        } else {
            generateRound();
        }
    }, [round]);

    const generateRound = () => {
        const optionCounts = { easy: 3, medium: 4, hard: 6 };
        const maxOptions = optionCounts[difficulty];

        const target = shapes[Math.floor(Math.random() * shapes.length)];
        setTargetShape(target);

        const opts = [target];
        const availableShapes = [...shapes].filter(s => s.id !== target.id);

        while (opts.length < maxOptions && availableShapes.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableShapes.length);
            const wrong = availableShapes.splice(randomIndex, 1)[0];
            opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setIsCorrect(null);
        setFeedback(`Can you find the ${target.name}?`);
    };

    const handleAnswer = (shapeId) => {
        if (shapeId === targetShape.id) {
            playSuccessSound();
            setIsCorrect(true);
            setFeedback(`Yes! That is a ${targetShape.name}!`);
            addStars(5, difficulty); // Base 5
            updateGameProgress('shapeAdventure', Math.min(round * 10, 100), difficulty);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            setTimeout(() => setRound(r => r + 1), 2000);
        } else {
            playErrorSound();
            setIsCorrect(false);
            setFeedback('Almost! Look for the same shape.');
            setTimeout(() => setIsCorrect(null), 1000);
        }
    };

    if (isGameOver) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="game-card"
                style={{ padding: '3rem', marginTop: '2rem' }}
            >
                <Star size={80} fill="var(--color-secondary)" color="var(--color-secondary)" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Shape Master!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You finished Shape Adventure!</p>
                <button className="btn-primary" onClick={() => navigate('/hub')} style={{ fontSize: '1.2rem' }}>
                    See My Progress
                </button>
            </motion.div>
        );
    }

    const TargetIcon = targetShape.icon;

    return (
        <div className="game-container">
            <CharacterGuide message={feedback} expression={isCorrect ? 'excited' : 'happy'} />

            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem'
            }}>
                <motion.div
                    key={targetShape.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    style={{ color: targetShape.color }}
                >
                    <TargetIcon size={120} strokeWidth={3} fill={targetShape.color + '22'} />
                </motion.div>
                <h2 style={{ marginTop: '1rem', color: targetShape.color }}>{targetShape.name}</h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: options.length <= 3 ? `repeat(${options.length}, 1fr)` : 'repeat(3, 1fr)',
                gap: '1.5rem',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {options.map((shape) => {
                    const Icon = shape.icon;
                    return (
                        <button
                            key={shape.id}
                            onClick={() => handleAnswer(shape.id)}
                            className="btn-item-option"
                            style={{
                                height: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                border: isCorrect && shape.id === targetShape.id ? '4px solid var(--color-success) !important' : ''
                            }}
                        >
                            <Icon size={32} fill={shape.color} />
                            <span>{shape.name}</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p style={{ fontWeight: '800', color: 'var(--color-primary)' }}>
                    Round {round > 10 ? 10 : round} of 10
                </p>
            </div>
        </div>
    );
};

export default ShapeAdventure;
