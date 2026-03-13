import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface TableRowProps {
  cells: string[];
  delay?: number;
  isHeader?: boolean;
  highlight?: boolean;
  highlightColor?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  cells,
  delay = 0,
  isHeader = false,
  highlight = false,
  highlightColor = theme.colors.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-30, 0]);

  const cellStyle: React.CSSProperties = {
    padding: '14px 24px',
    borderBottom: isHeader ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`,
    fontSize: isHeader ? 24 : 26,
    fontWeight: isHeader ? 700 : highlight ? 700 : 400,
    fontFamily: theme.fonts.body,
    color: isHeader
      ? theme.colors.accent
      : highlight
        ? highlightColor
        : theme.colors.text,
    background: isHeader ? 'rgba(118, 185, 0, 0.1)' : 'transparent',
  };

  return (
    <tr
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {cells.map((cell, i) => (
        <td key={i} style={cellStyle}>
          {cell}
        </td>
      ))}
    </tr>
  );
};
