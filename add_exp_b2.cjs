const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/modulo1.json'));

const explanations = [
  // L12 (Umbrales)
  [
    "El primer umbral (VT1 o aeróbico) marca el punto donde comienza a subir el lactato por encima del reposo, pero aún se estabiliza.",
    "El segundo umbral (VT2 o anaeróbico) indica una subida abrupta de ventilación para compensar la acumulación desmedida de ácido láctico.",
    "Falso. El umbral es altamente individual y depende fuertemente de la especialidad, genética y entrenamiento.",
    "Para hallar el umbral ventilatorio VT1 de manera precisa en pruebas de laboratorio se usa la calorimetría indirecta (análisis de gases).",
    "Los equivalentes respiratorios VE/VO2 y VE/VCO2 son clave para detectar el punto de inflexión ventilatoria.",
    "Falso. Los umbrales no son fijos, son estados metabólicos dinámicos.",
    "Tener el VT1 muy bajo sugiere entrenar más ejercicios aeróbicos base de larga duración."
  ],
  // L13 (Tipos de Fibra)
  [
    "Las fibras Tipo I (rojas/lentas) tienen muchísima mioglobina y mitocondrias para sostener la vía aeróbica.",
    "Las fibras Tipo IIb (blancas/rápidas) son puramente anaeróbicas, de gran diámetro y fuerza, pero se fatigan rápidamente.",
    "Las fibras Tipo IIa son un punto intermedio, usando tanto vía aeróbica como anaeróbica láctica.",
    "Falso. La dotación fibrilar (cantidad de rojas vs blancas) es un factor genético que el entrenamiento no cambia radicalmente, solo adapta.",
    "El reclutamiento de unidades motoras comienza con las fibras lentas y se van sumando las rápidas al aumentar la carga.",
    "En levantamiento olímpico predomina absoluto reclutamiento de las fibras Tipo IIb por la altísima carga.",
    "Un atleta de maratón puede tener un 80% de fibras musculares Tipo I (lentas)."
  ],
  // L14 (Cargas Gravitacionales)
  [
    "Las barras y mancuernas ejercen resistencia directa y pura de la gravedad.",
    "Falso. En las poleas se puede aislar mucho mejor el grupo muscular al variar la dirección de la carga.",
    "Las poleas son Cargas Indirectas Simples.",
    "Las máquinas isocinéticas mantienen una resistencia acomodada para igualar la velocidad angular en todo el rango.",
    "El peso de una mancuerna siempre tracciona perpendicularmente al suelo.",
    "El trabajo de las máquinas universales o Nautilus guiadas anula gran parte del trabajo de los músculos estabilizadores.",
    "Para la salud articular de los ancianos o rehabilitación, las máquinas guiadas y poleas son ideales y muy seguras."
  ],
  // L15 (Cadenas cinemáticas)
  [
    "Una cadena cinemática abierta permite que el segmento distal (ej. mano o pie) se mueva libremente.",
    "Una cadena cinemática cerrada (ej. sentadillas) mantiene fijo el segmento distal y requiere acción simultánea en varias articulaciones.",
    "Falso. La cadena cerrada reparte fuerzas entre más articulaciones siendo más funcional y menos lesiva.",
    "El análisis mecánico consiste en descomponer en movimientos simples el gesto deportivo general.",
    "En biomecánica, todos los movimientos se originan en rotaciones angulares de las articulaciones involucradas.",
    "Un curl de bíceps es un ejercicio de cadena cinemática abierta.",
    "La coordinación intermuscular es fundamental para realizar un gesto deportivo complejo en cadena cerrada."
  ],
  // L16 (La Máquina de Hill y Palancas)
  [
    "La carga máxima isométrica sucede cuando la velocidad de acortamiento es exactamente cero (sin movimiento).",
    "La ecuación de Hill dice que a mayor velocidad, menor será la fuerza desarrollada.",
    "Una palanca de tercer género (la más común en el cuerpo) sitúa la potencia entre el fulcro y la resistencia, ganando velocidad a costa de fuerza.",
    "El brazo de palanca se mide como la distancia perpendicular desde el fulcro a la línea de acción de la fuerza.",
    "Al inicio del 'press de banca', la ventaja mecánica es muy baja por la posición de las palancas articulares.",
    "Falso. El peso levantado es menor a mayor velocidad, como demostró Vivian Hill.",
    "La transferencia de energía se ve perfecta en ejercicios poliarticulares, pero los aislamientos evitan esta transferencia."
  ],
  // L17 (Resumen Fisiológico)
  [
    "La fatiga del SNC se presenta primero limitando la activación muscular máxima (EMGi disminuye).",
    "Para recuperar ATP-CP en su máxima expresión se requieren al menos 3 a 5 minutos de pausa.",
    "Si un músculo cruza la cadera y la rodilla, se acorta en una articulación mientras se estira en la otra (Paradoja de Lombard).",
    "Los isquiosurales ayudan a la extensión de cadera durante la subida de una sentadilla.",
    "Falso. La biomecánica moderna requiere un modelo integrado de cadenas musculares, no músculos aislados.",
    "Las 'rutinas culturistas' utilizan recuperaciones incompletas (1 min) para favorecer el estrés metabólico y la hipertrofia.",
    "La 'Periodización' significa dividir el año en fases específicas para pico de rendimiento."
  ],
  // L18 (Evaluaciones)
  [
    "La dinamometría estática mide la fuerza desarrollada empujando un objeto fijo (isometría).",
    "La evaluación de 1RM es la dinamometría dinámica isotónica por excelencia.",
    "La mioglobina es la encargada del primer aporte aeróbico, incluso antes del umbral, cediendo su O2 interno.",
    "Para que un test de laboratorio tenga validez en el campo, debe mantener el Principio de Especificidad anatómica.",
    "Falso. No existe una fórmula matemática universal de repeticiones, pero oscilan entre 7 y 12 para masa muscular.",
    "La electromiografía de superficie permite evaluar el nivel y secuencia temporal de la activación nerviosa del músculo.",
    "La tensión muscular se expresa mediante Sigma (σ) y mide la fuerza aplicada en cierta área transversal."
  ]
];

for (let i = 11; i <= 17; i++) {
  const levelIdx = i; // L12 a L18
  if (data[levelIdx]) {
    data[levelIdx].exercises.forEach((ex, exIdx) => {
      if (explanations[i - 11] && explanations[i - 11][exIdx]) {
        ex.explanation = explanations[i - 11][exIdx];
      }
    });
  }
}

fs.writeFileSync('./src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Batch 2 done.');
