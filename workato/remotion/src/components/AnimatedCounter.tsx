import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const AnimatedCounter: React.FC<{
  from?: number;
  to: number;
  startFrame?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  format?: boolean;
  style?: React.CSSProperties;
}> = ({ from = 0, to, startFrame = 0, duration = 40, suffix = '', prefix = '', decimals = 0, format = false, style }) => {
  const frame = useCurrentFrame();

  const value = interpolate(frame, [startFrame, startFrame + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const display = format
    ? Math.round(value).toLocaleString()
    : value.toFixed(decimals);

  return (
    <span style={style}>
      {prefix}{display}{suffix}
    </span>
  );
};
