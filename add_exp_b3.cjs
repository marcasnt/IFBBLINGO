const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/modulo1.json'));

const explanations = [
  // L19 (Hill y Velocidad)
  [
    "La máxima tensión de un músculo se logra invariablemente en su máxima elongación fisiológica por la precarga elástica.",
    "Falso. Al aumentar la carga (peso), la velocidad siempre disminuye según la ecuación hiperbólica de Hill.",
    "La fase concéntrica a baja carga permite altísima velocidad, mientras la isometría tiene velocidad nula.",
    "A medida que cambia el brazo de palanca durante el movimiento, la tensión real que genera el músculo va variando constantemente.",
    "El músculo esquelético humano puede generar desde 6.8 kg/cm2 (bíceps) hasta 20 kg/cm2 (masetero).",
    "El límite anatómico del acortamiento de los sarcómeros se da en promedio al alcanzar el 33%.",
    "Los elementos viscoelásticos paralelos y en serie acumulan energía que se libera al contraer inmediatamente después de estirar."
  ],
  // L20 (Músculos Biarticulares)
  [
    "El movimiento se debe exclusivamente al torque generado alrededor del eje de las articulaciones (rotaciones).",
    "El músculo biarticular transfiere la energía de una zona a la otra de forma altamente económica y eficiente.",
    "El recto femoral flexiona la cadera pero simultáneamente actúa extendiendo la rodilla.",
    "La 'paradoja de Lombard' explica cómo extensores y flexores antagónicos colaboran al estar anclados en palancas de distinta longitud.",
    "Los músculos biarticulares proporcionan un gran ahorro de energía al transferir fuerza de extremo a extremo.",
    "La mayor longitud de inserción de los isquiosurales en la rodilla aumenta su momento o ventaja mecánica en esa articulación.",
    "Falso. Existe hasta un 5% de cambio de longitud por elasticidad, permitiendo el efecto 'acción de correa'."
  ],
  // L21 (Conceptos de Carga)
  [
    "Tonelaje = Series x Repeticiones x Peso (kg). Es útil para medir el estrés global de la sesión.",
    "Densidad. Indica cuán compacta fue la sesión y su orientación metabólica.",
    "Frecuencia es el número de estímulos semanales, Intensidad el % del RM y Volumen el número de repeticiones.",
    "El peso promedio movido (Pm) se define matemáticamente como T/V (Tonelaje / Volumen).",
    "El 100% de la carga es 1RM; el 70% ronda las 15 RM según protocolos clásicos.",
    "Falso. El volumen se refiere puramente a la cantidad (Series y Repeticiones), no a los kilos totales (que es el tonelaje).",
    "Una pirámide descendente inicia cerca del máximo (100%) y va restando peso mientras suma repeticiones."
  ],
  // L22 (Recuperación)
  [
    "El Principio de Alternancia postula que, sin descanso, el cuerpo solo suma fatiga y nunca sobrecompensa.",
    "La sobrecompensación eleva el rendimiento por encima del estado basal como mecanismo de defensa del organismo.",
    "El ATP se recupera en minutos; el glucógeno muscular puede demorar entre 24 y 48 horas.",
    "El Principio de Sobrecarga.",
    "Tiempo y Potencia son inversamente proporcionales; más poder explosivo demanda que la acción dure poquísimo.",
    "Falso. La reserva de mioglobina (O2 muscular) se recupera en pocos segundos, es la fuente más rápida tras los fosfatos.",
    "En los primeros minutos y horas postejercicio se abren 'ventanas metabólicas' que logran rellenar hasta un 80% del glucógeno velozmente."
  ],
  // L23 (Fuerza Máxima)
  [
    "Falso. Intensidades del 90-100% estimulan principalmente la conexión neuronal, no dan gran hipertrofia.",
    "Al trabajar a una exigencia del 95% de 1RM, es fisiológicamente imposible superar las 3 repeticiones.",
    "El Método de Repeticiones I usa 80-85%, mientras que las Intensidades Máximas alcanzan 90-100%.",
    "El intento mental debe ser el de mover la barra a la 'Máxima' velocidad, aunque físicamente se mueva lenta por el enorme peso.",
    "Las cargas altísimas remueven la inhibición de protección del aparato de Golgi y reclutan casi el 100% de fibras.",
    "Falso. Cargas máximas son exclusivas de atletas experimentados con técnica y tejido conectivo adaptado.",
    "3 minutos garantizan la total regeneración del ATP-CP para enfrentar otro estrés máximo sin fatiga láctica."
  ],
  // L24 (Hipertrofia)
  [
    "Correcto. El método clásico de hipertrofia exige cargas medias y repeticiones de entre 6 y 12 para máximo estrés metabólico.",
    "5 a 7 repeticiones proveen un excelente estímulo mixto para ganar fuerza máxima y algo de hipertrofia.",
    "Para volumen, series de 6 a 12 con cargas del 70-80% promueven microtraumas e isquemia, detonando el crecimiento.",
    "45 segundos a 1 minuto; esto evita que el lactato baje completamente, sosteniendo el estrés químico sobre la célula.",
    "El 75% es el 'sweet spot' porque agota gran cantidad de unidades motoras rápidas y medias simultáneamente.",
    "La isquemia (corte de riego sanguíneo) durante la serie acumula metabolitos que son el mayor disparador de la hipertrofia.",
    "Entrenar al fallo y usar 'ayudas' somete al tejido a su máxima tensión, induciendo destrucción de puentes cruzados."
  ],
  // L25 (Fuerza Resistencia)
  [
    "Las cargas submaximales (50-70%) permiten sostener el esfuerzo para crear resistencia local en la fibra muscular.",
    "Series de 15 hasta 25 repeticiones cambian la matriz energética hacia la glucólisis anaeróbica láctica.",
    "Fuerza Pura: 85-100%, Hipertrofia: 70-85%, Fuerza-Resistencia: 50-70%.",
    "Tener una RM mayor implica que al usar 50 kg, ese peso será un porcentaje menor de tu máximo, cansándote menos.",
    "La carga mínima (alrededor de 30-40% 1RM) no estimula el desarrollo salvo en fase estricta de rehabilitación.",
    "Falso. Múltiples estudios ratifican que los protocolos de 15 RM incrementan también la fuerza base y la irrigación capilar.",
    "La vía Glucolítica Anaeróbica domina entre los 30 segundos y 2 minutos de esfuerzo intenso continuo."
  ],
  // L26 (Potencia)
  [
    "Falso. La potencia es producto directo de la conjugación de Fuerza y Velocidad (W/t).",
    "Al disminuir el tiempo, el divisor en P = W/t se hace menor, ergo, la potencia explota al máximo.",
    "La 'cargada de potencia' o 'clean' es paradigmática para producir potencia pico altísima.",
    "Las cargadas al pecho y arranques implican fuerzas masivas desplazadas en menos de un segundo.",
    "En programas de alta potencia se realizan pocos ejercicios (1 a 3), escasas repeticiones y amplios descansos.",
    "Falso. En la cargada la fuerza se propaga temporalmente; una articulación activa antes que la siguiente (impulsos sucesivos).",
    "La mayor velocidad siempre resulta en el menor tiempo de contacto articular posible para ejercer fuerza."
  ],
  // L27 (Biomecánica Anatómica)
  [
    "Correcto. Los sinergistas apoyan al músculo agonista estabilizando o guiando la dirección de la fuerza.",
    "El antagonista (ej. tríceps al flexionar el codo). Su relajación es vital para evitar el freno del movimiento.",
    "El bíceps braquial es protagonista y el tríceps su estricto antagonista.",
    "Neutralizadores.",
    "En el hombro, estabilizan la articulación escápulo-humeral para que el bíceps actúe firme desde su origen.",
    "Falso. La técnica concéntrica vs excéntrica varía drásticamente qué tipo de fibra y cuántas se reclutan (las rápidas sufren más en excéntrico).",
    "El tendón, como componente elástico (K2), almacena fuerzas enormes, protegiendo a las miofibrillas de desgarros."
  ],
  // L28 (Reglas Biomecánicas)
  [
    "Al estirar el músculo previo a la fase positiva, el tejido elástico devuelve energía de forma violenta.",
    "Para mejorar la potencia real, debes aumentar el peso y bajar el tiempo de ejecución (mayor velocidad).",
    "La máxima potencia busca velocidad; la máxima fuerza hipertrófica requiere control y máximo recorrido.",
    "En la rodilla, el cuádriceps tiene un brazo de palanca más largo, lo cual le permite dominar sobre los isquiosurales al extender la pierna.",
    "Peso movido, Espacio recorrido y el Tiempo total de ejecución (para hallar Nm).",
    "Falso. Acortar el movimiento solo limita el trabajo mecánico final y el estiramiento fisiológico del músculo.",
    "DeLorme probó que la hipertrofia es condición 'sine qua non' para recuperar la estabilidad mecánica de una articulación dañada."
  ],
  // L29 (Periodización)
  [
    "Correcto. La periodización permite estructurar picos de carga para que el cuerpo sobrecompense sin caer en sobreentrenamiento.",
    "Falso. En Temporada, el volumen general de pesas se reduce al mínimo mantenimiento para privilegiar la táctica deportiva.",
    "Fuera de temporada: descanso activo. Pretemporada: fuerza base. Temporada: técnica y mantenimiento.",
    "Al final de la pretemporada (antes de arrancar las competencias), la fuerza y condición base llegan a su clímax.",
    "El entrenador debe rever todo el plan de variables de carga (intensidad, volumen o densidad) y modificarlas.",
    "Falso. Jamás deben aplicarse máximos reales a un inexperto. El riesgo articular y tendinoso es demasiado alto.",
    "El 'Método escalonado' incrementa gradualmente la estimulación del sistema nervioso para prepararlo al 1RM."
  ],
  // L30 (Miscelánea y Prevención)
  [
    "La hiperplasia implica división y creación de nuevas fibras musculares. Está científicamente en gran debate humano.",
    "El circuito de pesas sin pausas largas promueve enormes beneficios vasculares, a veces mejor que trotar, previniendo HTA.",
    "1 a 5 reps es óptimo para el fisicoculturista halterófilo (Fuerza). 8 a 12 para el culturismo (Hipertrofia).",
    "La ATPasa se encuentra en las cabezas de la miosina y es activada por el calcio.",
    "Especificidad, Variedad y Alternancia (o sobrecarga progresiva).",
    "Falso. Aislar un músculo por completo es un concepto comercial de las máquinas. Biomecánicamente, la cadena actúa junta.",
    "Es el momento perfecto anatómica y energéticamente para volver a aplicar un nuevo estímulo y seguir creciendo."
  ],
  // L31 (Casos Prácticos)
  [
    "Calcular un rango de RM indirecto, como 10 RM a la falla técnica, para luego inferir matemáticamente su carga 100%.",
    "El Método de Repeticiones I o II (70-85% 1RM), para series de entre 8 y 12 repeticiones a fin de forzar hipertrofia.",
    "El cliente novato necesita estímulos suaves; el atleta avanzado soporta y necesita Intensidad Máxima y fallo controlado.",
    "Tú necesitas de 3 a 5 minutos, ya que reponer la fosfocreatina y estabilizar el SNC lleva exactamente ese lapso.",
    "El Volumen (repeticiones y series) y la Intensidad (% de esfuerzo), para evitar que su cuerpo siga en 'homeostasis' cómoda.",
    "Es un caso claro de contracción 'Isométrica', pues existe altísima tensión neural y fibrilar sin cambio de longitud.",
    "La ventilación crece de manera exponencial al dispararse el VT2 (Umbral anaeróbico), ya que el CO2 debe ser expulsado violentamente."
  ]
];

for (let i = 18; i <= 30; i++) {
  const levelIdx = i; // L19 a L31
  if (data[levelIdx]) {
    data[levelIdx].exercises.forEach((ex, exIdx) => {
      if (explanations[i - 18] && explanations[i - 18][exIdx]) {
        ex.explanation = explanations[i - 18][exIdx];
      }
    });
  }
}

fs.writeFileSync('./src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Batch 3 done.');
