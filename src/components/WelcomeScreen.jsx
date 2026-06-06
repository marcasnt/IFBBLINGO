import { useGame } from '../context/GameContext';
import Mascot from './Mascot';

export default function WelcomeScreen() {
  const { acceptWelcome } = useGame();

  return (
    <div className="fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      textAlign: 'center'
    }}>
      <Mascot state="happy" />
      
      <h1 style={{ color: 'var(--color-primary)', marginTop: '32px', marginBottom: '16px', fontSize: '2.5rem' }}>
        ¡Bienvenido a IFBBLINGO!
      </h1>
      
      <div style={{
        backgroundColor: 'var(--color-surface)',
        padding: '24px',
        borderRadius: '24px',
        boxShadow: '0 8px 0 var(--color-gray-shadow)',
        marginBottom: '40px',
        maxWidth: '400px'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '16px', lineHeight: '1.5' }}>
          Para que tu progreso, vidas y experiencia se guarden de forma segura y permanente, te recomendamos encarecidamente:
        </p>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-yellow)', marginBottom: '16px' }}>
          ¡Añadir esta aplicación a tu pantalla de inicio!
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: '1.4' }}>
          Si juegas desde el navegador y la añades después, podrías perder tu avance inicial debido a las políticas de tu teléfono. Al añadirla ahora, jugarás en pantalla completa como una app nativa.
        </p>
      </div>

      <button 
        className="btn pulse" 
        style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem', padding: '16px' }}
        onClick={acceptWelcome}
      >
        ¡Entendido, Empezar a Jugar!
      </button>
    </div>
  );
}
