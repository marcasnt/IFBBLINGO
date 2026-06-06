import { Heart, Zap, Flame, Moon, Sun, Lightbulb } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import HeartsModal from './HeartsModal';

export default function TopBar() {
  const { lives, exp, streak, theme, toggleTheme, gameState, buyHint } = useGame();
  const [showHearts, setShowHearts] = useState(false);

  const isCompact = gameState !== 'map';

  const handleHintClick = () => {
    if (buyHint()) {
      // Option handled
    } else {
      alert('Necesitas al menos 50 EXP para usar un comodín.');
    }
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isCompact ? '8px 16px' : '16px 24px',
        backgroundColor: 'var(--color-surface)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '2px solid var(--color-gray-shadow)',
        transition: 'all 0.2s ease',
        fontSize: isCompact ? '0.85rem' : '1rem'
      }}>
        {/* Theme Toggle */}
        <div style={{ cursor: 'pointer', color: 'var(--color-text)' }} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={isCompact ? 20 : 24} /> : <Moon size={isCompact ? 20 : 24} />}
        </div>

        <div className="flex-center pulse" style={{ color: 'var(--color-danger)', fontWeight: 800, cursor: 'pointer' }} onClick={() => setShowHearts(true)}>
          <Heart fill="var(--color-danger)" size={isCompact ? 20 : 24} style={{ marginRight: '4px' }} />
          {lives}
        </div>
        <div className="flex-center" style={{ color: 'var(--color-yellow)', fontWeight: 800 }}>
          <Flame fill="var(--color-yellow)" size={isCompact ? 20 : 24} style={{ marginRight: '4px' }} />
          {streak}
        </div>
        <div className="flex-center" style={{ color: 'var(--color-blue)', fontWeight: 800 }}>
          <Zap fill="var(--color-blue)" size={isCompact ? 20 : 24} style={{ marginRight: '4px' }} />
          {exp}
        </div>

        {isCompact && (
          <div 
            className="flex-center" 
            style={{ 
              color: 'var(--color-secondary)', 
              fontWeight: 800, 
              cursor: 'pointer',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '8px',
              padding: '4px'
            }} 
            onClick={handleHintClick}
            title="Usar comodín (-50 EXP)"
          >
            <Lightbulb size={isCompact ? 20 : 24} style={{ marginRight: '4px' }} />
            50
          </div>
        )}
      </div>
      
      {showHearts && <HeartsModal onClose={() => setShowHearts(false)} />}
    </>
  );
}
