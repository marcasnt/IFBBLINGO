import { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { useGame } from '../context/useGame';
import Mascot from './Mascot';

export default function WelcomeScreen() {
  const { acceptWelcome } = useGame();
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  return (
    <div className="fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      color: 'var(--color-text)',
      textAlign: 'center'
    }}>
      <Mascot state="happy" />

      <h1 style={{ color: 'var(--color-primary)', marginTop: '28px', marginBottom: '12px', fontSize: '2.45rem', lineHeight: 1 }}>
        IFBBLINGO
      </h1>
      <p style={{ color: 'var(--color-muted)', fontWeight: 900, marginBottom: '22px' }}>
        Aprende fisiología, musculación y nutrición jugando.
      </p>

      <div style={{
        backgroundColor: 'var(--color-surface)',
        padding: '22px',
        borderRadius: '24px',
        border: '2px solid var(--color-border)',
        boxShadow: 'var(--shadow-soft)',
        marginBottom: '28px',
        maxWidth: '430px'
      }}>
        <Sparkles size={28} color="var(--color-yellow)" style={{ marginBottom: '10px' }} />
        <p style={{ fontSize: '1.08rem', fontWeight: 900, marginBottom: '12px', lineHeight: '1.35' }}>
          Guarda tu progreso como una app real.
        </p>
        <p style={{ fontSize: '0.98rem', color: 'var(--color-muted)', lineHeight: '1.45', fontWeight: 700 }}>
          Instalar IFBBLINGO ayuda a conservar vidas, EXP y avance en pantalla completa, como una experiencia nativa.
        </p>
      </div>

      {installPrompt && (
        <button
          className="btn btn-secondary pulse"
          style={{ width: '100%', maxWidth: '430px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onClick={handleInstallClick}
        >
          <Download size={22} /> Instalar IFBBLINGO
        </button>
      )}

      <button className="btn" style={{ width: '100%', maxWidth: '430px' }} onClick={acceptWelcome}>
        Empezar
      </button>
    </div>
  );
}
