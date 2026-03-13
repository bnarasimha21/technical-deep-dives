import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';

interface CenteredSlideProps {
  children: React.ReactNode;
  padding?: string;
}

export const CenteredSlide: React.FC<CenteredSlideProps> = ({
  children,
  padding = '0 120px',
}) => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
