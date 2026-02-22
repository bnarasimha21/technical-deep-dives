import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface GpuChipProps {
  name: string;
  delay?: number;
  active?: boolean;
  size?: number;
}

export const GpuChip: React.FC<GpuChipProps> = ({
  name,
  delay = 0,
  active = false,
  size = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        border: `2px solid ${active ? theme.colors.accent : theme.colors.border}`,
        background: active
          ? 'rgba(118, 185, 0, 0.15)'
          : 'rgba(255, 255, 255, 0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 700,
        color: active ? theme.colors.accent : theme.colors.textMuted,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {name}
    </div>
  );
};
