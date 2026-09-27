/**
 * Add fade-in effect to images when they load
 * This provides a smooth loading experience for images
 */
export const initImageFadeIn = () => {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    // Add loaded class when image loads
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }

    // Handle error case
    img.addEventListener('error', () => {
      img.classList.add('loaded');
    });
  });
};
