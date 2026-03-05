import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring-based "1 TRILLION" entrance
  const trillionSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 80 } });
  const trillionOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing glow behind the number — continuous breathing
  const glowPulse = 0.15 + Math.sin(frame * 0.04) * 0.1;
  const glowScale = 1 + Math.sin(frame * 0.025) * 0.15;

  // Shimmering line that sweeps across "1 TRILLION"
  const shimmerX = interpolate(frame, [40, 70], [-200, 2000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <GradientBackground>
      {/* Center content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 28,
          position: 'relative',
        }}
      >
        {/* Glow behind number */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.doBlue}25 0%, ${colors.workatoPurple}08 40%, transparent 65%)`,
            transform: `scale(${glowScale})`,
            opacity: glowPulse,
            filter: 'blur(30px)',
          }}
        />

        {/* "1 TRILLION" */}
        <div
          style={{
            opacity: trillionOpacity,
            transform: `scale(${0.6 + trillionSpring * 0.4})`,
            lineHeight: 1,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 170,
              color: colors.white,
              letterSpacing: -4,
            }}
          >
            1
          </span>
          <span
            style={{
              fontFamily: fonts.heading,
              fontWeight: 900,
              fontSize: 110,
              background: `linear-gradient(135deg, ${colors.doBlue}, ${colors.workatoMagenta})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 2,
              marginLeft: 16,
            }}
          >
            TRILLION
          </span>

          {/* Shimmer sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: shimmerX,
              width: 150,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none',
              transform: 'skewX(-15deg)',
            }}
          />
        </div>

        <FadeIn delay={55} duration={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 34,
              fontWeight: 400,
              color: colors.textSecondary,
              textAlign: 'center',
              letterSpacing: 1,
            }}
          >
            automated workloads every year
          </div>
        </FadeIn>

        {/* Thin divider line */}
        <div
          style={{
            width: interpolate(frame, [80, 110], [0, 200], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.textMuted}, transparent)`,
          }}
        />

        <FadeIn delay={95} duration={25}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 28,
              fontWeight: 400,
              color: colors.textMuted,
              textAlign: 'center',
              maxWidth: 850,
              lineHeight: 1.6,
            }}
          >
            How DigitalOcean, Workato, and NVIDIA came together to power the agentic enterprise
          </div>
        </FadeIn>
      </div>

    </GradientBackground>
  );
};
