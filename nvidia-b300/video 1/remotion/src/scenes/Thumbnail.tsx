import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../theme';

/**
 * YouTube Thumbnail — 1920×1080 (static frame, renders at frame 0)
 *
 * Layout:  Left side = big title text + subtitle
 *          Right side = B300 chip image with glow
 *          Bottom strip = 3 key stats
 *          "9 GPUs → 2" dramatic callout
 */
export const Thumbnail: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle glow pulse on the chip
  const glowPulse = 0.6 + Math.sin(frame * 0.1) * 0.3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bgDark,
        fontFamily: theme.fonts.heading,
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(118,185,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(118,185,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top-left green accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 6,
          background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accent2})`,
        }}
      />

      {/* Left side — Title block */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          zIndex: 2,
        }}
      >
        {/* "NVIDIA" label */}
        <span
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: theme.colors.textMuted,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          NVIDIA
        </span>

        {/* "B300" huge */}
        <span
          style={{
            fontSize: 200,
            fontWeight: 900,
            color: theme.colors.accent,
            lineHeight: 0.95,
            textShadow: `0 0 60px rgba(118,185,0,0.4), 0 0 120px rgba(118,185,0,0.2)`,
          }}
        >
          B300
        </span>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 52,
            fontWeight: 300,
            color: theme.colors.text,
            marginTop: 4,
          }}
        >
          Blackwell Ultra
        </span>

        {/* Tagline */}
        <span
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: theme.colors.accent2,
            marginTop: 20,
            letterSpacing: 1,
          }}
        >
          Architecture Deep Dive
        </span>
      </div>

      {/* Right side — B300 chip with glow */}
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 20,
          width: 700,
          height: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* Glow behind chip */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(118,185,0,${glowPulse * 0.25}) 0%, rgba(0,128,255,0.08) 50%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
        <Img
          src={staticFile('b300-chip.png')}
          style={{
            width: 550,
            objectFit: 'contain',
            filter: `drop-shadow(0 0 30px rgba(118,185,0,${glowPulse * 0.5}))`,
          }}
        />
      </div>

      {/* Bottom-left — Headshot (blended into dark bg) */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: 40,
          width: 420,
          height: 500,
          zIndex: 3,
          // Gradient mask: solid in the middle, fades out at edges and bottom
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 70%, transparent 100%), ' +
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskComposite: 'destination-in',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 70%, transparent 100%), ' +
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskComposite: 'intersect',
        }}
      >
        <Img
          src={staticFile('narsi-headshot2.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            // Mix-blend to merge white bg into dark thumbnail
            mixBlendMode: 'lighten',
          }}
        />
      </div>

      {/* Subtle diagonal accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 680,
          width: 2,
          height: '100%',
          background: `linear-gradient(180deg, transparent, rgba(118,185,0,0.15) 30%, rgba(0,128,255,0.15) 70%, transparent)`,
          transform: 'rotate(5deg)',
          transformOrigin: 'top center',
        }}
      />
    </AbsoluteFill>
  );
};
