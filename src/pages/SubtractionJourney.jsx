import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import CharacterGuide from '../components/CharacterGuide';
import { Cloud, ArrowUpRight, Star } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '../utils/sounds';

const SubtractionJourney = () => {
    const { gameState, addStars, updateGameProgress } = useGame();
    const navigate = useNavigate();
    const difficulty = gameState.selections?.subtractionJourney || 'easy';

    const [total, setTotal] = useState(5);
    const [takeAway, setTakeAway] = useState(2);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('Watch some friends float away! How many are left?');
    const [isCorrect, setIsCorrect] = useState(null);
    const [round, setRound] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (round > 10) {
            setIsGameOver(true);
        } else {
            generateRound();
        }
    }, [round]);

    const generateRound = () => {
        const rangeMap = { easy: 5, medium: 10, hard: 15 };
        const max = rangeMap[difficulty];

        const t = Math.floor(Math.random() * (max - 2)) + 3;
        const ta = Math.floor(Math.random() * (t - 1)) + 1; // 1 to total-1
        setTotal(t);
        setTakeAway(ta);

        const result = t - ta;
        const opts = [result];
        while (opts.length < 3) {
            const wrong = Math.floor(Math.random() * (max + 1));
            if (!opts.includes(wrong)) opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setIsCorrect(null);
        setAnimating(false);
        setFeedback(`Start with ${t}. If ${ta} float away...`);

        // Start animation after a short delay
        setTimeout(() => setAnimating(true), 1000);
    };

    const handleAnswer = (num) => {
        if (num === total - takeAway) {
            playSuccessSound();
            setIsCorrect(true);
            setFeedback('Perfect! You counted the remaining friends!');
            addStars(5, difficulty); // Base 5, context multiplies
            updateGameProgress('subtractionJourney', Math.min(round * 10, 100), difficulty);

            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ef6461', '#f4d06f', '#8e7dbe']
            });

            setTimeout(() => setRound(r => r + 1), 3000);
        } else {
            playErrorSound();
            setIsCorrect(false);
            setFeedback('Try again! Count only ones that are still here.');
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Super Subtraction!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You finished Subtraction Journey!</p>
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
                background: '#e3f2fd',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem',
                minHeight: '350px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', maxWidth: '400px' }}>
                    {[...Array(total)].map((_, i) => {
                        const isFloatingAway = i < takeAway && animating;
                        return (
                            <motion.div
                                key={`${round}-${i}`}
                                animate={isFloatingAway ? {
                                    y: -400,
                                    x: 200,
                                    opacity: 0,
                                    rotate: 45
                                } : {
                                    y: 0,
                                    x: 0,
                                    opacity: 1
                                }}
                                transition={{ duration: 3, delay: i * 0.2 }}
                                style={{ color: '#1976d2' }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: isFloatingAway ? '#ccc' : 'white',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    <Cloud fill={isFloatingAway ? '#e0e0e0' : '#bbdefb'} size={32} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {animating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}
                    >
                        <ArrowUpRight /> {takeAway} floating away...
                    </motion.div>
                )}
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
                        className={isCorrect && num === total - takeAway ? 'btn-success' : 'btn-item-option'}
                        style={{ fontSize: '2rem', height: '100px' }}
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

export default SubtractionJourney;
