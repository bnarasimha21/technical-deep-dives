import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { colors, fonts } from '../theme';

interface DataPoint {
  x: number;
  y: number;
}

interface ChartSeries {
  label: string;
  data: DataPoint[];
  color: string;
}

interface BenchmarkChartProps {
  series: ChartSeries[];
  xLabel: string;
  yLabel: string;
  yMax?: number;
  yTickCount?: number;
  formatY?: (v: number) => string;
  highlightLast?: boolean;
}

export const BenchmarkChart: React.FC<BenchmarkChartProps> = ({
  series,
  xLabel,
  yLabel,
  yMax: yMaxProp,
  yTickCount = 5,
  formatY = (v) => v.toLocaleString(),
  highlightLast = true,
}) => {
  const frame = useCurrentFrame();

  const W = 680;
  const H = 420;
  const pad = { top: 40, right: 40, bottom: 56, left: 80 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  // Scales
  const allX = series.flatMap((s) => s.data.map((d) => d.x));
  const allY = series.flatMap((s) => s.data.map((d) => d.y));
  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const yMax = yMaxProp ?? Math.ceil(Math.max(...allY) * 1.15);

  const sx = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * cW;
  const sy = (y: number) => pad.top + cH - (y / yMax) * cH;

  // Animations
  const gridFade = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const draw = interpolate(frame, [8, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelFade = interpolate(frame, [48, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Y ticks
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((yMax / yTickCount) * i),
  );
  const xVals = [...new Set(allX)].sort((a, b) => a - b);

  // Path helpers
  const toPath = (data: DataPoint[]) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${sx(d.x)},${sy(d.y)}`).join(' ');

  const pathLen = (data: DataPoint[]) => {
    let l = 0;
    for (let i = 1; i < data.length; i++) {
      const dx = sx(data[i].x) - sx(data[i - 1].x);
      const dy = sy(data[i].y) - sy(data[i - 1].y);
      l += Math.sqrt(dx * dx + dy * dy);
    }
    return l;
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect width={W} height={H} rx={16} fill="#0B1622" />

      {/* Grid */}
      <g opacity={gridFade * 0.35}>
        {yTicks.map((t, i) => (
          <line
            key={`yg${i}`}
            x1={pad.left}
            y1={sy(t)}
            x2={W - pad.right}
            y2={sy(t)}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
          />
        ))}
        {xVals.map((x, i) => (
          <line
            key={`xg${i}`}
            x1={sx(x)}
            y1={pad.top}
            x2={sx(x)}
            y2={pad.top + cH}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
      </g>

      {/* Y-axis labels */}
      {yTicks.map((t, i) => (
        <text
          key={`yl${i}`}
          x={pad.left - 10}
          y={sy(t) + 4}
          textAnchor="end"
          fill="rgba(255,255,255,0.45)"
          fontSize={11}
          fontFamily={fonts.mono}
          opacity={gridFade}
        >
          {formatY(t)}
        </text>
      ))}

      {/* X-axis labels */}
      {xVals.map((x, i) => (
        <text
          key={`xl${i}`}
          x={sx(x)}
          y={pad.top + cH + 22}
          textAnchor="middle"
          fill="rgba(255,255,255,0.45)"
          fontSize={11}
          fontFamily={fonts.mono}
          opacity={gridFade}
        >
          {x}
        </text>
      ))}

      {/* Axis titles */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize={12}
        fontFamily={fonts.body}
        opacity={gridFade}
      >
        {xLabel}
      </text>
      <text
        x={14}
        y={pad.top + cH / 2}
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize={12}
        fontFamily={fonts.body}
        opacity={gridFade}
        transform={`rotate(-90, 14, ${pad.top + cH / 2})`}
      >
        {yLabel}
      </text>

      {/* Glow filter */}
      <defs>
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Data lines */}
      {series.map((s, i) => {
        const d = toPath(s.data);
        const len = pathLen(s.data);
        const offset = len * (1 - draw);

        return (
          <g key={`s${i}`}>
            {/* Glow */}
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={len}
              strokeDashoffset={offset}
              filter="url(#lineGlow)"
              opacity={0.3}
            />
            {/* Line */}
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={len}
              strokeDashoffset={offset}
            />
            {/* Data dots */}
            {s.data.map((pt, j) => {
              const t = j / (s.data.length - 1);
              const dotOpacity = interpolate(draw, [t * 0.85, t * 0.85 + 0.15], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              return (
                <circle
                  key={`d${j}`}
                  cx={sx(pt.x)}
                  cy={sy(pt.y)}
                  r={3.5 * dotOpacity}
                  fill={s.color}
                  opacity={dotOpacity}
                />
              );
            })}

            {/* Endpoint label (last data point) */}
            {highlightLast && (() => {
              const last = s.data[s.data.length - 1];
              const labelY = sy(last.y);
              const isTop = i === 0;
              return (
                <g opacity={labelFade}>
                  <rect
                    x={sx(last.x) + 8}
                    y={labelY + (isTop ? -10 : -10)}
                    width={formatY(last.y).length * 8 + 16}
                    height={22}
                    rx={6}
                    fill={`${s.color}20`}
                    stroke={s.color}
                    strokeWidth={1}
                  />
                  <text
                    x={sx(last.x) + 16}
                    y={labelY + (isTop ? 5 : 5)}
                    fill={s.color}
                    fontSize={12}
                    fontWeight={700}
                    fontFamily={fonts.mono}
                  >
                    {formatY(last.y)}
                  </text>
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* Legend */}
      <g opacity={labelFade}>
        {series.map((s, i) => (
          <g key={`lg${i}`}>
            <rect
              x={pad.left + i * 180}
              y={12}
              width={12}
              height={12}
              rx={3}
              fill={s.color}
            />
            <text
              x={pad.left + i * 180 + 18}
              y={22}
              fill="rgba(255,255,255,0.7)"
              fontSize={12}
              fontFamily={fonts.body}
              fontWeight={500}
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};
