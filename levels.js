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
    portal: { x: 4, y: 3 },
    obstacles: [],
    minVectors: 1,
    gridSize: 6
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
  },
  {
    id: 6,
    name: "Nivel 6: El Laberinto Diagonal",
    description: "Misión: Lleva tu nave desde (-5, -5) hasta el portal en (5, 5). Un patrón de asteroides bloquea la diagonal directa. Debes realizar una trayectoria en zig-zag.",
    hint: "Pista: Los asteroides están en (-3,-3), (-1,-1), (1,1) y (3,3). Usa vectores como (3, 5) y luego (2, -3) para bordearlos en zig-zag por los costados.",
    startPos: { x: -5, y: -5 },
    targets: [],
    portal: { x: 5, y: 5 },
    obstacles: [
      { x: -3, y: -3 },
      { x: -1, y: -1 },
      { x: 1, y: 1 },
      { x: 3, y: 3 }
    ],
    minVectors: 3,
    gridSize: 6
  },
  {
    id: 7,
    name: "Nivel 7: Órbita de Rescate",
    description: "Misión: Rescata a los 3 astronautas en (4, -2), (4, 2) y (-4, 0). Luego escapa por el portal en (-2, 5). El eje vertical está bloqueado por asteroides.",
    hint: "Pista: Los asteroides en (0, -3), (0, 0) y (0, 3) te impiden cruzar el eje Y directamente. Planifica una ruta circular que pase por los tres astronautas rodeando el eje central.",
    startPos: { x: -2, y: -5 },
    targets: [
      { x: 4, y: -2, type: "astronaut", rescued: false, id: "astro1" },
      { x: 4, y: 2, type: "astronaut", rescued: false, id: "astro2" },
      { x: -4, y: 0, type: "astronaut", rescued: false, id: "astro3" }
    ],
    portal: { x: -2, y: 5 },
    obstacles: [
      { x: 0, y: -3 },
      { x: 0, y: 0 },
      { x: 0, y: 3 }
    ],
    minVectors: 4,
    gridSize: 6
  },
  {
    id: 8,
    name: "Nivel 8: El Portal Blindado",
    description: "¡Desafío Final! El portal está en (0, 0) pero está rodeado de asteroides. La única entrada está en (0, 2). Navega desde (5, -5), entra por la abertura y escapa.",
    hint: "Pista: Los asteroides forman un cuadrado alrededor del centro. Primero dirígete a un punto fuera de la caja como (0, 3) con el vector (-5, 8). Luego baja a (0, 2) con (0, -1) y finalmente al portal con (0, -2).",
    startPos: { x: 5, y: -5 },
    targets: [],
    portal: { x: 0, y: 0 },
    obstacles: [
      { x: -2, y: -2 }, { x: -2, y: -1 }, { x: -2, y: 0 }, { x: -2, y: 1 }, { x: -2, y: 2 },
      { x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 },
      { x: 2, y: -2 }, { x: 2, y: -1 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
      { x: -1, y: 2 }, { x: 1, y: 2 }
    ],
    minVectors: 3,
    gridSize: 6
  },
  {
    id: 9,
    name: "Nivel 9: La Gran Espiral",
    description: "Misión: Navega por una trayectoria en espiral para rescatar al astronauta en (0, 4) y luego escapar por el portal en (0, 0). Una barrera de asteroides bloquea el acceso directo.",
    hint: "Pista: El portal está en (0,0). Hay asteroides rodeando el centro. Debes ir primero al astronauta en (0,4) rodeando las barreras de asteroides por el exterior, y luego entrar al portal (0,0) desde la abertura superior en (0, 2).",
    startPos: { x: 0, y: -4 },
    targets: [
      { x: 0, y: 4, type: "astronaut", rescued: false, id: "astro1" }
    ],
    portal: { x: 0, y: 0 },
    obstacles: [
      { x: -3, y: -3 }, { x: -2, y: -3 }, { x: -1, y: -3 }, { x: 0, y: -3 }, { x: 1, y: -3 }, { x: 2, y: -3 }, { x: 3, y: -3 },
      { x: -3, y: -2 }, { x: 3, y: -2 },
      { x: -3, y: -1 }, { x: 3, y: -1 },
      { x: -3, y: 0 }, { x: 3, y: 0 },
      { x: -3, y: 1 }, { x: 3, y: 1 },
      { x: -3, y: 2 }, { x: 3, y: 2 },
      { x: -3, y: 3 }, { x: -2, y: 3 }, { x: -1, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
    ],
    minVectors: 3,
    gridSize: 6
  },
  {
    id: 10,
    name: "Nivel 10: Viento Estelar",
    description: "Misión: Un fuerte viento estelar sopla hacia el Oeste (-X). Rescata al astronauta en (5, 0) y escapa por el portal en (-5, 0). Evita la franja de cometas en el eje Y.",
    hint: "Pista: La franja de cometas bloquea el eje vertical (Y) en (0, -4), (0, -2), (0, 0), (0, 2) y (0, 4). Navega subiendo al Cuadrante II o bajando al Cuadrante III para cruzar el eje Y de forma segura.",
    startPos: { x: -5, y: 5 },
    targets: [
      { x: 5, y: 0, type: "astronaut", rescued: false, id: "astro1" }
    ],
    portal: { x: -5, y: 0 },
    obstacles: [
      { x: 0, y: -4 }, { x: 0, y: -2 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 4 },
      { x: 2, y: 3 }, { x: -2, y: -3 }
    ],
    minVectors: 3,
    gridSize: 6
  },
  {
    id: 11,
    name: "Nivel 11: Constelación Cruz del Sur",
    description: "Misión: Rescata a los 4 astronautas ubicados en las estrellas de la Cruz del Sur: (0, 4), (-2, 1), (2, 2), y (0, -3). Luego ingresa al portal de escape en (0, 0).",
    hint: "Pista: Los asteroides protegen los espacios intermedios en (-1, -1), (1, 1), (-1, 3) y (1, -2). Traza una ruta secuencial que visite cada estrella y termine en el centro.",
    startPos: { x: -4, y: -4 },
    targets: [
      { x: 0, y: 4, type: "astronaut", rescued: false, id: "astro1" },
      { x: -2, y: 1, type: "astronaut", rescued: false, id: "astro2" },
      { x: 2, y: 2, type: "astronaut", rescued: false, id: "astro3" },
      { x: 0, y: -3, type: "astronaut", rescued: false, id: "astro4" }
    ],
    portal: { x: 0, y: 0 },
    obstacles: [
      { x: -1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 3 }, { x: 1, y: -2 }
    ],
    minVectors: 5,
    gridSize: 6
  },
  {
    id: 12,
    name: "Nivel 12: Desafío de la Relatividad",
    description: "¡Prueba de Graduación! Navega de (5, 5) a (-5, -5). Dos cinturones de asteroides paralelos bloquean el paso. Encuentra las brechas en (-2, 2) y (2, -2) para rescatar al astronauta en (0, 0).",
    hint: "Pista: Primer cinturón está en Y = 2 (brecha en X = -2). Segundo cinturón está en Y = -2 (brecha en X = 2). Debes hacer: (5,5) -> (-2,2) -> (0,0) -> (2,-2) -> (-5,-5).",
    startPos: { x: 5, y: 5 },
    targets: [
      { x: 0, y: 0, type: "astronaut", rescued: false, id: "astro1" }
    ],
    portal: { x: -5, y: -5 },
    obstacles: [
      { x: -5, y: 2 }, { x: -4, y: 2 }, { x: -3, y: 2 }, { x: -1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
      { x: -5, y: -2 }, { x: -4, y: -2 }, { x: -3, y: -2 }, { x: -2, y: -2 }, { x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: 3, y: -2 }, { x: 4, y: -2 }, { x: 5, y: -2 }
    ],
    minVectors: 4,
    gridSize: 6
  }
];

if (typeof module !== 'undefined') {
  module.exports = LEVELS;
}
