import { Dumbbell, Lock, Star, Zap, Flame, Trophy, Heart, Activity, Target, Brain, Apple, Leaf, ChevronDown, Salad, Pill, Wind, Gauge } from 'lucide-react';
import { useGame } from '../context/GameContext';
import modulo1Data from '../data/modulo1.json';
import modulo2Data from '../data/modulo2.json';
import Mascot from './Mascot';

const iconsM1 = [Dumbbell, Target, Star, Zap, Flame, Trophy, Heart, Activity];
const iconsM2 = [Apple, Brain, Leaf, Gauge, Zap, Star, Heart, Flame, Trophy, Activity, Target, Dumbbell, Apple, Brain, Leaf];

const MOD1_COUNT = modulo1Data.length;

function LevelButton({ level, index, globalId, isLocked, IconComponent, onStart, accentColor, shadowColor }) {
  const offset = Math.sin(index) * 50;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${offset}px)` }}>
      <div
        className={`btn flex-center ${isLocked ? 'btn-disabled' : 'pulse'}`}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          padding: 0,
          backgroundColor: isLocked ? 'var(--color-gray)' : accentColor,
          boxShadow: `0 6px 0 ${isLocked ? 'var(--color-gray-shadow)' : shadowColor}`,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          color: isLocked ? 'var(--color-locked-icon)' : 'white',
          border: 'none',
        }}
        onClick={() => { if (!isLocked) onStart(globalId); }}
      >
        {isLocked ? <Lock size={32} /> : <IconComponent size={32} />}
      </div>
      <span style={{
        marginTop: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '150px',
        color: isLocked ? 'var(--color-locked-text)' : 'var(--color-text)',
        fontSize: '0.85rem',
      }}>
        {level.title}
      </span>
    </div>
  );
}

function ModuleBanner({ title, subtitle, emoji, gradient, locked }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      borderRadius: '20px',
      padding: '24px 20px',
      marginBottom: '8px',
      background: locked
        ? 'linear-gradient(135deg, #555 0%, #333 100%)'
        : gradient,
      boxShadow: locked ? '0 4px 0 #222' : '0 4px 0 rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      color: 'white',
      userSelect: 'none',
    }}>
      <span style={{ fontSize: '2.5rem' }}>{locked ? '🔒' : emoji}</span>
      <h2 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center' }}>{title}</h2>
      <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.85, textAlign: 'center' }}>{subtitle}</p>
      {locked && (
        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic' }}>
          Completa el Módulo I para desbloquear
        </p>
      )}
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', paddingBottom: '100px', gap: '0px' }}>

      {/* Mascot */}
      <div style={{ marginBottom: '24px' }}>
        <Mascot state="idle" />
      </div>

      {/* ── MÓDULO I ── */}
      <ModuleBanner
        title="Módulo I: Fisiología"
        subtitle="Fundamentos del cuerpo humano aplicados al deporte"
        emoji="🧬"
        gradient="linear-gradient(135deg, #58cc02 0%, #46a302 100%)"
        locked={false}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center', marginBottom: '48px', marginTop: '24px' }}>
        {modulo1Data.map((level, index) => {
          const globalId = index + 1;
          const isLocked = globalId > unlockedLevelId;
          const IconComponent = iconsM1[index % iconsM1.length];
          return (
            <LevelButton
              key={level.lessonId}
              level={level}
              index={index}
              globalId={globalId}
              isLocked={isLocked}
              IconComponent={IconComponent}
              onStart={handleStart}
              accentColor="var(--color-secondary)"
              shadowColor="var(--color-secondary-shadow)"
            />
          );
        })}
      </div>

      {/* Connector arrow between modules */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', opacity: mod2Locked ? 0.35 : 1 }}>
        <ChevronDown size={32} style={{ color: 'var(--color-gray-shadow)' }} />
        <ChevronDown size={32} style={{ color: 'var(--color-gray-shadow)', marginTop: '-16px' }} />
      </div>

      {/* ── MÓDULO II ── */}
      <ModuleBanner
        title="Módulo II: Nutrición"
        subtitle="Suplementación y alimentación en el entrenamiento"
        emoji="🥗"
        gradient="linear-gradient(135deg, #1cb0f6 0%, #0e86c0 100%)"
        locked={mod2Locked}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center', marginTop: '24px' }}>
        {modulo2Data.map((level, index) => {
          const globalId = MOD1_COUNT + index + 1;
          const isLocked = globalId > unlockedLevelId || mod2Locked;
          const IconComponent = iconsM2[index % iconsM2.length];
          return (
            <LevelButton
              key={level.lessonId}
              level={level}
              index={index}
              globalId={globalId}
              isLocked={isLocked}
              IconComponent={IconComponent}
              onStart={handleStart}
              accentColor="#1cb0f6"
              shadowColor="#0e86c0"
            />
          );
        })}
      </div>

    </div>
  );
}
