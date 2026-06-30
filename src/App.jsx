import { GameProvider } from './context/GameContext';
import { useGame } from './context/useGame';
import TopBar from './components/TopBar';
import Map from './components/Map';
import Lesson from './components/Lesson';
import Results from './components/Results';
import WelcomeScreen from './components/WelcomeScreen';
import './index.css';

function GameContent() {
  const { gameState, hasSeenWelcome } = useGame();

  if (!hasSeenWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <>
      {['map', 'lesson', 'practice'].includes(gameState) && <TopBar />}
      {gameState === 'map' && <Map />}
      {(gameState === 'lesson' || gameState === 'practice') && <Lesson />}
      {gameState === 'results' && <Results />}
    </>
  );
}

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
