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
// Durations based on voiceover lengths + padding for visual breathing room
// Total: ~5:40
export const sceneDurations = {
  scene0Hook: 640,              // 0:00 - 0:21 (21.3s — VO ends at 626, minimal pad)
  scene1Problem: 3742,          // VO ends at 3727, minimal pad
  scene3KVRouting: 3052,        // VO: 2403 + 649 (A/B comparison moved from Scene4)
  scene4Benchmarks: 2094,       // VO: P1(1429) + P2(653) + 12 pad — graphs only, A/B moved to Scene3
  scene6Closing: 450,           // 5:31 - 5:46 (15s — VO: 12.1s + 3s pad)
};

export const totalDuration = Object.values(sceneDurations).reduce((a, b) => a + b, 0);

// Voiceover paragraph durations in frames (at 30fps)
// Used by scenes to sync animations to each paragraph of narration
export const voDurations = {
  scene0Hook: { p1: 626 },  // 20.86s
  scene1Problem: {
    p1: 586,   // 19.52s — Workato intro
    p2: 422,   // 14.07s — wasted capacity
    p3: 805,   // 26.83s — prefill vs decode
    p4: 1271,  // 42.36s — redundancy problem
    p5: 643,   // 21.43s — 10 GPUs question
  },
  scene3KVRouting: {
    p1: 636,   // 21.22s — DO + H200 infra
    p2: 899,   // 29.95s — Dynamo routing
    p3: 649,   // 21.63s — A/B comparison (moved from Scene4)
    p4: 507,   // 16.89s — cost function
    p5: 361,   // 12.03s — result
  },
  scene4Benchmarks: {
    p1: 1429,  // 47.64s — benchmark results (was P2)
    p2: 653,   // 21.75s — practical impact (new recording)
  },
  scene6Closing: { p1: 364 },  // 12.14s
};
