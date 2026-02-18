import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';

export const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bgDark,
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
