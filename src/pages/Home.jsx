import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Star, Rocket, Cloud, Heart, Play } from 'lucide-react';

const avatars = [
    { id: 'star', icon: Star, color: '#f4d06f', label: 'Star' },
    { id: 'rocket', icon: Rocket, color: '#8e7dbe', label: 'Rocket' },
    { id: 'rainbow', icon: Cloud, color: '#67b99a', label: 'Cloud' },
    { id: 'heart', icon: Heart, color: '#ef6461', label: 'Heart' },
];

const Home = () => {
    const { gameState, updatePlayer } = useGame();
    const [name, setName] = useState(gameState.player.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(gameState.player.avatar || 'star');
    const navigate = useNavigate();

    const handleStart = (e) => {
        e.preventDefault();
        if (name.trim()) {
            updatePlayer(name, selectedAvatar);
            navigate('/hub');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="home-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1rem',
                textAlign: 'center'
            }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginBottom: '2rem' }}
            >
                <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    MathWorld Adventure
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', opacity: 0.8 }}>
                    Learning is a Fun Adventure!
                </p>
            </motion.div>

            <form onSubmit={handleStart} style={{ maxWidth: '400px', width: '100%' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '1.1rem' }}>
                        What is your name?
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name..."
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            borderRadius: 'var(--radius-md)',
                            border: '3px solid var(--color-primary-light)',
                            outline: 'none',
                            fontFamily: 'inherit',
                            textAlign: 'center'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '700', fontSize: '1.1rem' }}>
                        Choose a learning buddy!
                    </label>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>
                        Your friend will lead the way and help you learn!
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {avatars.map((avatar) => {
                            const Icon = avatar.icon;
                            const isSelected = selectedAvatar === avatar.id;
                            return (
                                <button
                                    key={avatar.id}
                                    type="button"
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                    style={{
                                        padding: '1rem',
                                        background: isSelected ? avatar.color : 'white',
                                        color: isSelected ? 'white' : avatar.color,
                                        border: `3px solid ${avatar.color}`,
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: isSelected ? `0 6px 0 ${avatar.color}88` : 'none',
                                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Icon size={32} />
                                    <span style={{ fontSize: '0.8rem' }}>{avatar.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={!name.trim()}
                    style={{ width: '100%', fontSize: '1.3rem', gap: '0.5rem', opacity: !name.trim() ? 0.6 : 1 }}
                >
                    <Play fill="currentColor" /> Let's Go!
                </button>
            </form>
        </motion.div>
    );
};

export default Home;
