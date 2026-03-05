import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { MetricCard } from '../components/MetricCard';
import { colors, fonts } from '../theme';

const benchmarkGraphs = [
  {
    src: 'Token-throughput-image6.png',
    title: 'Token Throughput',
    subtitle: 'KV-Aware Routing vs No KV-Aware Routing (tokens/s)',
    highlight: '67% higher throughput at scale',
    color: colors.doBlue,
    startFrame: 700,
  },
  {
    src: 'Median-TTFT-image5.png',
    title: 'Median Time-to-First-Token',
    subtitle: 'TTFT in milliseconds under increasing load',
    highlight: '79% faster — 1,455ms vs 6,452ms at 32 requests',
    color: colors.cyan,
    startFrame: 1050,
  },
  {
    src: 'Median-TPOT-image7.png',
    title: 'Median Time Per Output Token',
    subtitle: 'TPOT in milliseconds under increasing load',
    highlight: 'Stays flat under load — no degradation',
    color: colors.green,
    startFrame: 1400,
  },
  {
    src: 'p50-latency-image4.png',
    title: 'P50 End-to-End Latency',
    subtitle: 'P50 latency in seconds under increasing load',
    highlight: '14.2s vs 69.7s at 32 concurrent requests',
    color: colors.amber,
    startFrame: 1750,
  },
];

export const Scene5Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Crossfade phases
  const metricsOpacity = interpolate(frame, [0, 20, 580, 700], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const graphsVisible = frame >= 600;

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
              fontSize: 16,
              fontWeight: 600,
              color: colors.green,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            The Results
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={8} duration={22}>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 54,
            color: colors.white,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Production-Ready AI Inference
          <br />
          <span style={{ color: colors.green }}>at Scale</span>
        </h1>
      </FadeIn>

      {/* Content area — fills remaining space */}
      <div style={{ flex: 1, position: 'relative', marginTop: 20, minHeight: 0 }}>
        {/* Phase 1: Metric Cards */}
        <div
          style={{
            opacity: metricsOpacity,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            pointerEvents: metricsOpacity <= 0 ? 'none' : 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: 24 }}>
            <MetricCard
              value={67}
              suffix="%"
              label="Higher Throughput per GPU"
              sublabel="13,561 vs 8,111 tokens/sec — same hardware"
              delay={45}
              color={colors.doBlue}
            />
            <MetricCard
              value={79}
              suffix="%"
              label="Faster Time-to-First-Token"
              sublabel="Median TTFT: 1,455ms at high load"
              delay={75}
              color={colors.cyan}
            />
            <MetricCard
              value={67}
              suffix="%"
              label="Lower Inference Cost"
              sublabel="$0.77 per 1M tokens at 1T workload scale"
              delay={105}
              color={colors.green}
            />
          </div>

          {/* Time-to-value callout */}
          <FadeIn delay={155} duration={28}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: 24,
                padding: '32px 40px',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 800,
                  fontSize: 68,
                  color: colors.amber,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                2X+
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 28, color: colors.white }}>
                  Faster Time-to-Value
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 21, color: colors.textSecondary }}>
                  Infrastructure setup reduced from weeks to days
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.textMuted, textDecoration: 'line-through' }}>
                  Weeks
                </span>
                <span style={{ fontFamily: fonts.heading, fontSize: 28, color: colors.amber }}>→</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.amber, fontWeight: 700 }}>
                  Days
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Phase 2: Benchmark Graphs */}
        {graphsVisible && benchmarkGraphs.map((graph, i) => {
          const nextStart = benchmarkGraphs[i + 1]?.startFrame ?? 2250;
          const isLast = i === benchmarkGraphs.length - 1;

          const graphOpacity = interpolate(
            frame,
            [graph.startFrame, graph.startFrame + 40, nextStart - 60, nextStart],
            [0, 1, 1, isLast ? 1 : 0],
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
              key={i}
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
                      fontSize: 28,
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
                      fontSize: 20,
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
                      fontSize: 22,
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
                  {benchmarkGraphs.map((_, j) => {
                    const dotActive = j === i;
                    return (
                      <div
                        key={j}
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
      </div>
    </GradientBackground>
  );
};
