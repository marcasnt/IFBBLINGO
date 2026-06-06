import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [lives, setLives] = useState(() => {
    const saved = localStorage.getItem('ifbblingo_lives');
    return saved !== null ? parseInt(saved) : 5;
  });
  
  const [exp, setExp] = useState(() => {
    const saved = localStorage.getItem('ifbblingo_exp');
    return saved !== null ? parseInt(saved) : 0;
  });

  const [streak, setStreak] = useState(1);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  
  // Game states: 'map', 'lesson', 'results', 'practice'
  const [gameState, setGameState] = useState('map');

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ifbblingo_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [unlockedLevelId, setUnlockedLevelId] = useState(() => {
    const saved = localStorage.getItem('ifbblingo_unlocked');
    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => { localStorage.setItem('ifbblingo_lives', lives.toString()); }, [lives]);
  useEffect(() => { localStorage.setItem('ifbblingo_exp', exp.toString()); }, [exp]);
  useEffect(() => { 
    localStorage.setItem('ifbblingo_theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const loseLife = () => {
    if (lives > 0) setLives(l => l - 1);
  };

  const earnHeart = () => {
    if (lives < 5) setLives(l => l + 1);
  };

  const buyHeart = () => {
    if (lives < 5 && exp >= 100) {
      setExp(e => e - 100);
      setLives(l => l + 1);
    }
  };

  const [isHintActive, setIsHintActive] = useState(false);

  const buyHint = () => {
    if (exp >= 50 && !isHintActive) {
      setExp(e => e - 50);
      setIsHintActive(true);
      return true;
    }
    return false;
  };

  const clearHint = () => {
    setIsHintActive(false);
  };

  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    return localStorage.getItem('ifbblingo_hasSeenWelcome') === 'true';
  });

  const acceptWelcome = () => {
    setHasSeenWelcome(true);
    localStorage.setItem('ifbblingo_hasSeenWelcome', 'true');
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

  const startPractice = () => {
    setGameState('practice');
  };

  const finishLesson = (success, isPractice = false) => {
    if (success) {
      if (isPractice) {
        earnHeart();
        setGameState('map');
      } else {
        if (currentLevelId === unlockedLevelId) {
          const nextLevel = unlockedLevelId + 1;
          setUnlockedLevelId(nextLevel);
          localStorage.setItem('ifbblingo_unlocked', nextLevel.toString());
        }
        setGameState('results');
      }
    } else {
      setGameState('map');
    }
  };

  const backToMap = () => setGameState('map');

  return (
    <GameContext.Provider value={{
      theme, toggleTheme,
      lives, loseLife, earnHeart, buyHeart,
      exp, gainExp,
      streak, setStreak,
      unlockedLevelId,
      currentLevelId, setCurrentLevelId,
      gameState, setGameState,
      startLesson, startPractice, finishLesson, backToMap,
      isHintActive, buyHint, clearHint,
      hasSeenWelcome, acceptWelcome
    }}>
      {children}
    </GameContext.Provider>
  );
};
