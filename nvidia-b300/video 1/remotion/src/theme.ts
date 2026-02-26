export const theme = {
  colors: {
    accent: '#76b900',       // NVIDIA green
    accent2: '#0080ff',      // DigitalOcean blue
    bgDark: '#0d1117',
    bgCard: 'rgba(255, 255, 255, 0.03)',
    text: '#e6edf3',
    textMuted: '#8b949e',
    red: '#f85149',
    amber: '#d29922',
    white: '#ffffff',
    border: '#333333',
  },
  fonts: {
    heading: "'Segoe UI', system-ui, -apple-system, sans-serif",
    body: "'Segoe UI', system-ui, -apple-system, sans-serif",
    mono: "'Courier New', monospace",
  },
  fps: 30,
  width: 1920,
  height: 1080,
} as const;

// Scene durations in seconds (matched to voiceover audio + 2s padding)
export const sceneDurations = {
  scene1_hook: 56,
  scene2_whyB300: 89,
  scene3_numbers: 94,
  scene4_dualReticle: 65,
  scene5_tensorCores: 172,
  scene6_memory: 68,
  scene7_multiGpu: 94,
  scene8_performance: 83,
} as const;

// Convert seconds to frames
export const sceneFrames = Object.fromEntries(
  Object.entries(sceneDurations).map(([key, seconds]) => [key, seconds * theme.fps])
) as Record<keyof typeof sceneDurations, number>;

export const totalDuration = Object.values(sceneDurations).reduce((a, b) => a + b, 0);
export const totalFrames = totalDuration * theme.fps;
