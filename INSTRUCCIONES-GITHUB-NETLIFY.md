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

## Paso 2: Configurar Netlify (TU cuenta GitHub)

1. **En el dashboard de Netlify del cliente:**
   - Clic en "Add new site" → "Import an existing project"
   - Selecciona "GitHub"

2. **Autorizar Netlify con TU cuenta GitHub**
   - Netlify te pedirá autorizar acceso a GitHub
   - Inicia sesión con TU cuenta (marcosstic)
   - Autoriza Netlify para acceder a tus repositorios

3. **Seleccionar el repositorio**
   - Busca y selecciona `jj-food-studio` (de TU cuenta)
   - Clic en "Import site"

4. **Configurar build settings**
   - **Build command:** (dejar vacío)
   - **Publish directory:** (dejar vacío - usará la raíz del repo)
   - Clic en "Deploy site"

5. **Obtén la URL pública**
   - Netlify generará una URL como: `https://jj-food-studio.netlify.app` o similar
   - Comparte esta URL con el cliente

## Paso 3: Transferir el Sitio Netlify al Cliente (al final del proyecto)

Cuando el proyecto esté terminado y quieras transferir el control al cliente:

1. **Transferir el sitio Netlify**
   - En Netlify, ve al sitio del cliente
   - Site settings → General → Change site owner
   - Ingresa el email del cliente
   - El cliente recibirá invitación por email
   - Cliente acepta y ahora es owner del sitio

2. **Transferir el código fuente (opcional)**
   - Si el cliente quiere el código fuente, tienes 3 opciones:

   **Opción A: Dar acceso al repo GitHub**
   - Ve a https://github.com/marcosstic/jj-food-studio/settings/access
   - Clic en "Collaborators"
   - Agrega el email del cliente como "Maintain"
   - El cliente crea cuenta GitHub y acepta
   - Ahora tiene acceso completo al código

   **Opción B: Transferir ownership del repo GitHub**
   - Ve a https://github.com/marcosstic/jj-food-studio/settings
   - Danger Zone → Transfer repository
   - Ingresa el nombre del repo y el nombre de usuario del cliente
   - El cliente recibe el repo completo

   **Opción C: Exportar código como ZIP**
   - Si el cliente no quiere GitHub
   - Ejecuta en tu terminal:
     ```bash
     cd /home/marcos/Documentos/jj-food-studio
     git archive --format=zip --output=jj-food-studio.zip main
     ```
   - Envía el archivo `jj-food-studio.zip` al cliente
   - El cliente puede descomprimir y usar el código localmente

## Paso 4: Verificar Deploy

1. **Abre la URL de Netlify en tu navegador**
   - Deberías ver el sitio funcionando

2. **Comparte la URL con tu cliente**
   - Puede acceder desde su laptop o celular
   - El sitio es público pero el código está protegido en GitHub privado

## Paso 5: Actualizaciones Futuras

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
