import { useState, useEffect } from 'react';
import { Heart, Clock, Play, Zap } from 'lucide-react';
import { useGame } from '../context/useGame';

const HEART_WAIT_SECONDS = 60;

export default function HeartsModal({ onClose }) {
  const { lives, exp, buyHeart, earnHeart, startPractice } = useGame();
  const [timeRemaining, setTimeRemaining] = useState(HEART_WAIT_SECONDS);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!isWaiting) return undefined;

    const interval = setInterval(() => {
      setTimeRemaining((time) => {
        if (time > 1) return time - 1;

        earnHeart();
        setIsWaiting(false);
        return HEART_WAIT_SECONDS;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isWaiting, earnHeart]);

  const handlePractice = () => {
    onClose();
    startPractice();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((HEART_WAIT_SECONDS - timeRemaining) / HEART_WAIT_SECONDS) * 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 20, 28, 0.58)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="fade-in" style={{
        backgroundColor: 'var(--color-surface)',
        border: '2px solid var(--color-border)',
        borderRadius: '24px',
        padding: '24px',
        width: '100%',
        maxWidth: '410px',
        position: 'relative',
        boxShadow: 'var(--shadow-soft)'
      }}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--color-gray)',
            border: '2px solid var(--color-gray-shadow)',
            fontSize: '1.4rem',
            fontWeight: 900,
            cursor: 'pointer',
            color: 'var(--color-text)'
          }}
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Heart fill="var(--color-danger)" size={54} color="var(--color-danger)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', fontWeight: 900 }}>Tus vidas</h2>
          <p style={{ color: 'var(--color-muted)', fontWeight: 800 }}>Tienes {lives} de 5 vidas.</p>
        </div>

        {lives >= 5 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-primary)', fontWeight: 900, padding: '18px' }}>
            ¡Tus vidas están al máximo!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {lives === 0 && (
              <div style={{ padding: '16px', border: '2px solid var(--color-border)', borderRadius: '18px', background: 'var(--color-surface-raised)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={21} color="var(--color-blue)" />
                    <span style={{ fontWeight: 900 }}>Descansar</span>
                  </div>
                  {isWaiting ? (
                    <span style={{ color: 'var(--color-blue)', fontWeight: 900 }}>{formatTime(timeRemaining)}</span>
                  ) : (
                    <button className="btn btn-outline" onClick={() => setIsWaiting(true)} style={{ padding: '8px 14px', minHeight: '40px', width: 'auto' }}>
                      Iniciar (1 min)
                    </button>
                  )}
                </div>
                {isWaiting && (
                  <>
                    <div style={{ height: '12px', backgroundColor: 'var(--color-gray)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: 'var(--color-blue)', transition: 'width 1s linear' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-danger)', marginTop: '8px', textAlign: 'center', fontWeight: 800 }}>
                      Si cierras este menú, perderás el progreso.
                    </p>
                  </>
                )}
              </div>
            )}

            <button className="btn btn-outline" onClick={handlePractice} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Play size={20} />
              Practicar (+1 vida)
            </button>

            <button className="btn btn-secondary" onClick={() => exp >= 100 && buyHeart()} disabled={exp < 100} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Zap size={20} />
              Comprar por 100 EXP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
