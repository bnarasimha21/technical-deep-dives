import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

const pillars = [
  {
    label: 'Right Hardware',
    sublabel: 'NVIDIA Hopper H200 GPUs with 141GB HBM3e — the fastest memory available for inference workloads',
    color: colors.amber,
    icon: '⚙',
  },
  {
    label: 'Smart Routing',
    sublabel: 'KV-aware caching via NVIDIA Dynamo routes shared prefixes to warm GPUs — eliminating redundant prefill',
    color: colors.cyan,
    icon: '🔀',
  },
  {
    label: 'Cloud-Native Orchestration',
    sublabel: 'DigitalOcean Kubernetes (DOKS) with GPU Operator and managed infrastructure — weeks to days',
    color: colors.doBlue,
    icon: '☁',
  },
];

export const Scene6BiggerPicture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Gradient text shimmer effect
  const shimmerAngle = interpolate(frame, [0, 300], [135, 225], {
    extrapolateRight: 'extend',
  });

  return (
    <GradientBackground>
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: colors.doBlue,
              borderRadius: 2,
              boxShadow: `0 0 12px ${colors.doBlue}40`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 600,
              color: colors.doBlue,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            The Bigger Picture
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={8} duration={25}>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 54,
            color: colors.white,
            margin: 0,
            lineHeight: 1.15,
            maxWidth: 1000,
            letterSpacing: -1,
          }}
        >
          Powering the{' '}
          <span
            style={{
              background: `linear-gradient(${shimmerAngle}deg, ${colors.doBlue}, ${colors.workatoMagenta}, ${colors.doBlue})`,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Agentic Enterprise
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={35} duration={22}>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            color: colors.textSecondary,
            marginTop: 8,
            marginBottom: 0,
            fontWeight: 400,
          }}
        >
          Joint announcement — March 3, 2026
        </p>
      </FadeIn>

      {/* Three pillars — fill remaining vertical space */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          marginTop: 32,
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {pillars.map((pillar, i) => {
          const delay = 60 + i * 25;
          const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });
          const cardOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const float = cardOpacity >= 1
            ? Math.sin((frame - delay - 18) * 0.02 + i * 1.5) * 4
            : 0;

          const glowPulse = cardOpacity >= 1
            ? 0.15 + Math.sin((frame - delay) * 0.03 + i) * 0.1
            : 0;

          const connectorProgress = i < pillars.length - 1
            ? interpolate(frame, [delay + 30, delay + 55], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              })
            : 0;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${(1 - cardSpring) * 50 + float}px)`,
                  background: colors.bgCard,
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${pillar.color}20`,
                  borderRadius: 24,
                  padding: '48px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)`,
                    opacity: 0.6 + glowPulse,
                    boxShadow: `0 0 20px ${pillar.color}40`,
                  }}
                />

                {/* Background glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${pillar.color}10 0%, transparent 70%)`,
                    opacity: glowPulse * 3,
                    filter: 'blur(20px)',
                  }}
                />

                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: `${pillar.color}12`,
                    border: `1px solid ${pillar.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: 40 }}>{pillar.icon}</span>
                </div>
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: 700,
                    fontSize: 28,
                    color: colors.white,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {pillar.label}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 21,
                    color: colors.textSecondary,
                    textAlign: 'center',
                    position: 'relative',
                    lineHeight: 1.6,
                    maxWidth: 320,
                  }}
                >
                  {pillar.sublabel}
                </div>
              </div>
              {i < pillars.length - 1 && (
                <div
                  style={{
                    width: 50,
                    height: 2,
                    background: `linear-gradient(90deg, ${pillar.color}50, ${pillars[i + 1].color}50)`,
                    opacity: connectorProgress,
                    transform: `scaleX(${connectorProgress})`,
                    alignSelf: 'center',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Summary statement + co-brand */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
        <FadeIn delay={180} duration={30}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 24,
              color: colors.textSecondary,
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            Not just faster models — <strong style={{ color: colors.white, fontWeight: 600 }}>smarter infrastructure</strong>{' '}
            that changes the economics of AI inference.
          </div>
        </FadeIn>

        <FadeIn delay={220} duration={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {[
              { name: 'DigitalOcean', color: colors.doBlue },
              { name: 'Workato', color: colors.workatoPurple },
              { name: 'NVIDIA', color: colors.green },
            ].map((brand, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textMuted }}>+</span>
                )}
                <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 28, color: brand.color }}>
                  {brand.name}
                </span>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </GradientBackground>
  );
};
