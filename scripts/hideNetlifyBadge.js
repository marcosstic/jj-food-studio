/**
 * Remove Netlify badge from DOM (free tier)
 * This runs after page load to catch dynamically injected badges
 */
export const hideNetlifyBadge = () => {
  // Function to remove badges
  const removeBadges = () => {
    // Selectors for Netlify badge
    const selectors = [
      '.netlify-badge',
      '[data-netlify-badge]',
      '#netlify-badge',
      'a[href*="netlify.com"][target="_blank"][rel*="noopener"]',
      'a[href*="netlify.com"][target="_blank"]',
      'a[href*="netlify"]'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Check if it's likely a Netlify badge
        const text = el.textContent?.toLowerCase() || '';
        const href = el.getAttribute('href') || '';
        
        if (text.includes('netlify') || href.includes('netlify')) {
          el.remove();
        }
      });
    });

    // Also check for any fixed/absolute positioned elements that might be badges
    const allLinks = document.querySelectorAll('a[href*="netlify"]');
    allLinks.forEach(link => {
      const style = window.getComputedStyle(link);
      if (style.position === 'fixed' || style.position === 'absolute') {
        link.remove();
      }
    });
  };

  // Run immediately
  removeBadges();

  // Run again after a delay to catch dynamically injected badges
  setTimeout(removeBadges, 100);
  setTimeout(removeBadges, 500);
  setTimeout(removeBadges, 1000);

  // Also run on DOM mutations (in case badge is injected later)
  const observer = new MutationObserver(() => {
    removeBadges();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
