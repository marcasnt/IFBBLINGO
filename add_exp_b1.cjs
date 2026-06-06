const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/modulo1.json'));

const explanations = [
  // L1 ya tiene
  [],
  // L2 (Sistemas de Energía)
  [
    "El ATP es efectivamente la principal moneda de energía del organismo, almacenada en enlaces de fósforo.",
    "La ATPasa es la enzima clave necesaria para liberar la energía almacenada en los enlaces del ATP.",
    "El sistema aeróbico usa oxígeno, el anaeróbico produce energía sin él y el ATP es la moneda base.",
    "En la cadena oxidativa aeróbica, el oxígeno actúa como el último aceptor de electrones para formar H2O.",
    "Todos los sistemas energéticos actúan de forma simultánea y solapada según la duración e intensidad.",
    "Falso. El inicio de cualquier ejercicio es fundamentalmente anaeróbico debido al retraso en la vía aeróbica.",
    "El sistema anaeróbico aláctico usa la fosfocreatina (CP) para renovar el ATP sin producir ácido láctico."
  ],
  // L3 (Vías)
  [
    "Falso. La vía anaeróbica aláctica no produce ácido láctico, esa es la vía láctica.",
    "La glucólisis anaeróbica produce solo 2 moléculas de ATP por glucosa, frente a las 36 de la aeróbica.",
    "El oxígeno debe llegar desde el aire hasta la mitocondria para la combustión aeróbica.",
    "La vía aeróbica es mucho más rentable, produciendo hasta un 1800% más energía que la anaeróbica.",
    "Los lípidos (grasas) solo pueden usarse como combustible mediante la vía aeróbica (beta-oxidación).",
    "Los sistemas de energía se solapan y no actúan de manera aislada.",
    "La acumulación de ácido láctico (disminución del pH) causa la fatiga y limita la glucólisis."
  ],
  // L4 (Conceptos de Fuerza)
  [
    "La fuerza es la causa capaz de modificar el estado de reposo o movimiento de un cuerpo.",
    "La potencia incluye el factor tiempo (P=W/t), siendo el trabajo en el mínimo tiempo posible.",
    "El trabajo mecánico es simplemente fuerza por distancia (W=Fxd), sin importar el tiempo.",
    "La elasticidad es la capacidad del tejido de recuperar su forma original tras ser deformado.",
    "El músculo transforma la energía química de los alimentos en energía mecánica con un 20-30% de eficiencia.",
    "La tensión muscular no es constante a lo largo del arco de movimiento.",
    "En la máxima elongación fisiológica se alcanza el punto de máxima tensión muscular."
  ],
  // L5 (Biomecánica)
  [
    "Falso. Cada músculo tiene su propia curva de tensión característica.",
    "El sóleo es monoarticular, por lo que aísla el trabajo de pantorrillas cuando la rodilla está flexionada.",
    "Para activar al máximo la masa gemelar, el ejercicio debe hacerse con las rodillas extendidas.",
    "Una palanca tiene un punto de apoyo, una potencia (fuerza) y una resistencia.",
    "Los músculos biarticulares cruzan y actúan sobre dos articulaciones diferentes.",
    "Un ejercicio poliarticular involucra dos o más articulaciones, como la sentadilla.",
    "En una polea clásica (carga indirecta), la resistencia es constante e independiente del ángulo."
  ],
  // L6 (Músculos y funciones)
  [
    "Los protagonistas o agonistas son los principales responsables del movimiento.",
    "Los antagonistas se oponen al movimiento y deben relajarse para permitirlo.",
    "Fijadores, neutralizadores y antagonistas.",
    "Los neutralizadores anulan la acción secundaria indeseada de un músculo.",
    "En un press de banca, el tríceps y el pectoral mayor actúan al unísono como agonistas/sinergistas.",
    "Al trabajar con pesos libres, la resistencia siempre va dirigida hacia abajo por la gravedad.",
    "El músculo esquelético humano puede contraerse isométricamente o de forma dinámica (anisométrica)."
  ],
  // L7 (Evaluación de fuerza)
  [
    "1RM es la carga máxima que se puede levantar en una sola repetición máxima.",
    "Falso. Es peligroso realizar pruebas de 1RM en principiantes sin técnica ni base.",
    "La hipertrofia muscular suele requerir cargas del 70-85% (entre 6 y 15 repeticiones).",
    "El trabajo de resistencia muscular se realiza con cargas del 50-70% (más de 15 repeticiones).",
    "Las máquinas isocinéticas mantienen una velocidad constante independientemente de la fuerza aplicada.",
    "El entrenamiento de potencia utiliza cargas relativamente altas pero enfatiza la máxima velocidad.",
    "El volumen de entrenamiento es la cantidad total (series x repeticiones)."
  ],
  // L8 (Adaptaciones)
  [
    "La hipertrofia se manifiesta por el aumento del diámetro (y posiblemente el número) de las fibras musculares.",
    "Falso. Las primeras adaptaciones de fuerza (primeras semanas) son principalmente neurales (sincronización).",
    "Al principio, la fuerza aumenta por la mejora en la activación de unidades motoras y el EMG.",
    "La sincronización intramuscular mejora la eficiencia con la que las fibras musculares trabajan juntas.",
    "El calentamiento y el estiramiento son fundamentales antes del ejercicio de fuerza.",
    "La carga habitual genera mesetas, por lo que el principio de sobrecarga exige incrementar el estímulo.",
    "Los levantadores olímpicos entrenan la fuerza máxima con muy pocas repeticiones (1-5) e intervalos largos."
  ],
  // L9 (Fuerza y Edades)
  [
    "El entrenamiento de fuerza en niños (supervisado) mejora el rendimiento y proviene lesiones.",
    "Falso. Las ganancias de fuerza iniciales en prepúberes se dan por adaptaciones neurales, no hipertrofia.",
    "En ancianos, el entrenamiento de fuerza combate la osteoporosis y recupera la funcionalidad motora.",
    "La ACSM recomienda circuitos de pesas con intensidades del 40-50% para adultos sanos y ancianos.",
    "Un beneficio comprobado del ejercicio en mayores es la autosuficiencia funcional y mejora de la autoestima.",
    "El entrenamiento de fuerza ha probado ser seguro, a veces con menos riesgos que deportes aeróbicos intensos.",
    "En pacientes cardíacos, un circuito suave de pesas mejora la HTA y la PA diastólica sin daños."
  ],
  // L10 (Entrenamiento)
  [
    "Falso. Si te limitas siempre a la misma carga, tu cuerpo se adapta y te estancas (principio de sobrecarga).",
    "El 'tonelaje' permite cuantificar el trabajo absoluto realizado (Series x Repeticiones x Peso).",
    "El principio de especificidad dicta que debes entrenar movimientos similares al gesto deportivo que buscas mejorar.",
    "Periodización, Alternancia y Sobrecarga.",
    "En el método de 'Intensidades Máximas I' (90-100%) se debe descansar unos 3 minutos entre series.",
    "La sobrecompensación es la fase donde el cuerpo asimila el estrés y mejora su nivel inicial.",
    "Durante la 'temporada', el objetivo es mantener la fuerza ganada en la pretemporada con el mínimo volumen posible."
  ],
  // L11 (Fisiología Avanzada)
  [
    "El lactato se produce en la glucólisis anaeróbica como subproducto del piruvato.",
    "Falso. El umbral láctico no es fijo; varía con el entrenamiento, dieta y fibras activadas.",
    "VO2max es la máxima capacidad del organismo para captar, transportar y consumir oxígeno.",
    "Umbral aeróbico y umbral anaeróbico.",
    "La ergonomía deportiva usa el tapiz rodante y el cicloergómetro para estandarizar las mediciones del VO2.",
    "El ácido láctico puede ser reciclado por el hígado y los músculos lentos (fibras I) para dar más energía.",
    "Con el entrenamiento, el umbral láctico se desplaza hacia la derecha (mayor intensidad sin lactato)."
  ]
];

for (let i = 1; i <= 10; i++) {
  const levelIdx = i; // L2 a L11 son indices 1 a 10 en mi array de explicaciones
  if (data[levelIdx]) {
    data[levelIdx].exercises.forEach((ex, exIdx) => {
      if (explanations[i] && explanations[i][exIdx]) {
        ex.explanation = explanations[i][exIdx];
      }
    });
  }
}

fs.writeFileSync('./src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Batch 1 done.');
