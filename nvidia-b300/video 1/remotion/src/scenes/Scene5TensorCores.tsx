import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { TableRow } from '../components/TableRow';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

export const Scene5TensorCores: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Evolution table */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide>
          <SceneTitle title="5th-Gen Tensor Cores" subtitle="640 tensor cores. The generation matters more than the count." />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 700 }}>
            <tbody>
              <TableRow cells={['Gen', 'Architecture', 'Innovation']} isHeader delay={15} />
              <TableRow cells={['1st', 'Volta', 'Matrix multiply']} delay={30} />
              <TableRow cells={['2nd', 'Turing', 'INT8, INT4']} delay={42} />
              <TableRow cells={['3rd', 'Ampere', 'TF32, sparsity']} delay={54} />
              <TableRow cells={['4th', 'Hopper', 'FP8, Transformer Engine']} delay={66} />
              <TableRow cells={['5th', 'Blackwell', 'NVFP4, 2x attention']} delay={78} highlight />
            </tbody>
          </table>

          <FadeIn delay={fps * 4}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, marginTop: 20, textAlign: 'center' }}>
              Most production models today run in FP8. NVFP4 is the next step.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* NVFP4 precision comparison */}
      <Sequence from={fps * 25} durationInFrames={fps * 30}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="NVFP4: The Precision Revolution" subtitle="4-bit floating point with two-level scaling" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 800 }}>
            <tbody>
              <TableRow cells={['Format', 'Bits/Weight', 'Memory Use', 'Compute', 'Accuracy Loss']} isHeader delay={10} />
              <TableRow cells={['FP16', '16', '1x', '1x', '0%']} delay={25} />
              <TableRow cells={['FP8', '8', '0.5x', '2x', '~0.5%']} delay={40} />
              <TableRow cells={['NVFP4', '4', '~0.29x (~3.5x savings)', '4x', '~1%']} delay={55} highlight />
            </tbody>
          </table>

          <FadeIn delay={fps * 3} style={{ marginTop: 28 }}>
            <div
              style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
                color: theme.colors.textMuted,
              }}
            >
              <span>16 weights (FP4)</span>
              <span style={{ color: theme.colors.accent }}>+</span>
              <span>FP8 micro-scale</span>
              <span style={{ color: theme.colors.accent }}>+</span>
              <span>FP32 macro-scale</span>
            </div>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* DeepSeek-R1 real-world example */}
      <Sequence from={fps * 55} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Real-World Payoff" subtitle="DeepSeek-R1: 671 billion parameters" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 750 }}>
            <tbody>
              <TableRow cells={['GPU', 'Precision', 'Model Size', 'GPUs Needed']} isHeader delay={10} />
              <TableRow cells={['H100 (80 GB)', 'FP16', '1,342 GB', '17']} delay={25} highlightColor={theme.colors.red} highlight />
              <TableRow cells={['H100 (80 GB)', 'FP8', '~671 GB', '9']} delay={40} highlightColor={theme.colors.red} highlight />
              <TableRow cells={['B300 (288 GB)', 'NVFP4', '~383 GB', '2']} delay={55} highlight />
            </tbody>
          </table>

          <Callout delay={fps * 3} style={{ marginTop: 32, maxWidth: 800 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>9 GPUs down to 2.</span> Less hardware,
            less communication overhead, simpler deployment.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Attention acceleration + TMEM */}
      <Sequence from={fps * 80} durationInFrames={fps * 25}>
        <CenteredSlide>
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
            <StatBox number="2x" label="Attention Acceleration" delay={0} />
            <StatBox number="256 KB" label="Tensor Memory / SM" delay={15} />
          </div>

          <Callout delay={fps * 2} style={{ marginTop: 40, maxWidth: 900 }}>
            Softmax bottleneck solved: doubled special function unit throughput for the exponential and division
            operations that attention relies on.
          </Callout>

          <Callout delay={fps * 4} style={{ marginTop: 20, maxWidth: 900 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Tensor Memory (TMEM):</span> dedicated
            on-chip storage for intermediate matrix results. Reduces trips to main memory.
          </Callout>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
