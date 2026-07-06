import { Heart, Zap, Flame, Moon, Sun, Lightbulb, X } from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../context/useGame';
import HeartsModal from './HeartsModal';

export default function TopBar() {
  const { lives, exp, streak, theme, toggleTheme, gameState, buyHint, backToMap, clearHint } = useGame();
  const [showHearts, setShowHearts] = useState(false);
  const isCompact = gameState !== 'map';

  const handleHintClick = () => {
    if (!buyHint()) {
      alert('Necesitas al menos 50 EXP para usar un comodín.');
    }
  };

  const handleExit = () => {
    if (window.confirm('¿Seguro que deseas salir de la lección? Tu progreso en esta lección no se guardará.')) {
      clearHint();
      backToMap();
    }
  };

  return (
    <>
      <div className={`app-topbar ${isCompact ? 'app-topbar-compact' : ''}`} style={{ padding: isCompact ? '10px 14px' : undefined }}>
        {isCompact ? (
          <button
            className="icon-pill flex-center"
            onClick={handleExit}
            aria-label="Salir de la lección"
            title="Salir de la lección"
            style={{ color: 'var(--color-danger)' }}
          >
            <X size={20} strokeWidth={3} />
          </button>
        ) : (
          <button className="icon-pill flex-center" onClick={toggleTheme} aria-label="Cambiar tema" style={{ color: 'var(--color-text)' }}>
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        )}

        <button className="stat-pill flex-center" onClick={() => setShowHearts(true)} style={{ color: 'var(--color-danger)' }}>
          <Heart fill="var(--color-danger)" size={isCompact ? 20 : 22} style={{ marginRight: '5px' }} />
          {lives}
        </button>

        <div className="stat-pill flex-center" style={{ color: 'var(--color-yellow)' }}>
          <Flame fill="var(--color-yellow)" size={isCompact ? 20 : 22} style={{ marginRight: '5px' }} />
          {streak}
        </div>

        <div className="stat-pill flex-center" style={{ color: 'var(--color-blue)' }}>
          <Zap fill="var(--color-blue)" size={isCompact ? 20 : 22} style={{ marginRight: '5px' }} />
          {exp}
        </div>

        {isCompact && (
          <button className="stat-pill flex-center" onClick={handleHintClick} title="Usar comodín (-50 EXP)" style={{ color: 'var(--color-secondary)' }}>
            <Lightbulb size={20} style={{ marginRight: '5px' }} />
            50
          </button>
        )}


      </div>

      {showHearts && <HeartsModal onClose={() => setShowHearts(false)} />}
    </>
  );
}
