import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [lives, setLives] = useState(5);
  const [exp, setExp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  
  // Game states: 'map', 'lesson', 'results'
  const [gameState, setGameState] = useState('map');

  const [unlockedLevelId, setUnlockedLevelId] = useState(() => {
    const saved = localStorage.getItem('ifbblingo_unlocked');
    return saved ? parseInt(saved) : 1;
  });

  const loseLife = () => {
    if (lives > 0) setLives(l => l - 1);
  };

  const gainExp = (amount) => {
    setExp(e => e + amount);
  };

  const startLesson = (levelId) => {
    if (levelId <= unlockedLevelId) {
      setCurrentLevelId(levelId);
      setGameState('lesson');
    }
  };

  const finishLesson = (success) => {
    if (success) {
      if (currentLevelId === unlockedLevelId) {
        const nextLevel = unlockedLevelId + 1;
        setUnlockedLevelId(nextLevel);
        localStorage.setItem('ifbblingo_unlocked', nextLevel.toString());
      }
      setGameState('results');
    } else {
      setGameState('map');
    }
  };

  const backToMap = () => setGameState('map');

  return (
    <GameContext.Provider value={{
      lives, loseLife,
      exp, gainExp,
      streak, setStreak,
      unlockedLevelId,
      currentLevelId, setCurrentLevelId,
      gameState, startLesson, finishLesson, backToMap
    }}>
      {children}
    </GameContext.Provider>
  );
};
