import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { colors, fonts } from '../theme';

/**
 * Teaser montage intro — quick flashes of key stats/concepts
 * that build curiosity before the hook lands.
 */

const teaserCards = [
  {
    stat: '100K+',
    label: 'token prompts',
    color: colors.red,
    startFrame: 20,
    endFrame: 75,
  },
  {
    stat: '10B',
    label: 'attention ops per request',
    color: colors.amber,
    startFrame: 70,
    endFrame: 125,
  },
  {
    stat: '80%+',
    label: 'GPU cycles wasted',
    color: colors.red,
    startFrame: 120,
    endFrame: 175,
  },
  {
    stat: '67%',
    label: 'lower inference cost',
    color: colors.green,
    startFrame: 170,
    endFrame: 225,
  },
];

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background pulse
  const pulseScale = 1 + Math.sin(frame * 0.04) * 0.06;
  const pulseOpacity = interpolate(frame, [0, 20], [0, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "What if..." text
  const whatIfOpacity = interpolate(frame, [0, 22, 55, 72], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const whatIfY = interpolate(frame, [0, 22], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Final flash — everything fades, single line remains
  const finalOpacity = interpolate(frame, [220, 245], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalScale = interpolate(frame, [220, 250], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Scan line effect
  const scanY = interpolate(frame, [0, 300], [-100, 1180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.doBlue}12 0%, ${colors.workatoPurple}08 40%, transparent 65%)`,
            transform: `scale(${pulseScale})`,
            opacity: pulseOpacity,
            filter: 'blur(60px)',
          }}
        />

        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: scanY,
            height: 2,
            background: `linear-gradient(90deg, transparent 5%, ${colors.cyan}30 30%, ${colors.cyan}50 50%, ${colors.cyan}30 70%, transparent 95%)`,
            filter: 'blur(1px)',
            pointerEvents: 'none',
          }}
        />

        {/* "What if..." opener */}
        <div
          style={{
            opacity: whatIfOpacity,
            transform: `translateY(${whatIfY}px)`,
            fontFamily: fonts.body,
            fontSize: 32,
            fontWeight: 400,
            color: colors.textSecondary,
            letterSpacing: 1,
            marginBottom: 60,
            position: 'absolute',
            top: '28%',
          }}
        >
          What if the same hardware could do more?
        </div>

        {/* Teaser stat flashes */}
        {teaserCards.map((card, i) => {
          const cardOpacity = interpolate(
            frame,
            [card.startFrame, card.startFrame + 12, card.endFrame - 12, card.endFrame],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const cardScale = interpolate(
            frame,
            [card.startFrame, card.startFrame + 15],
            [0.85, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.back(1.2)),
            }
          );

          // Stagger positions — alternate left/right of center
          const xOffset = i % 2 === 0 ? -220 : 220;
          const yOffset = i < 2 ? -40 : 40;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                opacity: cardOpacity,
                transform: `scale(${cardScale}) translate(${xOffset}px, ${yOffset}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 800,
                  fontSize: 88,
                  color: card.color,
                  lineHeight: 1,
                  letterSpacing: -3,
                  textShadow: `0 0 40px ${card.color}40`,
                }}
              >
                {card.stat}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 22,
                  fontWeight: 500,
                  color: colors.textSecondary,
                  letterSpacing: 1,
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}

        {/* Final line — builds curiosity */}
        <div
          style={{
            opacity: finalOpacity,
            transform: `scale(${finalScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: 44,
              color: colors.white,
              letterSpacing: -0.5,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            It's not a new GPU.
            <br />
            <span style={{ color: colors.cyan }}>It's a smarter route.</span>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};
