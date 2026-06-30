const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  ['Módulo I', path.join(root, 'src/data/modulo1.json')],
  ['Módulo II', path.join(root, 'src/data/modulo2.json')],
];

const allowedTypes = new Set([
  'true_false',
  'multiple_choice',
  'match_pairs',
  'text_input',
  'fill_in_blanks_cards',
]);

const mojibakePattern = /(?:Ã|Â|ðŸ|â€|â€œ|â€|�)/;
const stopWords = new Set([
  'que', 'qué', 'como', 'cómo', 'para', 'por', 'con', 'sin', 'una', 'uno',
  'unos', 'unas', 'del', 'los', 'las', 'este', 'esta', 'estos', 'estas',
  'entre', 'sobre', 'cada', 'debe', 'deben', 'de', 'la', 'el', 'en', 'y',
  'o', 'a', 'al', 'se', 'su', 'sus', 'es', 'son', 'ser', 'un', 'lo',
  'correcto', 'falso', 'verdadero', 'respuesta', 'pregunta',
]);

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ%]+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));
}

function addTextParts(question, parts) {
  if (question.question) parts.push(question.question);
  if (question.text) parts.push(question.text);

  if (question.type === 'multiple_choice') {
    const correct = question.options?.find((option) => option.id === question.correctAnswerId);
    if (correct) parts.push(correct.text);
  }

  if (question.type === 'text_input') {
    parts.push(...(question.correctAnswers || []));
  }

  if (question.type === 'fill_in_blanks_cards') {
    parts.push(...(question.correctAnswers || []));
  }

  if (question.type === 'match_pairs') {
    for (const pair of question.pairs || []) {
      parts.push(pair.left, pair.right);
    }
  }
}

function explanationOverlap(question) {
  if (!question.explanation) return 0;

  const sourceParts = [];
  addTextParts(question, sourceParts);

  const source = new Set(tokenize(sourceParts.join(' ')));
  const explanation = new Set(tokenize(question.explanation));
  if (source.size === 0 || explanation.size === 0) return 0;

  let shared = 0;
  for (const word of explanation) {
    if (source.has(word)) shared += 1;
  }

  return shared / Math.min(source.size, explanation.size);
}

function correctAnswerLabel(question) {
  if (question.type === 'true_false') return question.correctAnswer ? 'Verdadero' : 'Falso';
  if (question.type === 'multiple_choice') {
    return question.options?.find((option) => option.id === question.correctAnswerId)?.text || '';
  }
  if (question.type === 'text_input') return question.correctAnswers?.[0] || '';
  if (question.type === 'fill_in_blanks_cards') return question.correctAnswers?.join(' / ') || '';
  if (question.type === 'match_pairs') return (question.pairs || []).map((pair) => `${pair.left}=${pair.right}`).join(' | ');
  return '';
}

const errors = [];
const warnings = [];
let totalQuestions = 0;

for (const [moduleName, file] of files) {
  const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(levels)) {
    errors.push(`${moduleName}: el archivo debe contener una lista de niveles.`);
    continue;
  }

  levels.forEach((level, levelIndex) => {
    const location = `${moduleName} > ${level.lessonId || `nivel ${levelIndex + 1}`}`;

    if (!Array.isArray(level.exercises) || level.exercises.length === 0) {
      errors.push(`${location}: no tiene ejercicios.`);
      return;
    }

    if (mojibakePattern.test(JSON.stringify(level))) {
      errors.push(`${location}: contiene texto con codificación rota.`);
    }

    level.exercises.forEach((question, questionIndex) => {
      totalQuestions += 1;
      const qLocation = `${location} > pregunta ${questionIndex + 1} (${question.type || 'sin tipo'})`;

      if (!allowedTypes.has(question.type)) {
        errors.push(`${qLocation}: tipo no soportado.`);
        return;
      }

      if (!question.explanation || !String(question.explanation).trim()) {
        errors.push(`${qLocation}: falta explicación.`);
      }

      if (question.type !== 'fill_in_blanks_cards' && !question.question) {
        errors.push(`${qLocation}: falta texto de pregunta.`);
      }

      if (question.type === 'multiple_choice') {
        const ids = new Set((question.options || []).map((option) => option.id));
        if (!ids.has(question.correctAnswerId)) {
          errors.push(`${qLocation}: correctAnswerId no existe en options.`);
        }
      }

      if (question.type === 'true_false' && typeof question.correctAnswer !== 'boolean') {
        errors.push(`${qLocation}: correctAnswer debe ser booleano.`);
      }

      if (question.type === 'text_input' && (!Array.isArray(question.correctAnswers) || question.correctAnswers.length === 0)) {
        errors.push(`${qLocation}: faltan correctAnswers.`);
      }

      if (question.type === 'match_pairs' && (!Array.isArray(question.pairs) || question.pairs.length < 2)) {
        errors.push(`${qLocation}: debe tener al menos dos pares.`);
      }

      if (question.type === 'fill_in_blanks_cards') {
        const blanks = [...String(question.text || '').matchAll(/\{(\d+)\}/g)].map((match) => Number(match[1]));
        const answerCount = question.correctAnswers?.length || 0;
        if (blanks.length !== answerCount) {
          errors.push(`${qLocation}: cantidad de espacios (${blanks.length}) no coincide con respuestas (${answerCount}).`);
        }
        if (!Array.isArray(question.options) || question.options.length === 0) {
          errors.push(`${qLocation}: faltan opciones para completar espacios.`);
        }
      }

      const overlap = explanationOverlap(question);
      if (question.explanation && overlap < 0.08) {
        warnings.push(`${qLocation}: explicación posiblemente desfasada. Respuesta: "${correctAnswerLabel(question)}". Explicación: "${question.explanation}"`);
      }
    });
  });
}

console.log(`Preguntas revisadas: ${totalQuestions}`);

if (warnings.length > 0) {
  console.log(`\nAdvertencias (${warnings.length}):`);
  warnings.slice(0, 80).forEach((warning) => console.log(`- ${warning}`));
  if (warnings.length > 80) console.log(`- ... ${warnings.length - 80} advertencias más`);
}

if (errors.length > 0) {
  console.error(`\nErrores (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('\nContenido válido: no se encontraron errores estructurales.');
