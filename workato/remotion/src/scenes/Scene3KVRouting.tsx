import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO paragraph frame offsets (at 30fps):
// P1: 0-636 (21.22s) — "Workato AI Lab chose DO Kubernetes + H200 GPUs + 8-way TP... That's where NVIDIA Dynamo comes in."
// P2: 636-1535 (29.95s) — "NVIDIA Dynamo is a global inference orchestrator... No wasted cycles."
// P3: 1535-2042 (16.89s) — "Under the hood, Dynamo scores every GPU... state-aware scheduler."
// P4: 2042-2403 (12.03s) — "The result: same hardware, dramatically better performance... Let's look at the numbers."

// P1 VO breakdown:
// "For their agentic AI workload, Workato AI Lab chose" → 0-3s (0-90)
// "DigitalOcean Kubernetes Service" → 3-5s (90-150)
// "with interconnected NVIDIA H200 GPUs" → 5-8s (150-240)
// "and eight-way tensor parallelism across each worker node." → 8-12s (240-360)
// "But fast hardware alone doesn't eliminate redundant computation." → 12-17s (360-510)
// "That's where NVIDIA Dynamo comes in." → 17-21s (510-636)

// GPU chip icon for H200s
const GpuChip: React.FC<{ color: string; size: number; label?: string }> = ({ color, size, label }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x={16} y={16} width={48} height={48} rx={8} stroke={color} strokeWidth={2} fill={`${color}12`} />
    <rect x={24} y={24} width={32} height={32} rx={4} fill={color} opacity={0.2} />
    <rect x={30} y={30} width={20} height={20} rx={3} fill={color} opacity={0.6} />
    {/* Pins */}
    {[28, 40, 52].map((x) => <line key={`t${x}`} x1={x} y1={8} x2={x} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />)}
    {[28, 40, 52].map((x) => <line key={`b${x}`} x1={x} y1={64} x2={x} y2={72} stroke={color} strokeWidth={2} strokeLinecap="round" />)}
    {[28, 40, 52].map((y) => <line key={`l${y}`} x1={8} y1={y} x2={16} y2={y} stroke={color} strokeWidth={2} strokeLinecap="round" />)}
    {[28, 40, 52].map((y) => <line key={`r${y}`} x1={64} y1={y} x2={72} y2={y} stroke={color} strokeWidth={2} strokeLinecap="round" />)}
    {label && <text x={40} y={44} textAnchor="middle" fill={color} fontSize={11} fontWeight={800} fontFamily="Inter">{label}</text>}
  </svg>
);

// P2 VO: 636-1535
// "NVIDIA Dynamo is a global inference orchestrator with full cluster visibility" → 636-720
// "When multiple requests share common input prefixes" → 720-830
// "routes them to the same GPU that already has a warm KV cache" → 830-970
// "skips the expensive prefill phase entirely. No redundant computation." → 970-1535
const explanationCards = [
  {
    title: 'Global Orchestration',
    color: colors.doBlue,
    delay: 660,
  },
  {
    title: 'Shared Prefix Detection',
    color: colors.cyan,
    delay: 830,
  },
  {
    title: 'Warm Cache Routing',
    color: colors.green,
    delay: 1000,
  },
];

const resultCards = [
  {
    title: 'Dramatic Improvement',
    body: 'Same hardware delivers dramatically better performance. Pure infrastructure gain.',
    color: colors.green,
    delay: 2100,
  },
  {
    title: 'No Code Changes',
    body: 'Drop-in optimization. Same model, same API, just smarter infrastructure underneath.',
    color: colors.amber,
    delay: 2180,
  },
  {
    title: 'No New Models',
    body: 'Works with existing LLMs. Just smarter routing.',
    color: colors.cyan,
    delay: 2260,
  },
];

