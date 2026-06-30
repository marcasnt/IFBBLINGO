function getCorrectAnswer(question) {
  if (!question) return '';

  if (question.type === 'match_pairs') {
    return question.pairs.map((pair) => `${pair.left} = ${pair.right}`);
  }

  if (question.type === 'true_false') {
    return question.correctAnswer ? 'Verdadero' : 'Falso';
  }

  if (question.type === 'multiple_choice') {
    const option = question.options.find((item) => item.id === question.correctAnswerId);
    return option ? option.text : '';
  }

  if (question.type === 'text_input') {
    return question.correctAnswers[0] || '';
  }

  if (question.type === 'fill_in_blanks_cards') {
    return question.correctAnswers.join(' - ');
  }

  return '';
}

function buildCompletedSentence(question) {
  if (question.type !== 'fill_in_blanks_cards' || !question.text) return null;

  return question.text.replace(/\{(\d+)\}/g, (_, index) => {
    return question.correctAnswers[Number(index)] || '';
  });
}

function getLearningPoint(question) {
  if (!question?.explanation) return null;
  if (typeof question.explanation === 'string') return question.explanation;
  return question.explanation.short || question.explanation.whyCorrect || null;
}

export default function AnswerFeedback({ status, question }) {
  const learningPoint = getLearningPoint(question);

  if (status === 'correct') {
    return (
      <div className="feedback-card feedback-card-correct">
        <h2>¡Excelente!</h2>
        <p className="feedback-main">Respuesta correcta. Has ganado el punto clave de esta pregunta.</p>
        {learningPoint && (
          <p className="feedback-explanation">
            <strong>Aprendizaje:</strong> {learningPoint}
          </p>
        )}
      </div>
    );
  }

  if (status !== 'incorrect') return null;

  const correctAnswer = getCorrectAnswer(question);
  const completedSentence = buildCompletedSentence(question);
  const isList = Array.isArray(correctAnswer);

  return (
    <div className="feedback-card feedback-card-incorrect">
      <h2>Incorrecto</h2>

      <div className="feedback-answer">
        <p className="feedback-label">Respuesta correcta:</p>
        {isList ? (
          <ul>
            {correctAnswer.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : (
          <p>{correctAnswer}</p>
        )}

        {completedSentence && (
          <p className="feedback-completed">{completedSentence}</p>
        )}
      </div>

      {learningPoint && (
        <p className="feedback-explanation">
          <strong>Explicación:</strong> {learningPoint}
        </p>
      )}
    </div>
  );
}
