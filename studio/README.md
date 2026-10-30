# Studio de Sanity — panel de JJ

Panel de administración de contenido: **se instala y hospeda aparte del sitio**
(el sitio de Netlify no lo compila — evita builds pesados en el plan gratuito).

## Instalación local (una sola vez)

```bash
cd studio
npm install
npx sanity login     # abre el navegador para autenticarte
```

## Desarrollo / uso

```bash
npm run dev          # abre en http://localhost:3333
```

## Publicar el panel en la nube (hospedado gratis por Sanity)

```bash
npm run deploy       # hospeda en https://jj-food-studio-<hash>.sanity.studio
```

JJ accede con la cuenta **jjifoodstudio@gmail.com** (miembro Administrator del
proyecto tg1ohcli) e inicia sesión con Google.
