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
  const [shuffledRightPairs, setShuffledRightPairs] = useState([]);

  const [textInput, setTextInput] = useState('');
  // For FILL_IN_BLANKS_CARDS type
  const [blankAnswers, setBlankAnswers] = useState([]); // Array of strings placed in the blanks
  const [availableOptions, setAvailableOptions] = useState([]); // Array of options available

  useEffect(() => {
    const levelIndex = currentLevelId - 1;
    if (levelIndex >= 0 && levelIndex < moduleData.length) {
      setQuestions(moduleData[levelIndex].exercises);
    }
  }, [currentLevelId]);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      setMatchingPairs([...matchingPairs, [selectedLeft, selectedRight]]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  }, [selectedLeft, selectedRight]);

  const isMatchingComplete = () => {
    if (currentQ.type !== 'match_pairs') return false;
    return matchingPairs.length === currentQ.pairs.length;
  };

  useEffect(() => {
    if (questions.length > 0) {
      const currentQ = questions[currentIndex];
      if (currentQ.type === 'match_pairs') {
        const rightItems = currentQ.pairs.map((p, idx) => ({ right: p.right, originalIdx: idx }));
        setShuffledRightPairs(rightItems.sort(() => Math.random() - 0.5));
      } else if (currentQ.type === 'fill_in_blanks_cards') {
        setBlankAnswers(new Array(currentQ.correctAnswers.length).fill(null));
        setAvailableOptions([...currentQ.options].sort(() => Math.random() - 0.5));
      }
    }
  }, [currentIndex, questions]);

  if (questions.length === 0) return <div>Cargando...</div>;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const checkMatching = () => {
    // Check if all pairs are correct
    let isCorrect = true;
    for (let pair of matchingPairs) {
      const leftItem = currentQ.pairs[pair[0]].left;
      const rightItem = shuffledRightPairs[pair[1]].right;
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

      if (currentQ.type === 'match_pairs') {
        if (!isMatchingComplete()) return;
        isCorrect = checkMatching();
      } else if (currentQ.type === 'multiple_choice') {
        if (selectedOption === null) return;
        // In the new json, selectedOption is an index, but correct is an ID 'A', 'B'. 
        // We will map selectedOption to the actual option object.
        const selectedId = currentQ.options[selectedOption].id;
        isCorrect = selectedId === currentQ.correctAnswerId;
      } else if (currentQ.type === 'true_false') {
        if (selectedOption === null) return;
        // Opcion 0 is True, 1 is False
        const selectedBool = selectedOption === 0;
        isCorrect = selectedBool === currentQ.correctAnswer;
      } else if (currentQ.type === 'text_input') {
        if (!textInput.trim()) return;
        isCorrect = currentQ.correctAnswers.map(a => a.toLowerCase().trim()).includes(textInput.toLowerCase().trim());
      } else if (currentQ.type === 'fill_in_blanks_cards') {
        if (blankAnswers.includes(null)) return;
        // Compare each filled answer with correct answer
        isCorrect = blankAnswers.every((ans, idx) => ans === currentQ.correctAnswers[idx]);
      }
      
      if (isCorrect) {
        setStatus('correct');
        setMascotState('happy');
        gainExp(currentQ.xp || 10);
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
        setTextInput('');
        setBlankAnswers([]);
        setAvailableOptions([]);
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

  const checkCanCheck = () => {
    if (currentQ.type === 'match_pairs') return isMatchingComplete();
    if (currentQ.type === 'text_input') return textInput.trim().length > 0;
    if (currentQ.type === 'fill_in_blanks_cards') return !blankAnswers.includes(null);
    return selectedOption !== null;
  };
  const canCheck = checkCanCheck();

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
          {currentQ.type === 'match_pairs' && (
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
                {shuffledRightPairs.map((p, idx) => {
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

          {currentQ.type === 'true_false' && ['Verdadero', 'Falso'].map((opt, idx) => {
            let extraClass = '';
            if (status !== 'playing') {
              const isCorrectOpt = (idx === 0) === currentQ.correctAnswer;
              if (isCorrectOpt) extraClass = 'selected';
              if (idx === selectedOption && !isCorrectOpt) extraClass = 'btn-danger';
            } else {
              if (idx === selectedOption) extraClass = 'selected';
            }
            return (
              <button key={idx} className={`btn btn-outline ${extraClass}`} onClick={() => status === 'playing' && setSelectedOption(idx)} disabled={status !== 'playing'}>
                {opt}
              </button>
            );
          })}

          {currentQ.type === 'multiple_choice' && currentQ.options.map((opt, idx) => {
            let extraClass = '';
            if (status !== 'playing') {
              if (opt.id === currentQ.correctAnswerId) extraClass = 'selected'; 
              if (idx === selectedOption && opt.id !== currentQ.correctAnswerId) extraClass = 'btn-danger'; 
            } else {
              if (idx === selectedOption) extraClass = 'selected';
            }
            return (
              <button key={idx} className={`btn btn-outline ${extraClass}`} onClick={() => status === 'playing' && setSelectedOption(idx)} disabled={status !== 'playing'}>
                {opt.text}
              </button>
            );
          })}

          {currentQ.type === 'text_input' && (
            <input 
              type="text" 
              className="input-field" 
              placeholder="Escribe tu respuesta aquí..." 
              value={textInput} 
              onChange={e => setTextInput(e.target.value)} 
              disabled={status !== 'playing'} 
              autoFocus
            />
          )}

          {currentQ.type === 'fill_in_blanks_cards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ fontSize: '1.2rem', lineHeight: '2' }}>
                {(() => {
                  let parts = currentQ.text.split(/(\{\d+\})/g);
                  return parts.map((part, i) => {
                    const match = part.match(/\{(\d+)\}/);
                    if (match) {
                      const blankIdx = parseInt(match[1], 10);
                      const filledText = blankAnswers[blankIdx];
                      return (
                        <span 
                          key={i} 
                          className={`blank-slot ${filledText ? 'filled' : ''}`} 
                          onClick={() => {
                            if (status === 'playing' && filledText) {
                              const newBlanks = [...blankAnswers];
                              newBlanks[blankIdx] = null;
                              setBlankAnswers(newBlanks);
                            }
                          }}
                        >
                          {filledText || "________"}
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  });
                })()}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {availableOptions.map((opt, i) => {
                  const isUsed = blankAnswers.includes(opt);
                  return (
                    <button 
                      key={i} 
                      className={`word-card ${isUsed ? 'used' : ''}`}
                      onClick={() => {
                        if (status !== 'playing' || isUsed) return;
                        const emptyIdx = blankAnswers.indexOf(null);
                        if (emptyIdx !== -1) {
                          const newBlanks = [...blankAnswers];
                          newBlanks[emptyIdx] = opt;
                          setBlankAnswers(newBlanks);
                        }
                      }}
                      disabled={isUsed || status !== 'playing'}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
