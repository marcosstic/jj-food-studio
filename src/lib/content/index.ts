/**
 * Barrel de la capa de contenido: el único módulo que las rutas
 * deben importar para obtener datos (ADR-0006).
 *
 * Fase 3: si Sanity tiene contenido publicado (generated.json, generado en el
 * prebuild), se usa; si no, se sirve el contenido local de respaldo.
 * Ningún componente conoce el origen.
 */
import generatedJson from './generated.json';
import {
	home as localHome,
	homeSections as localHomeSections
} from './home';
import { categories as localCategories } from './categories';
import { courses as localCourses } from './courses';
import {
	servicesSummary as localServicesSummary,
	servicesDetailed as localServicesDetailed
} from './services';

export { site, waLink, ogImage } from './site';
export { methodSteps } from './metodologia';

import type {
	Category,
	Course,
	HomeSectionId,
	MediaView,
	ServiceDetail,
	ServiceSummary
} from './types';

export type {
	Category,
	Course,
	HomeSectionId,
	MediaView,
	MethodStep,
	ServiceDetail,
	ServiceSummary,
	SiteConfig
} from './types';

/* ===== Contenido generado por Sanity en el prebuild ===== */
const g = generatedJson as {
	categories?: Category[];
	site?: Partial<SiteConfig> & { homeSections?: HomeSectionId[] };
	home?: {
		hero?: Partial<typeof localHome.hero>;
		editorial?: Partial<typeof localHome.editorial>;
		banner?: MediaView[];
		closingFoto?: MediaView;
		videoHeroUrl?: string;
	};
	services?: { title: string; description: string; lead?: string; detalle?: string }[];
	courses?: { title: string; description: string; cta?: string }[];
};

/* ===== Categorías (creables por JJ) ===== */
export const categories: Category[] = g.categories?.length ? g.categories : localCategories;

/** Busca una categoría por slug (ruta /portafolio/[categoria]). */
export const findCategory = (slug: string): Category | undefined =>
	categories.find((c) => c.slug === slug);

/* ===== Home (textos, banner, cierre, reel) ===== */
export const home = {
	hero: { ...localHome.hero, ...(g.home?.hero ?? {}) },
	editorial: { ...localHome.editorial, ...(g.home?.editorial ?? {}) },
	reel: localHome.reel,
	closing: {
		foto: g.home?.closingFoto ?? (localHome.closing.foto as MediaView)
	},
	banner: (g.home?.banner?.length ? g.home.banner : localHome.banner) as MediaView[]
};

export const homeSections: HomeSectionId[] = (
	g.site?.homeSections?.length ? g.site.homeSections : localHomeSections
) as HomeSectionId[];

/* ===== Servicios ===== */
export const servicesSummary: ServiceSummary[] = g.services?.length
	? g.services.map((s) => ({ title: s.title, description: s.description }))
	: localServicesSummary;

export const servicesDetailed: ServiceDetail[] = g.services?.length
	? g.services.map((s) => ({
			title: s.title,
			lead: s.lead ?? '',
			description: s.detalle ?? s.description,
			cta: 'Agendar sesión'
		}))
	: localServicesDetailed;

export { whyChoose } from './services';

/* ===== Cursos ===== */
export const courses: Course[] = g.courses?.length
	? g.courses.map((c) => ({ title: c.title, description: c.description, cta: c.cta ?? 'Ver curso', href: '#formacion' }))
	: localCourses;
