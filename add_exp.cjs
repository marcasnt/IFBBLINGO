const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/modulo1.json'));
const exercises = data[0].exercises;

if (exercises.length >= 7) {
  exercises[0].explanation = 'La fisiología es fundamentalmente el estudio de cómo funcionan los organismos vivos y sus partes, manteniendo el equilibrio biológico.';
  exercises[1].explanation = 'El organismo siempre busca la homeostasis (equilibrio interno) frente a cualquier estímulo o estrés externo.';
  exercises[2].explanation = 'Los factores genéticos nacen con nosotros (no modificables), mientras que el ambiente y el entrenamiento modifican nuestro cuerpo.';
  exercises[3].explanation = 'El estímulo constante y prolongado en el tiempo se denomina entrenamiento crónico, el cual genera adaptaciones fisiológicas a largo plazo.';
  exercises[4].explanation = 'La fisiología del ejercicio observa específicamente cómo el cuerpo responde y se adapta a la actividad física.';
  exercises[5].explanation = 'La respuesta a corto plazo se llama "respuesta aguda", mientras que la respuesta a largo plazo o crónica se denomina "adaptación".';
  exercises[6].explanation = 'Los tests deben ser objetivos (medibles y sin sesgo) e individuales (adaptados al sujeto).';
}

fs.writeFileSync('./src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Explanations added to first lesson.');
