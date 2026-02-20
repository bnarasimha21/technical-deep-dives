import React from 'react';
import { Sequence, useVideoConfig, Audio, staticFile, Img } from 'remotion';
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
      <Audio src={staticFile('scene3-numbers.m4a')} />
      {/* Comparison table */}
      <Sequence from={0} durationInFrames={fps * 58}>
        <CenteredSlide>
          <SceneTitle title="B300 vs B200 vs H100" />

          <table style={{ borderCollapse: 'collapse', marginTop: 40, minWidth: 1000 }}>
            <tbody>
              <TableRow cells={['Metric', 'H100', 'B200', 'B300']} isHeader delay={fps * 3} />
              <TableRow
                cells={['AI Compute', '2 PFLOPS (FP8 dense)', '10 PFLOPS (NVFP4)', '15 PFLOPS (NVFP4)']}
                delay={fps * 6}
                cellHighlightDelays={[null, fps * 15, fps * 12, fps * 8]}
              />
              <TableRow
                cells={['HBM3e Memory', '80 GB', '192 GB', '288 GB']}
                delay={fps * 23}
                cellHighlightDelays={[null, fps * 33, fps * 30, fps * 25]}
              />
              <TableRow
                cells={['Memory BW', '3.35 TB/s', '8 TB/s', '8 TB/s']}
                delay={fps * 49}
                cellHighlightDelays={[null, fps * 54, fps * 51, fps * 51]}
              />
              <TableRow
                cells={['NVLink BW', '900 GB/s', '1,800 GB/s', '1,800 GB/s']}
                delay={fps * 52}
                cellHighlightDelays={[null, fps * 54, fps * 51, fps * 51]}
              />
            </tbody>
          </table>

        </CenteredSlide>
      </Sequence>

      {/* DeepSeek R1 overlay at bottom — [36-49s] */}
      <Sequence from={fps * 36} durationInFrames={fps * 13}>
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <FadeIn delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Img
                src={staticFile('deepseek-r1.png')}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <p style={{ fontSize: 28, color: theme.colors.textMuted }}>
                DeepSeek-R1 (671B params) — ~383 GB in NVFP4 → fits on <span style={{ color: theme.colors.accent, fontWeight: 700 }}>just 2 B300s</span> vs 9 H100s
              </p>
            </div>
          </FadeIn>
        </div>
      </Sequence>

      {/* Power & efficiency callout */}
      <Sequence from={fps * 58} durationInFrames={fps * 40}>
        <CenteredSlide padding="0 140px">
          <SceneTitle title="The Trade-off: Power" />

          <div style={{ width: 900, marginTop: 32 }}>
            <Callout delay={fps * 4} color={theme.colors.amber} style={{ width: '100%' }}>
              <span style={{ color: theme.colors.amber, fontWeight: 700 }}>1,400W per GPU.</span> 200W more than
              B200, double the H100.
            </Callout>

            <Callout delay={fps * 15} color={theme.colors.amber} style={{ marginTop: 24, width: '100%' }}>
              An 8-GPU system draws <span style={{ color: theme.colors.amber, fontWeight: 700 }}>~14 kW</span>.
            </Callout>

            <Callout delay={fps * 26} color={theme.colors.accent} style={{ marginTop: 24, width: '100%' }}>
              <span style={{ color: theme.colors.accent, fontWeight: 700 }}>5x higher throughput per megawatt</span> vs
              Hopper.
            </Callout>

            <Callout delay={fps * 33} color={theme.colors.accent} style={{ marginTop: 24, width: '100%' }}>
              More power in, but each watt delivers significantly more useful AI work.
            </Callout>
          </div>

        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
