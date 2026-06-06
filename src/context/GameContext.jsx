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

  const loseLife = () => {
    if (lives > 0) setLives(l => l - 1);
  };

  const gainExp = (amount) => {
    setExp(e => e + amount);
  };

  const startLesson = (levelId) => {
    setCurrentLevelId(levelId);
    setGameState('lesson');
  };

  const finishLesson = (success) => {
    if (success) {
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
      currentLevelId, setCurrentLevelId,
      gameState, startLesson, finishLesson, backToMap
    }}>
      {children}
    </GameContext.Provider>
  );
};
