import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO paragraph frame offsets (at 30fps):
// P1: 0-586 (19.52s) — Workato intro: enterprise orchestration, 1T tasks, agentic AI
// P2: 586-1008 (14.07s) — "Powering agents at this scale... wasted capacity means wasted money"
// P3: 1008-1813 (26.83s) — Prefill vs Decode explanation
// P4: 1813-3084 (42.36s) — Agentic redundancy: long prompts, 100K tokens, O(n²), repeated KV
// P5: 3084-3727 (21.43s) — "Wastes GPU capacity... 10 GPUs... smarter infrastructure?"

// Phase 1: Who is Workato (0-1008, covers P1+P2)
const workatoFacts = [
  { label: 'Enterprise Orchestration', desc: 'Connects and orchestrates data, processes, and applications', color: colors.workatoPurple, delay: 60 },
  { label: '1 Trillion Tasks / Year', desc: 'Production automation running across entire organizations', color: colors.amber, delay: 280 },
  { label: 'AI Research Lab', desc: 'Pushing into agentic AI, building agents that execute work', color: colors.cyan, delay: 430 },
];

// Phase 2: Prefill vs Decode (1008-1813, covers P3)
const inferencePhases = [
  {
    title: 'Prefill',
    desc: 'Reads your entire input prompt and builds internal memory called KV Cache.',
    detail: 'Compute-heavy — scales quadratically with prompt length',
    color: colors.amber,
    delay: 1210,
  },
  {
    title: 'Decode',
    desc: 'Generates tokens one at a time using the cached KV values.',
    detail: 'Memory-bound — limited by bandwidth, not compute',
    color: colors.cyan,
    delay: 1600,
  },
];

// Phase 3a: Agentic workload patterns (1813-3084, covers P4)
const agenticPatterns = [
  { label: 'Long System Prompts', desc: 'Tool definitions and instruction sets, repeated every request', color: colors.amber, delay: 2020 },
  { label: 'Multi-Turn History', desc: 'Conversation history runs to 100K+ tokens at Workato AI Lab', color: colors.cyan, delay: 2150 },
  { label: 'Shared Prefixes', desc: 'System prompts and shared context are identical across requests, yet recomputed from scratch', color: colors.red, delay: 2600 },
];


