import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { TableRow } from '../components/TableRow';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene3Numbers: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Comparison table */}
      <Sequence from={0} durationInFrames={fps * 40}>
        <CenteredSlide>
          <SceneTitle title="B300 vs B200 vs H100" subtitle="Headline numbers, side by side" />

          <table style={{ borderCollapse: 'collapse', marginTop: 40, minWidth: 800 }}>
            <tbody>
              <TableRow cells={['Metric', 'H100', 'B200', 'B300']} isHeader delay={15} />
              <TableRow cells={['FP4 Dense', '2 PFLOPS*', '10 PFLOPS', '15 PFLOPS']} delay={30} highlight />
              <TableRow cells={['HBM3e Memory', '80 GB', '192 GB', '288 GB']} delay={45} highlight />
              <TableRow cells={['Memory BW', '3.35 TB/s', '8 TB/s', '8 TB/s']} delay={60} />
              <TableRow cells={['NVLink BW', '900 GB/s', '1,800 GB/s', '1,800 GB/s']} delay={75} />
              <TableRow
                cells={['TDP', '700W', '1,200W', '1,400W']}
                delay={90}
                highlight
                highlightColor={theme.colors.amber}
              />
            </tbody>
          </table>

          <FadeIn delay={fps * 4} style={{ marginTop: 24 }}>
            <p style={{ fontSize: 20, color: theme.colors.textMuted }}>*H100 equivalent with INT8/FP8</p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Power & efficiency callout */}
      <Sequence from={fps * 40} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 140px">
          <SceneTitle title="The Trade-off: Power" />

          <Callout delay={15} style={{ marginTop: 40, maxWidth: 900 }}>
            <span style={{ color: theme.colors.amber, fontWeight: 700 }}>1,400W per GPU.</span> 200W more than
            B200, double the H100. An 8-GPU system draws ~14 kW.
          </Callout>

          <Callout delay={fps * 2} style={{ marginTop: 24, maxWidth: 900 }}>
            But NVIDIA claims{' '}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>5x higher throughput per megawatt</span> vs
            Hopper. More power in, but each watt delivers significantly more useful AI work.
          </Callout>

          <FadeIn delay={fps * 4} style={{ marginTop: 40 }}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center' }}>
              Air-cooled configurations available. Liquid cooling for higher-density deployments.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
