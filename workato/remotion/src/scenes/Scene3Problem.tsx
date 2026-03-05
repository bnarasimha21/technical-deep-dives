import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { colors, fonts } from '../theme';

export const Scene3Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const bars = [
    {
      label: 'Inference Cost',
      value: interpolate(frame, [130, 280], [5, 95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }),
      delay: 120,
    },
    {
      label: 'Latency',
      value: interpolate(frame, [160, 310], [5, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }),
      delay: 150,
    },
    {
      label: 'GPU Waste',
      value: interpolate(frame, [190, 340], [5, 75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }),
      delay: 180,
    },
  ];

  const barColor = (progress: number) => {
    if (progress < 35) return colors.green;
    if (progress < 65) return colors.amber;
    return colors.red;
  };

  return (
    <GradientBackground variant="problem">
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: colors.red,
              borderRadius: 2,
              boxShadow: `0 0 12px ${colors.red}40`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 600,
              color: colors.red,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            The Challenge
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
          Scaling LLM Inference
          <br />
          <span style={{ color: colors.red }}>at Enterprise Scale</span>
        </h1>
      </FadeIn>

      {/* Two-column layout — fill remaining space */}
      <div
        style={{
          display: 'flex',
          gap: 56,
          flex: 1,
          marginTop: 32,
          alignItems: 'stretch',
        }}
      >
        {/* Left: text explanation */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <FadeIn delay={40} duration={22}>
            <div
              style={{
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '28px 32px',
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary, lineHeight: 1.5 }}>
                A <strong style={{ color: colors.white, fontWeight: 600 }}>100,000-token prompt</strong> requires
              </div>
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 800,
                  fontSize: 52,
                  color: colors.amber,
                  marginTop: 8,
                  letterSpacing: -1,
                }}
              >
                ~<AnimatedCounter to={10} startFrame={45} duration={30} suffix="" /> billion
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary }}>
                attention operations
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={75} duration={22}>
            <div
              style={{
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '28px 32px',
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors.red,
                  marginBottom: 8,
                  letterSpacing: 1,
                }}
              >
                O(n²) Quadratic Complexity
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary, lineHeight: 1.55 }}>
                Doubling context length means{' '}
                <strong style={{ color: colors.red, fontWeight: 700 }}>4X the compute</strong>.
                Every token pair requires self-attention.
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={105} duration={22}>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                color: colors.textSecondary,
                lineHeight: 1.55,
                paddingLeft: 16,
                borderLeft: `2px solid ${colors.borderSubtle}`,
              }}
            >
              GPUs doing redundant prefill work across the cluster.
              Blocking the path to <strong style={{ color: colors.white, fontWeight: 600 }}>production-ready agentic AI</strong>.
            </div>
          </FadeIn>
        </div>

        {/* Right: animated problem bars */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            justifyContent: 'center',
          }}
        >
          {bars.map((item, i) => {
            const barSpring = spring({ frame: frame - item.delay, fps, config: { damping: 20, stiffness: 80 } });
            const opacity = Math.min(barSpring * 2, 1);

            return (
              <div key={i} style={{ opacity }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 600, color: colors.textSecondary }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 28, fontWeight: 700, color: barColor(item.value) }}>
                    {Math.round(item.value)}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 36,
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: `1px solid ${colors.borderSubtle}`,
                  }}
                >
                  <div
                    style={{
                      width: `${item.value}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${barColor(item.value)}CC, ${barColor(item.value)})`,
                      borderRadius: 18,
                      boxShadow: `0 0 20px ${barColor(item.value)}50`,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 60,
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))',
                        borderRadius: '0 18px 18px 0',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Warning callout */}
          <FadeIn delay={350} duration={25}>
            <div
              style={{
                background: `${colors.red}12`,
                border: `1px solid ${colors.red}25`,
                borderRadius: 14,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: colors.red,
                  boxShadow: `0 0 10px ${colors.red}`,
                }}
              />
              <span style={{ fontFamily: fonts.body, fontSize: 21, color: colors.red, fontWeight: 500 }}>
                Costs spiraling at scale
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </GradientBackground>
  );
};
