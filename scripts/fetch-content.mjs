// Prebuild (npm run build lo ejecuta solo): trae el contenido desde Sanity
// (dataset público) y genera src/lib/content/generated.json.
// Si Sanity no tiene contenido o falla, conserva el último generated.json
// válido (o escribe {} si no existe) y el sitio usa su contenido local de
// respaldo — el build NUNCA se rompe por el CMS.
import { writeFileSync } from 'node:fs';

const PROJECT = 'tg1ohcli';
const DATASET = 'production';
const CDN = `https://${PROJECT}.apicdn.sanity.io/v1/data/query/${DATASET}?query=`;

// asset->url devuelve la URL completa del CDN; aquí agregamos los parámetros
// de transformación (recorte 4:5, formatos modernos, calidad)
const media = (url, alt, sizes) =>
	url
		? {
				kind: 'image',
				src: `${url}?w=480&h=600&fit=crop&auto=format&q=80`,
				srcset: [360, 480, 640, 960]
						.map((w) => `${url}?w=${w}&h=${Math.round(w * 1.25)}&fit=crop&auto=format&q=80 ${w}w`)
						.join(', '),
				sizes,
				lqip: `${url}?w=40&h=50&fit=crop&blur=300&q=30`,
				alt: alt || ''
			}
		: null;

async function q(groq) {
	const res = await fetch(CDN + encodeURIComponent(groq));
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
	return (await res.json()).result;
}

let out = {};
try {
	const [cats, siteRaw, homeRaw, bannerHomeRaw, services, courses] = await Promise.all([
		q('*[_type=="category" && (defined(visible)==false || visible==true)] | order(orden asc){"name":nombre,"slug":slug.current,tagline,headline,descripcion,"coverUrl":cover.asset->url,"coverAlt":cover.alt,galeria[]{tipo,alt,cliente,servicio,anio,"imgUrl":imagen.asset->url,videoUrl},orden}'),
		q('*[_id=="siteConfig"][0]'),
		q('*[_id=="homeContent"][0]{kicker,titulo,subtitulo,editorialTitulo,editorialTexto,retratoJJ{"url":asset->url},retratoAlt,videoHeroUrl}'),
		q('*[_id=="bannerHome"][0]{fotos[]{"url":asset->url,alt}}'),
		q('*[_type=="service"] | order(orden asc)'),
		q('*[_type=="course"] | order(orden asc)')
	]);

	if (bannerHomeRaw?.fotos?.length) {
		out.bannerHome = bannerHomeRaw.fotos
			.map((f) => media(f.url, f.alt, '(max-width: 680px) 72vw, 460px'))
			.filter(Boolean);
	}

	if (cats?.length) {
		out.categories = cats.map((c) => ({
			slug: c.slug,
			name: c.name,
			tagline: c.tagline,
			headline: c.headline,
			description: c.descripcion,
			cover: media(c.coverUrl, c.coverAlt || c.name, '(max-width: 680px) 46vw, 300px'),
			gallery: (c.galeria ?? [])
				.map((g) => {
					if (g.tipo === 'video' && g.videoUrl) {
						return { kind: 'video', src: g.videoUrl, alt: g.alt || '', cliente: g.cliente, servicio: g.servicio, anio: g.anio };
					}
					return { ...media(g.imgUrl, g.alt || c.name, '(max-width: 980px) 100vw, 640px'), cliente: g.cliente, servicio: g.servicio, anio: g.anio };
				})
				.filter(Boolean)
		}));
	}

	// homeSections puede venir como strings o como objetos (si algún editor
	// los keyed); se normaliza siempre a strings
	const normSection = (s) =>
		typeof s === 'string'
			? s
			: s && typeof s === 'object'
				? Object.entries(s)
						.filter(([k]) => k !== '_key' && k !== '_type')
						.sort((a, b) => Number(a[0]) - Number(b[0]))
						.map(([, v]) => v)
						.join('')
				: String(s);

	if (siteRaw) {
		const site = Object.fromEntries(
			Object.entries({
				whatsappPhone: siteRaw.whatsappPhone,
				whatsappMessage: siteRaw.whatsappMessage,
				instagramUrl: siteRaw.instagramUrl,
				instagramHandle: siteRaw.instagramHandle,
				email: siteRaw.email,
				formspreeEndpoint: siteRaw.formspreeEndpoint,
				logoDefault: siteRaw.logoDefault,
				homeSections: (siteRaw.homeSections ?? []).map(normSection)
			}).filter(([, v]) => v !== undefined && v !== null && v !== '')
		);
		if (Object.keys(site).length) out.site = site;
	}

	if (homeRaw) {
		const home = {};
		const hero = {};
		if (homeRaw.kicker) hero.kicker = homeRaw.kicker;
		if (homeRaw.titulo) hero.h1 = homeRaw.titulo;
		if (homeRaw.subtitulo) hero.sub = homeRaw.subtitulo;
		if (Object.keys(hero).length) home.hero = hero;
		if (homeRaw.editorialTitulo || homeRaw.editorialTexto) {
			home.editorial = { title: homeRaw.editorialTitulo, subtitle: homeRaw.editorialTexto };
		}
		if (homeRaw.retratoJJ?.url) {
			home.closingFoto = media(homeRaw.retratoJJ.url, homeRaw.retratoAlt, '(max-width: 680px) 92vw, 560px');
		}
		if (homeRaw.videoHeroUrl) home.videoHeroUrl = homeRaw.videoHeroUrl;
		if (Object.keys(home).length) out.home = home;
	}

	if (services?.length) {
		out.services = services.map((s) => ({ title: s.title, description: s.description, lead: s.lead, detalle: s.detalle }));
	}
	if (courses?.length) {
		out.courses = courses.map((c) => ({ title: c.title, description: c.description, cta: c.cta }));
	}
} catch (e) {
	console.warn('[fetch-content] Sanity sin contenido o con error; se conserva el último generated.json:', String(e).slice(0, 200));
	process.exit(0);
}

writeFileSync(new URL('../src/lib/content/generated.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('[fetch-content] generated.json:', Object.keys(out).join(', ') || '(vacío → contenido local)');
