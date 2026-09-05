# Instrucciones para Configurar GitHub y Netlify

## Paso 1: Crear Repositorio Privado en GitHub

1. **Inicia sesión en GitHub**
   - Ve a https://github.com
   - Inicia sesión con tu cuenta

2. **Crea nuevo repositorio**
   - Clic en el icono "+" arriba a la derecha
   - Selecciona "New repository"
   - **IMPORTANTE:** Selecciona "Private" (no público)
   - Nombre del repositorio: `jj-food-studio`
   - Descripción: `Portfolio y sitio web de JJ Food Studio - Fotografía gastronómica`
   - NO marcar "Initialize this repository with a README"
   - NO marcar "Add .gitignore"
   - NO marcar "Choose a license"
   - Clic en "Create repository"

3. **Conecta tu repositorio local con GitHub**
   - En tu terminal, ejecuta estos comandos:
   
   ```bash
   cd /home/marcos/Documentos/jj-food-studio
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/jj-food-studio.git
   git push -u origin main
   ```
   
   **Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub**

4. **Verifica que sea privado**
   - Ve a la página del repositorio en GitHub
   - Debe decir "Private" en la parte superior
   - Si dice "Public", ve a Settings → Danger Zone → Change repository visibility → Make private

## Paso 2: Configurar Netlify

1. **Crea cuenta en Netlify**
   - Ve a https://app.netlify.com
   - Clic en "Sign up"
   - Regístrate con tu cuenta de GitHub (recomendado)
   - Verifica tu email

2. **Conecta tu repositorio**
   - En el dashboard de Netlify, clic en "Add new site" → "Import an existing project"
   - Selecciona "GitHub"
   - Autoriza Netlify para acceder a tu cuenta de GitHub
   - Busca y selecciona el repositorio `jj-food-studio`
   - Clic en "Import site"

3. **Configura build settings**
   - **Build command:** (dejar vacío)
   - **Publish directory:** (dejar vacío - usará la raíz del repo)
   - Clic en "Deploy site"

4. **Obtén tu URL pública**
   - Netlify generará una URL como: `https://jj-food-studio.netlify.app` o similar
   - Copia esta URL para compartirla con tu cliente

5. **Configura dominio personalizado (opcional)**
   - Si tienes dominio propio (ej: jjfoodstudio.com)
   - Ve a Site settings → Domain management
   - Clic en "Add custom domain"
   - Sigue las instrucciones para configurar DNS

## Paso 3: Verificar Deploy

1. **Abre la URL de Netlify en tu navegador**
   - Deberías ver el sitio funcionando

2. **Comparte la URL con tu cliente**
   - Puede acceder desde su laptop o celular
   - El sitio es público pero el código está protegido en GitHub privado

## Paso 4: Actualizaciones Futuras

Cada vez que hagas cambios al código:

```bash
cd /home/marcos/Documentos/jj-food-studio
git add .
git commit -m "Descripción del cambio"
git push
```

Netlify detectará el push automáticamente y hará deploy de los cambios.

## Seguridad

- ✅ Repositorio GitHub privado (nadie puede descargar el código)
- ✅ Sitio público (cualquiera puede verlo, pero no el código fuente)
- ✅ Netlify maneja HTTPS automáticamente
- ✅ No hay credenciales en el código

## Siguiente Paso

Una vez que tengas el sitio deployado en Netlify, continúa con:
- Configurar Cloudinary
- Subir contenido real del cliente
- Integrar contenido en el sitio
