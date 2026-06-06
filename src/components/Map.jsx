import { Dumbbell, Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';
import moduleData from '../data/modulo1.json';
import Mascot from './Mascot';

export default function Map() {
  const { startLesson, unlockedLevelId, lives } = useGame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Módulo I: Fisiología</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <Mascot state="idle" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center' }}>
        {moduleData.map((level, index) => {
          const id = index + 1;
          const offset = Math.sin(index) * 50; 
          const isLocked = id > unlockedLevelId;
          
          return (
            <div key={level.lessonId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${offset}px)` }}>
              <div 
                className={`btn flex-center ${isLocked ? 'btn-disabled' : 'btn-secondary pulse'}`} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  padding: 0,
                  backgroundColor: isLocked ? 'var(--color-gray)' : 'var(--color-secondary)',
                  boxShadow: `0 6px 0 ${isLocked ? 'var(--color-gray-shadow)' : 'var(--color-secondary-shadow)'}`,
                  cursor: isLocked ? 'not-allowed' : 'pointer'
                }}
                onClick={() => {
                  if (isLocked) return;
                  if (lives === 0) {
                    alert('¡No tienes corazones! Toca el corazón en la barra superior para recargar vidas.');
                    return;
                  }
                  startLesson(id);
                }}
              >
                {isLocked ? <Lock size={32} color="#afafaf" /> : <Dumbbell size={32} />}
              </div>
              <span style={{ 
                marginTop: '16px', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                maxWidth: '150px',
                color: isLocked ? '#afafaf' : 'var(--color-text)'
              }}>
                {level.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
