import { Dumbbell, Lock, Star, Zap, Flame, Trophy, Heart, Activity, Target, Brain, Apple, Leaf, ChevronDown, Gauge } from 'lucide-react';
import { useGame } from '../context/useGame';
import modulo1Data from '../data/modulo1.json';
import modulo2Data from '../data/modulo2.json';
import Mascot from './Mascot';

const iconsM1 = [Dumbbell, Target, Star, Zap, Flame, Trophy, Heart, Activity];
const iconsM2 = [Apple, Brain, Leaf, Gauge, Zap, Star, Heart, Flame, Trophy, Activity, Target, Dumbbell, Apple, Brain, Leaf];
const MOD1_COUNT = modulo1Data.length;

function LevelButton({ level, index, globalId, isLocked, isCurrent, IconComponent, onStart, accentColor, shadowColor }) {
  const offset = Math.sin(index * 0.9) * 48;

  return (
    <div className="level-node" style={{ '--level-offset': `${offset}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${offset}px)`, position: 'relative' }}>
      {isCurrent && !isLocked && (
        <div style={{
          position: 'absolute',
          top: '-34px',
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: '999px',
          padding: '6px 12px',
          fontSize: '0.72rem',
          fontWeight: 900,
          boxShadow: '0 3px 0 var(--color-primary-shadow)'
        }}>
          INICIAR
        </div>
      )}
      <button
        className={isLocked ? 'btn flex-center' : 'btn flex-center pulse'}
        data-level-button="true"
        style={{
          width: '84px',
          height: '84px',
          minHeight: '84px',
          borderRadius: '50%',
          padding: 0,
          backgroundColor: isLocked ? 'var(--color-gray)' : accentColor,
          boxShadow: `0 7px 0 ${isLocked ? 'var(--color-gray-shadow)' : shadowColor}`,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          color: isLocked ? 'var(--color-locked-icon)' : 'white',
          border: isCurrent && !isLocked ? '4px solid rgba(255,255,255,0.85)' : 'none',
        }}
        onClick={() => { if (!isLocked) onStart(globalId); }}
      >
        {isLocked ? <Lock size={32} /> : <IconComponent size={34} />}
      </button>
      <span className="level-title" style={{
        marginTop: '14px',
        fontWeight: 900,
        textAlign: 'center',
        maxWidth: '170px',
        color: isLocked ? 'var(--color-locked-text)' : 'var(--color-text)',
        fontSize: '0.9rem',
        lineHeight: 1.2
      }}>
        {level.title}
      </span>
    </div>
  );
}

function ModuleBanner({ title, subtitle, icon, gradient, locked }) {
  return (
    <div className="module-banner" style={{
      width: '100%',
      borderRadius: '24px',
      padding: '18px 18px',
      background: locked ? 'linear-gradient(135deg, #6f7c88 0%, #404b55 100%)' : gradient,
      boxShadow: locked ? '0 5px 0 #2e353d' : '0 5px 0 rgba(0,0,0,0.22)',
      display: 'grid',
      gridTemplateColumns: '52px 1fr',
      alignItems: 'center',
      gap: '14px',
      color: 'white',
      userSelect: 'none',
    }}>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '18px',
        background: 'rgba(255,255,255,0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem'
      }}>
        {locked ? '🔒' : icon}
      </div>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.12rem', lineHeight: 1.15 }}>{title}</h2>
        <p style={{ margin: '5px 0 0', fontSize: '0.86rem', opacity: 0.9, lineHeight: 1.25 }}>{locked ? 'Completa el Módulo I para desbloquear' : subtitle}</p>
      </div>
    </div>
  );
}

export default function Map() {
  const { startLesson, unlockedLevelId, lives } = useGame();

  const handleStart = (id) => {
    if (lives === 0) {
      alert('¡No tienes corazones! Toca el corazón en la barra superior para recargar vidas.');
      return;
    }
    startLesson(id);
  };

  const mod2Locked = unlockedLevelId <= MOD1_COUNT;

  return (
    <div className="map-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '22px', paddingRight: '22px', paddingBottom: '100px', paddingLeft: '22px' }}>
      <div className="map-hero" style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '118px 1fr',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '18px',
        background: 'var(--color-surface)',
        border: '2px solid var(--color-border)',
        borderRadius: '24px',
        padding: '14px',
        boxShadow: 'var(--shadow-soft)'
      }}>
        <Mascot state="idle" />
        <div>
          <p style={{ fontWeight: 900, color: 'var(--color-primary)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Ruta IFBBLINGO</p>
          <h1 style={{ fontSize: '1.35rem', lineHeight: 1.1, marginTop: '4px' }}>Entrena tu conocimiento</h1>
          <p style={{ color: 'var(--color-muted)', fontWeight: 800, lineHeight: 1.25, marginTop: '6px' }}>Completa niveles, gana EXP y desbloquea nutrición.</p>
        </div>
      </div>

      <ModuleBanner
        title="Módulo I: Fisiología"
        subtitle="Fundamentos del cuerpo humano aplicados al deporte"
        icon="🧬"
        gradient="linear-gradient(135deg, #58cc02 0%, #23a924 100%)"
        locked={false}
      />

      <div className="level-path" style={{ display: 'flex', flexDirection: 'column', gap: '34px', width: '100%', alignItems: 'center', marginBottom: '46px', marginTop: '28px' }}>
        {modulo1Data.map((level, index) => {
          const globalId = index + 1;
          const isLocked = globalId > unlockedLevelId;
          return (
            <LevelButton
              key={level.lessonId}
              level={level}
              index={index}
              globalId={globalId}
              isLocked={isLocked}
              isCurrent={globalId === unlockedLevelId}
              IconComponent={iconsM1[index % iconsM1.length]}
              onStart={handleStart}
              accentColor="var(--color-secondary)"
              shadowColor="var(--color-secondary-shadow)"
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', opacity: mod2Locked ? 0.35 : 1 }}>
        <ChevronDown size={34} style={{ color: 'var(--color-gray-shadow)' }} />
        <ChevronDown size={34} style={{ color: 'var(--color-gray-shadow)', marginTop: '-17px' }} />
      </div>

      <ModuleBanner
        title="Módulo II: Nutrición"
        subtitle="Suplementación y alimentación en el entrenamiento"
        icon="🥗"
        gradient="linear-gradient(135deg, #1cb0f6 0%, #087cc4 100%)"
        locked={mod2Locked}
      />

      <div className="level-path" style={{ display: 'flex', flexDirection: 'column', gap: '34px', width: '100%', alignItems: 'center', marginTop: '28px' }}>
        {modulo2Data.map((level, index) => {
          const globalId = MOD1_COUNT + index + 1;
          const isLocked = globalId > unlockedLevelId || mod2Locked;
          return (
            <LevelButton
              key={level.lessonId}
              level={level}
              index={index}
              globalId={globalId}
              isLocked={isLocked}
              isCurrent={globalId === unlockedLevelId}
              IconComponent={iconsM2[index % iconsM2.length]}
              onStart={handleStart}
              accentColor="var(--color-blue)"
              shadowColor="var(--color-blue-shadow)"
            />
          );
        })}
      </div>
    </div>
  );
}
