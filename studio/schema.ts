/**
 * Esquemas de Sanity — Fase 3 (títulos en español para JJ).
 * Cada categoría es creable sin límite; el resto es contenido editable.
 */
import { bannerHomeSchema } from './banner-schema';

export const schemaTypes = [
	bannerHomeSchema,
	/* ===== Categoría del portafolio (creable por JJ) ===== */
	{
		name: 'category',
		title: 'Categoría del portafolio',
		type: 'document',
		fields: [
			{ name: 'nombre', title: 'Nombre', type: 'string', description: 'Ej: Restaurantes, Bebidas, Marcas de café', validation: (R: any) => R.required().max(40) },
			{ name: 'slug', title: 'URL (se genera sola)', type: 'slug', options: { source: 'nombre', maxLength: 96 }, validation: (R: any) => R.required() },
			{ name: 'tagline', title: 'Frase corta (tarjeta)', type: 'string', description: 'Ej: Imagen, composición y antojo', validation: (R: any) => R.required().max(60) },
			{ name: 'headline', title: 'Titular de la página', type: 'string', description: 'Ej: Fotografía que abre el apetito.', validation: (R: any) => R.required().max(80) },
			{ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3, validation: (R: any) => R.required() },
			{
				name: 'cover', title: 'Portada (vertical 4:5)', type: 'image', options: { hotspot: true },
				fields: [{ name: 'alt', title: 'Descripción (alt)', type: 'string', validation: (R: any) => R.required() }],
				validation: (R: any) => R.required()
			},
			{ name: 'galeria', title: 'Galería (fotos y videos)', type: 'array', of: [{ type: 'mediaItem' }], validation: (R: any) => R.required().min(1) },
			{ name: 'orden', title: 'Orden (menor = primero)', type: 'number', initialValue: 10 },
			{ name: 'visible', title: 'Visible en el sitio', type: 'boolean', initialValue: true }
		],
		preview: {
			select: { title: 'nombre', subtitle: 'tagline', media: 'cover' }
		}
	},

	/* ===== Pieza de galería: foto o video con ficha técnica ===== */
	{
		name: 'mediaItem',
		title: 'Pieza (foto o video)',
		type: 'object',
		fields: [
			{
				name: 'tipo', title: 'Tipo de pieza', type: 'string',
				options: { list: [ { title: 'Foto', value: 'foto' }, { title: 'Video', value: 'video' } ] },
				initialValue: 'foto', validation: (R: any) => R.required()
			},
			{
				name: 'imagen', title: 'Foto (vertical 4:5 recomendada)', type: 'image', options: { hotspot: true },
				hidden: ({ parent }: any) => parent?.tipo !== 'foto',
				validation: (R: any) => R.custom((v: any, ctx: any) => (ctx.parent?.tipo === 'video' || v ? true : 'La foto es obligatoria'))
			},
			{
				name: 'videoUrl', title: 'URL del video (Cloudinary)', type: 'url',
				description: 'Sube el video a Cloudinary y pega aquí su enlace público',
				hidden: ({ parent }: any) => parent?.tipo !== 'video'
			},
			{ name: 'alt', title: 'Descripción de la imagen (alt) — obligatoria', type: 'string', description: 'Describe qué se ve: plato, ambiente, acción…', validation: (R: any) => R.required().max(160) },
			{ name: 'cliente', title: 'Cliente (opcional)', type: 'string', description: 'Se muestra en el lightbox: con quién trabajaste' },
			{ name: 'servicio', title: 'Servicio (opcional)', type: 'string', description: 'Ej: Video · Food styling' },
			{ name: 'anio', title: 'Año (opcional)', type: 'string' }
		],
		preview: {
			select: { title: 'alt', subtitle: 'cliente', media: 'imagen' }
		}
	},

	/* ===== Configuración global (singleton) ===== */
	{
		name: 'siteConfig',
		title: 'Configuración del sitio',
		type: 'document',
		__experimental_actions: ['update', 'publish'],
		fields: [
			{ name: 'whatsappPhone', title: 'WhatsApp — número (internacional sin +)', type: 'string', description: 'Ej: 584121234567' },
			{ name: 'whatsappMessage', title: 'WhatsApp — mensaje prellenado', type: 'string' },
			{ name: 'instagramUrl', title: 'URL de Instagram', type: 'url' },
			{ name: 'instagramHandle', title: 'Usuario de Instagram', type: 'string' },
			{ name: 'email', title: 'Email de contacto', type: 'string' },
			{ name: 'formspreeEndpoint', title: 'Endpoint de Formspree (formulario)', type: 'url' },
			{
				name: 'logoDefault', title: 'Versión del logo por defecto', type: 'string',
				options: { list: [ { title: 'CSS (estático premium)', value: 'css' }, { title: 'Glow (brillo)', value: 'glow' }, { title: '3D', value: 'three' }, { title: 'Cine', value: 'cinematic' } ] },
				initialValue: 'css'
			},
			{
				name: 'homeSections', title: 'Orden de secciones del home', type: 'array', of: [{ type: 'string' }],
				description: 'Arrastra para cambiar el orden. Opciones: banner, hero, editorial, portfolio, whatWeDo, services, formation, about, closing'
			}
		]
	},

	/* ===== Contenido del home (singleton) ===== */
	{
		name: 'homeContent',
		title: 'Textos y videos del home',
		type: 'document',
		__experimental_actions: ['update', 'publish'],
		groups: [
			{ name: 'textos', title: 'Textos', default: true },
			{ name: 'imagenes', title: 'Imágenes y videos' }
		],
		fields: [
			{ name: 'kicker', title: 'Etiqueta superior', type: 'string', group: 'textos' },
			{ name: 'titulo', title: 'Titular principal', type: 'string', group: 'textos' },
			{ name: 'subtitulo', title: 'Subtítulo', type: 'string', group: 'textos' },
			{ name: 'editorialTitulo', title: 'Editorial — título', type: 'string', group: 'textos' },
			{ name: 'editorialTexto', title: 'Editorial — texto', type: 'text', rows: 3, group: 'textos' },
			{
				name: 'retratoJJ', title: 'Retrato de JJ (cierre, vertical 3:4)', type: 'image',
				options: { hotspot: true }, group: 'imagenes'
			},
			{ name: 'retratoAlt', title: 'Descripción del retrato (alt)', type: 'string', group: 'imagenes' },
			{
				name: 'videoHeroUrl', title: 'Video del hero (URL Cloudinary, vertical 9:16)', type: 'url',
				description: 'Pendiente P-1: mix/backstage', group: 'imagenes'
			},
			{
				name: 'videoCierreUrl', title: 'Video del cierre (URL Cloudinary) — si vuelve a querer video',
				type: 'url', group: 'imagenes'
			}
		]
	},

	/* ===== Servicios ===== */
	{
		name: 'service',
		title: 'Servicio',
		type: 'document',
		fields: [
			{ name: 'title', title: 'Título', type: 'string', validation: (R: any) => R.required() },
			{ name: 'description', title: 'Descripción corta (tarjeta del home)', type: 'string', validation: (R: any) => R.required() },
			{ name: 'lead', title: 'Bajada (página de servicios)', type: 'string' },
			{ name: 'detalle', title: 'Descripción larga (página de servicios)', type: 'text' },
			{ name: 'orden', title: 'Orden', type: 'number', initialValue: 10 }
		],
		preview: { select: { title: 'title', subtitle: 'lead' } }
	},

	/* ===== Cursos ===== */
	{
		name: 'course',
		title: 'Curso o taller',
		type: 'document',
		fields: [
			{ name: 'title', title: 'Título', type: 'string', validation: (R: any) => R.required() },
			{ name: 'description', title: 'Descripción', type: 'text', validation: (R: any) => R.required() },
			{ name: 'cta', title: 'Texto del enlace', type: 'string', initialValue: 'Ver curso' },
			{ name: 'orden', title: 'Orden', type: 'number', initialValue: 10 }
		],
		preview: { select: { title: 'title', subtitle: 'description' } }
	}
];
