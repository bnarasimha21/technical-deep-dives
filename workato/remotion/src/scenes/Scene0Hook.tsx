import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { colors, fonts } from '../theme';

// VO timing (20.86s = 626 frames at 30fps):
// "Same GPUs. Same model." → 0-90
// "But this one has 77% faster TTFT," → 90-210
// "67% lower cost" → 210-290
// "and 40% fewer GPUs." → 290-360
// "How?" → 360-400
// "It comes down to a single infrastructure trick, implemented for a company pushing LLMs to the limit." → 400-626

const stats = [
  { value: '77', unit: '%', label: 'Faster Time-to-First-Token', color: colors.cyan, fadeIn: 90, holdEnd: 195, fadeOut: 215 },
  { value: '67', unit: '%', label: 'Lower Inference Cost', color: colors.green, fadeIn: 215, holdEnd: 275, fadeOut: 295 },
  { value: '40', unit: '%', label: 'Fewer GPUs', color: colors.amber, fadeIn: 295, holdEnd: 345, fadeOut: 365 },
];

export const Scene0Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: "SAME GPUs" / "SAME MODEL" (0-90) ---
  const line1Spring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 70 } });
  const line2Spring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 70 } });
  const linesOpacity = interpolate(frame, [75, 95], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Horizontal accent bars
  const bar1Width = interpolate(frame, [5, 50], [0, 500], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const bar2Width = interpolate(frame, [40, 80], [0, 420], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  // --- Phase 3: "How?" (360-400) ---
  const howOpacity = interpolate(frame, [355, 370, 390, 410], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const howScale = spring({ frame: frame - 355, fps, config: { damping: 8, stiffness: 100 } });

  // --- Phase 4: Tagline (410-626) ---
  const taglineOpacity = interpolate(frame, [410, 445], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [410, 460], [30, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  // Accent line under tagline
  const accentLineWidth = interpolate(frame, [450, 520], [0, 500], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  // Background glow (appears with stats)
  const glowScale = 1 + Math.sin(frame * 0.025) * 0.1;
  const glowOpacity = interpolate(frame, [90, 130], [0, 0.35], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <GradientBackground variant="hook">
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
        {/* Background glow pulse */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.cyan}20 0%, ${colors.doBlue}10 40%, transparent 65%)`,
            transform: `scale(${glowScale})`,
            opacity: glowOpacity,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Phase 1: "SAME GPUs" slides in from left */}
        <div
          style={{
            opacity: line1Spring * linesOpacity,
            transform: `translateX(${(1 - line1Spring) * -120}px)`,
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 72,
            color: colors.white,
            letterSpacing: 6,
            textTransform: 'uppercase',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              width: bar1Width,
              height: 3,
              background: `linear-gradient(90deg, ${colors.cyan}, transparent)`,
              position: 'absolute',
              left: -bar1Width - 30,
              top: '50%',
              opacity: 0.5,
            }}
          />
          Same GPUs
        </div>

        {/* "SAME MODEL" slides in from right */}
        <div
          style={{
            opacity: line2Spring * linesOpacity,
            transform: `translateX(${(1 - line2Spring) * 120}px)`,
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 72,
            color: colors.white,
            letterSpacing: 6,
            textTransform: 'uppercase',
            position: 'absolute',
            marginTop: 90,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          Same Model
          <div
            style={{
              width: bar2Width,
              height: 3,
              background: `linear-gradient(270deg, ${colors.doBlue}, transparent)`,
              position: 'absolute',
              right: -bar2Width - 30,
              top: '50%',
              opacity: 0.5,
            }}
          />
        </div>

        {/* Phase 2: Stats cycling (77% → 67% → 40%) */}
        {stats.map((stat) => {
          const statOpacity = interpolate(
            frame,
            [stat.fadeIn, stat.fadeIn + 12, stat.holdEnd, stat.fadeOut],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          const statScale = spring({
            frame: frame - stat.fadeIn,
            fps,
            config: { damping: 10, stiffness: 50 },
          });

          if (statOpacity <= 0) return null;

          return (
            <div
              key={stat.label}
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: statOpacity,
                transform: `scale(${0.7 + statScale * 0.3})`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 800,
                  fontSize: 200,
                  color: colors.white,
                  lineHeight: 1,
                  letterSpacing: -8,
                  textShadow: `0 0 80px ${stat.color}30`,
                }}
              >
                {stat.value}
                <span style={{ fontSize: 120, color: stat.color }}>{stat.unit}</span>
              </div>
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 600,
                  fontSize: 38,
                  color: stat.color,
                  marginTop: 8,
                  letterSpacing: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}

        {/* Phase 3: "How?" */}
        <div
          style={{
            position: 'absolute',
            opacity: howOpacity,
            transform: `scale(${0.6 + howScale * 0.4})`,
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 120,
            color: colors.white,
            letterSpacing: -4,
          }}
        >
          How?
        </div>

        {/* Phase 4: Tagline */}
        <div
          style={{
            position: 'absolute',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: 42,
              color: colors.white,
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            A single infrastructure trick
          </div>
          <div
            style={{
              width: accentLineWidth,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.cyan}80, transparent)`,
            }}
          />
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 30,
              fontWeight: 400,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Implemented for a company pushing LLMs to the limit.
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};
