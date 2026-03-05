import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 20, direction = 'up', distance = 30, style }) => {
  const frame = useCurrentFrame();

  const easing = Easing.out(Easing.cubic);

  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  const translateMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = translateMap[direction];
  const tx = interpolate(frame, [delay, delay + duration], [x, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
  const ty = interpolate(frame, [delay, delay + duration], [y, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  return (
    <div style={{ opacity, transform: `translate(${tx}px, ${ty}px)`, ...style }}>
      {children}
    </div>
  );
};
