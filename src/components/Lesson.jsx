import { useMemo, useState } from 'react';
import { useGame } from '../context/useGame';
import modulo1Data from '../data/modulo1.json';
import modulo2Data from '../data/modulo2.json';
import AnswerFeedback from './AnswerFeedback';
import Mascot from './Mascot';

const MOD1_COUNT = modulo1Data.length;

function getLevelData(levelId) {
  if (levelId <= MOD1_COUNT) {
    return modulo1Data[levelId - 1];
  }
  const mod2Index = levelId - MOD1_COUNT - 1;
  return modulo2Data[mod2Index] || null;
}

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getBlankAnswerText(answer) {
  return typeof answer === 'string' ? answer : answer?.text;
}

function getPracticeQuestions(unlockedLevelId) {
  const unlockedModule1 = modulo1Data.slice(0, Math.min(unlockedLevelId, MOD1_COUNT));
  const unlockedModule2Count = Math.max(0, unlockedLevelId - MOD1_COUNT);
  const unlockedModule2 = modulo2Data.slice(0, unlockedModule2Count);
  const availableLevels = [...unlockedModule1, ...unlockedModule2];
  const allExercises = availableLevels.flatMap((level) => level.exercises);

  return shuffleItems(allExercises).slice(0, 5);
}

function getQuestions(currentLevelId, gameState, unlockedLevelId) {
  if (gameState === 'practice') {
    return getPracticeQuestions(unlockedLevelId);
  }

  return getLevelData(currentLevelId)?.exercises || [];
}

function getHintedSelectedOption(question) {
  if (question.type === 'multiple_choice') {
    return question.options.findIndex((option) => option.id === question.correctAnswerId);
  }

  if (question.type === 'true_false') {
    return question.correctAnswer ? 0 : 1;
  }

  return null;
}

function getHintedMatchingPairs(question, shuffledRightPairs) {
  return question.pairs.map((_, index) => {
    const rightIndex = shuffledRightPairs.findIndex((pair) => pair.originalIdx === index);
    return [index, rightIndex];
  });
}

