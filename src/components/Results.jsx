import { Trophy, Zap } from 'lucide-react';
import { useGame } from '../context/useGame';
import Mascot from './Mascot';

export default function Results() {
  const { backToMap, setStreak } = useGame();

  const handleContinue = () => {
    setStreak((streak) => streak + 1);
    backToMap();
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', flex: 1, justifyContent: 'center' }}>
      <Mascot state="happy" />

      <div style={{
        width: '100%',
        marginTop: '22px',
        padding: '24px',
        borderRadius: '24px',
        border: '2px solid var(--color-border)',
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-soft)',
        textAlign: 'center'
      }}>
        <Trophy size={44} fill="var(--color-yellow)" color="var(--color-yellow-shadow)" />
        <h1 style={{ color: 'var(--color-yellow-shadow)', marginTop: '12px', fontSize: '2rem', lineHeight: 1.05 }}>
          ¡Lección completada!
        </h1>
        <p style={{ margin: '16px 0 0', fontSize: '1.05rem', color: 'var(--color-muted)', fontWeight: 800, lineHeight: 1.35 }}>
          Sumaste experiencia y reforzaste conceptos del módulo.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '18px', padding: '9px 14px', borderRadius: '999px', background: 'var(--color-blue-soft)', color: 'var(--color-blue)', fontWeight: 900 }}>
          <Zap size={19} fill="var(--color-blue)" />
          Progreso guardado
        </div>
      </div>

      <div style={{ width: '100%', marginTop: 'auto', paddingTop: '22px' }}>
        <button className="btn" onClick={handleContinue}>Continuar</button>
      </div>
    </div>
  );
}
