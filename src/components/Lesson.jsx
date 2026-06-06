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

  useEffect(() => {
    const level = moduleData.levels.find(l => l.id === currentLevelId);
    if (level) {
      setQuestions(level.questions);
    }
  }, [currentLevelId]);

  if (questions.length === 0) return <div>Cargando...</div>;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleCheck = () => {
    if (status === 'playing') {
      if (selectedOption === null) return;
      
      if (selectedOption === currentQ.correctAnswerIndex) {
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
        setStatus('playing');
        setMascotState('thinking');
      } else {
        finishLesson(true); // Success
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', flex: 1 }}>
      {/* Progress Bar */}
      <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--color-gray)', borderRadius: '8px', marginBottom: '24px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.3s' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {currentQ.options.map((opt, idx) => {
          let extraClass = '';
          if (status !== 'playing') {
            if (idx === currentQ.correctAnswerIndex) extraClass = 'selected'; // Highlight correct always
            if (idx === selectedOption && idx !== currentQ.correctAnswerIndex) extraClass = 'btn-danger'; // Highlight wrong if selected
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

      {/* Footer Area */}
      <div style={{ 
        marginTop: '24px', 
        padding: '24px',
        margin: '0 -24px -24px -24px',
        backgroundColor: status === 'correct' ? '#d7ffb8' : status === 'incorrect' ? '#ffdfdf' : 'transparent',
        borderTop: status !== 'playing' ? `2px solid ${status === 'correct' ? 'var(--color-primary)' : 'var(--color-danger)'}` : 'none'
      }}>
        {status === 'correct' && <h2 style={{ color: 'var(--color-primary-shadow)', marginBottom: '16px' }}>¡Excelente!</h2>}
        {status === 'incorrect' && <h2 style={{ color: 'var(--color-danger-shadow)', marginBottom: '16px' }}>Incorrecto. La respuesta era: {currentQ.options[currentQ.correctAnswerIndex]}</h2>}
        
        <button 
          className={`btn ${status === 'incorrect' ? 'btn-danger' : ''}`}
          onClick={handleCheck}
          disabled={status === 'playing' && selectedOption === null}
        >
          {status === 'playing' ? 'COMPROBAR' : 'CONTINUAR'}
        </button>
      </div>
    </div>
  );
}
