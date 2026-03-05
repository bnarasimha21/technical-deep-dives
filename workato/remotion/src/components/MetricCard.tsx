import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { colors, fonts } from '../theme';
import { AnimatedCounter } from './AnimatedCounter';

export const MetricCard: React.FC<{
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  delay?: number;
  color?: string;
}> = ({ value, suffix, label, sublabel, delay = 0, color = colors.doBlue }) => {
  const frame = useCurrentFrame();

  const easing = Easing.out(Easing.cubic);

  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  const translateY = interpolate(frame, [delay, delay + 22], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  const glowOpacity = interpolate(frame, [delay + 25, delay + 50], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  // Subtle breathing effect after reveal
  const breathe = frame > delay + 50
    ? Math.sin((frame - delay - 50) * 0.03) * 0.015
    : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${1 + breathe})`,
        background: colors.bgCard,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: 24,
        padding: '44px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent 10%, ${color} 50%, transparent 90%)`,
          opacity: glowOpacity + 0.5,
          boxShadow: `0 0 30px ${color}80`,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: 'blur(20px)',
        }}
      />

      <div
        style={{
          fontFamily: fonts.heading,
          fontWeight: 800,
          fontSize: 68,
          color: colors.white,
          lineHeight: 1,
          position: 'relative',
        }}
      >
        <AnimatedCounter
          to={value}
          startFrame={delay + 8}
          duration={35}
          suffix={suffix}
        />
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 22,
          color: colors.textSecondary,
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            color: colors.textMuted,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};
