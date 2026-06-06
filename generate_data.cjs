const fs = require('fs');

const levels = [];

for(let i = 1; i <= 20; i++) {
  const level = {
    id: i,
    title: `Nivel ${i}: ${['Conceptos Básicos', 'Sistemas de Energía', 'Aeróbico vs Anaeróbico', 'Fisiología de la Fuerza', 'La Neurona', 'El Músculo Estriado', 'Tipos de Contracción', 'Isométrica e Isotónica', 'Isocinética y Auxotónica', 'Curva Tensión-Deformación', 'Curva Fuerza-Velocidad', 'Cadenas Cinemáticas', 'Músculos Biarticulares', 'Paradoja de Lombard', 'Ergometría', 'VO2 y Economía', 'Ácido Láctico', 'Umbrales Ventilatorios', 'Principios del Entrenamiento', 'Aplicación Práctica y Salud'][i-1]}`,
    questions: []
  };

  // Add 3 standard questions
  level.questions.push({
    type: "MULTIPLE_CHOICE",
    question: `Pregunta de conocimiento profundo para Nivel ${i} sobre conceptos del Módulo 1.`,
    options: ["Respuesta Incorrecta A", "Respuesta Correcta B", "Respuesta Incorrecta C"],
    correctAnswerIndex: 1
  });
  
  level.questions.push({
    type: "TRUE_FALSE",
    question: `Afirmación técnica compleja sobre la fisiología del entrenamiento para el nivel ${i}.`,
    options: ["Verdadero", "Falso"],
    correctAnswerIndex: 0
  });

  // Add 1 matching question
  level.questions.push({
    type: "MATCHING",
    question: "Une los siguientes conceptos con su definición o característica.",
    pairs: [
      { left: `Concepto ${i}.A`, right: `Definición ${i}.A` },
      { left: `Concepto ${i}.B`, right: `Definición ${i}.B` },
      { left: `Concepto ${i}.C`, right: `Definición ${i}.C` }
    ]
  });

  levels.push(level);
}

// Customizing first few levels for realism
levels[0].questions[0] = {
  type: "MULTIPLE_CHOICE",
  question: "¿Cuál es la principal molécula de intercambio energético en el cuerpo humano?",
  options: ["ADP", "ATP", "Ácido Láctico", "Glucógeno"],
  correctAnswerIndex: 1
};
levels[0].questions[1] = {
  type: "TRUE_FALSE",
  question: "El inicio de cualquier ejercicio físico es fundamentalmente aeróbico.",
  options: ["Verdadero", "Falso"],
  correctAnswerIndex: 1
};
levels[0].questions[2] = {
  type: "MATCHING",
  question: "Une cada sistema con su característica:",
  pairs: [
    { left: "Anaeróbico Aláctico", right: "Fosfocreatina, sin oxígeno" },
    { left: "Anaeróbico Láctico", right: "Glucólisis, produce lactato" },
    { left: "Aeróbico", right: "Oxidación, mayor rendimiento" }
  ]
};

const data = {
  moduleTitle: "Módulo I: Fisiología y Biomecánica",
  levels
};

fs.writeFileSync('src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Generated 20 levels in modulo1.json');
