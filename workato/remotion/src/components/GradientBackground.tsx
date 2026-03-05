import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, layout } from '../theme';
import { ensureFontsLoaded } from '../fonts';

export const GradientBackground: React.FC<{
  variant?: 'default' | 'problem' | 'solution' | 'results';
  children: React.ReactNode;
}> = ({ variant = 'default', children }) => {
  ensureFontsLoaded();
  const frame = useCurrentFrame();

  const gradients: Record<string, string> = {
    default: colors.gradientDark,
    problem: `linear-gradient(135deg, #1A0A0A 0%, #0A1628 50%, #1A0A2E 100%)`,
    solution: colors.gradientSubtle,
    results: `linear-gradient(135deg, #0A1628 0%, #0D2847 50%, #1A0A2E 100%)`,
  };

  // Slow breathing orb animation using sine waves
  const t = frame * 0.008;

  return (
    <div
      style={{
        width: layout.width,
        height: layout.height,
        background: gradients[variant],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Floating ambient orb - DigitalOcean blue */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.doBlue}18 0%, transparent 65%)`,
          top: -150 + Math.sin(t) * 50,
          right: -250 + Math.cos(t * 0.7) * 70,
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      {/* Floating ambient orb - Workato purple */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.workatoPurple}14 0%, transparent 65%)`,
          bottom: -200 + Math.sin(t * 0.6) * 40,
          left: -150 + Math.cos(t * 0.8) * 60,
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: layout.padding,
        }}
      >
        {children}
      </div>
    </div>
  );
};