export default function Lesson() {
  const {
    currentLevelId,
    lives,
    loseLife,
    finishLesson,
    gainExp,
    gameState,
    unlockedLevelId,
    isHintActive,
    clearHint
  } = useGame();

  const questions = useMemo(() => getQuestions(currentLevelId, gameState, unlockedLevelId), [currentLevelId, gameState, unlockedLevelId]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('playing');
  const [mascotState, setMascotState] = useState('thinking');
  const [matchingPairs, setMatchingPairs] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [blankAnswers, setBlankAnswers] = useState([]);

  const currentQ = questions[currentIndex] || questions[0] || null;
  const progress = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const hintedSelectedOption = currentQ && isHintActive && status === 'playing' ? getHintedSelectedOption(currentQ) : null;

  const shuffledRightPairs = useMemo(() => {
    if (!currentQ || currentQ.type !== 'match_pairs') return [];
    return shuffleItems(currentQ.pairs.map((pair, index) => ({ right: pair.right, originalIdx: index })));
  }, [currentQ]);

  const availableOptions = useMemo(() => {
    if (!currentQ || currentQ.type !== 'fill_in_blanks_cards') return [];
    return shuffleItems(currentQ.options.map((text, index) => ({
      id: `${index}-${text}`,
      text
    })));
  }, [currentQ]);

  if (!currentQ) return <div>Cargando...</div>;

  const effectiveSelectedOption = hintedSelectedOption ?? selectedOption;
  const effectiveTextInput = isHintActive && status === 'playing' && currentQ.type === 'text_input'
    ? currentQ.correctAnswers[0]
    : textInput;
  const effectiveBlankAnswers = isHintActive && status === 'playing' && currentQ.type === 'fill_in_blanks_cards'
    ? currentQ.correctAnswers
    : blankAnswers;
  const effectiveMatchingPairs = isHintActive && status === 'playing' && currentQ.type === 'match_pairs'
    ? getHintedMatchingPairs(currentQ, shuffledRightPairs)
    : matchingPairs;

  const resetQuestionState = () => {
    setSelectedOption(null);
    setMatchingPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setTextInput('');
    setBlankAnswers([]);
    setStatus('playing');
    setMascotState('thinking');
  };

  const isMatchingComplete = () => {
    if (currentQ.type !== 'match_pairs') return false;
    return effectiveMatchingPairs.length === currentQ.pairs.length;
  };

  const checkMatching = () => {
    return effectiveMatchingPairs.every(([leftIndex, rightIndex]) => {
      const leftItem = currentQ.pairs[leftIndex].left;
      const rightItem = shuffledRightPairs[rightIndex]?.right;
      const originalPair = currentQ.pairs.find((pair) => pair.left === leftItem);
      return originalPair?.right === rightItem;
    });
  };

  const checkCanCheck = () => {
    if (currentQ.type === 'match_pairs') return isMatchingComplete();
    if (currentQ.type === 'text_input') return effectiveTextInput.trim().length > 0;
    if (currentQ.type === 'fill_in_blanks_cards') {
      return effectiveBlankAnswers.length === currentQ.correctAnswers.length && !effectiveBlankAnswers.includes(null);
    }
    return effectiveSelectedOption !== null;
  };

  const handleCheck = () => {
    if (status === 'playing') {
      let isCorrect = false;

      if (currentQ.type === 'match_pairs') {
        if (!isMatchingComplete()) return;
        isCorrect = checkMatching();
      } else if (currentQ.type === 'multiple_choice') {
        if (effectiveSelectedOption === null) return;
        const selectedId = currentQ.options[effectiveSelectedOption].id;
        isCorrect = selectedId === currentQ.correctAnswerId;
      } else if (currentQ.type === 'true_false') {
        if (effectiveSelectedOption === null) return;
        isCorrect = (effectiveSelectedOption === 0) === currentQ.correctAnswer;
      } else if (currentQ.type === 'text_input') {
        if (!effectiveTextInput.trim()) return;
        isCorrect = currentQ.correctAnswers
          .map((answer) => answer.toLowerCase().trim())
          .includes(effectiveTextInput.toLowerCase().trim());
      } else if (currentQ.type === 'fill_in_blanks_cards') {
        if (effectiveBlankAnswers.includes(null)) return;
        isCorrect = effectiveBlankAnswers.every((answer, index) => getBlankAnswerText(answer) === currentQ.correctAnswers[index]);
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
      return;
    }

    if (lives === 0 && status === 'incorrect') {
      clearHint();
      finishLesson(false, gameState === 'practice');
      return;
    }

    if (currentIndex < questions.length - 1) {
      clearHint();
      setCurrentIndex((index) => index + 1);
      resetQuestionState();
    } else {
      clearHint();
      finishLesson(true, gameState === 'practice');
    }
  };

  const handleMatchSelect = (side, index) => {
    if (status !== 'playing' || isHintActive) return;

    if (side === 'left') {
      const existingPairIndex = matchingPairs.findIndex((pair) => pair[0] === index);
      if (existingPairIndex !== -1) {
        setMatchingPairs((pairs) => pairs.filter((_, pairIndex) => pairIndex !== existingPairIndex));
        return;
      }

      if (selectedLeft === index) {
        setSelectedLeft(null);
        return;
      }

      if (selectedRight !== null) {
        setMatchingPairs((pairs) => [...pairs, [index, selectedRight]]);
        setSelectedLeft(null);
        setSelectedRight(null);
        return;
      }

      setSelectedLeft(index);
      return;
    }

    const existingPairIndex = matchingPairs.findIndex((pair) => pair[1] === index);
    if (existingPairIndex !== -1) {
      setMatchingPairs((pairs) => pairs.filter((_, pairIndex) => pairIndex !== existingPairIndex));
      return;
    }

    if (selectedRight === index) {
      setSelectedRight(null);
      return;
    }

    if (selectedLeft !== null) {
      setMatchingPairs((pairs) => [...pairs, [selectedLeft, index]]);
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setSelectedRight(index);
  };

  const canCheck = checkCanCheck();

  return (
    <div className="lesson-screen" style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      <div className="lesson-scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px', display: 'flex', flexDirection: 'column' }}>
        <div className="lesson-progress" style={{ width: '100%', height: '16px', backgroundColor: 'var(--color-gray)', borderRadius: '999px', marginBottom: '22px', overflow: 'hidden', flexShrink: 0, boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.05)' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.3s', borderRadius: '999px' }}></div>
        </div>

        <div className="lesson-prompt-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
          <Mascot state={mascotState} />
          <div className="lesson-question-card" style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border)',
            borderRadius: '22px',
            padding: '16px',
            marginLeft: '16px',
            position: 'relative',
            flex: 1,
            boxShadow: 'var(--shadow-soft)'
          }}>
            <h2 style={{ fontSize: '1.12rem', lineHeight: 1.25 }}>{currentQ.question}</h2>
          </div>
        </div>

        <div className="lesson-answer-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
          {currentQ.type === 'match_pairs' && (
            <div className="match-grid" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {currentQ.pairs.map((pair, index) => {
                  const isPaired = effectiveMatchingPairs.some((item) => item[0] === index);
                  const isSelected = selectedLeft === index;
                  return (
                    <button
                      key={`l-${index}`}
                      className={`btn btn-outline ${isSelected ? 'selected' : ''} ${isPaired ? 'btn-disabled' : ''}`}
                      style={{ opacity: isPaired ? 0.5 : 1 }}
                      onClick={() => handleMatchSelect('left', index)}
                    >
                      {pair.left}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {shuffledRightPairs.map((pair, index) => {
                  const isPaired = effectiveMatchingPairs.some((item) => item[1] === index);
                  const isSelected = selectedRight === index;
                  return (
                    <button
                      key={`r-${index}`}
                      className={`btn btn-outline ${isSelected ? 'selected' : ''} ${isPaired ? 'btn-disabled' : ''}`}
                      style={{ opacity: isPaired ? 0.5 : 1 }}
                      onClick={() => handleMatchSelect('right', index)}
                    >
                      {pair.right}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentQ.type === 'true_false' && ['Verdadero', 'Falso'].map((option, index) => {
            let extraClass = '';
            if (status !== 'playing') {
              const isCorrectOption = (index === 0) === currentQ.correctAnswer;
              if (isCorrectOption) extraClass = 'selected';
              if (index === effectiveSelectedOption && !isCorrectOption) extraClass = 'btn-danger';
            } else if (index === effectiveSelectedOption) {
              extraClass = 'selected';
            }

            return (
              <button key={option} className={`btn btn-outline ${extraClass}`} onClick={() => status === 'playing' && !isHintActive && setSelectedOption(index)} disabled={status !== 'playing'}>
                {option}
              </button>
            );
          })}

          {currentQ.type === 'multiple_choice' && currentQ.options.map((option, index) => {
            let extraClass = '';
            if (status !== 'playing') {
              if (option.id === currentQ.correctAnswerId) extraClass = 'selected';
              if (index === effectiveSelectedOption && option.id !== currentQ.correctAnswerId) extraClass = 'btn-danger';
            } else if (index === effectiveSelectedOption) {
              extraClass = 'selected';
            }

            return (
              <button key={option.id} className={`btn btn-outline ${extraClass}`} onClick={() => status === 'playing' && !isHintActive && setSelectedOption(index)} disabled={status !== 'playing'}>
                {option.text}
              </button>
            );
          })}

          {currentQ.type === 'text_input' && (
            <input
              type="text"
              className="input-field"
              placeholder="Escribe tu respuesta aquí..."
              value={effectiveTextInput}
              onChange={(event) => setTextInput(event.target.value)}
              disabled={status !== 'playing' || isHintActive}
              autoFocus
            />
          )}

          {currentQ.type === 'fill_in_blanks_cards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ fontSize: '1.2rem', lineHeight: '2' }}>
                {currentQ.text.split(/(\{\d+\})/g).map((part, index) => {
                  const match = part.match(/\{(\d+)\}/);
                  if (!match) return <span key={part + index}>{part}</span>;

                  const blankIndex = Number(match[1]);
                  const filledText = effectiveBlankAnswers[blankIndex];
                  const displayText = getBlankAnswerText(filledText);
                  return (
                    <span
                      key={part + index}
                      className={`blank-slot ${displayText ? 'filled' : ''}`}
                      onClick={() => {
                        if (status === 'playing' && !isHintActive && filledText) {
                          const newBlanks = [...effectiveBlankAnswers];
                          newBlanks[blankIndex] = null;
                          setBlankAnswers(newBlanks);
                        }
                      }}
                    >
                      {displayText || '________'}
                    </span>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {availableOptions.map((option) => {
                  const isUsed = effectiveBlankAnswers.some((answer) => answer?.id === option.id);
                  return (
                    <button
                      key={option.id}
                      className={`word-card ${isUsed ? 'used' : ''}`}
                      onClick={() => {
                        if (status !== 'playing' || isHintActive) return;
                        if (isUsed) {
                          const newBlanks = [...effectiveBlankAnswers];
                          const indexToRemove = newBlanks.findIndex((answer) => answer?.id === option.id);
                          if (indexToRemove !== -1) {
                            newBlanks[indexToRemove] = null;
                            setBlankAnswers(newBlanks);
                          }
                          return;
                        }
                        const emptyIndex = effectiveBlankAnswers.indexOf(null);
                        const newBlanks = effectiveBlankAnswers.length === currentQ.correctAnswers.length
                          ? [...effectiveBlankAnswers]
                          : new Array(currentQ.correctAnswers.length).fill(null);
                        const targetIndex = emptyIndex !== -1 ? emptyIndex : newBlanks.indexOf(null);
                        if (targetIndex !== -1) {
                          newBlanks[targetIndex] = option;
                          setBlankAnswers(newBlanks);
                        }
                      }}
                      disabled={status !== 'playing'}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lesson-action-bar" style={{
        paddingTop: '24px',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        backgroundColor: status === 'correct' ? 'var(--color-bg-correct)' : status === 'incorrect' ? 'var(--color-bg-incorrect)' : 'var(--color-surface)',
        borderTop: `2px solid ${status === 'correct' ? 'var(--color-primary)' : status === 'incorrect' ? 'var(--color-danger)' : 'var(--color-gray)'}`,
        flexShrink: 0
      }}>
        <AnswerFeedback status={status} question={currentQ} />

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
