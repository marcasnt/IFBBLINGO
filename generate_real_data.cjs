const fs = require('fs');

const levels = [
  {
    id: 1, title: "Conceptos Básicos y ATP", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué ciencia estudia el funcionamiento de los sistemas biológicos en actividad física?", options: ["Kinesiología", "Fisiología del ejercicio", "Biomecánica", "Ergometría"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El organismo busca mantener un 'equilibrio interno' ante estímulos externos repetidos.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Cuál es la moneda energética fundamental que maneja el organismo?", options: ["Glucógeno", "ATP", "Fosfocreatina", "Ácido Láctico"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Los factores genéticos de respuesta a un estímulo son fácilmente modificables con entrenamiento.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Une los conceptos básicos:", pairs: [{left: "ATP", right: "Adenosin Trifosfato"}, {left: "Entrenamiento", right: "Estímulo crónico"}, {left: "Adaptación", right: "Respuesta a largo plazo"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué enzima es necesaria para liberar la energía de los enlaces del ATP?", options: ["Lactato deshidrogenasa", "ATPasa", "Glucógeno sintasa", "Creatinquinasa"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 2, title: "Sistemas Anaeróbicos", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué sistema se utiliza predominantemente en el 'arranque' de cualquier ejercicio?", options: ["Aeróbico", "Fosfatos de alta energía", "Glucólisis láctica", "Oxidación de grasas"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El sistema anaeróbico aláctico provoca una gran acumulación de ácido láctico.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "¿Cuántas moléculas de ATP produce anaeróbicamente una molécula de glucosa?", options: ["2", "6", "36", "38"], correctAnswerIndex: 0 },
      { type: "TRUE_FALSE", question: "La limitación práctica de la glucólisis anaeróbica es el efecto tóxico por disminución del pH.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Une el sistema con su característica:", pairs: [{left: "Anaeróbico Aláctico", right: "Usa Fosfocreatina (CP)"}, {left: "Anaeróbico Láctico", right: "Usa glucosa sin oxígeno"}, {left: "Aláctico", right: "Es la fuente más rápida y potente"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Por qué hay un retraso en la puesta en marcha del sistema aeróbico al inicio del ejercicio?", options: ["Falta de glucosa", "Retraso en el transporte de O2 al músculo", "Inhibición neural", "Agotamiento de ATP"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 3, title: "Sistema Aeróbico", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué sistema permite 'quemar' los alimentos hasta convertirlos en CO2 y agua?", options: ["Fosfágenos", "Aeróbico", "Glucólisis anaeróbica", "Aláctico"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Desde el punto de vista del O2 consumido, es más 'barata' la energía de los hidratos de carbono que de las grasas.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Qué orgánulo celular actúa como la 'factoría' donde se produce la combustión aeróbica?", options: ["Ribosoma", "Núcleo", "Retículo sarcoplásmico", "Mitocondria"], correctAnswerIndex: 3 },
      { type: "TRUE_FALSE", question: "Los sistemas energéticos actúan de forma aislada, uno empieza cuando el otro termina.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Empareja sobre oxidación:", pairs: [{left: "Oxidación Glucosa", right: "Aprox. 6 moléculas ATP por O2"}, {left: "Oxidación Grasas", right: "Beta-oxidación"}, {left: "Proteínas", right: "Obtención de energía menor"}] },
      { type: "MULTIPLE_CHOICE", question: "La utilización aeróbica de la glucosa es más económica. ¿Cuántas veces más ATP produce frente a la anaeróbica?", options: ["Igual", "Aprox. 18 veces más", "El doble", "Aprox. 5 veces más"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 4, title: "Conceptos de Fuerza y Trabajo", questions: [
      { type: "MULTIPLE_CHOICE", question: "Es la causa capaz de producir o modificar el estado de reposo o movimiento de un cuerpo:", options: ["Trabajo", "Potencia", "Fuerza", "Momento"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "El Trabajo (W) se define como Fuerza por Desplazamiento (W = F x d).", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Cómo se define la Potencia (P)?", options: ["Fuerza x Masa", "Trabajo efectuado en la unidad de tiempo", "Fuerza estática", "Capacidad de elasticidad"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "La máxima potencia muscular se alcanza siempre a la máxima velocidad posible.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Fórmulas y Conceptos:", pairs: [{left: "W (Trabajo)", right: "F x d"}, {left: "P (Potencia)", right: "W / t (o F x v)"}, {left: "Momento (Torque)", right: "Fuerza x Distancia al eje"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué capacidad permite al músculo recuperar su forma original tras una deformación?", options: ["Excitabilidad", "Contractilidad", "Elasticidad", "Hipertrofia"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 5, title: "Tipos de Contracción I", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Cómo se llama la contracción donde no hay desplazamiento y el trabajo mecánico es cero?", options: ["Isotónica", "Concéntrica", "Isométrica", "Isocinética"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "En la contracción excéntrica, el trabajo producido se considera negativo.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Qué ocurre en una contracción concéntrica?", options: ["El músculo produce movimiento y trabajo positivo", "El músculo frena el movimiento", "No hay movimiento", "La velocidad es constante"], correctAnswerIndex: 0 },
      { type: "TRUE_FALSE", question: "La contracción isotónica mantiene una tensión constante durante todo el recorrido en ejercicios reales.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Tipos de Contracción:", pairs: [{left: "Isométrica", right: "Sin desplazamiento"}, {left: "Concéntrica", right: "Vence la carga"}, {left: "Excéntrica", right: "Frena la carga"}] },
      { type: "MULTIPLE_CHOICE", question: "Etimológicamente, ¿qué significa 'isométrico'?", options: ["Igual tensión", "Igual medida", "Igual velocidad", "Igual fuerza"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 6, title: "Tipos de Contracción II", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué tipo de contracción se realiza a velocidad angular o de giro constante?", options: ["Auxotónica", "Isotónica", "Isocinética", "Isométrica"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "El término 'Auxotónica' se refiere a una contracción con tensión variable, típica en deportes.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "En un equipo isocinético, ¿qué máquina regula la resistencia?", options: ["Poleas simples", "Pesos libres", "Servomecanismos hidráulicos", "Bandas elásticas"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Los músculos antagonistas trabajan 'a favor' del movimiento.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Roles musculares:", pairs: [{left: "Agonistas", right: "Responsables del movimiento"}, {left: "Antagonistas", right: "Se oponen al movimiento"}, {left: "Estabilizadores", right: "Fijan articulaciones vecinas"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué músculos evitan movimientos indeseados cuando un músculo tiene doble función?", options: ["Agonistas", "Sinergistas", "Neutralizadores", "Fijadores"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 7, title: "La Neurona", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Cuál es la célula principal del tejido nervioso responsable de dar la 'orden' de contracción?", options: ["Célula de Schwann", "Neurona", "Miofibrilla", "Sarcómero"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Las dendritas son prolongaciones que envían impulsos lejos del cuerpo celular.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "Los impulsos eléctricos de las células nerviosas se denominan...", options: ["Tétanos", "Sinapsis", "Potenciales de acción", "Acetilcolina"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Las motoneuronas del asta anterior tienen axones muy largos que pueden llegar hasta el pie.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Características de la neurona:", pairs: [{left: "Excitabilidad", right: "Responder a estímulos"}, {left: "Conducción", right: "Transmitir corriente por el axón"}, {left: "Transmisión (Sinapsis)", right: "Comunicación entre células"}] },
      { type: "MULTIPLE_CHOICE", question: "¿De dónde parten las 'órdenes' conscientes para el movimiento voluntario?", options: ["Médula espinal", "Corteza cerebral", "Nervio periférico", "Huso muscular"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 8, title: "El Músculo y el Sarcómero", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Cuál es la unidad elemental de contracción dentro de la miofibrilla?", options: ["Axón", "Túbulo T", "Sarcómero", "Sarcolema"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Las células musculares son multinucleadas.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "La contracción se produce por el deslizamiento de...", options: ["Fibras lentas sobre rápidas", "Sarcoplasma", "Líneas Z", "Filamentos delgados sobre gruesos"], correctAnswerIndex: 3 },
      { type: "TRUE_FALSE", question: "El acoplamiento excitación-contracción requiere el consumo de energía y la presencia de calcio.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Tipos de fibras:", pairs: [{left: "Tipo I", right: "Lentas o Rojas"}, {left: "Tipo II", right: "Rápidas o Blancas"}, {left: "Intermedias", right: "Espectro entre ambas"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué estructura NO forma parte de la célula muscular?", options: ["Retículo sarcoplásmico", "Túbulos T", "Mielina", "Membrana celular"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 9, title: "Adaptaciones Neurales", questions: [
      { type: "MULTIPLE_CHOICE", question: "Las mejoras iniciales de fuerza en principiantes se deben principalmente a...", options: ["Hipertrofia", "Adaptaciones neurales", "Cambio de tipo de fibra", "Aumento de grasa"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "La hipertrofia es un proceso más retrasado que la adaptación neural.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "Un factor neural para mejorar la fuerza es la inhibición de...", options: ["Músculos agonistas", "Músculos principales", "Músculos antagonistas", "Sinergistas"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "El entrenamiento pliométrico mejora el reflejo de contracción por estiramiento (huso neuromuscular).", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Adaptaciones de fuerza:", pairs: [{left: "Neural", right: "Mejora en reclutamiento de fibras"}, {left: "Trófico", right: "Hipertrofia muscular"}, {left: "Pliometría", right: "Reflejo de estiramiento"}] },
      { type: "MULTIPLE_CHOICE", question: "Es posible que un individuo aumente su fuerza sin que aumente la circunferencia de su músculo. ¿A qué se debe?", options: ["Aumento de EMGi (Neural)", "Atrofia", "Aumento de retención de líquidos", "Hiperplasia"], correctAnswerIndex: 0 }
    ]
  },
  {
    id: 10, title: "Valoración de la Fuerza", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Cuál es el método directo de medida de fuerza?", options: ["Electromiografía", "Dinamometría", "Test de Conconi", "Antropometría"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "1MR (Repetición Máxima) es la carga máxima que podemos levantar exactamente 10 veces.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "¿Qué se valora al hacer un test de 10MR?", options: ["Fuerza absoluta 100%", "Aprox. 75% de la carga máxima", "Potencia máxima", "Velocidad angular"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "La electromiografía de superficie (EMG) permite medir de manera no cruenta la actividad eléctrica muscular.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Pruebas:", pairs: [{left: "1 MR", right: "Máxima repetición posible"}, {left: "Dinamometría Estática", right: "Contracción Isométrica"}, {left: "EMG", right: "Actividad eléctrica"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué desventaja tienen los tests isométricos (estáticos)?", options: ["Miden a velocidad constante", "No son transferibles a toda la actividad deportiva", "Causan mucha fatiga", "Son demasiado fáciles"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 11, title: "Ergometría y VO2", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué ergómetro es el más clásico y utilizado?", options: ["Remoergómetro", "Tapiz rodante (Treadmill)", "Ergómetro de escalera", "Piscina ergométrica"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El VO2max se considera el único indicador válido del estado de forma en atletas de élite de resistencia.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "El VO2 se define 'desde fuera' restando el oxígeno que 'sale' del que 'entra'. ¿Qué variables se miden?", options: ["Ventilación y fracciones de O2", "Gasto cardiaco y frecuencia", "Lactato y glucosa", "Humedad y temperatura"], correctAnswerIndex: 0 },
      { type: "TRUE_FALSE", question: "En un protocolo en rampa, la carga va aumentando linealmente.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Parámetros VO2:", pairs: [{left: "VO2max", right: "Oxígeno máximo consumido"}, {left: "Economía de carrera", right: "VO2 a nivel submáximo"}, {left: "Gasto cardiaco (Q)", right: "Volumen / minuto en l/min"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué refleja la 'economía de carrera'?", options: ["Velocidad máxima absoluta", "Eficiencia global para transformar energía química en mecánica", "Cantidad de lactato producido", "Frecuencia cardiaca en reposo"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 12, title: "Lactato y Umbrales", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿A partir de qué fase se observa una elevación desproporcionada de lactato y ventilación?", options: ["Fase de Reposo", "Primer umbral aeróbico", "Umbral anaeróbico", "Fase I"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "El aumento de la ventilación en el umbral ventilatorio es para eliminar el exceso de O2.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "¿Qué molécula tampona (neutraliza) el exceso de ácido láctico (H+)?", options: ["Calcio", "Bicarbonato", "Creatina", "Sodio"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El lactato sanguíneo es un reflejo exacto y sin variaciones del lactato muscular.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Fases y Umbrales:", pairs: [{left: "Fase I", right: "Lactato nivel reposo"}, {left: "Fase II", right: "Lactato en equilibrio"}, {left: "Fase III", right: "Lactato aumenta continuamente"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Qué factor NO afecta la gráfica de acumulación de lactato?", options: ["Proporción de Fibras I y II", "Dieta previa", "Tipo de protocolo", "Color de piel"], correctAnswerIndex: 3 }
    ]
  },
  {
    id: 13, title: "Salud y Ejercicio", questions: [
      { type: "MULTIPLE_CHOICE", question: "En adultos mayores, el entrenamiento con pesas produce...", options: ["Daño articular asegurado", "Prevención de osteoporosis", "Pérdida de masa muscular acelerada", "Hipertensión severa"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Las recomendaciones post-1998 del ACSM incluyen el trabajo de pesas en mayores para evitar déficit proteico y muscular.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "Para personas con hipertensión o coronarios, el circuito de pesas...", options: ["Está absolutamente prohibido", "Aumenta la isquemia", "Puede mejorar la presión arterial diastólica", "Causa hipertrofia cardiaca masiva"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "El ejercicio de fuerza en niños prepúberes está demostrado que produce ganancias de fuerza y beneficios motores.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Beneficios de Salud:", pairs: [{left: "Osteoporosis", right: "Mejora con densidad ósea"}, {left: "Coronarios", right: "Mejor perfusión miocárdica"}, {left: "Ancianos", right: "Frena sarcopenia"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Cómo es el riesgo de lesiones de pesas supervisado vs. fútbol americano?", options: ["Mucho mayor", "Más seguro (casi inexistente si supervisado)", "Exactamente igual", "Produce riesgo de muerte inminente"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 14, title: "Principios en Musculación", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué principio exige trabajar en gestos y demandas similares al deporte específico?", options: ["Principio de Sobrecarga", "Principio de Especificidad", "Principio de Alternancia", "Principio de Progresión"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El volumen del entrenamiento hace referencia alTonelaje total (peso).", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "Según el texto, una fórmula clásica para desarrollo de hipertrofia es...", options: ["3x3", "3x8 (o 4x10)", "1x10", "15x2"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El entrenamiento de fuerza máxima pura requiere repeticiones muy cortas (1-3) y cargas máximas.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Variables del Entrenamiento:", pairs: [{left: "Volumen", right: "Cantidad de series/reps"}, {left: "Repetición de Máximo (RM)", right: "Carga máxima para N reps"}, {left: "Intensidad", right: "Porcentaje del 1RM"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Cuál es el objetivo principal de la periodización?", options: ["Crear confusión muscular", "Programar a lo largo del año las variables", "Evitar el sudor", "Entrenar siempre al 100%"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 15, title: "Potencia y Trabajo (Fórmulas)", questions: [
      { type: "MULTIPLE_CHOICE", question: "Realizar el mismo trabajo en la mitad de tiempo produce...", options: ["Doble Trabajo", "La misma Potencia", "Doble Potencia", "Cuádruple Fuerza"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Potencia (N) es igual a Fuerza (F) por Velocidad (V).", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "En biomecánica, para generar mayor potencia, si no varío la fuerza, debo...", options: ["Disminuir el espacio", "Aumentar el tiempo de ejecución", "Aumentar la velocidad (disminuir tiempo)", "No respirar"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Una carga indirecta simple es una polea donde la resistencia es constante e independiente del ángulo.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Máquinas y Resistencias:", pairs: [{left: "Directa Simple", right: "Barra, mancuerna"}, {left: "Indirecta Simple", right: "Polea"}, {left: "Guiada Gravitacional", right: "Máquina Universal"}] },
      { type: "MULTIPLE_CHOICE", question: "La ecuación simple de fuerza relacionada a la hipertrofia es F = K x S. ¿Qué representa la S?", options: ["Sarcómeros por línea", "Serie de repeticiones", "Sección transversal del músculo", "Sistema nervioso"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 16, title: "Curva Tensión-Deformación", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿En qué punto se logra la máxima tensión muscular?", options: ["En máximo acortamiento", "A mitad de recorrido", "En la máxima elongación fisiológica", "Depende del clima"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "La variación de tensión en el músculo a lo largo de su acortamiento es perfectamente lineal.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MULTIPLE_CHOICE", question: "¿Cómo se denomina la deformación porcentual (acortamiento relativo)?", options: ["Sigma (tensión)", "Epsilon (deformación)", "Kappa (fricción)", "Alpha (área)"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Un clavo puntiagudo penetra fácilmente porque genera una gran tensión al aplicar fuerza en un área pequeñísima.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Curva Tensión:", pairs: [{left: "Sigma", right: "Fuerza / Área (Tensión)"}, {left: "Máxima Elongación", right: "Máxima Tensión generada"}, {left: "Máximo acortamiento", right: "Tensión pobre"}] },
      { type: "MULTIPLE_CHOICE", question: "¿Por qué trabajar pantorrillas sentado es menos efectivo para los gemelos?", options: ["La rodilla flexionada acorta el gemelo (menor tensión inicial)", "El sóleo se relaja", "El tobillo se traba", "El pie se cansa"], correctAnswerIndex: 0 }
    ]
  },
  {
    id: 17, title: "Curva Fuerza-Velocidad", questions: [
      { type: "MULTIPLE_CHOICE", question: "La ecuación que vincula fuerza y velocidad se denomina Ecuación de...", options: ["Einstein", "Newton", "Hill", "Lombard"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "A medida que disminuimos el peso de la barra, somos capaces de moverla a mayor velocidad.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "En un movimiento isométrico máximo, ¿cuál es la velocidad?", options: ["Máxima", "La mitad", "Nula (cero)", "Aleatoria"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "En la fase excéntrica, al aumentar la carga, también aumenta la velocidad de estiramiento forzado.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Ley de Hill:", pairs: [{left: "Carga alta", right: "Baja velocidad concéntrica"}, {left: "Carga baja", right: "Alta velocidad concéntrica"}, {left: "Velocidad cero", right: "Fuerza máxima isométrica"}] },
      { type: "MULTIPLE_CHOICE", question: "En un 'press de banca', ¿existe transferencia temporal de fuerzas desde el hombro al codo?", options: ["Sí, secuencial", "No, ocurren casi simultáneamente (Ley de Hill)", "Solo en excéntrica", "Sí, como en halterofilia"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 18, title: "Cadenas Cinemáticas", questions: [
      { type: "MULTIPLE_CHOICE", question: "¿Qué conforman los segmentos óseos unidos por articulaciones?", options: ["Cadenas de ADN", "Cadenas Musculares", "Cadenas Cinemáticas", "Arcos de movimiento"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "Todo movimiento humano se produce en función de rotaciones articulares.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Qué característica especial tienen los ejercicios como la 'Cargada al pecho'?", options: ["Trabajan un solo músculo", "Tienen transferencia secuencial (impulsos sucesivos)", "No usan las piernas", "Cumplen rígidamente la Ley de Hill"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "Las máquinas de gimnasio comunes aislan músculos, rompiendo la cadena cinemática natural.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Clasificación de músculos:", pairs: [{left: "Monoarticular", right: "Cruza 1 articulación"}, {left: "Biarticular", right: "Cruza 2 articulaciones"}, {left: "Poliarticular", right: "Cruza múltiples"}] },
      { type: "MULTIPLE_CHOICE", question: "Un músculo que es flexor en una articulación y extensor en la otra vecina se considera...", options: ["Estabilizador", "Neutralizador", "Biarticular complejo", "Miofibrilar"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 19, title: "La Paradoja de Lombard", questions: [
      { type: "MULTIPLE_CHOICE", question: "En la fase concéntrica de la sentadilla, cadera y rodilla se...", options: ["Flexionan", "Extienden", "Rotan internamente", "Abducen"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "El Recto Anterior y los Isquiosurales son ambos músculos biarticulares antagonistas entre sí.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "¿Por qué en la sentadilla ambos grupos (recto e isquios) contribuyen a la extensión sin anularse por completo?", options: ["Porque el cerebro apaga uno", "Por la diferencia de longitud en sus brazos de palanca", "Porque uno se vuelve tendón", "Porque trabajan isométricamente"], correctAnswerIndex: 1 },
      { type: "TRUE_FALSE", question: "En la cadera, el brazo de palanca de los isquiosurales es menor que el del recto anterior.", options: ["Verdadero", "Falso"], correctAnswerIndex: 1 },
      { type: "MATCHING", question: "Brazos de palanca en Sentadilla:", pairs: [{left: "Cadera", right: "Ganan Isquiosurales (Extensión)"}, {left: "Rodilla", right: "Gana Recto Anterior (Extensión)"}, {left: "Isquiosurales", right: "Transfieren energía a la rodilla"}] },
      { type: "MULTIPLE_CHOICE", question: "Aproximadamente, ¿qué porcentaje de cambio de longitud sufren estos músculos biarticulares en una sentadilla?", options: ["50%", "20%", "4-5% (Acción de correa)", "80%"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 20, title: "Programación y Rangos de Carga", questions: [
      { type: "MULTIPLE_CHOICE", question: "Para entrenar la Fuerza Pura, ¿en qué rango de RM se suele trabajar?", options: ["1 a 6 RM", "10 a 15 RM", "15 a 25 RM", "50 RM"], correctAnswerIndex: 0 },
      { type: "TRUE_FALSE", question: "Para buscar Hipertrofia predominante, las cargas ideales rondan entre el 70% y el 85% de 1RM.", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MULTIPLE_CHOICE", question: "La capacidad de liberar fuerza en el menor tiempo posible se llama...", options: ["Hipertrofia", "Fuerza-Resistencia", "Potencia", "Capacidad Aeróbica"], correctAnswerIndex: 2 },
      { type: "TRUE_FALSE", question: "En un método de Pirámide descendente, las repeticiones bajan a medida que el peso sube (o viceversa).", options: ["Verdadero", "Falso"], correctAnswerIndex: 0 },
      { type: "MATCHING", question: "Rangos según Objetivo:", pairs: [{left: "85-100% RM", right: "Fuerza Máxima (Neural)"}, {left: "70-85% RM", right: "Hipertrofia"}, {left: "< 60% RM", right: "Fuerza-Resistencia"}] },
      { type: "MULTIPLE_CHOICE", question: "Al concluir un entrenamiento, hay una fase de fatiga. Tras descansar, ¿cómo se llama la fase donde el nivel supera al inicial?", options: ["Sobreentrenamiento", "Adaptación pasiva", "Supercompensación", "Hiperplasia"], correctAnswerIndex: 2 }
    ]
  }
];

const data = {
  moduleTitle: "Módulo I: Fisiología y Biomecánica (Versión Profunda)",
  levels
};

fs.writeFileSync('src/data/modulo1.json', JSON.stringify(data, null, 2));
console.log('Real IFBB content written to modulo1.json');
