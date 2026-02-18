import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import CharacterGuide from '../components/CharacterGuide';
import { playSuccessSound, playErrorSound } from '../utils/sounds';
import { Plus, Star } from 'lucide-react';

const AdditionQuest = () => {
    const { gameState, addStars, updateGameProgress } = useGame();
    const navigate = useNavigate();
    const difficulty = gameState.selections?.additionQuest || 'easy';

    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(1);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('Let\'s add these friends together!');
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
        const sumRanges = { easy: 5, medium: 10, hard: 20 };
        const maxSum = sumRanges[difficulty];

        const n1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
        const n2 = Math.floor(Math.random() * (maxSum - n1)) + 1;
        const sum = n1 + n2;
        setNum1(n1);
        setNum2(n2);

        const opts = [sum];
        while (opts.length < 3) {
            const wrong = Math.floor(Math.random() * (maxSum - 1)) + 2;
            if (!opts.includes(wrong)) opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setIsCorrect(null);
        setFeedback(`${n1} plus ${n2}. How many in total?`);
    };

    const handleAnswer = (num) => {
        if (num === num1 + num2) {
            playSuccessSound();
            setIsCorrect(true);
            setFeedback('Awesome! You added them up!');
            addStars(5, difficulty); // Base 5, context will multiply
            updateGameProgress('additionQuest', Math.min(round * 10, 100), difficulty);

            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#67b99a', '#f4d06f', '#8e7dbe']
            });

            setTimeout(() => {
                setRound(r => r + 1);
            }, 2500);
        } else {
            playErrorSound();
            setIsCorrect(false);
            setFeedback('Not quite. Try counting every one!');
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Amazing Adding!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You finished Addition Quest!</p>
                <button className="btn-primary" onClick={() => navigate('/hub')} style={{ fontSize: '1.2rem' }}>
                    See My Progress
                </button>
            </motion.div>
        );
    }

    return (
        <div className="game-container">
            <CharacterGuide
                message={feedback}
                expression={isCorrect ? 'excited' : 'happy'}
            />

            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {/* Group 1 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '150px', justifyContent: 'center' }}>
                    {[...Array(num1)].map((_, i) => (
                        <motion.div key={`g1-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                            <div style={{ width: '40px', height: '40px', background: '#8e7dbe', borderRadius: '50%' }} />
                        </motion.div>
                    ))}
                </div>

                <Plus size={40} color="#ccc" />

                {/* Group 2 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '150px', justifyContent: 'center' }}>
                    {[...Array(num2)].map((_, i) => (
                        <motion.div key={`g2-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                            <div style={{ width: '40px', height: '40px', background: '#67b99a', borderRadius: '50%' }} />
                        </motion.div>
                    ))}
                </div>

                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ccc' }}>=</div>

                <div style={{ width: '60px', height: '60px', border: '3px dashed #ccc', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }}>
                    ?
                </div>
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
                        className={isCorrect && num === num1 + num2 ? 'btn-success' : 'btn-item-option'}
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

export default AdditionQuest;
