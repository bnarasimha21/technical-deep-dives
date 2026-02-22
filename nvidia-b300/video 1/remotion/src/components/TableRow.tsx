import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface TableRowProps {
  cells: string[];
  delay?: number;
  isHeader?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  cellHighlightDelays?: (number | null)[];
  cellHighlightColor?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  cells,
  delay = 0,
  isHeader = false,
  highlight = false,
  highlightColor = theme.colors.accent,
  cellHighlightDelays,
  cellHighlightColor = theme.colors.accent,
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

  return (
    <tr
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {cells.map((cell, i) => {
        const cellHlDelay = cellHighlightDelays?.[i];
        const cellHlProgress = (cellHlDelay != null && frame >= cellHlDelay)
          ? spring({ frame: Math.max(0, frame - cellHlDelay), fps, config: { damping: 10, stiffness: 120 } })
          : 0;
        // Bounce: scale up to 1.8 then back to 1
        const bounceScale = cellHlProgress > 0
          ? interpolate(cellHlProgress, [0, 0.4, 1], [1, 1.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          : 1;
        const isHighlighted = cellHlProgress > 0.1;

        const cellStyle: React.CSSProperties = {
          padding: '18px 52px',
          borderBottom: isHeader ? `2px solid ${theme.colors.accent}` : `1px solid ${theme.colors.border}`,
          fontSize: isHeader ? 30 : 32,
          fontWeight: isHeader ? 700 : (highlight || isHighlighted) ? 700 : 400,
          color: isHeader
            ? theme.colors.accent
            : isHighlighted
              ? cellHighlightColor
              : highlight
                ? highlightColor
                : theme.colors.text,
          background: isHeader ? 'rgba(118, 185, 0, 0.1)' : 'transparent',
        };

        return (
          <td key={i} style={cellStyle}>
            <div style={{ transform: `scale(${bounceScale})`, display: 'inline-block' }}>
              {cell}
            </div>
          </td>
        );
      })}
    </tr>
  );
};
