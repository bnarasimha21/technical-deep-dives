import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

// VO timing (12.14s = 364 frames at 30fps):
// "As agentic workloads scale, smart infrastructure becomes the difference
//  between wasting capacity and building efficiently." → 0-240
// "Read the full blog for more details. Link below." → 240-364

export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathe = Math.sin(frame * 0.025) * 0.08;

  const brands = [
    { name: 'DigitalOcean', color: colors.doBlue, delay: 5 },
    { name: 'Workato', color: colors.workatoPurple, delay: 12 },
    { name: 'NVIDIA', color: colors.green, delay: 19 },
  ];

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
            width: interpolate(frame, [35, 65], [0, 400], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.textMuted}, transparent)`,
            marginBottom: 48,
          }}
        />

        {/* Tagline — matches VO */}
        <FadeIn delay={30} duration={28}>
          <div style={{ textAlign: 'center', maxWidth: 1000 }}>
            <div
              style={{
                fontFamily: fonts.heading,
                fontWeight: 700,
                fontSize: 44,
                color: colors.white,
                lineHeight: 1.35,
                letterSpacing: -0.5,
              }}
            >
              As agentic workloads scale, smart infrastructure becomes the difference between wasting capacity and building efficiently.
            </div>
          </div>
        </FadeIn>

        {/* CTA — matches VO: "Read the full blog for more details. Link below." */}
        <FadeIn delay={240} duration={25}>
          <div style={{ display: 'flex', gap: 20, marginTop: 48 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${colors.doBlue}30`,
                borderRadius: 16,
                padding: '20px 36px',
                boxShadow: `0 0 30px ${colors.doBlue}${Math.round(ctaGlow * 40).toString(16).padStart(2, '0')}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shimmer */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: interpolate(frame, [260, 460, 461, 660], [-200, 600, -200, 600], {
                    extrapolateRight: 'extend',
                  }),
                  width: 100,
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                  transform: 'skewX(-15deg)',
                }}
              />
              <span style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, position: 'relative' }}>
                Read the full blog
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: 20, color: colors.doBlue, fontWeight: 600, position: 'relative' }}>
                Link below ↓
              </span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom label */}
      <FadeIn delay={280} duration={18} style={{ alignSelf: 'center' }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
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
