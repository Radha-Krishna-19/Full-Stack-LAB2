import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import CharacterGuide from '../components/CharacterGuide';
import { playSuccessSound, playErrorSound, playClickSound } from '../utils/sounds';
import { Star, Apple, Zap, Heart, Sun, Ghost } from 'lucide-react';

const icons = [Star, Apple, Zap, Heart, Sun, Ghost];

const NumberWorld = () => {
    const { gameState, addStars, updateGameProgress } = useGame();
    const navigate = useNavigate();
    const difficulty = gameState.selections?.numberWorld || 'easy';

    const [targetNumber, setTargetNumber] = useState(1);
    const [selectedIcon, setSelectedIcon] = useState(() => icons[Math.floor(Math.random() * icons.length)]);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('Count the items and tap the number!');
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
        const ranges = { easy: 5, medium: 10, hard: 20 };
        const max = ranges[difficulty];
        const num = Math.floor(Math.random() * max) + 1;

        setTargetNumber(num);
        setSelectedIcon(icons[Math.floor(Math.random() * icons.length)]);

        // Generate options unique including the target
        const opts = [num];
        while (opts.length < 3) {
            const wrong = Math.floor(Math.random() * max) + 1;
            if (!opts.includes(wrong)) opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setIsCorrect(null);
        setFeedback('Can you count how many?');
    };

    const handleAnswer = (num) => {
        if (num === targetNumber) {
            playSuccessSound();
            setIsCorrect(true);
            setFeedback('Great job! You found it!');
            addStars(5, difficulty);
            updateGameProgress('numberWorld', Math.min(round * 10, 100), difficulty);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8e7dbe', '#f4d06f', '#67b99a']
            });

            setTimeout(() => {
                setRound(r => r + 1);
            }, 2000);
        } else {
            playErrorSound();
            setIsCorrect(false);
            setFeedback('Almost! Let\'s count again.');
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Great Adventure!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You finished Number World!</p>
                <button className="btn-primary" onClick={() => navigate('/hub')} style={{ fontSize: '1.2rem' }}>
                    See My Progress
                </button>
            </motion.div>
        );
    }

    const IconComponent = selectedIcon;

    return (
        <div className="game-container">
            <CharacterGuide
                message={feedback}
                expression={isCorrect ? 'excited' : 'happy'}
            />

            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                minHeight: '300px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem'
            }}>
                <AnimatePresence mode="popLayout">
                    {[...Array(targetNumber)].map((_, i) => (
                        <motion.div
                            key={`${round}-${i}`}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: 'spring' }}
                            style={{ color: 'var(--color-primary)' }}
                        >
                            <IconComponent size={60} fill="var(--color-primary)" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {options.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleAnswer(num)}
                        className={isCorrect && num === targetNumber ? 'btn-success' : 'btn-secondary'}
                        style={{
                            fontSize: '2rem',
                            height: '100px',
                            border: isCorrect === false && !isCorrect && num !== targetNumber ? '2px solid transparent' : ''
                        }}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p style={{ fontWeight: '800', color: 'var(--color-primary)' }}>
                    Round {round > 10 ? 10 : round} of 10
                </p>
            </div>
        </div>
    );
};

export default NumberWorld;
