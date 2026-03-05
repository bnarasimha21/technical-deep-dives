import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

const brands = [
  { name: 'DigitalOcean', color: colors.doBlue, delay: 20 },
  { name: 'Workato', color: colors.workatoPurple, delay: 35 },
  { name: 'NVIDIA', color: colors.green, delay: 50 },
];

export const Scene0Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowScale = 1 + Math.sin(frame * 0.02) * 0.12;
  const glowOpacity = interpolate(frame, [0, 40], [0, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const xOpacity = (delay: number) =>
    interpolate(frame, [delay + 5, delay + 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <GradientBackground>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.doBlue}20 0%, ${colors.workatoPurple}10 40%, transparent 65%)`,
            transform: `scale(${glowScale})`,
            opacity: glowOpacity,
            filter: 'blur(40px)',
          }}
        />

        {/* Brand names in a horizontal row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            position: 'relative',
          }}
        >
          {brands.map((brand, i) => {
            const brandSpring = spring({
              frame: frame - brand.delay,
              fps,
              config: { damping: 14, stiffness: 80 },
            });
            const brandOpacity = interpolate(frame, [brand.delay, brand.delay + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span
                    style={{
                      opacity: xOpacity(brand.delay),
                      fontFamily: fonts.body,
                      fontSize: 32,
                      fontWeight: 400,
                      color: colors.textMuted,
                      marginLeft: 36,
                      marginRight: 36,
                    }}
                  >
                    x
                  </span>
                )}
                <span
                  style={{
                    opacity: brandOpacity,
                    transform: `scale(${0.85 + brandSpring * 0.15})`,
                    display: 'inline-block',
                    fontFamily: fonts.heading,
                    fontWeight: 800,
                    fontSize: 72,
                    color: brand.color,
                    letterSpacing: -2,
                  }}
                >
                  {brand.name}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Subtle horizontal line */}
        <div
          style={{
            width: interpolate(frame, [75, 105], [0, 200], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.textMuted}, transparent)`,
            marginTop: 48,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(frame, [90, 115], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [90, 115], [15, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            })}px)`,
            fontFamily: fonts.body,
            fontSize: 28,
            fontWeight: 400,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: 32,
            letterSpacing: 1,
          }}
        >
          Powering the Agentic Enterprise
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <FadeIn delay={80} duration={18}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 500,
              color: colors.textMuted,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Customer Story
          </div>
        </FadeIn>
        <FadeIn delay={90} duration={18}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 500,
              color: colors.textMuted,
              background: colors.bgCard,
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${colors.borderSubtle}`,
            }}
          >
            March 2026
          </div>
        </FadeIn>
      </div>
    </GradientBackground>
  );
};
