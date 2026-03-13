import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO paragraph frame offsets (at 30fps):
// P1: 0-649 (21.63s) — A/B setup: "Two configurations. Same hardware, same model..."
// P2: 649-2078 (47.64s) — Benchmark results: throughput, TTFT, TPOT, P50, config note
// P3: 2078-2698 (20.67s) — "What does that mean in practice? 40% fewer GPUs... $0.77/M tokens"

// Graph timing within P2 (4 graphs + config note across 1429 frames):
const benchmarkGraphs = [
  {
    src: 'Token-throughput-image6.png',
    title: 'Token Throughput',
    subtitle: 'KV-Aware vs No KV-Aware (tokens/sec)',
    highlight: '67% higher: 13,561 vs 8,111 tokens/sec on the same hardware',
    color: colors.doBlue,
    startFrame: 649,
  },
  {
    src: 'Median-TTFT-image5.png',
    title: 'Time-to-First-Token',
    subtitle: 'Median TTFT under increasing concurrency',
    highlight: '77% faster: 1,455ms vs 6,452ms at 32 concurrent requests',
    color: colors.cyan,
    startFrame: 950,
  },
  {
    src: 'Median-TPOT-image7.png',
    title: 'Time Per Output Token',
    subtitle: 'TPOT under increasing load',
    highlight: 'Stays flat under load, no degradation even at peak',
    color: colors.green,
    startFrame: 1250,
  },
  {
    src: 'p50-latency-image4.png',
    title: 'P50 (Median) End-to-End Latency',
    subtitle: 'Median response time in seconds under load',
    highlight: '14.2s vs 69.7s at 32 concurrent requests: 5X improvement',
    color: colors.amber,
    startFrame: 1500,
  },
];

