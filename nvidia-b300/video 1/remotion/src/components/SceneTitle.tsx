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
    <div style={{ textAlign: 'center', marginBottom: 50 }}>
      <FadeIn delay={delay} direction="up">
        <h2
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: theme.colors.accent2,
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
              fontSize: 40,
              color: theme.colors.textMuted,
              marginTop: 16,
            }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
