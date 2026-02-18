import React from 'react';
import { theme } from '../theme';
import { FadeIn } from './FadeIn';

interface SceneTitleProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

export const SceneTitle: React.FC<SceneTitleProps> = ({ title, subtitle, delay = 0 }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <FadeIn delay={delay} direction="up">
        <h2
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: theme.colors.accent,
            margin: 0,
            fontFamily: theme.fonts.heading,
          }}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={delay + 10} direction="up">
          <p
            style={{
              fontSize: 32,
              color: theme.colors.textMuted,
              marginTop: 12,
            }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
