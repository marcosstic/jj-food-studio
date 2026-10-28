import { writable } from 'svelte/store';
import type { CtaStyle, LogoMode } from '$lib/content/types';
import { site } from '$lib/content';

/**
 * Estado compartido del panel demo (port de demoControls.js).
 * Persistencia en localStorage + activación vía ?demo=1.
 * En producción el panel permanece oculto: es herramienta de desarrollo.
 */

const DEMO_KEY = 'jj_demo_mode';
const LOGO_KEY = 'jj_logo_mode';
const CTA_KEY = 'jj_cta_style';

export const demoOn = writable(false);
// Por defecto toma el modo configurado en el sitio (AJ-12: default editable en Fase 3)
export const logoMode = writable<LogoMode>(site.logoDefault);
export const ctaStyle = writable<CtaStyle>('outline');

export const normalizeLogoMode = (mode: string): LogoMode =>
	mode === 'three' || mode === 'cinematic' || mode === 'glow' ? (mode as LogoMode) : 'css';

export const normalizeCtaStyle = (style: string): CtaStyle => (style === 'solid' ? 'solid' : 'outline');

const getParam = (name: string): string | null => {
	if (typeof window === 'undefined') return null;
	return new URL(window.location.href).searchParams.get(name);
};

/**
 * Inicializa el estado desde la URL y localStorage (solo cliente).
 * Devuelve true si el demo estaba activo al cargar (habilita el atajo "D").
 */
export const initDemoState = (): boolean => {
	if (typeof window === 'undefined') return false;

	const enabled = getParam('demo') === '1' || localStorage.getItem(DEMO_KEY) === '1';
	demoOn.set(enabled);

	const storedLogo = localStorage.getItem(LOGO_KEY);
	if (storedLogo) logoMode.set(normalizeLogoMode(storedLogo));

	const storedCta = localStorage.getItem(CTA_KEY);
	if (storedCta) ctaStyle.set(normalizeCtaStyle(storedCta));

	return enabled;
};

export const setDemoOn = (enabled: boolean): void => {
	if (typeof window === 'undefined') return;
	demoOn.set(enabled);
	localStorage.setItem(DEMO_KEY, enabled ? '1' : '0');
};

export const toggleDemo = (): void => {
	let current = false;
	const unsubscribe = demoOn.subscribe((v) => (current = v));
	unsubscribe();
	setDemoOn(!current);
};

export const persistLogoMode = (mode: LogoMode): void => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(LOGO_KEY, mode);
};

export const persistCtaStyle = (style: CtaStyle): void => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(CTA_KEY, style);
};
