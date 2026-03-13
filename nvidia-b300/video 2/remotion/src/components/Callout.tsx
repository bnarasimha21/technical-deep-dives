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
          background: 'rgba(118, 185, 0, 0.08)',
          borderLeft: `4px solid ${color}`,
          padding: '18px 28px',
          borderRadius: '0 12px 12px 0',
          fontSize: 28,
          lineHeight: 1.6,
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
          ...style,
        }}
      >
        {children}
      </div>
    </FadeIn>
  );
};
