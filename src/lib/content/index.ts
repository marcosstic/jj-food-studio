/**
 * Barrel de la capa de contenido: el único módulo que las rutas
 * deben importar para obtener datos (ADR-0006).
 */
export { site, waLink, ogImage } from './site';
export { categories, findCategory } from './categories';
export { home, homeSections } from './home';
export type { HomeSectionId } from './home';
export { servicesSummary, servicesDetailed, whyChoose } from './services';
export { courses } from './courses';
export { methodSteps } from './metodologia';
export type {
	Category,
	CaseMedia,
	CaseStudy,
	CloudinaryAsset,
	Course,
	CtaStyle,
	LogoMode,
	MethodStep,
	ServiceDetail,
	ServiceSummary,
	SiteConfig
} from './types';
