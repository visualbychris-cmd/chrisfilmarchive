# chrisfilmarchive

Portfolio de Christian Bustos (filmmaker & photographer), construido con [Astro](https://astro.build) y editable a través de [Sveltia CMS](https://github.com/sveltia/sveltia-cms).

Réplica de https://visualbychris.myportfolio.com con las secciones:

- **Home** — hero con vídeo de fondo
- **Work** — grid con las 4 secciones
  - **VIDEO**
  - **SHORT-FORM CONTENT**
  - **PHOTO** (Portrait / Sport / Travel)
  - **VIDEO EDITING ONLY**

## Desarrollo local

```sh
npm install
npm run dev
```

Abre http://localhost:4321

## Editar contenido con Sveltia CMS

Todo el texto, las fotos y los vídeos embebidos se editan desde un panel en `/admin`, sin tocar código. El contenido vive como archivos YAML en `src/content/`.

### Opción A — Probar en local (sin GitHub, recomendado para empezar)

1. Corre `npm run dev`.
2. Abre `http://localhost:4321/admin/index.html`.
3. Pulsa **"Work with Local Repository"** y selecciona la carpeta raíz de este proyecto cuando el navegador te lo pida.
4. Edita lo que quieras. Los cambios se escriben directo en tus archivos locales — luego los subes a GitHub como cualquier cambio de código (`git add`, `git commit`, `git push`).

### Opción B — Editar en producción, una vez desplegado

Necesitas que el proyecto esté en un repositorio de GitHub (ver más abajo) y desplegado (recomendado: Netlify).

1. Sube el proyecto a GitHub (instrucciones abajo).
2. Edita `public/admin/config.yml` y sustituye la línea:
   ```yaml
   repo: REPLACE_ME/chrisfilmarchive
   ```
   por tu usuario real, por ejemplo `repo: cabm195/chrisfilmarchive`.
3. Despliega el sitio (ver sección de despliegue).
4. Entra en `https://tu-sitio.com/admin/`.
5. Pulsa **"Sign In Using Access Token"**.
   - Sveltia te da un link directo a GitHub para generar un *personal access token* con los permisos ya preseleccionados (solo acceso a este repo).
   - Generas el token en GitHub, lo copias, lo pegas en el diálogo de Sveltia.
   - Listo — no hace falta crear ninguna OAuth App, ni backend, ni compartir tu cuenta con nadie. El token se queda solo en tu navegador.
6. Cuando el token caduque (tú eliges la duración al crearlo), solo repites el paso 5 con un token nuevo.

## Subir el proyecto a GitHub

1. Crea un repositorio **vacío** en https://github.com/new (sin README, sin .gitignore) — sugerencia de nombre: `chrisfilmarchive`.
2. Copia la URL que te da GitHub (algo como `https://github.com/tu-usuario/chrisfilmarchive.git`).
3. En este proyecto, ejecuta:
   ```sh
   git remote add origin https://github.com/tu-usuario/chrisfilmarchive.git
   git push -u origin main
   ```

## Desplegar (recomendado: Netlify)

1. Entra en https://app.netlify.com con tu cuenta (o créala).
2. "Add new site" → "Import an existing project" → conecta tu GitHub → selecciona el repo `chrisfilmarchive`.
3. Build command: `npm run build` — Publish directory: `dist`. Netlify detecta esto solo al ver que es un proyecto Astro.
4. Deploy. En unos minutos tendrás una URL pública (puedes conectar tu dominio propio después desde "Domain settings").

## Estructura de contenido

```
src/content/
├── home/home.yaml            → textos e íconos sociales de la portada
├── sections/sections.yaml     → las 4 tarjetas de "Work" (título, portada, texto)
├── video/video.yaml           → vídeos de la sección VIDEO
├── short-form/short-form.yaml → vídeos de SHORT-FORM CONTENT
├── video-editing/video-editing.yaml → vídeos de VIDEO EDITING ONLY
└── photos/photos.yaml         → fotos de PORTRAIT / SPORT / TRAVEL
```

Cada uno de estos archivos tiene su propia pantalla de edición en el panel de `/admin`.

### Añadir un vídeo nuevo

En el campo **Embed URL** de cada vídeo se pega la URL de "insertar" (embed), no el link normal:

- YouTube: `https://www.youtube.com/embed/ID_DEL_VIDEO` (en YouTube: Compartir → Insertar → copiar solo el `src` del iframe)
- Vimeo: `https://player.vimeo.com/video/ID_DEL_VIDEO`

### Los ~15 vídeos que subiste manualmente

La mayoría de los vídeos nativos (los que no son de YouTube) ya están enlazados tal cual estaban en tu Adobe Portfolio — usan el mismo reproductor de Adobe (Creative Cloud Video), así que no hizo falta descargarlos. Si alguno no aparece o quieres reemplazarlo por tu archivo original, puedes subir el vídeo a YouTube (aunque sea "no listado") y pegar su embed URL, o alojarlo en Vimeo.
