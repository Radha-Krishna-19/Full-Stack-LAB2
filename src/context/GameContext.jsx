import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const DEFAULT_STATE = {
  player: {
    name: '',
    avatar: 'star',
  },
  stars: 0,
  progress: {
    numberWorld: { easy: 0, medium: 0, hard: 0 },
    additionQuest: { easy: 0, medium: 0, hard: 0 },
    subtractionJourney: { easy: 0, medium: 0, hard: 0 },
    shapeAdventure: { easy: 0, medium: 0, hard: 0 },
    patternPlay: { easy: 0, medium: 0, hard: 0 }
  },
  selections: {
    numberWorld: 'easy',
    additionQuest: 'easy',
    subtractionJourney: 'easy',
    shapeAdventure: 'easy',
    patternPlay: 'easy'
  },
  achievements: [],
  settings: {
    sound: true,
    highContrast: false,
  }
};

export const GameProvider = ({ children }) => {
  // Load initial state and merge with defaults to handle migrations
  const loadInitialState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('mathworld_adventure'));
      if (!saved) return DEFAULT_STATE;

      // Migration/Merge logic
      const migrated = { ...DEFAULT_STATE, ...saved };

      // Ensure specific nested objects have all keys
      migrated.settings = { ...DEFAULT_STATE.settings, ...saved.settings };
      migrated.player = { ...DEFAULT_STATE.player, ...saved.player };

      // Migrate global difficulty to per-game selections if it exists
      const oldGlobalDifficulty = saved.settings?.difficulty || 'easy';
      migrated.selections = { ...DEFAULT_STATE.selections, ...saved.selections };
      Object.keys(DEFAULT_STATE.selections).forEach(game => {
        if (!migrated.selections[game]) {
          migrated.selections[game] = oldGlobalDifficulty;
        }
      });

      // Handle progress structure change (number -> object)
      Object.keys(DEFAULT_STATE.progress).forEach(game => {
        if (typeof saved.progress?.[game] === 'number') {
          // Move old score to 'easy' and wrap
          migrated.progress[game] = {
            ...DEFAULT_STATE.progress[game],
            easy: saved.progress[game]
          };
        } else {
          migrated.progress[game] = {
            ...DEFAULT_STATE.progress[game],
            ...saved.progress?.[game]
          };
        }
      });

      return migrated;
    } catch (e) {
      console.error("Failed to load game state:", e);
      return DEFAULT_STATE;
    }
  };

  const [gameState, setGameState] = useState(loadInitialState);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('mathworld_adventure', JSON.stringify(gameState));
  }, [gameState]);

  const updatePlayer = (name, avatar) => {
    setGameState(prev => ({
      ...prev,
      player: { name, avatar }
    }));
  };

  const addStars = (amount, difficulty = 'easy') => {
    const multipliers = { easy: 1, medium: 2, hard: 3 };
    const bonus = multipliers[difficulty] || 1;
    setGameState(prev => ({
      ...prev,
      stars: prev.stars + (amount * bonus)
    }));
  };

  const updateGameProgress = (gameKey, score, difficulty = 'easy') => {
    setGameState(prev => {
      const currentProgress = prev.progress[gameKey] || { easy: 0, medium: 0, hard: 0 };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [gameKey]: {
            ...currentProgress,
            [difficulty]: Math.max(currentProgress[difficulty], score)
          }
        }
      };
    });
  };

  const setDifficulty = (gameKey, difficulty) => {
    setGameState(prev => ({
      ...prev,
      selections: {
        ...prev.selections,
        [gameKey]: difficulty
      }
    }));
  };

  const toggleSound = () => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, sound: !prev.settings.sound }
    }));
  };

  const resetGame = () => {
    setGameState(DEFAULT_STATE);
  };

  const value = {
    gameState,
    updatePlayer,
    addStars,
    updateGameProgress,
    setDifficulty,
    toggleSound,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