export const Scene4Benchmarks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Phase 0: A/B comparison setup (P1: 0-649)
  const abOpacity = interpolate(frame, [0, 20, 570, 650], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Graphs phase (P2: 649-2078)
  const graphsVisible = frame >= 600;

  // Phase 3: "40% fewer GPUs" (P3: 2078-2698)
  const fewerGPUsOpacity = interpolate(frame, [2078, 2140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GradientBackground variant="results">
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: colors.green,
              borderRadius: 2,
              boxShadow: `0 0 12px ${colors.green}40`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              fontWeight: 600,
              color: colors.green,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Benchmarks
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={8} duration={22}>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 52,
            color: colors.white,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Real Data, Real Hardware
        </h1>
      </FadeIn>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 16, minHeight: 0 }}>

        {/* Phase 0: A/B Comparison Setup (P1: 0-649) */}
        <div style={{ opacity: abOpacity, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <div style={{ display: 'flex', gap: 48 }}>
            {/* Config A: vLLM Alone */}
            {(() => {
              const cardSpring = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 70 } });
              const diagramFrame = Math.max(0, frame - 60);
              const gpuFade = interpolate(diagramFrame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const r1Progress = interpolate(diagramFrame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r2Progress = interpolate(diagramFrame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r3Progress = interpolate(diagramFrame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const miss1 = interpolate(diagramFrame, [45, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const miss2 = interpolate(diagramFrame, [65, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const miss3 = interpolate(diagramFrame, [85, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
                      opacity={interpolate(diagramFrame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                      No coordination between GPUs
                    </text>
                  </svg>
                </div>
              );
            })()}

            {/* Config B: Dynamo + vLLM */}
            {(() => {
              const cardSpring = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 70 } });
              const diagramFrame = Math.max(0, frame - 110);
              const gpuFade = interpolate(diagramFrame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const routerFade = interpolate(diagramFrame, [10, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const cacheFade = interpolate(diagramFrame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const r1ToRouter = interpolate(diagramFrame, [30, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r1ToGPU = interpolate(diagramFrame, [48, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r2ToRouter = interpolate(diagramFrame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r2ToGPU = interpolate(diagramFrame, [68, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r3ToRouter = interpolate(diagramFrame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const r3ToGPU = interpolate(diagramFrame, [88, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
              const hit1 = interpolate(diagramFrame, [65, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const hit2 = interpolate(diagramFrame, [85, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const hit3 = interpolate(diagramFrame, [105, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
                      opacity={interpolate(diagramFrame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                      Routes to GPU with warm KV cache
                    </text>
                  </svg>
                </div>
              );
            })()}
          </div>
          <FadeIn delay={300} duration={22}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textMuted }}>
                Same hardware. Same model. <strong style={{ color: colors.white, fontWeight: 600 }}>The only difference: how requests are routed.</strong>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Benchmark Graph Carousel (P2: 649-2078) */}
        {graphsVisible && benchmarkGraphs.map((graph, i) => {
          const nextStart = benchmarkGraphs[i + 1]?.startFrame ?? 2078;

          const graphOpacity = interpolate(
            frame,
            [graph.startFrame, graph.startFrame + 40, nextStart - 60, nextStart],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const graphSpring = spring({
            frame: frame - graph.startFrame,
            fps,
            config: { damping: 14, stiffness: 60 },
          });

          if (graphOpacity <= 0) return null;

          return (
            <div
              key={graph.title}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: graphOpacity,
                display: 'flex',
                gap: 36,
                alignItems: 'stretch',
              }}
            >
              {/* Graph image */}
              <div
                style={{
                  flex: 2,
                  transform: `scale(${0.94 + graphSpring * 0.06})`,
                  background: '#FFFFFF',
                  borderRadius: 20,
                  padding: 20,
                  boxShadow: `0 8px 60px ${graph.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Img
                  src={staticFile(graph.src)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* Graph details */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
                <div>
                  <div
                    style={{
                      fontFamily: fonts.heading,
                      fontWeight: 700,
                      fontSize: 32,
                      color: colors.white,
                      marginBottom: 12,
                      letterSpacing: -0.5,
                    }}
                  >
                    {graph.title}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 22,
                      color: colors.textSecondary,
                      lineHeight: 1.55,
                    }}
                  >
                    {graph.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    background: `${graph.color}12`,
                    borderLeft: `3px solid ${graph.color}`,
                    borderRadius: '0 16px 16px 0',
                    padding: '20px 24px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 24,
                      fontWeight: 700,
                      color: graph.color,
                      lineHeight: 1.4,
                    }}
                  >
                    {graph.highlight}
                  </div>
                </div>

                {/* Progress dots */}
                <div style={{ display: 'flex', gap: 10 }}>
                  {benchmarkGraphs.map((g, j) => {
                    const dotActive = j === i;
                    return (
                      <div
                        key={g.title}
                        style={{
                          width: dotActive ? 40 : 12,
                          height: 12,
                          borderRadius: 6,
                          background: dotActive ? graph.color : 'rgba(255,255,255,0.08)',
                          border: `1px solid ${dotActive ? graph.color : colors.borderSubtle}`,
                          boxShadow: dotActive ? `0 0 12px ${graph.color}50` : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Phase 3: 40% Fewer GPUs (P3: 2078-2698) */}
        {frame >= 2078 && (
          <div style={{
            opacity: fewerGPUsOpacity, position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
          }}>
            <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 120, color: colors.green, lineHeight: 1, letterSpacing: -4 }}>
                  40%
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 600, fontSize: 36, color: colors.green, marginTop: 8 }}>
                  Fewer GPUs
                </div>
              </div>
              <div style={{ width: 2, height: 120, background: colors.borderSubtle }} />
              <div style={{ maxWidth: 500 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6 }}>
                  A deployment that needed <strong style={{ color: colors.white, fontWeight: 600 }}>10 GPUs</strong> now runs on <strong style={{ color: colors.green, fontWeight: 600 }}>6</strong>.
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 26, color: colors.textSecondary, lineHeight: 1.6, marginTop: 16 }}>
                  67% lower inference cost: <strong style={{ color: colors.green, fontWeight: 600 }}>$0.77 per million tokens</strong> at Workato's trillion-workload scale.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
};
