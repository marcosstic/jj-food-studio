# Instrucciones para Configurar Formspree y Cloudinary

## Paso 1: Configurar Formspree (Formulario de Contacto)

1. **Crear cuenta en Formspree**
   - Ve a https://formspree.io
   - Clic en "Sign up" o "Get Started"
   - Regístrate con tu email o cuenta de GitHub

2. **Crear nuevo formulario**
   - En dashboard, clic en "New Form"
   - Nombre del formulario: "JJ Food Studio - Contacto"
   - Clic en "Create Form"

3. **Obtener el Form ID**
   - Formspree te mostrará un endpoint como: `https://formspree.io/f/xvbnzqyp`
   - Copia este endpoint (es TU_FORM_ID)

4. **Actualizar contacto.html**
   - Abre `contacto.html`
   - Busca la línea: `action="https://formspree.io/f/TU_FORM_ID"`
   - Reemplaza `TU_FORM_ID` con tu form ID real
   - Ejemplo: `action="https://formspree.io/f/xvbnzqyp"`

5. **Probar el formulario**
   - Abre contacto.html en tu navegador
   - Llena el formulario con datos de prueba
   - Envía el formulario
   - Verifica que recibes el email en Formspree

## Paso 2: Configurar Cloudinary (Almacenamiento de Imágenes y Videos)

1. **Crear cuenta en Cloudinary**
   - Ve a https://cloudinary.com
   - Clic en "Sign up for free"
   - Regístrate con tu email
   - Verifica tu email

2. **Obtener tus credenciales**
   - En dashboard, encontrarás:
     - **Cloud name** (ej: jjfoodstudio)
     - **API Key** (ej: 123456789012345)
     - **API Secret** (ej: abcdefghijklmnopqrstuvwxyz)

3. **Organizar carpetas en Cloudinary**
   - En Media Library, crea carpetas:
     - `hero` (para video principal)
     - `portfolio-horizontal` (fotos horizontales)
     - `portfolio-vertical` (fotos verticales)
     - `portfolio-cocineros` (fotos de cocineros)
     - `portfolio-producto` (foto producto)
     - `cases` (videos de casos de estudio)

4. **Subir contenido a Cloudinary**

**Opción A: Via Dashboard (manual, más simple)**
   - En Media Library, selecciona la carpeta correspondiente
   - Clic en "Upload" o arrastra archivos
   - Sube los archivos de CONTENIDO-WEB:

**Videos (carpeta `cases` y `hero`):**
- `Presentacion pan de j 2.mp4` → carpeta `hero`
- `Ferrero v5.mp4` → carpeta `cases`
- `Tomatos JJ V2.mp4` → carpeta `cases`
- `wok d2.mp4` → carpeta `cases`
- `DRACOROSSO TEASER.mp4` → carpeta `cases`

**Imágenes (carpetas correspondientes):**
- `CONTENIDO-WEB/Fotos Horizontales/*` → carpeta `portfolio-horizontal`
- `CONTENIDO-WEB/Fotos Verticales/*` → carpeta `portfolio-vertical`
- `CONTENIDO-WEB/Fotos Cocineros_Pasteleros/*` → carpeta `portfolio-cocineros`
- `CONTENIDO-WEB/FOTO PRODUCTO/*` → carpeta `portfolio-producto`

**Opción B: Via CLI (automatizado)**
```bash
# Instalar Cloudinary CLI
npm install -g cloudinary-cli

# Configurar con tus credenciales
cloudinary config

# Subir videos
cloudinary upload "CONTENIDO-WEB/Videos web/Presentacion pan de j 2.mp4" -f hero
cloudinary upload "CONTENIDO-WEB/Videos web/Ferrero v5.mp4" -f cases
cloudinary upload "CONTENIDO-WEB/Videos web/Tomatos JJ V2.mp4" -f cases
cloudinary upload "CONTENIDO-WEB/Videos web/wok d2.mp4" -f cases
cloudinary upload "CONTENIDO-WEB/Videos web/DRACOROSSO TEASER.mp4" -f cases

# Subir imágenes (ejemplo)
cloudinary upload "CONTENIDO-WEB/Fotos Horizontales/*" -f portfolio-horizontal
```

5. **Obtener URLs optimizadas**
   - En Media Library, cada archivo tiene una URL
   - Formato típico: `https://res.cloudinary.com/[cloud-name]/image/upload/[public-id]`
   - Para optimización automática, agrega parámetros:
     - Videos: `f_auto,q_auto`
     - Imágenes: `f_auto,q_auto,w_800`

**Ejemplos de URLs optimizadas:**
```
# Video optimizado
https://res.cloudinary.com/jjfoodstudio/video/upload/f_auto,q_auto/v123/presentacion-pan-j-2

# Imagen optimizada
https://res.cloudinary.com/jjfoodstudio/image/upload/f_auto,q_auto,w_800/img_0133
```

6. **Documentar URLs**
   - Crea un archivo `CLOUDINARY-URLS.md` para guardar todas las URLs
   - Organiza por categoría (hero, portfolio, cases)
   - Esto facilitará la integración en el sitio

## Paso 3: Integrar URLs de Cloudinary en el Sitio

Una vez que tengas las URLs de Cloudinary, necesitaré cambiar a Code mode para:

1. **Reemplazar hero con video Cloudinary**
   - Reemplazar logo 3D con `<video>` usando URL de Cloudinary
   - Configurar player HTML5

2. **Integrar imágenes en portafolio**
   - Reemplazar placeholders con URLs de Cloudinary
   - Organizar por categorías

3. **Crear casos de estudio con videos**
   - Integrar videos de casos en caso.html
   - Configurar player HTML5

## Notas Importantes

**Formspree:**
- Plan gratuito: 50 submissions/mes
- Si necesitas más, plan Pro ($12/mes)
- Los formularios se pueden personalizar con CSS

**Cloudinary:**
- Plan gratuito: 25 GB storage, 25 GB bandwidth/mes
- Tu contenido actual: ~591.6 MB (cabe en 25 GB)
- Optimización automática reduce tamaño significativamente
- CDN global para performance excelente

**Seguridad:**
- No compartas tu API Secret de Cloudinary
- Formspree endpoints son públicos (esto es normal)
- Considera usar environment variables en Netlify para credenciales

## Siguiente Paso

Una vez que tengas:
1. ✅ Formspree configurado y contacto.html actualizado
2. ✅ Cloudinary configurado y contenido subido
3. ✅ URLs de Cloudinary documentadas

Avísame para integrar el contenido real en el sitio.
