export default function Mascot({ state = 'idle' }) {
  // state can be: 'idle', 'happy', 'sad', 'thinking'
  
  const getColors = () => {
    switch(state) {
      case 'happy': return { skin: '#ffddc1', band: 'var(--color-primary)', eyes: '#111' };
      case 'sad': return { skin: '#ffddc1', band: 'var(--color-danger)', eyes: '#111' };
      case 'thinking': return { skin: '#ffddc1', band: 'var(--color-blue)', eyes: '#111' };
      default: return { skin: '#ffddc1', band: 'var(--color-secondary)', eyes: '#111' };
    }
  };

  const colors = getColors();

  return (
    <div style={{ width: '120px', height: '120px', position: 'relative' }} className={state === 'happy' ? 'pulse' : ''}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <rect x="20" y="20" width="60" height="60" rx="20" fill={colors.skin} />
        {/* Headband */}
        <rect x="20" y="30" width="60" height="15" fill={colors.band} />
        
        {/* Eyes */}
        {state === 'sad' ? (
          <>
            <path d="M 35 60 Q 40 55 45 60" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
            <path d="M 55 60 Q 60 55 65 60" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
          </>
        ) : state === 'happy' ? (
          <>
            <path d="M 35 55 Q 40 50 45 55" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
            <path d="M 55 55 Q 60 50 65 55" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="40" cy="55" r="4" fill={colors.eyes} />
            <circle cx="60" cy="55" r="4" fill={colors.eyes} />
          </>
        )}

        {/* Mouth */}
        {state === 'happy' && <path d="M 40 70 Q 50 80 60 70" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" fill="none" />}
        {state === 'sad' && <path d="M 40 75 Q 50 65 60 75" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" fill="none" />}
        {state === 'idle' && <line x1="45" y1="70" x2="55" y2="70" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />}
        {state === 'thinking' && <circle cx="50" cy="70" r="3" fill={colors.eyes} />}
      </svg>
    </div>
  );
}
