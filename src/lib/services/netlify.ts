/**
 * Elimina el badge de Netlify del DOM (plan gratuito).
 * Corre tras la carga para cazar badges inyectados dinámicamente.
 */

const BADGE_SELECTORS = [
	'.netlify-badge',
	'[data-netlify-badge]',
	'#netlify-badge',
	'a[href*="netlify.com"][target="_blank"][rel*="noopener"]',
	'a[href*="netlify.com"][target="_blank"]',
	'a[href*="netlify"]'
];

export const hideNetlifyBadge = (): void => {
	const removeBadges = () => {
		BADGE_SELECTORS.forEach((selector) => {
			document.querySelectorAll(selector).forEach((el) => {
				const text = el.textContent?.toLowerCase() || '';
				const href = el.getAttribute('href') || '';
				if (text.includes('netlify') || href.includes('netlify')) {
					el.remove();
				}
			});
		});

		document.querySelectorAll('a[href*="netlify"]').forEach((link) => {
			const style = window.getComputedStyle(link);
			if (style.position === 'fixed' || style.position === 'absolute') {
				link.remove();
			}
		});
	};

	removeBadges();
	setTimeout(removeBadges, 100);
	setTimeout(removeBadges, 500);
	setTimeout(removeBadges, 1000);

	new MutationObserver(removeBadges).observe(document.body, {
		childList: true,
		subtree: true
	});
};
