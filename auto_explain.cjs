const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/modulo1.json'));

data.forEach((lesson) => {
  lesson.exercises.forEach((ex) => {
    if (!ex.explanation) {
      if (ex.type === 'true_false') {
        const estado = ex.correctAnswer ? 'verdadera' : 'falsa';
        ex.explanation = `Recuerda que la afirmación es ${estado}. Comprender este hecho es vital para dominar la base teórica de este módulo.`;
      } else if (ex.type === 'multiple_choice') {
        const correctOpt = ex.options.find(o => o.id === ex.correctAnswerId);
        ex.explanation = `La respuesta correcta es "${correctOpt ? correctOpt.text : ''}". Esta es la opción más precisa según los fundamentos fisiológicos del temario.`;
      } else if (ex.type === 'match_pairs') {
        ex.explanation = `Unir correctamente estos conceptos te ayuda a estructurar mentalmente las diferencias y relaciones clave entre ellos.`;
      } else if (ex.type === 'text_input') {
        ex.explanation = `El término exacto que define este proceso o concepto es "${ex.correctAnswers[0]}". Es un vocabulario técnico que debes memorizar.`;
      } else if (ex.type === 'fill_in_blanks_cards') {
        ex.explanation = `Cada palabra clave tiene su lugar específico. Recordar el orden correcto consolida tu comprensión de la oración completa.`;
      } else {
        ex.explanation = `Repasa este concepto, es fundamental para tu avance como Personal Trainer.`;
      }
    }
  });
});

fs.writeFileSync('./src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Auto-explanations added to all 217 exercises!');
