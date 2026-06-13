// VectorQuest - Definición de Niveles
// Diseñado para 7° y 8° Básico (Chile)

const LEVELS = [
  {
    id: 1,
    name: "Nivel 1: Primer Paso en el Espacio",
    description: "Misión: Rescata al astronauta extraviado. Tu nave está en el origen (0, 0) y el astronauta está en (4, 3). Agrega un vector de traslación para llegar directamente.",
    hint: "Pista: Para ir de (0,0) a (4,3), necesitas avanzar 4 unidades a la derecha (eje X positivo) y 3 unidades hacia arriba (eje Y positivo). El vector es (4, 3).",
    startPos: { x: 0, y: 0 },
    targets: [
      { x: 4, y: 3, type: "astronaut", rescued: false, id: "astro1" }
    ],
    portal: { x: 4, y: 3 }, // In level 1, portal is where the astronaut is
    obstacles: [],
    minVectors: 1,
    gridSize: 6 // Grid from -6 to 6
  },
  {
    id: 2,
    name: "Nivel 2: Esquivando Escombros",
    description: "Misión: Lleva la nave desde (-4, -2) hasta el portal en (2, 2). ¡Cuidado! Un asteroide bloquea el camino directo en (-1, 0). Debes usar al menos 2 vectores.",
    hint: "Pista: Si intentas ir directo con el vector (6, 4), chocarás con el asteroide en (-1, 0). Prueba dividir tu camino en dos vectores: por ejemplo, sube primero con (-1, 2) y luego muévete a la derecha.",
    startPos: { x: -4, y: -2 },
    targets: [],
    portal: { x: 2, y: 2 },
    obstacles: [
      { x: -1, y: 0 }
    ],
    minVectors: 2,
    gridSize: 6
  },
  {
    id: 3,
    name: "Nivel 3: El Muro del Cuadrante II",
    description: "Misión: Viaja desde el Cuadrante IV (3, -4) hasta el Cuadrante II (-3, 3). Hay una barrera de asteroides en el eje Y. Usa valores negativos para moverte a la izquierda y hacia arriba.",
    hint: "Pista: Para ir a la izquierda, la componente X del vector debe ser negativa. Para ir hacia arriba, la componente Y debe ser positiva. Evita los asteroides en (0, -2), (0, 0) y (0, 2).",
    startPos: { x: 3, y: -4 },
    targets: [
      { x: -3, y: 3, type: "astronaut", rescued: false, id: "astro1" }
    ],
    portal: { x: -3, y: 3 },
    obstacles: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: -2 }
    ],
    minVectors: 2,
    gridSize: 6
  },
  {
    id: 4,
    name: "Nivel 4: Rescate Múltiple",
    description: "Misión: Rescata a los dos astronautas atrapados en (-3, 2) y (2, -3) antes de cruzar el portal de escape en (4, 4). ¡Esquiva los asteroides!",
    hint: "Pista: Planifica tu ruta paso a paso. Navega primero hacia uno de los astronautas, luego usa otro vector hacia el segundo, y finalmente dirígete al portal de color verde.",
    startPos: { x: -2, y: -4 },
    targets: [
      { x: -3, y: 2, type: "astronaut", rescued: false, id: "astro1" },
      { x: 2, y: -3, type: "astronaut", rescued: false, id: "astro2" }
    ],
    portal: { x: 4, y: 4 },
    obstacles: [
      { x: -1, y: -1 },
      { x: 0, y: 3 },
      { x: 2, y: 1 }
    ],
    minVectors: 3,
    gridSize: 6
  },
  {
    id: 5,
    name: "Nivel 5: El Agujero Negro",
    description: "Misión: Escapa del sector navegando desde (-5, 5) hasta (5, -5). Un agujero negro en el centro (0, 0) y su campo de gravedad te destruirán si te acercas demasiado. ¡Optimiza tus vectores!",
    hint: "Pista: El agujero negro ocupa (0,0) y los puntos adyacentes (0,1), (1,0), (0,-1) y (-1,0) están llenos de radiación destructiva. Bordea el centro usando vectores diagonales.",
    startPos: { x: -5, y: 5 },
    targets: [],
    portal: { x: 5, y: -5 },
    obstacles: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ],
    minVectors: 3,
    gridSize: 6
  }
];

if (typeof module !== 'undefined') {
  module.exports = LEVELS;
}
