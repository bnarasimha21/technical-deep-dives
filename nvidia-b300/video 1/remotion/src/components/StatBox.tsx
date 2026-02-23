import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface StatBoxProps {
  number: string;
  label: string;
  delay?: number;
  color?: string;
  /** Lower = slower counter roll-up. Default 80. */
  speed?: number;
}

/** Parse a stat string like "7.5x", "288", "2.1 TB", "~14 kW" into numeric + prefix/suffix */
function parseStat(raw: string): { prefix: string; value: number; decimals: number; suffix: string } {
  const match = raw.match(/^([^0-9]*?)([\d.]+)(.*)$/);
  if (!match) return { prefix: '', value: 0, decimals: 0, suffix: raw };
  const prefix = match[1]; // e.g. "~"
  const numStr = match[2]; // e.g. "14"
  const suffix = match[3]; // e.g. " kW"
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix, value: parseFloat(numStr), decimals, suffix };
}

export const StatBox: React.FC<StatBoxProps> = ({
  number,
  label,
  delay = 0,
  color = theme.colors.accent2,
  speed = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: speed },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Counter roll-up
  const { prefix, value, decimals, suffix } = parseStat(number);
  const hasNumeric = value > 0;
  const displayed = hasNumeric ? (value * progress).toFixed(decimals) : '';

  // Glow pulse — starts after the number has finished counting (progress ≈ 1)
  const glowFrame = frame - delay;
  const glowActive = progress > 0.95;
  const glowSpread = glowActive
    ? interpolate(Math.sin(glowFrame * 0.12), [-1, 1], [0, 15])
    : 0;
  const glowAlpha = glowActive
    ? interpolate(Math.sin(glowFrame * 0.12), [-1, 1], [0, 0.6])
    : 0;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '32px 48px',
        border: `2px solid ${color}`,
        borderRadius: 16,
        width: 420,
        opacity,
        transform: `scale(${scale})`,
        // Glassmorphism
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 800,
          color,
          lineHeight: 1.1,
          textShadow: glowActive
            ? `0 0 ${glowSpread}px ${color}99`
            : 'none',
        }}
      >
        {prefix}{displayed}{suffix}
      </div>
      <div
        style={{
          fontSize: 24,
          color: theme.colors.textMuted,
          marginTop: 10,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};
