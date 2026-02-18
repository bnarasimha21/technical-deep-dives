import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 40,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const translateMap = {
    up: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    down: `translateY(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    left: `translateX(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    none: 'none',
  };

  return (
    <div
      style={{
        opacity,
        transform: translateMap[direction],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
