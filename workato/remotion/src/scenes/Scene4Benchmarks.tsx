import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO paragraph frame offsets (at 30fps):
// P1: 0-1429 (47.64s) — Benchmark results: throughput, TTFT, TPOT, P50
// P2: 1429-2059 (21.0s) — "What does that mean in practice? 40% fewer GPUs... $0.77/M tokens"

// Graph timing (4 graphs across 1429 frames, starting immediately):
const benchmarkGraphs = [
  {
    src: 'Token-throughput-image6.png',
    title: 'Token Throughput',
    subtitle: 'KV-Aware vs No KV-Aware (tokens/sec)',
    highlight: '67% higher: 13,561 vs 8,111 tokens/sec on the same hardware',
    color: colors.doBlue,
    startFrame: 0,
  },
  {
    src: 'Median-TTFT-image5.png',
    title: 'Time-to-First-Token',
    subtitle: 'Median TTFT under increasing concurrency',
    highlight: '77% faster: 1,455ms vs 6,452ms at 32 concurrent requests',
    color: colors.cyan,
    startFrame: 301,
  },
  {
    src: 'Median-TPOT-image7.png',
    title: 'Time Per Output Token',
    subtitle: 'TPOT under increasing load',
    highlight: 'Stays flat under load, no degradation even at peak',
    color: colors.green,
    startFrame: 601,
  },
  {
    src: 'p50-latency-image4.png',
    title: 'P50 (Median) End-to-End Latency',
    subtitle: 'Median response time in seconds under load',
    highlight: '14.2s vs 69.7s at 32 concurrent requests: 5X improvement',
    color: colors.amber,
    startFrame: 901,
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

  // Graphs phase (P1: 0-1429) — starts immediately
  const graphsVisible = true;

  // Phase 2: "40% fewer GPUs" (P2: 1429-2082)
  const fewerGPUsOpacity = interpolate(frame, [1429, 1491], [0, 1], {
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
          The Numbers
        </h1>
      </FadeIn>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 16, minHeight: 0 }}>

        {/* Benchmark Graph Carousel (P1: 0-1429) — starts immediately */}
        {graphsVisible && benchmarkGraphs.map((graph, i) => {
          const nextStart = benchmarkGraphs[i + 1]?.startFrame ?? 1429;

          const graphOpacity = interpolate(
            frame,
            [graph.startFrame, graph.startFrame + 15, nextStart - 20, nextStart],
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

        {/* Phase 2: 40% Fewer GPUs (P2: 1429-2059) */}
        {frame >= 1429 && (
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
                  67% lower inference cost: <strong style={{ color: colors.green, fontWeight: 600 }}>$0.77 per million tokens</strong> at Workato AI Lab's trillion-workload scale.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
};
