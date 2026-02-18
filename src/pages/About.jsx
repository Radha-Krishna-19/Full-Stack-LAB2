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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
                {/* Member Details */}
                <section className="game-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', alignSelf: 'center' }}>
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
                <section className="game-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', alignSelf: 'center' }}>
                        <GraduationCap color="var(--color-secondary)" size={32} />
                        <h2 style={{ fontSize: '1.5rem' }}>Course Details</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, justifyContent: 'center', textAlign: 'center' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', alignItems: 'stretch' }}>
                <section className="game-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', alignSelf: 'center' }}>
                        <Zap color="var(--color-accent)" size={32} />
                        <h2 style={{ fontSize: '1.5rem' }}>Product Use Case</h2>
                    </div>

                    <div style={{ marginBottom: '1.5rem', flex: 1, textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>The Need for Autism Kids</h3>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.8 }}>
                            Traditional learning portals are often overstimulating or unpredictable for neurodivergent children. MathWorld provides a **highly predictable, sensory-friendly environment** where children learn at their own pace without social pressure.
                        </p>
                    </div>

                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Challenges Addressed</h3>
                        <ul style={{ fontSize: '0.9rem', padding: 0, listStyle: 'none', lineHeight: '1.8', opacity: 0.8 }}>
                            <li>✨ **Executive Functioning**: Visual cues simplify steps.</li>
                            <li>🌈 **Sensory Overload**: Low-contrast, warm aesthetics.</li>
                            <li>🔄 **Consistency**: Highly predictable UI layouts.</li>
                        </ul>
                    </div>
                </section>

                <section className="game-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', alignSelf: 'center' }}>
                        <Info color="var(--color-success)" size={32} />
                        <h2 style={{ fontSize: '1.5rem' }}>Highlights & Novelty</h2>
                    </div>

                    <ul style={{ fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0, listStyle: 'none', flex: 1, justifyContent: 'center' }}>
                        <li style={{ borderBottom: '2px solid #f8f9fa', paddingBottom: '1rem', textAlign: 'center' }}>
                            <strong style={{ color: 'var(--color-primary)' }}>Dynamic Learning Buddy</strong><br />
                            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Personal mascot guide provides emotional continuity.</span>
                        </li>
                        <li style={{ borderBottom: '2px solid #f8f9fa', paddingBottom: '1rem', textAlign: 'center' }}>
                            <strong style={{ color: 'var(--color-secondary)' }}>Adaptive Multi-Level Engine</strong><br />
                            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Independent difficulty tracking across all games.</span>
                        </li>
                        <li style={{ textAlign: 'center' }}>
                            <strong style={{ color: 'var(--color-accent)' }}>Positive-Only Reinforcement</strong><br />
                            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Removes anxiety by using hints instead of errors.</span>
                        </li>
                    </ul>
                </section>
            </div>

            {/* Technical Context */}
            <section className="game-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Layers color="var(--color-primary)" size={32} />
                    <h2 style={{ fontSize: '1.5rem' }}>Technical Implementation</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>State Architecture</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>React Context API for persistent profile and real-time progress syncing via LocalStorage.</p>
                    </div>
                    <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Motion Engine</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Framer Motion for gentle, non-overstimulating transitions and celebratory object physics.</p>
                    </div>
                    <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Logic Modules</h4>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Custom hooks and utility patterns to drive randomized round generation and scoring.</p>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', borderTop: '2px solid #f1f3f5', paddingTop: '1.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.8rem' }}>
                        <Github size={20} />
                        <h3 style={{ fontSize: '1.1rem' }}>Open Source Repository</h3>
                    </div>
                    <a
                        href="https://github.com/Radha-Krishna-19/Full-Stack-LAB2"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '800', wordBreak: 'break-all' }}
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