export const Scene3KVRouting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Phase 0: Infrastructure setup (P1: 0-636)
  // Sub-phase A: animated build-up (0-490), Sub-phase B: architecture image (490-636)
  const phase0Opacity = interpolate(frame, [0, 25, 600, 640], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Animated infra stays visible until "That's where NVIDIA Dynamo comes in" (~510)
  const animatedInfraOpacity = interpolate(frame, [0, 25, 510, 560], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Architecture image appears when VO says "NVIDIA Dynamo" (~520), fades out earlier to make room for KV diagram
  const archImageOpacity = interpolate(frame, [530, 580, 1460, 1540], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // Phase 2: Cost function (P3: 1535-2042)
  const phase2Opacity = interpolate(frame, [1535, 1590, 1970, 2045], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 3: Results (P4: 2042-2403)
  const phase3Opacity = interpolate(frame, [2042, 2100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const isPhase2 = frame >= 1535;
  const isPhase3 = frame >= 2042;

  const resultKvSpring = spring({ frame: frame - 2060, fps, config: { damping: 14, stiffness: 60 } });

  // Section label changes per phase
  const sectionLabel = frame < 636 ? 'The Infrastructure' : frame < 1535 ? 'NVIDIA Dynamo' : frame < 2042 ? 'Under the Hood' : 'The Result';
  const sectionColor = frame < 636 ? colors.doBlue : colors.cyan;

  return (
    <GradientBackground variant="solution">
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: sectionColor,
              borderRadius: 2,
              boxShadow: `0 0 12px ${sectionColor}40`,
              transition: 'background 0.5s',
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              fontWeight: 600,
              color: sectionColor,
              letterSpacing: 4,
              textTransform: 'uppercase',
              transition: 'color 0.5s',
            }}
          >
            {sectionLabel}
          </span>
        </div>
      </FadeIn>

      {/* Title — crossfade between phases */}
      <div style={{ position: 'relative', marginBottom: 20, minHeight: 80 }}>
        {/* Phase 0 title: Infrastructure → Architecture */}
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [0, 25, 510, 550], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            The <span style={{ color: colors.doBlue }}>Infrastructure</span> Stack
          </h1>
        </div>
        {/* Phase 0b+1 title: Architecture with NVIDIA Dynamo */}
        {frame >= 530 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [530, 580, 1460, 1540], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              <span style={{ color: colors.green }}>NVIDIA Dynamo</span> Architecture
            </h1>
          </div>
        )}
        {/* Phase 2 title: Under the Hood */}
        {isPhase2 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [1535, 1590, 1970, 2045], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              Under the Hood
            </h1>
          </div>
        )}
        {/* Phase 3 title: The Result */}
        {isPhase3 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [2042, 2100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              The Result
            </h1>
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>

        {/* ======= PHASE 0: Animated infrastructure build-up (0-560) ======= */}
        <div style={{ opacity: animatedInfraOpacity, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            {/* DOKS Cluster outer container (appears at ~90) */}
            {(() => {
              const k8sSpring = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 50 } });
              return (
                <div style={{
                  opacity: k8sSpring,
                  transform: `scale(${0.92 + k8sSpring * 0.08})`,
                  width: '100%', maxWidth: 1500, position: 'relative',
                  borderRadius: 28,
                  border: `2px dashed ${colors.doBlue}50`,
                  background: `linear-gradient(135deg, ${colors.doBlue}06 0%, transparent 100%)`,
                  padding: '28px 44px 36px',
                  display: 'flex', flexDirection: 'column', gap: 24,
                }}>
                  {/* DOKS header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <svg width={36} height={36} viewBox="0 0 64 64" fill="none">
                      <circle cx={32} cy={32} r={24} stroke={colors.doBlue} strokeWidth={2.5} fill={`${colors.doBlue}15`} />
                      <circle cx={32} cy={32} r={4} fill={colors.doBlue} />
                      {[0, 60, 120, 180, 240, 300].map((a) => {
                        const r = (a * Math.PI) / 180;
                        return <line key={a} x1={32 + Math.cos(r) * 8} y1={32 + Math.sin(r) * 8} x2={32 + Math.cos(r) * 22} y2={32 + Math.sin(r) * 22} stroke={colors.doBlue} strokeWidth={2} strokeLinecap="round" />;
                      })}
                      {[0, 60, 120, 180, 240, 300].map((a) => {
                        const r = (a * Math.PI) / 180;
                        return <circle key={a} cx={32 + Math.cos(r) * 22} cy={32 + Math.sin(r) * 22} r={3} fill={colors.doBlue} />;
                      })}
                    </svg>
                    <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 30, color: colors.doBlue }}>
                      DigitalOcean Kubernetes (DOKS) Cluster
                    </span>
                  </div>

                  {/* Two Worker Nodes side by side (appear at ~160) */}
                  <div style={{ display: 'flex', gap: 28 }}>
                    {[0, 1].map((nodeIdx) => {
                      const nodeDelay = 160 + nodeIdx * 40;
                      const nodeSpring = spring({ frame: frame - nodeDelay, fps, config: { damping: 14, stiffness: 55 } });
                      const gpuChips = [0, 1, 2, 3, 4, 5, 6, 7];
                      return (
                        <div key={nodeIdx} style={{
                          flex: 1, opacity: nodeSpring,
                          transform: `translateY(${(1 - nodeSpring) * 20}px)`,
                          background: `linear-gradient(135deg, ${colors.green}06 0%, transparent 100%)`,
                          border: `1.5px solid ${colors.green}25`,
                          borderRadius: 20, padding: '20px 28px 24px',
                          display: 'flex', flexDirection: 'column', gap: 14,
                        }}>
                          {/* Node header */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: colors.green, boxShadow: `0 0 8px ${colors.green}60` }} />
                            <span style={{ fontFamily: fonts.mono, fontWeight: 600, fontSize: 18, color: colors.green, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                              Worker Node {nodeIdx + 1}
                            </span>
                          </div>
                          {/* vLLM + model label */}
                          <div style={{ fontFamily: fonts.body, fontSize: 18, color: colors.textSecondary, lineHeight: 1.4 }}>
                            vLLM Backend · Llama-3.3-70B · FP8
                          </div>

                          {/* GPU chips: 8 per node */}
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {gpuChips.map((i) => {
                              const chipDelay = nodeDelay + 20 + i * 8;
                              const chipSpring = spring({ frame: frame - chipDelay, fps, config: { damping: 12, stiffness: 80 } });
                              return (
                                <div key={i} style={{
                                  opacity: chipSpring,
                                  transform: `scale(${0.5 + chipSpring * 0.5})`,
                                }}>
                                  <GpuChip color={colors.green} size={62} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Tensor Parallelism interconnect (appears at ~260) */}
                          {(() => {
                            const tpDelay = 260 + nodeIdx * 30;
                            const tpProgress = interpolate(frame, [tpDelay, tpDelay + 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                            const pulsePhase = frame > tpDelay + 80 ? Math.sin((frame - tpDelay) * 0.05) * 0.3 + 0.7 : 0;
                            return (
                              <div style={{ opacity: tpProgress }}>
                                {/* Interconnect bar */}
                                <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <div style={{
                                    width: `${tpProgress * 90}%`, height: 4, borderRadius: 2,
                                    background: `linear-gradient(90deg, ${colors.cyan}00, ${colors.cyan}80, ${colors.cyan}80, ${colors.cyan}00)`,
                                    boxShadow: `0 0 ${12 * pulsePhase}px ${colors.cyan}30`,
                                  }} />
                                </div>
                                <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: 16, fontWeight: 600, color: colors.cyan, letterSpacing: 1 }}>
                                  Tensor Parallel · 8 × H200
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })()}
          </div>

        {/* ======= Architecture image + explanation cards (530-1535) ======= */}
        <div style={{
          opacity: archImageOpacity,
          position: 'absolute', inset: 0,
          display: 'flex', gap: 28, alignItems: 'stretch',
        }}>
          {/* Left: Architecture image */}
          {(() => {
            const imgSpring = spring({ frame: frame - 540, fps, config: { damping: 14, stiffness: 50 } });
            return (
              <div style={{
                flex: 1.2,
                transform: `scale(${0.92 + imgSpring * 0.08})`,
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 20,
                boxShadow: `0 8px 60px rgba(54, 179, 126, 0.15), 0 0 0 1px rgba(255,255,255,0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Img
                  src={staticFile('Workato Architecture (1).png')}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', borderRadius: 12 }}
                />
              </div>
            );
          })()}

          {/* Right: Explanation cards appearing during P2 */}
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
            {explanationCards.map((card, i) => {
              const cardSpring = spring({ frame: frame - card.delay, fps, config: { damping: 12, stiffness: 80 } });
              return (
                <div
                  key={i}
                  style={{
                    opacity: cardSpring,
                    transform: `translateX(${(1 - cardSpring) * 40}px)`,
                    background: colors.bgCard,
                    backdropFilter: 'blur(16px)',
                    borderRadius: 20,
                    padding: '24px 28px',
                    border: `1px solid ${card.color}20`,
                    borderLeft: `4px solid ${card.color}`,
                  }}
                >
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 28, color: card.color }}>
                    {card.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ======= PHASE 2: Cost function (P3: 1535-2042) ======= */}
        {isPhase2 && (
          <div style={{ opacity: phase2Opacity, position: 'absolute', inset: 0, display: 'flex', gap: 48, alignItems: 'center' }}>
            {/* Left: Formula */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
              <FadeIn delay={1590} duration={25}>
                <div style={{ background: colors.bgCard, backdropFilter: 'blur(16px)', borderRadius: 24, padding: '40px 40px', border: `1px solid ${colors.cyan}20` }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 600, color: colors.cyan, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
                    Routing Cost Function
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 32, fontWeight: 700, color: colors.white, lineHeight: 1.6, letterSpacing: 0.5 }}>
                    cost = <span style={{ color: colors.amber }}>overlap_score</span> × <span style={{ color: colors.red }}>prefill_blocks</span>
                    <br />
                    {'       '}+ <span style={{ color: colors.green }}>decode_blocks</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={1700} duration={22}>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55, paddingLeft: 16, borderLeft: `2px solid ${colors.cyan}40` }}>
                  For each incoming request, Dynamo scores <strong style={{ color: colors.white, fontWeight: 600 }}>every GPU</strong> in the cluster, then routes to the one with the lowest cost.
                </div>
              </FadeIn>
            </div>
            {/* Right: What each term means */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { term: 'prefill_blocks', desc: 'How much new KV must be computed (cache miss cost)', color: colors.red, delay: 1650 },
                { term: 'overlap_score', desc: 'How much existing cache can be reused', color: colors.amber, delay: 1750 },
                { term: 'decode_blocks', desc: 'How busy the GPU is on the decode side right now', color: colors.green, delay: 1850 },
              ].map((item, i) => {
                const itemSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
                return (
                  <div key={i} style={{
                    opacity: itemSpring, transform: `translateX(${(1 - itemSpring) * 30}px)`,
                    background: colors.bgCard, backdropFilter: 'blur(16px)',
                    border: `1px solid ${item.color}20`, borderLeft: `4px solid ${item.color}`,
                    borderRadius: '4px 20px 20px 4px', padding: '22px 28px',
                  }}>
                    <div style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 21, color: item.color, marginBottom: 6 }}>{item.term}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 21, color: colors.textSecondary, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======= PHASE 3: Result cards (P4: 2042-2403) ======= */}
        {isPhase3 && (
          <div
            style={{
              opacity: phase3Opacity,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              gap: 36,
              alignItems: 'stretch',
            }}
          >
            {/* KV diagram */}
            <div
              style={{
                flex: 1,
                opacity: resultKvSpring,
                transform: `scale(${0.96 + resultKvSpring * 0.04})`,
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 20,
                boxShadow: `0 8px 60px rgba(0, 184, 217, 0.12)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('kv-aware-image3.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Result cards */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
              {resultCards.map((card, i) => {
                const cardSpring = spring({ frame: frame - card.delay, fps, config: { damping: 12, stiffness: 80 } });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardSpring,
                      transform: `translateX(${(1 - cardSpring) * 40}px)`,
                      background: colors.bgCard,
                      backdropFilter: 'blur(16px)',
                      borderRadius: 20,
                      padding: '28px 32px',
                      border: `1px solid ${card.color}20`,
                      borderLeft: `4px solid ${card.color}`,
                    }}
                  >
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 26, color: card.color, marginBottom: 10 }}>
                      {card.title}
                    </div>
                    <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary, lineHeight: 1.55 }}>
                      {card.body}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
};
