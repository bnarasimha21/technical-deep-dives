import React from 'react';
import { theme } from '../theme';
import { FadeIn } from './FadeIn';

interface CalloutProps {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const Callout: React.FC<CalloutProps> = ({
  children,
  delay = 0,
  color = theme.colors.accent,
  style,
}) => {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          background: `${color}14`,
          borderLeft: `4px solid ${color}`,
          padding: '24px 36px',
          borderRadius: '0 12px 12px 0',
          fontSize: 36,
          lineHeight: 1.6,
          ...style,
        }}
      >
        {children}
      </div>
    </FadeIn>
  );
};
