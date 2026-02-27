import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

export const Thumbnail: React.FC = () => {
  const frame = useCurrentFrame();
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

      {/* Top accent bar */}
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

      {/* Bottom accent bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 4,
          background: `linear-gradient(90deg, ${theme.colors.accent2}, ${theme.colors.accent})`,
        }}
      />

      {/* === LEFT SIDE: Title + chip, filling the left half === */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '52%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 60,
          zIndex: 2,
        }}
      >
        {/* "NVIDIA" */}
        <span
          style={{
            fontSize: 62,
            fontWeight: 700,
            color: theme.colors.textMuted,
            letterSpacing: 16,
            textTransform: 'uppercase',
          }}
        >
          NVIDIA
        </span>

        {/* "B300" — massive */}
        <span
          style={{
            fontSize: 360,
            fontWeight: 900,
            color: theme.colors.accent,
            lineHeight: 0.85,
            textShadow: `0 0 80px rgba(118,185,0,0.5), 0 0 160px rgba(118,185,0,0.2)`,
            marginLeft: -16,
          }}
        >
          B300
        </span>

        {/* "Blackwell Ultra" */}
        <span
          style={{
            fontSize: 82,
            fontWeight: 300,
            color: theme.colors.text,
            marginTop: 6,
            letterSpacing: 3,
          }}
        >
          Blackwell Ultra
        </span>

        {/* Chip + tagline row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 30,
          }}
        >
          {/* Chip */}
          <div
            style={{
              position: 'relative',
              width: 160,
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(118,185,0,${glowPulse * 0.35}) 0%, rgba(0,128,255,0.1) 50%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
            <Img
              src={staticFile('b300-chip.png')}
              style={{
                width: 140,
                objectFit: 'contain',
                filter: `drop-shadow(0 0 20px rgba(118,185,0,${glowPulse * 0.6}))`,
              }}
            />
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: theme.colors.accent2,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Architecture Deep Dive
          </span>
        </div>
      </div>

      {/* === RIGHT SIDE: Headshot filling the right half === */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 30,
          bottom: -60,
          width: '45%',
          zIndex: 3,
          // Fade left edge + fade bottom to cut off below chest
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 100%), ' +
            'linear-gradient(to bottom, black 0%, black 65%, transparent 80%)',
          WebkitMaskComposite: 'destination-in',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 100%), ' +
            'linear-gradient(to bottom, black 0%, black 65%, transparent 80%)',
          maskComposite: 'intersect',
        }}
      >
        <Img
          src={staticFile('narsi-headshot2.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
