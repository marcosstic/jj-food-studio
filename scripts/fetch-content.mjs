// Prebuild (npm run build lo ejecuta solo): trae el contenido desde Sanity
// (dataset público) y genera src/lib/content/generated.json.
// Si Sanity no tiene contenido o falla, escribe {} y el sitio usa su
// contenido local de respaldo — el build NUNCA se rompe por el CMS.
import { writeFileSync } from 'node:fs';

const PROJECT = 'tg1ohclj';
const DATASET = 'production';
const CDN = `https://${PROJECT}.apicdn.sanity.io/v1/data/query/${DATASET}?query=`;

const imgUrl = (ref, w, h) => {
	const m = /^image-(.+)-(\d+)x(\d+)-(\w+)$/.exec(ref);
	const path = m ? `${m[1]}.${m[4]}` : ref;
	return `https://cdn.sanity.io/images/${PROJECT}/${DATASET}/${path}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
};

const media = (img, alt, sizes) =>
	img?.asset?._ref
		? {
				kind: 'image',
				src: imgUrl(img.asset._ref, 480, 600),
				srcset: [360, 480, 640, 960]
						.map((w) => `${imgUrl(img.asset._ref, w, Math.round(w * 1.25))} ${w}w`)
						.join(', '),
				sizes,
				lqip: imgUrl(img.asset._ref, 40, 50),
				alt: alt || img.alt || ''
			}
		: null;

async function q(groq) {
	const res = await fetch(CDN + encodeURIComponent(groq));
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
	return (await res.json()).result;
}

let out = {};
try {
	const [cats, siteRaw, homeRaw, services, courses] = await Promise.all([
		q('*[_type=="category" && (defined(visible)==false || visible==true)] | order(orden asc){name,"slug":slug.current,tagline,headline,descripcion,cover{asset,alt},galeria,orden}'),
		q('*[_id=="siteConfig"][0]'),
		q('*[_id=="homeContent"][0]{kicker,titulo,subtitulo,editorialTitulo,editorialTexto,banner,retratoJJ,retratoAlt,videoHeroUrl}'),
		q('*[_type=="service"] | order(orden asc)'),
		q('*[_type=="course"] | order(orden asc)')
	]);

	if (cats?.length) {
		out.categories = cats.map((c) => ({
			slug: c.slug,
			name: c.name,
			tagline: c.tagline,
			headline: c.headline,
			description: c.descripcion,
			cover: media(c.cover, c.cover?.alt || c.name, '(max-width: 680px) 46vw, 300px'),
			gallery: (c.galeria ?? [])
				.map((g) => {
					if (g.tipo === 'video' && g.videoUrl) {
						return { kind: 'video', src: g.videoUrl, alt: g.alt || '', cliente: g.cliente, servicio: g.servicio, anio: g.anio };
					}
					return { ...media(g.imagen, g.alt || c.name, '(max-width: 980px) 100vw, 640px'), cliente: g.cliente, servicio: g.servicio, anio: g.anio };
				})
				.filter(Boolean)
		}));
	}

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
				homeSections: siteRaw.homeSections
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
		if (homeRaw.banner?.length) {
			home.banner = homeRaw.banner
				.map((b) => media(b, b.alt, '(max-width: 680px) 42vw, 300px'))
				.filter(Boolean);
		}
		if (homeRaw.retratoJJ) home.closingFoto = media(homeRaw.retratoJJ, homeRaw.retratoAlt, '(max-width: 680px) 92vw, 560px');
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
	console.warn('[fetch-content] Sanity sin contenido o con error; uso respaldo local:', String(e).slice(0, 200));
}

writeFileSync(new URL('../src/lib/content/generated.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('[fetch-content] generated.json:', Object.keys(out).join(', ') || '(vacío → contenido local)');
