// Seed de contenido inicial en Sanity (Fase 3).
// USO: 1) pide un token read/write en manage.sanity.io → API → Tokens
//      2) agrégalo a .env.local como SANITY_WRITE_TOKEN=...
//      3) ejecuta: node scripts/seed-sanity.mjs
// Crea: siteConfig, homeContent, 3 categorías con galería, 5 servicios, 7 cursos.
// Las imágenes se suben a Sanity desde sus URLs actuales de Cloudinary.
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;
const PROJECT = 'tg1ohclj';
const DATASET = 'production';
if (!TOKEN) {
	console.error('✗ Falta SANITY_WRITE_TOKEN en .env.local (manage.sanity.io → API → Tokens → Add token, permisos Editor)');
	process.exit(1);
}

const API = `https://${PROJECT}.apicdn.sanity.io`;
const B = 'https://res.cloudinary.com/sfhco0ar';

async function uploadImage(url) {
	const res = await fetch(`${API}/v1/assets/images/${DATASET}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${TOKEN}` },
		body: await (await fetch(url)).blob()
	});
	const json = await res.json();
	if (!res.ok) throw new Error(`upload ${url}: ${JSON.stringify(json).slice(0, 150)}`);
	return { _type: 'image', asset: { _type: 'reference', _ref: json._id } };
}

async function mutate(docs) {
	const res = await fetch(`${API}/v1/data/mutate/${DATASET}?returnIds=true`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ mutations: docs.map((d) => ({ createOrReplace: d })) })
	});
	const json = await res.json();
	if (!res.ok) throw new Error(`mutate: ${JSON.stringify(json).slice(0, 200)}`);
	return json;
}

const log = [];

// ===== Imágenes de galería (subir primero para referenciarlas) =====
const imgs = {};
for (const [k, url] of Object.entries({
	img9222: `${B}/image/upload/v1790531095/IMG_9222.jpg`,
	img4755: `${B}/image/upload/v1790531438/IMG_4755-Edit.jpg`,
	img9651: `${B}/image/upload/v1790531313/IMG_9651.jpg`,
	img3370: `${B}/image/upload/v1790533207/IMG_3370.jpg`,
	mg9520: `${B}/image/upload/v1790532915/_MG_9520.jpg`,
	mg7698: `${B}/image/upload/v1790546207/_MG_7698.jpg`,
	retrato: `${B}/image/upload/retratos/jj-placeholder.jpg`
})) {
	try {
		imgs[k] = await uploadImage(url);
		log.push(`✓ imagen ${k}`);
	} catch (e) {
		log.push(`✗ imagen ${k}: ${e.message.slice(0, 80)}`);
	}
}

const cat = (slug, nombre, tagline, headline, descripcion, coverKey, galeriaKeys, orden) => ({
	_id: `category-${slug}`,
	_type: 'category',
	nombre,
	slug: { _type: 'slug', current: slug },
	tagline,
	headline,
	descripcion,
	cover: imgs[coverKey],
	galeria: galeriaKeys.map((k) => ({
		_type: 'mediaItem', tipo: 'foto', imagen: imgs[k], alt: `${nombre} — JJ Food Studio`
	})),
	orden,
	visible: true
});

