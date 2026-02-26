import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile, Img, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { TableRow } from '../components/TableRow';
import { FadeIn } from '../components/FadeIn';
import { theme } from '../theme';

/** Glassmorphism info card for the DeepSeek overlay */
const InfoOverlay: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 60 } });
  const scale = interpolate(pop, [0, 0.5, 0.8, 1], [0.9, 1.03, 0.98, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(pop, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 14,
        padding: '20px 32px',
      }}
    >
      {children}
    </div>
  );
};

/** Animated power pill — horizontal bar with icon, value, and description */
const PowerPill: React.FC<{
  icon: string;
  value: string;
  desc: string;
  delay: number;
  color: string;
}> = ({ icon, value, desc, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 70 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-60, 0]);
  const scaleX = interpolate(progress, [0, 0.3, 1], [0.6, 1.02, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) scaleX(${scaleX})`,
        transformOrigin: 'left center',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 48,
        padding: '28px 48px 28px 40px',
        width: 960,
      }}
    >
      <div style={{ fontSize: 48, flexShrink: 0, lineHeight: 1 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 34, fontWeight: 700, color }}>
          {value}
        </div>
        <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 4 }}>
          {desc}
        </div>
      </div>
    </div>
  );
};

export const Scene3Numbers: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene3-numbers.m4a')} />
      {/* Comparison table */}
      <Sequence from={0} durationInFrames={fps * 57}>
        <CenteredSlide>
          <SceneTitle title="B300 vs B200 vs H100" />

          {/* Glassmorphism table wrapper */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: '8px 16px',
              marginTop: 40,
            }}
          >
            <table style={{ borderCollapse: 'collapse', minWidth: 1000 }}>
              <tbody>
                <TableRow cells={['Metric', 'H100', 'B200', 'B300']} isHeader delay={fps * 2} />
                <TableRow
                  cells={['AI Compute', '2 PFLOPS (FP8 dense)', '10 PFLOPS (NVFP4)', '15 PFLOPS (NVFP4)']}
                  delay={fps * 5}
                  cellHighlightDelays={[null, fps * 13, fps * 10, fps * 7]}
                />
                <TableRow
                  cells={['HBM3e Memory', '80 GB', '192 GB', '288 GB']}
                  delay={fps * 22}
                  cellHighlightDelays={[null, fps * 32, fps * 29, fps * 24]}
                />
                <TableRow
                  cells={['Memory BW', '3.35 TB/s', '8 TB/s', '8 TB/s']}
                  delay={fps * 48}
                  cellHighlightDelays={[null, fps * 54, fps * 50, fps * 50]}
                />
                <TableRow
                  cells={['NVLink BW', '900 GB/s', '1,800 GB/s', '1,800 GB/s']}
                  delay={fps * 51}
                  cellHighlightDelays={[null, fps * 54, fps * 50, fps * 50]}
                />
              </tbody>
            </table>
          </div>

        </CenteredSlide>
      </Sequence>

      {/* DeepSeek R1 overlay at bottom — [35-48s] */}
      <Sequence from={fps * 35} durationInFrames={fps * 13}>
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <InfoOverlay delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Img
                src={staticFile('deepseek-r1.png')}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <p style={{ fontSize: 28, color: theme.colors.textMuted }}>
                DeepSeek-R1 (671B params): ~383 GB in NVFP4 → fits on <span style={{ color: theme.colors.accent, fontWeight: 700 }}>just 2 B300s</span> vs 9 H100s
              </p>
            </div>
          </InfoOverlay>
        </div>
      </Sequence>

      {/* Power & efficiency */}
      <Sequence from={fps * 57} durationInFrames={fps * 37}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="The Trade-off: Power" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, alignItems: 'center', marginTop: 40 }}>
            <PowerPill
              icon=""
              value="1,400W per GPU"
              desc="200W more than B200, double the H100"
              delay={fps * 3}
              color={theme.colors.amber}
            />
            <PowerPill
              icon=""
              value="~14 kW per 8-GPU system"
              desc="Significant datacenter power budget"
              delay={fps * 14}
              color={theme.colors.amber}
            />
            <PowerPill
              icon=""
              value="5x throughput per megawatt"
              desc="vs Hopper: each watt delivers more useful AI work"
              delay={fps * 25}
              color={theme.colors.accent}
            />
          </div>

        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
