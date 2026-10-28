import type { ServiceDetail, ServiceSummary } from './types';

/** Servicios resumidos (sección del home). */
export const servicesSummary: ServiceSummary[] = [
	{
		title: 'Fotografía gastronómica',
		description: 'Imágenes profesionales para restaurantes, marcas y productos.'
	},
	{
		title: 'Video gastronómico',
		description: 'Contenido audiovisual para redes, campañas y branding.'
	},
	{
		title: 'Dirección de arte',
		description: 'Concepto visual, composición y estilo para cada proyecto.'
	},
	{
		title: 'Food styling',
		description: 'Preparación y estilismo de alimentos para foto y video.'
	},
	{
		title: 'Asesorías',
		description: 'Consultoría visual para mejorar la imagen de tu marca.'
	}
];

/** Servicios detallados (página /servicios). */
export const servicesDetailed: ServiceDetail[] = [
	{
		title: 'Fotografía gastronómica',
		lead: 'Imágenes profesionales para restaurantes, marcas y productos.',
		description:
			'Fotografía de platos, menús completos, productos en packaging, hero shots para campañas publicitarias. Cada imagen está diseñada para activar antojo y comunicar calidad premium.',
		cta: 'Agendar sesión'
	},
	{
		title: 'Video gastronómico',
		lead: 'Contenido audiovisual para redes, campañas y branding.',
		description:
			'Videos de platos en movimiento, process shots, contenido para Instagram Reels, TikTok, YouTube Shorts. Producción completa desde concepto hasta edición final con ritmo y precisión técnica.',
		cta: 'Agendar sesión'
	},
	{
		title: 'Dirección de arte gastronómica',
		lead: 'Concepto visual, composición y estilo para cada proyecto.',
		description:
			'Desarrollo de identidad visual para marcas gastronómicas. Selección de props, paleta de colores, composición de escenas, moodboards y guías de estilo para consistencia en toda la comunicación visual.',
		cta: 'Agendar sesión'
	},
	{
		title: 'Food styling',
		lead: 'Preparación y estilismo de alimentos para fotografía y video.',
		description:
			'Manipulación profesional de alimentos para que se vean irresistibles. Control de texturas, brillos, vapor, frescura. Técnicas avanzadas para que la comida se vea deliciosa sin perder autenticidad.',
		cta: 'Agendar sesión'
	},
	{
		title: 'Asesorías',
		lead: 'Consultoría visual para mejorar la imagen de tu marca gastronómica.',
		description:
			'Auditoría de imagen actual, recomendaciones de mejoras, entrenamiento de equipo interno, desarrollo de guías de contenido para redes, estrategia visual a largo plazo para restaurantes y marcas.',
		cta: 'Agendar asesoría'
	}
];

/** Bloque "¿Por qué elegir JJ Food Studio?" (página /servicios). */
export const whyChoose: ServiceSummary[] = [
	{
		title: '+8 años de experiencia',
		description: 'Especialización exclusiva en fotografía y video gastronómico.'
	},
	{
		title: 'Conocimiento culinario',
		description: 'Entiendo la comida, no solo la fotografía. Esto se refleja en el resultado.'
	},
	{
		title: 'Dark & moody aesthetic',
		description: 'Estilo distintivo que marca diferencia en un mercado saturado.'
	},
	{
		title: 'Precisión técnica',
		description: 'Iluminación controlada, composición intencional, retoque limpio.'
	},
	{
		title: 'Foto + Video simultáneo',
		description: 'Maximizamos tu inversión capturando ambos formatos en una sesión.'
	}
];
