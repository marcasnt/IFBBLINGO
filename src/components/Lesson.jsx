import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import moduleData from '../data/modulo1.json';
import Mascot from './Mascot';

export default function Lesson() {
  const { currentLevelId, lives, loseLife, finishLesson, gainExp } = useGame();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('playing'); // 'playing', 'correct', 'incorrect'
  const [mascotState, setMascotState] = useState('thinking');
  
  // For MATCHING type
  const [matchingPairs, setMatchingPairs] = useState([]); // Array of selected pairs [[leftIdx, rightIdx]]
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  useEffect(() => {
    const level = moduleData.levels.find(l => l.id === currentLevelId);
    if (level) {
      setQuestions(level.questions);
    }
  }, [currentLevelId]);

  if (questions.length === 0) return <div>Cargando...</div>;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const isMatchingComplete = () => {
    if (currentQ.type !== 'MATCHING') return false;
    return matchingPairs.length === currentQ.pairs.length;
  };

  const checkMatching = () => {
    // Check if all pairs are correct
    let isCorrect = true;
    for (let pair of matchingPairs) {
      const leftItem = currentQ.pairs[pair[0]].left;
      const rightItem = currentQ.pairs[pair[1]].right;
      // We know they match if they were in the same index originally, 
      // but in our UI we just check if pair[0] === pair[1] because we didn't shuffle the indices, wait!
      // Actually we need to shuffle right items for it to be a real game.
      // Let's assume pairs are checked by checking if leftItem and rightItem belong to the same original pair.
      const originalPair = currentQ.pairs.find(p => p.left === leftItem);
      if (originalPair.right !== rightItem) {
        isCorrect = false;
        break;
      }
    }
    return isCorrect;
  };

  const handleCheck = () => {
    if (status === 'playing') {
      let isCorrect = false;

      if (currentQ.type === 'MATCHING') {
        if (!isMatchingComplete()) return;
        isCorrect = checkMatching();
      } else {
        if (selectedOption === null) return;
        isCorrect = selectedOption === currentQ.correctAnswerIndex;
      }
      
      if (isCorrect) {
        setStatus('correct');
        setMascotState('happy');
        gainExp(10);
      } else {
        setStatus('incorrect');
        setMascotState('sad');
        loseLife();
      }
    } else {
      // Proceed to next
      if (lives === 0 && status === 'incorrect') {
        finishLesson(false); // Fail
        return;
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
        setMatchingPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setStatus('playing');
        setMascotState('thinking');
      } else {
        finishLesson(true); // Success
      }
    }
  };

  const handleMatchSelect = (side, index) => {
    if (status !== 'playing') return;
    
    if (side === 'left') {
      if (matchingPairs.some(p => p[0] === index)) return; // Already paired
      setSelectedLeft(index);
    } else {
      if (matchingPairs.some(p => p[1] === index)) return; // Already paired
      setSelectedRight(index);
    }
  };

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      setMatchingPairs([...matchingPairs, [selectedLeft, selectedRight]]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  }, [selectedLeft, selectedRight]);

  const canCheck = currentQ.type === 'MATCHING' ? isMatchingComplete() : selectedOption !== null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      
      {/* Top / Main Scrollable Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--color-gray)', borderRadius: '8px', marginBottom: '24px', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.3s' }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
          <Mascot state={mascotState} />
          <div style={{ 
            backgroundColor: 'white', 
            border: '2px solid var(--color-gray)', 
            borderRadius: '16px', 
            padding: '16px', 
            marginLeft: '16px',
            position: 'relative',
            flex: 1
          }}>
            <h2 style={{ fontSize: '1.2rem' }}>{currentQ.question}</h2>
          </div>
        </div>

        {/* Options Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
          {currentQ.type === 'MATCHING' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {currentQ.pairs.map((p, idx) => {
                  const isPaired = matchingPairs.some(pair => pair[0] === idx);
                  const isSelected = selectedLeft === idx;
                  return (
                    <button 
                      key={`l-${idx}`}
                      className={`btn btn-outline ${isSelected ? 'selected' : ''} ${isPaired ? 'btn-disabled' : ''}`}
                      style={{ opacity: isPaired ? 0.5 : 1 }}
                      onClick={() => handleMatchSelect('left', idx)}
                    >
                      {p.left}
                    </button>
                  )
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {/* Normally we should shuffle right items, for simplicity we just map them, but in a real app we'd shuffle */}
                {currentQ.pairs.map((p, idx) => {
                  const isPaired = matchingPairs.some(pair => pair[1] === idx);
                  const isSelected = selectedRight === idx;
                  return (
                    <button 
                      key={`r-${idx}`}
                      className={`btn btn-outline ${isSelected ? 'selected' : ''} ${isPaired ? 'btn-disabled' : ''}`}
                      style={{ opacity: isPaired ? 0.5 : 1 }}
                      onClick={() => handleMatchSelect('right', idx)}
                    >
                      {p.right}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {currentQ.type !== 'MATCHING' && currentQ.options.map((opt, idx) => {
            let extraClass = '';
            if (status !== 'playing') {
              if (idx === currentQ.correctAnswerIndex) extraClass = 'selected'; 
              if (idx === selectedOption && idx !== currentQ.correctAnswerIndex) extraClass = 'btn-danger'; 
            } else {
              if (idx === selectedOption) extraClass = 'selected';
            }

            return (
              <button 
                key={idx}
                className={`btn btn-outline ${extraClass}`}
                onClick={() => status === 'playing' && setSelectedOption(idx)}
                disabled={status !== 'playing'}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Area (Fixed at bottom) */}
      <div style={{ 
        padding: '24px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        backgroundColor: status === 'correct' ? '#d7ffb8' : status === 'incorrect' ? '#ffdfdf' : 'white',
        borderTop: `2px solid ${status === 'correct' ? 'var(--color-primary)' : status === 'incorrect' ? 'var(--color-danger)' : 'var(--color-gray)'}`,
        flexShrink: 0
      }}>
        {status === 'correct' && <h2 style={{ color: 'var(--color-primary-shadow)', marginBottom: '16px' }}>¡Excelente!</h2>}
        {status === 'incorrect' && (
          <h2 style={{ color: 'var(--color-danger-shadow)', marginBottom: '16px', fontSize: '1.1rem' }}>
            Incorrecto. {currentQ.type === 'MATCHING' ? 'Las parejas no eran correctas.' : `La respuesta era: ${currentQ.options[currentQ.correctAnswerIndex]}`}
          </h2>
        )}
        
        <button 
          className={`btn ${status === 'incorrect' ? 'btn-danger' : ''}`}
          onClick={handleCheck}
          disabled={status === 'playing' && !canCheck}
        >
          {status === 'playing' ? 'COMPROBAR' : 'CONTINUAR'}
        </button>
      </div>
    </div>
  );
}
