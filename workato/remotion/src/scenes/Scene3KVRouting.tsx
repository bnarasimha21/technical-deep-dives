import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO paragraph frame offsets (at 30fps):
// P1: 0-636 (21.22s) — "Workato AI Lab chose DO Kubernetes + H200 GPUs + 8-way TP... That's where NVIDIA Dynamo comes in."
// P2: 636-1535 (29.95s) — "NVIDIA Dynamo is a global inference orchestrator... No wasted cycles."
// P3: 1535-2184 (21.63s) — A/B comparison: "Two configurations. Same hardware... cache-aware scheduling." (moved from Scene4)
// P4: 2184-2691 (16.89s) — "Under the hood, Dynamo scores every GPU... state-aware scheduler."
// P5: 2691-3052 (12.03s) — "The result: same hardware, dramatically better performance... Let's look at the numbers."

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
    delay: 2749,
  },
  {
    title: 'No Code Changes',
    body: 'Drop-in optimization. Same model, same API, just smarter infrastructure underneath.',
    color: colors.amber,
    delay: 2829,
  },
  {
    title: 'No New Models',
    body: 'Works with existing LLMs. Just smarter routing.',
    color: colors.cyan,
    delay: 2909,
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
  const phase0Opacity = interpolate(frame, [0, 15, 620, 640], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Animated infra stays visible until "That's where NVIDIA Dynamo comes in" (~510)
  const animatedInfraOpacity = interpolate(frame, [0, 15, 520, 540], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Architecture image appears when VO says "NVIDIA Dynamo" (~520), fades out earlier to make room for KV diagram
  const archImageOpacity = interpolate(frame, [530, 550, 1515, 1535], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // A/B comparison (P3: 1535-2184)
  const abOpacity = interpolate(frame, [1535, 1555, 2164, 2184], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 3: Cost function (P4: 2184-2691)
  const phase2Opacity = interpolate(frame, [2184, 2204, 2671, 2691], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Phase 4: Results (P5: 2691-3052)
  const phase3Opacity = interpolate(frame, [2691, 2749], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const isAB = frame >= 1535;
  const isPhase2 = frame >= 2184;
  const isPhase3 = frame >= 2691;

  const resultKvSpring = spring({ frame: frame - 2709, fps, config: { damping: 14, stiffness: 60 } });

  // Section label changes per phase
  const sectionLabel = frame < 636 ? 'The Infrastructure' : frame < 1535 ? 'NVIDIA Dynamo' : frame < 2184 ? 'The Comparison' : frame < 2691 ? 'Under the Hood' : 'The Result';
  const sectionColor = frame < 636 ? colors.doBlue : frame < 2184 ? colors.cyan : colors.cyan;

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
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [0, 15, 520, 540], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            The <span style={{ color: colors.doBlue }}>Infrastructure</span> Stack
          </h1>
        </div>
        {/* Phase 0b+1 title: Architecture with NVIDIA Dynamo */}
        {frame >= 530 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [530, 550, 1515, 1535], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              <span style={{ color: colors.green }}>KV-Aware</span> Routing Architecture
            </h1>
          </div>
        )}
        {/* A/B comparison title */}
        {isAB && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [1535, 1555, 2164, 2184], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              The <span style={{ color: colors.cyan }}>Difference</span>
            </h1>
          </div>
        )}
        {/* Phase 3 title: Under the Hood */}
        {isPhase2 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [2184, 2204, 2671, 2691], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              Under the Hood
            </h1>
          </div>
        )}
        {/* Phase 4 title: The Result */}
        {isPhase3 && (
          <div style={{ position: 'absolute', top: 0, left: 0, opacity: interpolate(frame, [2691, 2749], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) }}>
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


        {/* ======= A/B Comparison (P3: 1535-2184) ======= */}
        {isAB && (
          <div style={{ opacity: abOpacity, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
            <div style={{ display: 'flex', gap: 48 }}>
              {/* Config A: vLLM Alone — VO: "Two configurations... no idea what the others are doing" (~1535-1865) */}
              {(() => {
                const cardSpring = spring({ frame: frame - 1565, fps, config: { damping: 12, stiffness: 70 } });
                const diagramFrame = Math.max(0, frame - 1625);
                const gpuFade = interpolate(diagramFrame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const r1Progress = interpolate(diagramFrame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r2Progress = interpolate(diagramFrame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r3Progress = interpolate(diagramFrame, [120, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const miss1 = interpolate(diagramFrame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const miss2 = interpolate(diagramFrame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const miss3 = interpolate(diagramFrame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const pulse = Math.sin(diagramFrame * 0.08) * 0.15 + 0.85;

                const gpuX = [45, 145, 245, 345];
                const gpuY = 175;
                const reqStartY = 18;
                const targets = [0, 2, 3];

                return (
                  <div style={{
                    flex: 1, opacity: cardSpring, transform: `translateY(${(1 - cardSpring) * 30}px)`,
                    background: colors.bgCard, backdropFilter: 'blur(16px)',
                    borderRadius: 24, padding: '32px 36px',
                    border: `1px solid ${colors.red}25`, borderTop: `4px solid ${colors.red}`,
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 600, color: colors.red, letterSpacing: 3, textTransform: 'uppercase' }}>Config A</div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 36, color: colors.white, letterSpacing: -1 }}>vLLM Alone</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, lineHeight: 1.5 }}>
                      Smart locally, blind globally. Each GPU decides on its own.
                    </div>
                    <svg viewBox="0 0 400 230" style={{ width: '100%', height: 'auto', marginTop: 8 }}>
                      {gpuX.map((x, gi) => {
                        const isTarget = targets.includes(gi);
                        const missOpacity = gi === 0 ? miss1 : gi === 2 ? miss2 : gi === 3 ? miss3 : 0;
                        return (
                          <g key={gi} opacity={gpuFade}>
                            <rect x={x} y={gpuY} width={70} height={44} rx={8}
                              fill={isTarget && missOpacity > 0 ? `rgba(255,86,48,${0.15 * pulse})` : 'rgba(255,255,255,0.06)'}
                              stroke={isTarget && missOpacity > 0 ? colors.red : 'rgba(255,255,255,0.12)'}
                              strokeWidth={isTarget && missOpacity > 0 ? 1.5 : 1}
                            />
                            <text x={x + 35} y={gpuY + 20} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily={fonts.mono}>GPU {gi + 1}</text>
                            {isTarget && missOpacity > 0 && (
                              <rect x={x + 8} y={gpuY + 28} width={54 * missOpacity} height={6} rx={3} fill={colors.red} opacity={0.6 * pulse} />
                            )}
                            {isTarget && missOpacity > 0 && (
                              <g opacity={missOpacity}>
                                <rect x={x + 15} y={gpuY + 46} width={40} height={18} rx={4} fill={`${colors.red}30`} stroke={colors.red} strokeWidth={0.5} />
                                <text x={x + 35} y={gpuY + 58} textAnchor="middle" fill={colors.red} fontSize={9} fontWeight={700} fontFamily={fonts.mono}>MISS</text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                      {[
                        { progress: r1Progress, startX: 120, target: 0 },
                        { progress: r2Progress, startX: 200, target: 2 },
                        { progress: r3Progress, startX: 300, target: 3 },
                      ].map((req, ri) => {
                        const endX = gpuX[req.target] + 35;
                        const endY = gpuY;
                        const curX = req.startX + (endX - req.startX) * req.progress;
                        const curY = reqStartY + (endY - reqStartY) * req.progress;
                        return (
                          <g key={ri}>
                            {req.progress > 0 && req.progress < 1 && (
                              <line x1={req.startX} y1={reqStartY} x2={curX} y2={curY}
                                stroke={colors.red} strokeWidth={1.5} opacity={0.3} strokeDasharray="4,3" />
                            )}
                            {req.progress >= 1 && (
                              <line x1={req.startX} y1={reqStartY} x2={endX} y2={endY}
                                stroke={colors.red} strokeWidth={1} opacity={0.2} strokeDasharray="4,3" />
                            )}
                            <circle cx={curX} cy={curY} r={10}
                              fill={`${colors.red}25`} stroke={colors.red} strokeWidth={1.5} opacity={req.progress > 0 ? 1 : 0} />
                            <text x={curX} y={curY + 4} textAnchor="middle" fill={colors.red} fontSize={9} fontWeight={700} fontFamily={fonts.mono}
                              opacity={req.progress > 0 ? 1 : 0}>
                              R{ri + 1}
                            </text>
                          </g>
                        );
                      })}
                      <text x={200} y={gpuY - 18} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily={fonts.mono}
                        opacity={interpolate(diagramFrame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                        No coordination between GPUs
                      </text>
                    </svg>
                  </div>
                );
              })()}

              {/* Config B: Dynamo + vLLM — VO: "The other uses NVIDIA Dynamo's KV-aware routing..." (~1865-2184) */}
              {(() => {
                const cardSpring = spring({ frame: frame - 1865, fps, config: { damping: 12, stiffness: 70 } });
                const diagramFrame = Math.max(0, frame - 1905);
                const gpuFade = interpolate(diagramFrame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const routerFade = interpolate(diagramFrame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const cacheFade = interpolate(diagramFrame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const r1ToRouter = interpolate(diagramFrame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r1ToGPU = interpolate(diagramFrame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r2ToRouter = interpolate(diagramFrame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r2ToGPU = interpolate(diagramFrame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r3ToRouter = interpolate(diagramFrame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const r3ToGPU = interpolate(diagramFrame, [175, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                const hit1 = interpolate(diagramFrame, [125, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const hit2 = interpolate(diagramFrame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const hit3 = interpolate(diagramFrame, [205, 225], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                const gpuX = [45, 145, 245, 345];
                const gpuY = 185;
                const routerY = 85;
                const reqStartY = 18;
                const targets = [1, 1, 2];
                const warmGPUs = [1, 2];
                const routerCX = 200;

                const requests = [
                  { toRouter: r1ToRouter, toGPU: r1ToGPU, startX: 100, target: targets[0], hit: hit1 },
                  { toRouter: r2ToRouter, toGPU: r2ToGPU, startX: 200, target: targets[1], hit: hit2 },
                  { toRouter: r3ToRouter, toGPU: r3ToGPU, startX: 320, target: targets[2], hit: hit3 },
                ];

                return (
                  <div style={{
                    flex: 1, opacity: cardSpring, transform: `translateY(${(1 - cardSpring) * 30}px)`,
                    background: colors.bgCard, backdropFilter: 'blur(16px)',
                    borderRadius: 24, padding: '32px 36px',
                    border: `1px solid ${colors.green}25`, borderTop: `4px solid ${colors.green}`,
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 600, color: colors.green, letterSpacing: 3, textTransform: 'uppercase' }}>Config B</div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 36, color: colors.white, letterSpacing: -1 }}>Dynamo + vLLM</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, lineHeight: 1.5 }}>
                      KV-aware routing. Full cluster visibility, cache-aware scheduling.
                    </div>
                    <svg viewBox="0 0 400 240" style={{ width: '100%', height: 'auto', marginTop: 8 }}>
                      <g opacity={routerFade}>
                        <rect x={130} y={routerY - 16} width={140} height={36} rx={10}
                          fill="rgba(54,179,126,0.12)" stroke={colors.green} strokeWidth={1.5} />
                        <text x={200} y={routerY + 6} textAnchor="middle" fill={colors.green} fontSize={12} fontWeight={700} fontFamily={fonts.mono}>
                          DYNAMO ROUTER
                        </text>
                      </g>
                      {gpuX.map((x, gi) => {
                        const isWarm = warmGPUs.includes(gi);
                        const hasHit = (gi === 1 && (hit1 > 0 || hit2 > 0)) || (gi === 2 && hit3 > 0);
                        const hitOpacity = gi === 1 ? Math.max(hit1, hit2) : gi === 2 ? hit3 : 0;
                        return (
                          <g key={gi} opacity={gpuFade}>
                            <rect x={x} y={gpuY} width={70} height={44} rx={8}
                              fill={hasHit ? 'rgba(54,179,126,0.12)' : 'rgba(255,255,255,0.06)'}
                              stroke={hasHit ? colors.green : 'rgba(255,255,255,0.12)'}
                              strokeWidth={hasHit ? 1.5 : 1}
                            />
                            <text x={x + 35} y={gpuY + 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily={fonts.mono}>GPU {gi + 1}</text>
                            {isWarm && (
                              <g opacity={cacheFade}>
                                <rect x={x + 8} y={gpuY + 26} width={54} height={6} rx={3} fill={colors.green} opacity={0.4} />
                                <text x={x + 35} y={gpuY + 42} textAnchor="middle" fill={colors.green} fontSize={7} fontFamily={fonts.mono} opacity={0.7}>WARM CACHE</text>
                              </g>
                            )}
                            {hitOpacity > 0 && (
                              <g opacity={hitOpacity}>
                                <rect x={x + 17} y={gpuY + 46} width={36} height={18} rx={4} fill={`${colors.green}30`} stroke={colors.green} strokeWidth={0.5} />
                                <text x={x + 35} y={gpuY + 58} textAnchor="middle" fill={colors.green} fontSize={9} fontWeight={700} fontFamily={fonts.mono}>HIT</text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                      {requests.map((req, ri) => {
                        const endX = gpuX[req.target] + 35;
                        const endY = gpuY;
                        const toRouterX = req.startX + (routerCX - req.startX) * req.toRouter;
                        const toRouterY = reqStartY + (routerY - 4 - reqStartY) * req.toRouter;
                        const fromRouterX = routerCX + (endX - routerCX) * req.toGPU;
                        const fromRouterY = (routerY + 24) + (endY - routerY - 24) * req.toGPU;
                        const inPhase2 = req.toGPU > 0;
                        const curX = inPhase2 ? fromRouterX : toRouterX;
                        const curY = inPhase2 ? fromRouterY : toRouterY;
                        return (
                          <g key={ri}>
                            {req.toRouter > 0 && (
                              <line x1={req.startX} y1={reqStartY} x2={routerCX} y2={routerY - 4}
                                stroke={colors.green} strokeWidth={1} opacity={0.2} strokeDasharray="4,3" />
                            )}
                            {req.toGPU > 0 && (
                              <line x1={routerCX} y1={routerY + 24} x2={endX} y2={endY}
                                stroke={colors.green} strokeWidth={1.5} opacity={0.3} />
                            )}
                            {(req.toRouter > 0 && req.toGPU < 1) && (
                              <g>
                                <circle cx={curX} cy={curY} r={10}
                                  fill={`${colors.green}25`} stroke={colors.green} strokeWidth={1.5} />
                                <text x={curX} y={curY + 4} textAnchor="middle" fill={colors.green} fontSize={9} fontWeight={700} fontFamily={fonts.mono}>
                                  R{ri + 1}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                      <text x={200} y={routerY + 38} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily={fonts.mono}
                        opacity={interpolate(diagramFrame, [210, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                        Routes to GPU with warm KV cache
                      </text>
                    </svg>
                  </div>
                );
              })()}
            </div>
            <FadeIn delay={2065} duration={22}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textMuted }}>
                  Same hardware. Same model. <strong style={{ color: colors.white, fontWeight: 600 }}>The only difference: how requests are routed.</strong>
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        {/* ======= PHASE 3: Cost function (P4: 2184-2691) ======= */}
        {isPhase2 && (
          <div style={{ opacity: phase2Opacity, position: 'absolute', inset: 0, display: 'flex', gap: 48, alignItems: 'center' }}>
            {/* Left: Formula */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
              <FadeIn delay={2239} duration={25}>
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
              <FadeIn delay={2349} duration={22}>
                <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, lineHeight: 1.55, paddingLeft: 16, borderLeft: `2px solid ${colors.cyan}40` }}>
                  For each incoming request, Dynamo scores <strong style={{ color: colors.white, fontWeight: 600 }}>every GPU</strong> in the cluster, then routes to the one with the lowest cost.
                </div>
              </FadeIn>
            </div>
            {/* Right: What each term means */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { term: 'prefill_blocks', desc: 'How much new KV must be computed (cache miss cost)', color: colors.red, delay: 2299 },
                { term: 'overlap_score', desc: 'How much existing cache can be reused', color: colors.amber, delay: 2399 },
                { term: 'decode_blocks', desc: 'How busy the GPU is on the decode side right now', color: colors.green, delay: 2499 },
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

        {/* ======= PHASE 4: Result cards (P5: 2691-3052) ======= */}
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
