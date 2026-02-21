import React from 'react';
import { Sequence, useVideoConfig, Audio, staticFile } from 'remotion';
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
      <Audio src={staticFile('scene5-tensor-cores.m4a')} />
      {/* Evolution table */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide>
          <SceneTitle title="5th-Gen Tensor Cores" subtitle="640 tensor cores. The generation matters more than the count." />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 900 }}>
            <tbody>
              <TableRow cells={['Gen', 'Architecture', 'Innovation']} isHeader delay={fps * 3} />
              <TableRow cells={['1st', 'Volta', 'Matrix multiply']} delay={fps * 6} />
              <TableRow cells={['2nd', 'Turing', 'INT8, INT4']} delay={fps * 9} />
              <TableRow cells={['3rd', 'Ampere', 'TF32, sparsity']} delay={fps * 12} />
              <TableRow cells={['4th', 'Hopper', 'FP8, Transformer Engine']} delay={fps * 15} />
              <TableRow cells={['5th', 'Blackwell', 'NVFP4, 2x attention']} delay={fps * 18} highlight />
            </tbody>
          </table>

          <FadeIn delay={fps * 22}>
            <p style={{ fontSize: 32, color: theme.colors.textMuted, marginTop: 20, textAlign: 'center' }}>
              Most production models today run in FP8. NVFP4 is the next step.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* NVFP4 precision comparison */}
      <Sequence from={fps * 25} durationInFrames={fps * 61}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="NVFP4: The Precision Revolution" subtitle="4-bit floating point with two-level scaling" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 1000 }}>
            <tbody>
              <TableRow cells={['Format', 'Bits/Weight', 'Memory Use', 'Compute', 'Accuracy Loss']} isHeader delay={fps * 3} />
              <TableRow cells={['FP16', '16', '1x', '1x', '0%']} delay={fps * 7} />
              <TableRow cells={['FP8', '8', '0.5x', '2x', '~0.5%']} delay={fps * 11} />
              <TableRow cells={['NVFP4', '4', '~0.29x (~3.5x savings)', '4x', '~1%']} delay={fps * 15} highlight />
            </tbody>
          </table>

          {/* NVFP4 bit layout diagram */}
          <FadeIn delay={fps * 21} style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {/* 16 FP4 weights */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 4,
                      background: 'rgba(118,185,0,0.15)',
                      border: `1px solid ${theme.colors.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontFamily: theme.fonts.mono,
                      color: theme.colors.accent,
                    }}
                  >
                    4b
                  </div>
                ))}
                {/* FP8 micro-scale */}
                <div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 68,
                      height: 44,
                      borderRadius: 4,
                      background: 'rgba(0,128,255,0.15)',
                      border: `1px solid ${theme.colors.accent2}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontFamily: theme.fonts.mono,
                      color: theme.colors.accent2,
                    }}
                  >
                    FP8
                  </div>
                  <span style={{ fontSize: 16, color: theme.colors.textMuted, marginTop: 2 }}>micro-scale</span>
                </div>
                {/* FP32 macro-scale */}
                <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 68,
                      height: 44,
                      borderRadius: 4,
                      background: 'rgba(210,153,34,0.15)',
                      border: `1px solid ${theme.colors.amber}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontFamily: theme.fonts.mono,
                      color: theme.colors.amber,
                    }}
                  >
                    FP32
                  </div>
                  <span style={{ fontSize: 16, color: theme.colors.textMuted, marginTop: 2 }}>macro-scale</span>
                </div>
              </div>
              <p style={{ fontSize: 26, color: theme.colors.textMuted, margin: 0 }}>
                16 weights in FP4 (4 bits each) + FP8 micro-scale factor + FP32 macro-scale factor
              </p>
              <p style={{ fontSize: 26, color: theme.colors.textMuted, margin: 0 }}>
                ~3.5x memory savings vs FP16 · <span style={{ color: theme.colors.accent }}>~1.8x savings vs FP8</span>
              </p>
            </div>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* DeepSeek-R1 real-world example */}
      <Sequence from={fps * 86} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Real-World Payoff" subtitle="DeepSeek-R1: 671 billion parameters" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 950 }}>
            <tbody>
              <TableRow cells={['GPU', 'Precision', 'Model Size', 'GPUs Needed']} isHeader delay={fps * 3} />
              <TableRow cells={['H100 (80 GB)', 'FP16', '1,342 GB', '17']} delay={fps * 7} highlightColor={theme.colors.red} highlight />
              <TableRow cells={['H100 (80 GB)', 'FP8', '~671 GB', '9']} delay={fps * 11} highlightColor={theme.colors.red} highlight />
              <TableRow cells={['B300 (288 GB)', 'NVFP4', '~383 GB', '2']} delay={fps * 15} highlight />
            </tbody>
          </table>

          <Callout delay={fps * 20} style={{ marginTop: 32, maxWidth: 800 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>9 GPUs down to 2.</span> Less hardware,
            less communication overhead, simpler deployment.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Attention acceleration + TMEM */}
      <Sequence from={fps * 111} durationInFrames={fps * 52}>
        <CenteredSlide>
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
            <StatBox number="2x" label="Attention Acceleration" delay={fps * 4} />
            <StatBox number="256 KB" label="Tensor Memory / SM" delay={fps * 4} />
          </div>

          <Callout delay={fps * 15} style={{ marginTop: 40, maxWidth: 900 }}>
            Softmax bottleneck solved: doubled special function unit throughput for the exponential and division
            operations that attention relies on.
          </Callout>

          <Callout delay={fps * 30} style={{ marginTop: 20, maxWidth: 900 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Tensor Memory (TMEM):</span> dedicated
            on-chip storage for intermediate matrix results. Reduces trips to main memory.
          </Callout>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
