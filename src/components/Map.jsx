import { Dumbbell } from 'lucide-react';
import { useGame } from '../context/GameContext';
import moduleData from '../data/modulo1.json';
import Mascot from './Mascot';

export default function Map() {
  const { startLesson } = useGame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>{moduleData.moduleTitle}</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <Mascot state="idle" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center' }}>
        {moduleData.levels.map((level, index) => {
          // Calculate an offset to make a zigzag path
          const offset = Math.sin(index) * 50; 
          
          return (
            <div key={level.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${offset}px)` }}>
              <div 
                className="btn btn-secondary flex-center pulse" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', padding: 0 }}
                onClick={() => startLesson(level.id)}
              >
                <Dumbbell size={32} />
              </div>
              <span style={{ marginTop: '12px', fontWeight: 'bold', textAlign: 'center', maxWidth: '150px' }}>
                {level.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
