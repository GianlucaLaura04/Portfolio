# Portfolio — Gianluca Laura

Sitio de una sola página, hecho en HTML/CSS/JS puro (sin frameworks ni
instalaciones). Se puede subir directo a GitHub Pages.

## Archivos

- `index.html` — todo el contenido y la estructura
- `style.css` — todos los estilos
- `script.js` — el timecode animado del menú y las barras de la sección "Herramientas"

## Cómo publicarlo en GitHub Pages

1. Andá a [github.com](https://github.com) y creá un repositorio nuevo,
   por ejemplo `portfolio` (público).
2. Subí estos 4 archivos (`index.html`, `style.css`, `script.js`, `README.md`)
   a la raíz del repositorio. Podés hacerlo de dos formas:
   - **Web**: en la página del repo, botón "Add file" → "Upload files", arrastrás los archivos y confirmás el commit.
   - **Terminal**:
     ```
     git init
     git add .
     git commit -m "primer commit del portfolio"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/portfolio.git
     git push -u origin main
     ```
3. En el repositorio, andá a **Settings → Pages**.
4. En "Source" elegí la rama `main` y la carpeta `/root`, y guardá.
5. Esperá un minuto y tu sitio va a estar en:
   `https://TU_USUARIO.github.io/portfolio/`

## Qué ya está cargado

- ✅ Bio (sección "Sobre mí")
- ✅ Contacto: email, Instagram y WhatsApp
- ✅ Herramientas: After Effects, Figma, Photoshop y Blender con sus niveles

## Qué te falta personalizar

### 1. Proyectos
Cada proyecto es un bloque `<article class="project-card">` dentro de
`<section id="proyectos">`. Para cada uno:
- **Imagen real**: reemplazá el `<a class="project-card__media project-card__media--N">`
  (que hoy es un degradé de color) por una imagen tuya:
  ```html
  <a href="#" class="project-card__media" style="background-image:url('imagenes/proyecto1.jpg'); background-size:cover; background-position:center;">
    <span class="project-card__play">▶</span>
  </a>
  ```
  Creá una carpeta `imagenes/` en el repo y subí ahí tus fotos/thumbnails.
- **Categoría, título y descripción**: son el texto dentro de `project-card__category`,
  `project-card__title` y `project-card__desc`.
- **Link**: si el proyecto tiene un video en YouTube/Vimeo o vive en Behance,
  poné esa URL en el `href` del `<a>`.
- Podés borrar o duplicar tarjetas `<article>` completas para tener más o menos de 6 proyectos.

### 2. Herramientas (opcional)
Si sumás otro software (ej. Illustrator, Premiere, Cinema 4D) podés agregar
otro `<div class="track">` en `<section id="herramientas">`, siguiendo el
mismo formato que los que ya están.

## Notas de diseño

- Tipografías: **Space Grotesk** (títulos), **Inter** (texto), **JetBrains Mono** (timecodes y etiquetas) — cargadas desde Google Fonts, no requieren instalación.
- El menú superior simula una línea de tiempo de edición: la barra se llena a medida que scrolleás y el timecode de la derecha corre como si fuera un clip de video.
- Los colores (`--pink`, `--amber`, `--violet`) están definidos como variables al principio de `style.css`, en `:root` — cambiándolos ahí se actualiza todo el sitio.
- El sitio es responsive y respeta la preferencia de "reducir movimiento" del sistema operativo.