export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Phase transitions — timed to VO paragraphs
  // Phase 1: Who is Workato (P1+P2: 0-1008)
  const phase1Opacity = interpolate(frame, [0, 20, 930, 1010], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 2: Prefill vs Decode (P3: 1008-1813)
  const phase2Opacity = interpolate(frame, [1008, 1060, 1740, 1815], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 3a: Agentic patterns + O(n²) (P4: 1813-3084)
  const phase3aOpacity = interpolate(frame, [1813, 1870, 3010, 3090], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 3b: GPU redundancy bars (P5: 3084-3727)
  const phase3bOpacity = interpolate(frame, [3084, 3140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Section label text
  const sectionLabel = frame < 1008 ? 'The Customer' : frame < 1813 ? 'How It Works' : 'The Problem';
  const sectionColor = frame < 1008 ? colors.workatoPurple : frame < 1813 ? colors.cyan : colors.red;

  return (
    <GradientBackground variant="problem">
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ width: lineWidth, height: 3, background: sectionColor, borderRadius: 2, boxShadow: `0 0 12px ${sectionColor}40`, transition: 'background 0.5s' }} />
          <span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 600, color: sectionColor, letterSpacing: 4, textTransform: 'uppercase', transition: 'color 0.5s' }}>
            {sectionLabel}
          </span>
        </div>
      </FadeIn>

      {/* Title — changes per phase */}
      <div style={{ position: 'relative', marginBottom: 20, minHeight: 90 }}>
        {/* Phase 1 title */}
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [0, 30, 930, 1010], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            Meet <span style={{ color: colors.workatoPurple }}>Workato AI Research Lab</span>
          </h1>
        </div>
        {/* Phase 2 title */}
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [1008, 1060, 1740, 1815], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            How LLMs <span style={{ color: colors.cyan }}>Process Requests</span>
          </h1>
        </div>
        {/* Phase 3a title */}
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [1813, 1870, 3010, 3090], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            The Redundancy Problem in<br /><span style={{ color: colors.red }}>Agentic Workloads</span>
          </h1>
        </div>
        {/* Phase 3b title */}
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [3084, 3140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            Wasted Compute<br /><span style={{ color: colors.red }}>Across the Cluster</span>
          </h1>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>

        {/* ======= PHASE 1: Who is Workato (P1+P2) ======= */}
        <div style={{ opacity: phase1Opacity, position: 'absolute', inset: 0, display: 'flex', gap: 32, alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {workatoFacts.map((item, i) => {
              const itemSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
              return (
                <div key={i} style={{
                  opacity: itemSpring,
                  transform: `translateX(${(1 - itemSpring) * 40}px)`,
                  background: colors.bgCard,
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}20`,
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: '4px 20px 20px 4px',
                  padding: '22px 28px',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 26, color: colors.white }}>{item.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 21, color: colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right side — Challenge card (appears during P2 ~586+) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
            <FadeIn delay={586} duration={25}>
              <div style={{ background: colors.bgCard, backdropFilter: 'blur(16px)', borderRadius: 20, padding: '32px 36px', border: `1px solid ${colors.borderSubtle}` }}>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 28, color: colors.workatoPurple, marginBottom: 12 }}>
                  The Challenge
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55 }}>
                  Powering agents at this scale requires significant inference capacity. If you're not smart about how you set it up, much of that capacity goes to waste.
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={870} duration={22}>
              <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55, paddingLeft: 16, borderLeft: `2px solid ${colors.workatoPurple}40` }}>
                <strong style={{ color: colors.white, fontWeight: 600 }}>Wasted capacity means wasted money.</strong>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ======= PHASE 2: Prefill vs Decode (P3) ======= */}
        <div style={{ opacity: phase2Opacity, position: 'absolute', inset: 0, display: 'flex', gap: 48, alignItems: 'center' }}>
          {inferencePhases.map((phase, i) => {
            const phaseSpring = spring({ frame: frame - phase.delay, fps, config: { damping: 12, stiffness: 70 } });
            return (
              <div key={i} style={{
                flex: 1,
                opacity: phaseSpring,
                transform: `translateY(${(1 - phaseSpring) * 30}px)`,
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                borderRadius: 24,
                padding: '40px 36px',
                border: `1px solid ${phase.color}25`,
                borderTop: `4px solid ${phase.color}`,
                display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 600, color: phase.color, letterSpacing: 3, textTransform: 'uppercase' }}>
                  Phase {i + 1}
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 46, color: colors.white, letterSpacing: -1 }}>
                  {phase.title}
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55 }}>
                  {phase.desc}
                </div>
                <div style={{
                  background: `${phase.color}12`,
                  borderLeft: `3px solid ${phase.color}`,
                  borderRadius: '0 12px 12px 0',
                  padding: '14px 20px',
                  marginTop: 8,
                }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 600, color: phase.color, lineHeight: 1.4 }}>
                    {phase.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======= PHASE 3a: Agentic patterns + O(n²) (P4) ======= */}
        <div style={{ opacity: phase3aOpacity, position: 'absolute', inset: 0, display: 'flex', gap: 48, alignItems: 'stretch' }}>
          {/* Left: pattern cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
            {agenticPatterns.map((item, i) => {
              const itemSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
              return (
                <div key={i} style={{
                  opacity: itemSpring,
                  transform: `translateX(${(1 - itemSpring) * 40}px)`,
                  background: colors.bgCard, backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}20`, borderLeft: `4px solid ${item.color}`,
                  borderRadius: '4px 20px 20px 4px', padding: '24px 28px',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 26, color: colors.white }}>{item.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 21, color: colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right: O(n²) callout */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
            <FadeIn delay={2350} duration={25}>
              <div style={{ background: colors.bgCard, backdropFilter: 'blur(16px)', borderRadius: 20, padding: '32px 36px', border: `1px solid ${colors.borderSubtle}` }}>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.5 }}>
                  Prompts run to
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 56, color: colors.amber, marginTop: 10, letterSpacing: -1 }}>
                  100,000 tokens
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, marginTop: 6 }}>
                  at Workato AI Lab
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={2500} duration={22}>
              <div style={{ background: colors.bgCard, backdropFilter: 'blur(16px)', borderRadius: 20, padding: '28px 32px', border: `1px solid ${colors.borderSubtle}` }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 23, fontWeight: 600, color: colors.red, marginBottom: 10, letterSpacing: 1 }}>
                  O(n²) Quadratic Complexity
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55 }}>
                  Double the prompt length → <strong style={{ color: colors.red, fontWeight: 700 }}>4X the compute</strong>.
                  Every request repeats this across every GPU in the cluster.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ======= PHASE 3b: 10 GPU bars with redundant prefill (P5) ======= */}
        {frame >= 3084 && (() => {
          const gpuBars = [
            { label: 'GPU 0', prefill: 82, delay: 3130 },
            { label: 'GPU 1', prefill: 78, delay: 3170 },
            { label: 'GPU 2', prefill: 85, delay: 3210 },
            { label: 'GPU 3', prefill: 80, delay: 3250 },
            { label: 'GPU 4', prefill: 76, delay: 3290 },
            { label: 'GPU 5', prefill: 83, delay: 3330 },
            { label: 'GPU 6', prefill: 79, delay: 3370 },
            { label: 'GPU 7', prefill: 84, delay: 3400 },
            { label: 'GPU 8', prefill: 77, delay: 3430 },
            { label: 'GPU 9', prefill: 81, delay: 3454 },
          ];
          return (
            <div style={{ opacity: phase3bOpacity, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
              {/* GPU bars in rows of 2 (left + right side by side) */}
              {[0, 1, 2, 3, 4].map((row) => {
                const leftGpu = gpuBars[row * 2];
                const rightGpu = gpuBars[row * 2 + 1];
                return (
                  <div key={row} style={{ display: 'flex', gap: 32 }}>
                    {[leftGpu, rightGpu].map((gpu) => {
                      const barProgress = interpolate(frame, [gpu.delay, gpu.delay + 60], [0, gpu.prefill], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
                      const barOpacity = interpolate(frame, [gpu.delay - 15, gpu.delay], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                      return (
                        <div key={gpu.label} style={{ flex: 1, opacity: barOpacity }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                            <span style={{ fontFamily: fonts.mono, fontSize: 17, fontWeight: 600, color: colors.textSecondary }}>{gpu.label}</span>
                            <span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 600, color: colors.red }}>{Math.round(barProgress)}% prefill</span>
                          </div>
                          <div style={{ width: '100%', height: 26, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden', border: `1px solid ${colors.borderSubtle}` }}>
                            <div style={{ width: `${barProgress}%`, height: '100%', background: `linear-gradient(90deg, ${colors.red}99, ${colors.red})`, borderRadius: 8, position: 'relative' }}>
                              <div style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 600, opacity: barProgress > 30 ? 1 : 0, whiteSpace: 'nowrap' }}>
                                Redundant Prefill
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {/* Question card below all bars */}
              <FadeIn delay={3570} duration={25}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                  <div style={{ background: colors.bgCard, backdropFilter: 'blur(16px)', borderRadius: 16, padding: '22px 36px', border: `1px solid ${colors.amber}25`, textAlign: 'center' }}>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 28, color: colors.amber }}>
                      Could smarter infrastructure close this gap?
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          );
        })()}
      </div>
    </GradientBackground>
  );
};
