# Instrucciones para Configurar GitHub y Netlify

## Configuración: Tu GitHub + Netlify del Cliente

**Estrategia:**
- **GitHub:** Tu cuenta personal (repo privado)
- **Netlify:** Cuenta del cliente con su email
- **Beneficio:** Tú controlas el código, cliente controla el deploy

## Paso 1: Crear Repositorio Privado en GitHub (TU cuenta)

1. **Inicia sesión en TU cuenta de GitHub**
   - Ve a https://github.com
   - Inicia sesión con tu cuenta personal

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

## Paso 2: Configurar Netlify (CUENTA DEL CLIENTE)

1. **El cliente crea cuenta en Netlify**
   - Ve a https://app.netlify.com
   - Clic en "Sign up"
   - Regístrate con el email del cliente (Gmail)
   - Verifica el email del cliente

2. **Conectar Netlify a TU repositorio de GitHub**
   - En el dashboard de Netlify, clic en "Add new site" → "Import an existing project"
   - Selecciona "GitHub"
   - **IMPORTANTE:** El cliente debe autorizar Netlify para acceder a GitHub
   - Si el cliente no tiene cuenta GitHub, puede:
     - Opción A: Crear cuenta GitHub gratuita (recomendado)
     - Opción B: Tú le das acceso temporal a tu repo (ver abajo)
   - Busca y selecciona el repositorio `jj-food-studio` (de TU cuenta)
   - Clic en "Import site"

3. **Configurar build settings**
   - **Build command:** (dejar vacío)
   - **Publish directory:** (dejar vacío - usará la raíz del repo)
   - Clic en "Deploy site"

4. **Obtén la URL pública**
   - Netlify generará una URL como: `https://jj-food-studio.netlify.app` o similar
   - Comparte esta URL con el cliente

## Opción B: Dar acceso temporal al cliente a tu repo

Si el cliente no quiere crear cuenta GitHub:

1. **Dar acceso al cliente a TU repo**
   - Ve a tu repositorio en GitHub
   - Settings → Collaborators
   - Clic en "Add people"
   - Ingresa el email del cliente
   - Selecciona "Maintain" (permisos completos)
   - El cliente recibirá invitación por email

2. **Cliente acepta invitación**
   - El cliente crea cuenta GitHub gratuita
   - Acepta la invitación
   - Ahora puede conectar Netlify al repo

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

- ✅ Repositorio GitHub privado en TU cuenta (tú controlas el código)
- ✅ Cliente NO tiene acceso al código fuente
- ✅ Sitio público (cualquiera puede verlo, pero no el código)
- ✅ Netlify maneja HTTPS automáticamente
- ✅ No hay credenciales en el código

## Para tu Portafolio

Como el repo es privado, para mostrar este trabajo en tu portafolio:

- Muestra screenshots del sitio
- Describe el proyecto y tecnologías usadas
- Link al sitio deployado (Netlify)
- NO link al repo de GitHub (es privado)
- Puedes crear un repo separado con código demo/sanitizado si quieres mostrar código

## Siguiente Paso

Una vez que tengas el sitio deployado en Netlify, continúa con:
- Configurar Cloudinary
- Subir contenido real del cliente
- Integrar contenido en el sitio
