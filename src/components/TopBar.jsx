import { Heart, Zap, Flame } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function TopBar() {
  const { lives, exp, streak } = useGame();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 24px',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderBottom: '2px solid var(--color-gray)'
    }}>
      <div className="flex-center" style={{ color: 'var(--color-danger)', fontWeight: 800 }}>
        <Heart fill="var(--color-danger)" style={{ marginRight: '8px' }} />
        {lives}
      </div>
      <div className="flex-center" style={{ color: 'var(--color-yellow)', fontWeight: 800 }}>
        <Flame fill="var(--color-yellow)" style={{ marginRight: '8px' }} />
        {streak}
      </div>
      <div className="flex-center" style={{ color: 'var(--color-blue)', fontWeight: 800 }}>
        <Zap fill="var(--color-blue)" style={{ marginRight: '8px' }} />
        {exp} EXP
      </div>
    </div>
  );
}
