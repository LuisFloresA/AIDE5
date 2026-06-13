# 🚀 VectorQuest: Desafío en el Plano Cartesiano

**VectorQuest** es un videojuego educativo interactivo diseñado para enseñar los conceptos de **plano cartesiano**, **vectores de traslación** y **composición vectorial** a estudiantes de **7° y 8° Básico** en Chile. 

Inspirado en el concepto de "aprender jugando" de *Blockly Games*, este juego reemplaza los bloques de código por comandos analíticos de vectores: los estudiantes deben programar la trayectoria de su nave espacial ingresando componentes horizontales ($X$) y verticales ($Y$) para esquivar asteroides y rescatar tripulantes espaciales.

---

## 🎮 Características del Juego

* **Estética Sci-Fi Neón Premium:** Diseñado con una interfaz moderna en modo oscuro, efectos de *glassmorphism* (paneles translúcidos) y animaciones fluidas utilizando gráficos SVG interactivos y responsivos.
* **12 Niveles de Dificultad Progresiva:** Desde traslaciones directas sin obstáculos hasta laberintos espirales, vientos estelares y cinturones de asteroides paralelos (Nivel de Graduación).
* **Retroalimentación Pedagógica Inmediata:** Si ocurre una colisión, el sistema analiza el punto de origen y el impacto, proporcionando sugerencias conceptuales para corregir la ruta.
* **Audio y Música Sintetizados:** Banda sonora ambiental y efectos de sonido generados en tiempo real con la **Web Audio API** (sin cargar pesados archivos MP3). Incluye controles de volumen maestro e interruptor de silencio (*Mute*) para no perturbar el aula de clases.
* **Salón de la Fama (Leaderboard):** Guarda de forma persistente los puntajes locales, nombres de piloto y número de estrellas (`localStorage`) para fomentar la superación en el grupo.

---

## 📐 Fundamento Pedagógico (Bases Curriculares Chile - MINEDUC)

El juego cubre directamente los siguientes Objetivos de Aprendizaje:
* **Identificación de Coordenadas:** Ubicación de puntos $(X, Y)$ en los 4 cuadrantes.
* **Traslación Geométrica:** Comprensión práctica de cómo un vector altera la posición de un objeto en el espacio.
* **Composición de Vectores:** Al completar una misión exitosa, el juego calcula analíticamente la suma de los vectores ingresados:
  $$\vec{v}_{\text{total}} = \vec{v}_1 + \vec{v}_2 + \dots + \vec{v}_n = (X_{\text{total}}, Y_{\text{total}})$$
  Demostrando de manera visual que realizar múltiples saltos es equivalente a una única traslación directa.

---

## 🛠️ Estructura del Proyecto

El código está organizado de manera modular y limpia:
```bash
├── index.html       # Estructura semántica del juego y modales de UI
├── style.css        # Estilos visuales Sci-Fi, fuentes y animaciones locales SVG
├── levels.js        # Base de datos con la configuración de los 12 niveles
├── game.js          # Motor de simulación física, sonido y renderizado dinámico
└── package.json     # Configuración opcional para entornos de desarrollo local
```

---

## 💻 Instrucciones de Instalación y Ejecución

### Uso Directo (Recomendado para Colegios)
Este juego ha sido diseñado para funcionar **100% offline y sin necesidad de internet** una vez descargado:
1. Descarga el repositorio o los archivos del proyecto.
2. Abre la carpeta y haz **doble clic en `index.html`**.
3. El juego se ejecutará de forma autónoma en cualquier navegador moderno.

### Desarrollo Local (Vite)
Si deseas realizar modificaciones en el código utilizando un servidor de desarrollo:
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Compila el paquete de producción:
   ```bash
   npm run build
   ```

---

## 📄 Licencia
Este proyecto es de código abierto y está libre para su uso en aulas escolares de todo el mundo. ¡Úsalo, edítalo y compártelo con tus alumnos!
