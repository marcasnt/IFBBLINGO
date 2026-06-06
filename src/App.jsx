import { GameProvider, useGame } from './context/GameContext';
import TopBar from './components/TopBar';
import Map from './components/Map';
import Lesson from './components/Lesson';
import Results from './components/Results';
import './index.css';

function GameContent() {
  const { gameState } = useGame();

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
