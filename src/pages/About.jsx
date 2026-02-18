import React from 'react';
import { motion } from 'framer-motion';
import { User, Book, Github, Info, Layers, Zap, GraduationCap } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}
        >
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Product Description
                </h1>
                <div style={{ width: '100px', height: '4px', background: 'var(--color-secondary)', margin: '0 auto', borderRadius: '2px' }} />
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Member Details */}
                <section className="game-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <User color="var(--color-primary)" size={32} />
                        <h2 style={{ fontSize: '1.5rem' }}>Member Detail</h2>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '180px',
                            height: '180px',
                            margin: '0 auto 1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            border: '4px solid white',
                            boxShadow: 'var(--shadow)'
                        }}>
                            <img
                                src={profileImg}
                                alt="P.M.RADHA KRISHNA"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text)' }}>P.M.RADHA KRISHNA</h3>
                        <p style={{ fontWeight: '700', color: 'var(--color-primary)' }}>Roll No: CB.SC.U4CSE23134</p>
                    </div>
                </section>

                {/* Course Details */}
                <section className="game-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <GraduationCap color="var(--color-secondary)" size={32} />
                        <h2 style={{ fontSize: '1.5rem' }}>Course Details</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.2rem' }}>Course Code</p>
                            <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>23CSE461</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.2rem' }}>Course Name</p>
                            <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>FULL STACK FRAMEWORKS</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.2rem' }}>Course Teacher</p>
                            <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>Dr.T.Senthil Kumar</p>
                            <p style={{ fontSize: '0.9rem' }}>Professor, School of Computing</p>
                            <p style={{ fontSize: '0.9rem' }}>Amrita Vishwa Vidyapeetham</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Project Deep Dive */}
            <section className="game-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Zap color="var(--color-accent)" size={32} />
                    <h2 style={{ fontSize: '1.8rem' }}>MathWorld Adventure</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>The Use Case</h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', opacity: 0.8 }}>
                            MathWorld is a specialized learning portal designed specifically for children with autism.
                            It tackles challenges like sensory overstimulation and executive dysfunction by providing a
                            stable, predictable, and visually-stimulating environment where children can master
                            mathematical concepts without stress.
                        </p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Highlights & Novelty</h3>
                        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
                            <li>Adaptive Difficulty Selections</li>
                            <li>Integrated Learning Buddy (Mascot)</li>
                            <li>Positive-Only Reinforcement Logic</li>
                            <li>High-Contrast Sensory Friendly UI</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', borderTop: '2px solid #f1f3f5', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Github size={24} />
                        <h3 style={{ fontSize: '1.2rem' }}>Project Repository</h3>
                    </div>
                    <a
                        href="https://github.com/Radha-Krishna-19/Full-Stack-LAB2"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '700', wordBreak: 'break-all' }}
                    >
                        https://github.com/Radha-Krishna-19/Full-Stack-LAB2
                    </a>
                </div>
            </section>

            <footer style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                <p>© 2026 MathWorld Adventure — Developed for Lab Evaluation 2</p>
            </footer>
        </motion.div>
    );
};

export default About;
