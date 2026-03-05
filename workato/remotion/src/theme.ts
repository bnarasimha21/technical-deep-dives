// Workato x DigitalOcean Co-branded Theme

export const colors = {
  // DigitalOcean
  doBlue: '#0069FF',
  doDeepBlue: '#0050CC',
  doDarkBlue: '#003A99',

  // Workato
  workatoPurple: '#6B2FAD',
  workatoMagenta: '#9B3FBF',
  workatoLight: '#B96FD9',

  // Gradients (CSS)
  gradientPrimary: 'linear-gradient(135deg, #0069FF 0%, #6B2FAD 100%)',
  gradientDark: 'linear-gradient(135deg, #0A1628 0%, #1A0A2E 100%)',
  gradientAccent: 'linear-gradient(135deg, #0069FF 0%, #9B3FBF 50%, #6B2FAD 100%)',
  gradientSubtle: 'linear-gradient(180deg, #0D1B2A 0%, #131335 100%)',

  // Neutrals
  bgDark: '#0A1628',
  bgCard: 'rgba(255, 255, 255, 0.06)',
  bgCardHover: 'rgba(255, 255, 255, 0.10)',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.4)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',

  // Accents
  green: '#36B37E',
  red: '#FF5630',
  amber: '#FFAB00',
  cyan: '#00B8D9',
};

export const fonts = {
  heading: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Fira Code, monospace',
};

export const layout = {
  width: 1920,
  height: 1080,
  padding: 80,
  fps: 30,
};

// Scene durations in frames (at 30fps)
// Total: ~5:30 = 9900 frames
export const sceneDurations = {
  scene0Intro: 180,          // 0:00 - 0:06 (6s)
  scene2WhoIsWorkato: 1050,  // 0:06 - 0:41 (35s)
  scene3Problem: 1650,       // 0:55 - 1:50 (55s)
  scene4Solution: 2400,      // 1:50 - 3:10 (80s)
  scene5Results: 2250,       // 3:10 - 4:25 (75s)
  scene6BiggerPicture: 1200, // 4:25 - 5:05 (40s)
  scene7Closing: 750,        // 5:05 - 5:30 (25s)
};

export const totalDuration = Object.values(sceneDurations).reduce((a, b) => a + b, 0);
