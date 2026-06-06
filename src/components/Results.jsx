import { useGame } from '../context/GameContext';
import Mascot from './Mascot';

export default function Results() {
  const { backToMap, setStreak } = useGame();

  const handleContinue = () => {
    setStreak(s => s + 1);
    backToMap();
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', flex: 1, justifyContent: 'center' }}>
      <Mascot state="happy" />
      
      <h1 style={{ color: 'var(--color-yellow)', marginTop: '24px', textAlign: 'center', fontSize: '2rem' }}>
        ¡Lección Completada!
      </h1>
      
      <p style={{ margin: '24px 0', fontSize: '1.2rem', textAlign: 'center' }}>
        Has ganado experiencia y mejorado tu conocimiento sobre fisiología y musculación.
      </p>

      <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: 'auto' }}>
        <button className="btn" onClick={handleContinue}>CONTINUAR</button>
      </div>
    </div>
  );
}