const docs = [
	{
		_id: 'siteConfig',
		_type: 'siteConfig',
		whatsappPhone: '',
		whatsappMessage: 'Hola JJ, vi tu web y quiero una sesión de fotografía/video gastronómico.',
		instagramUrl: 'https://instagram.com/',
		instagramHandle: '@jjfoodstudio',
		email: 'contacto@jjfoodstudio.com',
		logoDefault: 'css',
		homeSections: ['banner', 'hero', 'editorial', 'portfolio', 'whatWeDo', 'services', 'formation', 'about', 'closing']
	},
	{
		_id: 'homeContent',
		_type: 'homeContent',
		kicker: 'Fotografía y video gastronómico · Estilismo de alimentos · Dirección de arte',
		titulo: 'Imágenes que hacen que la comida se venda.',
		subtitulo: 'Enfocado en restaurantes, pastelerías, marcas de alimentos y personales',
		editorialTitulo: 'No se trata solo de fotografiar comida',
		editorialTexto: 'Se trata de construir imágenes que hagan que una persona quiera probarla y trasmitir experiencias',
		retratoJJ: imgs.retrato,
		retratoAlt: 'JJ, fotógrafo gastronómico (foto de prueba — pendiente foto real de JJ)'
	},
	cat('restaurantes', 'Restaurantes', 'Imagen, composición y antojo', 'Fotografía que abre el apetito.',
		'Construimos imágenes que transmiten la esencia de tu restaurante: sus platos, su ambiente y la experiencia detrás de cada servicio.',
		'img9222', ['img9222', 'img4755', 'img9651'], 1),
	cat('marcas-personales', 'Marcas personales', 'El talento detrás de cada plato', 'La imagen detrás del talento.',
		'Retratos y contenido gastronómico para chefs, cocineros, pasteleros y profesionales que quieren construir una identidad visual propia.',
		'img3370', ['img3370', 'img9651', 'img9222'], 2),
	cat('pastelerias', 'Pastelerías', 'Texturas, detalle y dulzura', 'El detalle también se saborea.',
		'Imágenes que resaltan texturas, formas, color y detalle para convertir cada creación en una experiencia visual.',
		'mg9520', ['mg9520', 'mg7698', 'img3370'], 3),
	...[
		['service-1', 'Fotografía gastronómica', 'Imágenes profesionales para restaurantes, marcas y productos.', 'Fotografía de platos, menús completos, productos en packaging, hero shots para campañas publicitarias. Cada imagen está diseñada para activar antojo y comunicar calidad premium.', 'Agendar sesión'],
		['service-2', 'Video gastronómico', 'Contenido audiovisual para redes, campañas y branding.', 'Videos de platos en movimiento, process shots, contenido para Instagram Reels, TikTok, YouTube Shorts. Producción completa desde concepto hasta edición final con ritmo y precisión técnica.', 'Agendar sesión'],
		['service-3', 'Dirección de arte gastronómica', 'Concepto visual, composición y estilo para cada proyecto.', 'Desarrollo de identidad visual para marcas gastronómicas. Selección de props, paleta de colores, composición de escenas, moodboards y guías de estilo.', 'Agendar sesión'],
		['service-4', 'Food styling', 'Preparación y estilismo de alimentos para fotografía y video.', 'Manipulación profesional de alimentos para que se vean irresistibles. Control de texturas, brillos, vapor, frescura.', 'Agendar sesión'],
		['service-5', 'Asesorías', 'Consultoría visual para mejorar la imagen de tu marca gastronómica.', 'Auditoría de imagen actual, recomendaciones de mejoras, entrenamiento de equipo interno, guías de contenido para redes, estrategia visual a largo plazo.', 'Agendar asesoría']
	].map(([id, title, description, detalle, cta], i) => ({
		_id: id, _type: 'service', title, description, detalle, cta, orden: i + 1
	})),
	...[
		['course-1', 'Curso de fotografía integral', 'De la técnica a la construcción de imagen profesional.'],
		['course-2', 'Curso de fotografía gastronómica', 'Iluminación, composición y estilismo aplicado.'],
		['course-3', 'Curso de food styling', 'Técnicas para preparar y controlar alimentos.'],
		['course-4', 'Curso de revelado y edición', 'Aprende a revelar y editar fotografías para lograr imágenes más limpias, atractivas y profesionales.'],
		['course-5', 'Taller de iluminación básica', 'Fundamentos de iluminación para comenzar a fotografiar alimentos con resultados profesionales.'],
		['course-6', 'Taller de iluminación avanzada', 'Técnicas avanzadas de iluminación para crear escenas gastronómicas más complejas y controladas.'],
		['course-7', 'Curso de composición aplicada', 'Aprende a construir imágenes gastronómicas equilibradas, atractivas y con intención visual.']
	].map(([id, title, description], i) => ({
		_id: id, _type: 'course', title, description, cta: title.includes('Taller') ? 'Ver taller' : 'Ver curso', orden: i + 1
	}))
];

try {
	await mutate(docs);
	log.push(`✓ ${docs.length} documentos creados/actualizados en Sanity`);
} catch (e) {
	log.push(`✗ mutate: ${e.message.slice(0, 200)}`);
}
console.log(log.join('\n'));
