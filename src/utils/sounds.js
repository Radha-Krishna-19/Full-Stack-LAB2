// Basic Sound utility for MathWorld Adventure
// Uses Web Audio API for simple, accessible sounds without external assets

const playNote = (freq, type = 'sine', duration = 0.5, volume = 0.1) => {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context not supported or blocked", e);
    }
};

export const playSuccessSound = () => {
    // Upward chime
    playNote(440, 'sine', 0.2, 0.1); // A4
    setTimeout(() => playNote(554, 'sine', 0.2, 0.1), 100); // C#5
    setTimeout(() => playNote(659, 'sine', 0.4, 0.1), 200); // E5
};

export const playClickSound = () => {
    playNote(880, 'sine', 0.1, 0.05);
};

export const playErrorSound = () => {
    playNote(220, 'triangle', 0.3, 0.05);
};
