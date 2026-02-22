import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface StatBoxProps {
  number: string;
  label: string;
  delay?: number;
  color?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  number,
  label,
  delay = 0,
  color = theme.colors.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

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
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 800,
          color,
          lineHeight: 1.1,
        }}
      >
        {number}
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
