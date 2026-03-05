import { continueRender, delayRender } from 'remotion';

const GOOGLE_FONTS_CSS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
];

let loaded = false;

async function doLoadFonts() {
  // Load CSS stylesheets
  const linkPromises = GOOGLE_FONTS_CSS.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(link);
    });
  });

  await Promise.all(linkPromises);

  // Wait for all font faces to finish loading
  await document.fonts.ready;
}

export const ensureFontsLoaded = () => {
  if (loaded) return;
  loaded = true;

  const handle = delayRender('Loading Google Fonts');

  doLoadFonts()
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error('Font loading failed:', err);
      continueRender(handle);
    });
};
