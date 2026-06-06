import { useState, useEffect } from 'react';
import { Heart, Clock, Play, Zap } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function HeartsModal({ onClose }) {
  const { lives, exp, buyHeart, earnHeart, startPractice } = useGame();
  
  // Timer state for the penalty box
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes = 300 seconds
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let interval;
    if (isWaiting && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (isWaiting && timeRemaining === 0) {
      earnHeart();
      setIsWaiting(false);
      setTimeRemaining(300);
    }
    return () => clearInterval(interval);
  }, [isWaiting, timeRemaining, earnHeart]);

  const handleWait = () => {
    setIsWaiting(true);
  };

  const handleBuy = () => {
    if (exp >= 100) buyHeart();
  };

  const handlePractice = () => {
    onClose();
    startPractice();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((300 - timeRemaining) / 300) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="fade-in" style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '24px',
        width: '90%',
        maxWidth: '400px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
            color: 'var(--color-gray-shadow)'
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Heart fill="var(--color-danger)" size={48} color="var(--color-danger)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Tus Vidas</h2>
          <p style={{ color: 'var(--color-gray-shadow)' }}>Tienes {lives} de 5 vidas.</p>
        </div>

        {lives >= 5 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-primary)', fontWeight: 'bold' }}>
            ¡Tus vidas están al máximo!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 1. Timer / Penalty Box */}
            {lives === 0 && (
              <div style={{ padding: '16px', border: '2px solid var(--color-gray)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} color="var(--color-blue)" />
                    <span style={{ fontWeight: 'bold' }}>Descansar</span>
                  </div>
                  {isWaiting ? (
                    <span style={{ color: 'var(--color-blue)', fontWeight: 'bold' }}>{formatTime(timeRemaining)}</span>
                  ) : (
                    <button className="btn btn-outline" onClick={handleWait} style={{ padding: '8px 16px', width: 'auto' }}>
                      Iniciar (5 min)
                    </button>
                  )}
                </div>
                {isWaiting && (
                  <>
                    <div style={{ height: '12px', backgroundColor: 'var(--color-gray)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: 'var(--color-blue)', transition: 'width 1s linear' }} />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)', marginTop: '8px', textAlign: 'center' }}>
                      Si cierras este menú, perderás el progreso.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* 2. Practice */}
            <button 
              className="btn btn-outline" 
              onClick={handlePractice}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <Play size={20} />
              Practicar (+1 Vida)
            </button>

            {/* 3. Buy with EXP */}
            <button 
              className="btn btn-secondary" 
              onClick={handleBuy}
              disabled={exp < 100}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <Zap size={20} />
              Comprar por 100 EXP
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
