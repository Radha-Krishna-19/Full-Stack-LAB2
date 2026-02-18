import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import CharacterGuide from '../components/CharacterGuide';
import { Circle, Square, Star } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '../utils/sounds';

const items = [
    { id: 'red-circle', color: '#ef6461', icon: Circle },
    { id: 'blue-square', color: '#8e7dbe', icon: Square },
    { id: 'yellow-star', color: '#f4d06f', icon: Star },
];

const PatternPlay = () => {
    const { gameState, addStars, updateGameProgress } = useGame();
    const navigate = useNavigate();
    const difficulty = gameState.selections?.patternPlay || 'easy';

    const [pattern, setPattern] = useState([]);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('What comes next in the pattern?');
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
        let patternItems = [];
        let missingItem = null;

        if (difficulty === 'easy') {
            // AB pattern: ABABA? (Missing B)
            const itemA = items[Math.floor(Math.random() * items.length)];
            let itemB = items[Math.floor(Math.random() * items.length)];
            while (itemB.id === itemA.id) itemB = items[Math.floor(Math.random() * items.length)];
            patternItems = [itemA, itemB, itemA, itemB, itemA];
            missingItem = itemB;
        } else if (difficulty === 'medium') {
            // ABC pattern: ABCAB? (Missing C)
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            const itemA = shuffled[0];
            const itemB = shuffled[1];
            const itemC = shuffled[2];
            patternItems = [itemA, itemB, itemC, itemA, itemB];
            missingItem = itemC;
        } else {
            // Hard: AAB pattern: AABAAB? (Missing B at end) or AABA... (AABAAB)
            const itemA = items[Math.floor(Math.random() * items.length)];
            let itemB = items[Math.floor(Math.random() * items.length)];
            while (itemB.id === itemA.id) itemB = items[Math.floor(Math.random() * items.length)];
            patternItems = [itemA, itemA, itemB, itemA, itemA];
            missingItem = itemB;
        }

        setPattern(patternItems);

        // Options
        const opts = [...items];
        setOptions(opts.sort(() => Math.random() - 0.5));
        setIsCorrect(null);
        setFeedback('Can you finish the pattern?');
    };

    const handleAnswer = (itemId) => {
        // Logic to determine what the missing item should be
        // For Easy (ABABA): B is next
        // For Medium (ABCAB): C is next
        // For Hard (AABAA): B is next
        let correctId = '';
        if (pattern[0].id === pattern[2].id && pattern[1].id !== pattern[0].id) {
            // AB pattern or AAB pattern
            if (pattern[0].id === pattern[1].id) {
                // AAB
                correctId = pattern[2].id;
            } else {
                // AB
                correctId = pattern[1].id;
            }
        } else {
            // ABC
            correctId = items.find(i => i.id !== pattern[0].id && i.id !== pattern[1].id).id;
        }

        if (itemId === correctId) {
            playSuccessSound();
            setIsCorrect(true);
            setFeedback('Brilliant! You completed the pattern!');
            addStars(5, difficulty); // Base 5
            updateGameProgress('patternPlay', Math.min(round * 10, 100), difficulty);

            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });

            setTimeout(() => setRound(r => r + 1), 2500);
        } else {
            playErrorSound();
            setIsCorrect(false);
            setFeedback('Look closely at the colors and shapes!');
            setTimeout(() => setIsCorrect(null), 1500);
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Pattern Power!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You finished Pattern Play!</p>
                <button className="btn-primary" onClick={() => navigate('/hub')} style={{ fontSize: '1.2rem' }}>
                    See My Progress
                </button>
            </motion.div>
        );
    }

    return (
        <div className="game-container">
            <CharacterGuide message={feedback} expression={isCorrect ? 'excited' : 'happy'} />

            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {pattern.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={`p-${i}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                background: `${item.color}22`,
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: item.color,
                                border: `2px solid ${item.color}`
                            }}
                        >
                            <Icon size={40} fill={item.color} />
                        </motion.div>
                    );
                })}

                <div style={{
                    width: '80px',
                    height: '80px',
                    border: '3px dashed #ccc',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: '#ccc'
                }}>
                    ?
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${options.length}, 1fr)`,
                gap: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {options.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleAnswer(item.id)}
                            className="btn-item-option"
                            style={{ height: '100px', color: item.color }}
                        >
                            <Icon size={40} fill={item.color} />
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

export default PatternPlay;
