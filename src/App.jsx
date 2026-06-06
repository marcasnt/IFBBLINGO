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
      {gameState === 'map' && <TopBar />}
      {gameState === 'map' && <Map />}
      {gameState === 'lesson' && <Lesson />}
      {gameState === 'results' && <Results />}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
