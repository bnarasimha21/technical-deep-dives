import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous breathing glow
  const breathe = Math.sin(frame * 0.025) * 0.08;

  // Brand spring entrances
  const brands = [
    { name: 'DigitalOcean', color: colors.doBlue, delay: 8 },
    { name: 'Workato', color: colors.workatoPurple, delay: 16 },
    { name: 'NVIDIA', color: colors.green, delay: 24 },
  ];

  // CTA glow pulse
  const ctaGlow = 0.4 + Math.sin(frame * 0.04) * 0.15;

  return (
    <GradientBackground>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 0,
        }}
      >
        {/* Co-branded logos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginBottom: 48 }}>
          {brands.map((brand, i) => {
            const brandSpring = spring({ frame: frame - brand.delay, fps, config: { damping: 12, stiffness: 80 } });
            return (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div
                    style={{
                      width: 2,
                      height: interpolate(frame, [brand.delay, brand.delay + 30], [0, 56], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.out(Easing.cubic),
                      }),
                      background: colors.textMuted,
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: 800,
                    fontSize: 56,
                    color: brand.color,
                    opacity: brandSpring,
                    transform: `scale(${0.85 + brandSpring * (0.15 + breathe)})`,
                    display: 'inline-block',
                    letterSpacing: -1,
                  }}
                >
                  {brand.name}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Thin divider */}
        <div
          style={{
            width: interpolate(frame, [50, 80], [0, 400], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.textMuted}, transparent)`,
            marginBottom: 48,
          }}
        />

        {/* Tagline */}
        <FadeIn delay={45} duration={28}>
          <div style={{ textAlign: 'center', maxWidth: 900 }}>
            <div
              style={{
                fontFamily: fonts.heading,
                fontWeight: 700,
                fontSize: 46,
                color: colors.white,
                lineHeight: 1.3,
                letterSpacing: -0.5,
              }}
            >
              Powering the Agentic Enterprise
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 26,
                color: colors.textSecondary,
                marginTop: 16,
                lineHeight: 1.5,
              }}
            >
              with Production-Scale AI on the Agentic Inference Cloud
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={85} duration={25}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: colors.bgCard,
              backdropFilter: 'blur(16px)',
              border: `1px solid ${colors.doBlue}30`,
              borderRadius: 20,
              padding: '24px 48px',
              marginTop: 56,
              boxShadow: `0 0 40px ${colors.doBlue}${Math.round(ctaGlow * 60).toString(16).padStart(2, '0')}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: interpolate(frame, [100, 300, 301, 500], [-200, 600, -200, 600], {
                  extrapolateRight: 'extend',
                }),
                width: 100,
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                transform: 'skewX(-15deg)',
              }}
            />
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                color: colors.textSecondary,
                position: 'relative',
              }}
            >
              Read the full deep dive
            </span>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 20,
                color: colors.doBlue,
                fontWeight: 600,
                position: 'relative',
              }}
            >
              digitalocean.com/blog
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <FadeIn delay={110} duration={18} style={{ alignSelf: 'center' }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            fontWeight: 500,
            color: colors.textMuted,
            letterSpacing: 3,
          }}
        >
          MARCH 2026
        </div>
      </FadeIn>
    </GradientBackground>
  );
};
