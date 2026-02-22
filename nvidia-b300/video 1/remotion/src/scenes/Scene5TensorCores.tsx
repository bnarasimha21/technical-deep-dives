import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { TableRow } from '../components/TableRow';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

const Fp4Box: React.FC<{ index: number; baseDelay: number }> = ({ index, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = baseDelay + index * 2; // stagger each box by 2 frames
  const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.1, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 6,
        background: 'rgba(118,185,0,0.15)',
        border: `2px solid ${theme.colors.accent}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: theme.fonts.mono,
        color: theme.colors.accent,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      4b
    </div>
  );
};

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
              <TableRow cells={['1st', 'Volta', 'Matrix multiply']} delay={fps * 11} />
              <TableRow cells={['2nd', 'Turing', 'INT8, INT4']} delay={fps * 14} />
              <TableRow cells={['3rd', 'Ampere', 'TF32, sparsity']} delay={fps * 16} />
              <TableRow cells={['4th', 'Hopper', 'FP8, Transformer Engine']} delay={fps * 18} />
              <TableRow cells={['5th', 'Blackwell', 'NVFP4, 2x attention']} delay={fps * 20} highlight />
            </tbody>
          </table>

        </CenteredSlide>
      </Sequence>

      {/* NVFP4 precision comparison */}
      <Sequence from={fps * 25} durationInFrames={fps * 61}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="NVFP4: The Precision Revolution" subtitle="4-bit floating point with two-level scaling" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 1000 }}>
            <tbody>
              <TableRow cells={['Format', 'Bits/Weight', 'Memory Use', 'Compute', 'Accuracy Loss']} isHeader delay={fps * 3} />
              <TableRow cells={['FP16', '16', '1x', '1x', '0%']} delay={fps * 3} cellHighlightDelays={[null, null, fps * 16, null, null]} cellHighlightColor={theme.colors.amber} />
              <TableRow cells={['FP8', '8', '0.5x', '2x', '~0.5%']} delay={fps * 3} cellHighlightDelays={[null, null, fps * 16, fps * 16, null]} cellHighlightColor={theme.colors.accent2} />
              <TableRow cells={['NVFP4', '4', '~0.29x (~3.5x savings)', '4x', '~1%']} delay={fps * 11} highlight cellHighlightDelays={[fps * 11, fps * 11, fps * 16, fps * 52, fps * 56]} />
            </tbody>
          </table>

          {/* NVFP4 bit layout diagram — staggered */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {/* 16 FP4 weights — appear one by one */}
              {Array.from({ length: 16 }).map((_, i) => (
                <Fp4Box key={i} index={i} baseDelay={fps * 21} />
              ))}
              {/* FP8 micro-scale */}
              <FadeIn delay={fps * 28} style={{ marginLeft: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 88,
                    height: 56,
                    borderRadius: 6,
                    background: 'rgba(0,128,255,0.15)',
                    border: `2px solid ${theme.colors.accent2}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: theme.fonts.mono,
                    color: theme.colors.accent2,
                  }}
                >
                  FP8
                </div>
                <span style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 4 }}>micro-scale</span>
              </FadeIn>
              {/* FP32 macro-scale */}
              <FadeIn delay={fps * 34} style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 88,
                    height: 56,
                    borderRadius: 6,
                    background: 'rgba(210,153,34,0.15)',
                    border: `2px solid ${theme.colors.amber}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: theme.fonts.mono,
                    color: theme.colors.amber,
                  }}
                >
                  FP32
                </div>
                <span style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 4 }}>macro-scale</span>
              </FadeIn>
            </div>
            <FadeIn delay={fps * 37}>
              <p style={{ fontSize: 32, color: theme.colors.textMuted, margin: 0 }}>
                16 weights in FP4 (4 bits each)
              </p>
            </FadeIn>
            <FadeIn delay={fps * 40}>
              <p style={{ fontSize: 32, color: theme.colors.textMuted, margin: 0 }}>
                ~3.5x memory savings vs FP16 · <span style={{ color: theme.colors.accent }}>~1.8x savings vs FP8</span>
              </p>
            </FadeIn>
          </div>
        </CenteredSlide>
      </Sequence>

      {/* DeepSeek-R1 real-world example */}
      <Sequence from={fps * 86} durationInFrames={fps * 34}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Real-World Payoff" subtitle="DeepSeek-R1: 671 billion parameters" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 950 }}>
            <tbody>
              <TableRow cells={['GPU', 'Precision', 'Model Size', 'GPUs Needed']} isHeader delay={fps * 3} />
              <TableRow cells={['H100 (80 GB)', 'FP16', '1,342 GB', '17']} delay={fps * 7} highlightColor={theme.colors.red} highlight cellHighlightDelays={[null, null, null, fps * 19]} cellHighlightColor={theme.colors.red} />
              <TableRow cells={['H100 (80 GB)', 'FP8', '~671 GB', '9']} delay={fps * 11} highlightColor={theme.colors.red} highlight cellHighlightDelays={[null, null, null, fps * 21]} cellHighlightColor={theme.colors.red} />
              <TableRow cells={['B300 (288 GB)', 'NVFP4', '~383 GB', '2']} delay={fps * 15} highlight cellHighlightDelays={[null, null, null, fps * 23]} />
            </tbody>
          </table>

          <Callout delay={fps * 24} style={{ marginTop: 32, maxWidth: 800 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>9 GPUs down to 2.</span> Less hardware,
            less communication overhead, simpler deployment.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Attention acceleration + TMEM */}
      <Sequence from={fps * 120} durationInFrames={fps * 39}>
        <CenteredSlide padding="0 100px">
          {/* 2x Attention row */}
          <div style={{ display: 'flex', gap: 80, alignItems: 'center', width: '100%', maxWidth: 1200 }}>
            <StatBox number="2x" label="Attention Acceleration" delay={0} />
            <FadeIn delay={fps * 6} style={{ flex: 1 }}>
              <div style={{
                background: 'rgba(118,185,0,0.06)',
                borderLeft: `4px solid ${theme.colors.accent}`,
                padding: '24px 32px',
                borderRadius: '0 12px 12px 0',
                fontSize: 30,
                color: theme.colors.text,
                lineHeight: 1.5,
              }}>
                Softmax bottleneck solved: doubled special function unit throughput for the exponential and division
                operations that attention relies on.
              </div>
            </FadeIn>
          </div>

          {/* 256 KB TMEM row */}
          <FadeIn delay={fps * 20} style={{ width: '100%', maxWidth: 1200, marginTop: 48 }}>
            <div style={{ display: 'flex', gap: 80, alignItems: 'center', width: '100%' }}>
              <StatBox number="256 KB" label="Tensor Memory / SM (Streaming Multiprocessor)" delay={fps * 20} />
              <FadeIn delay={fps * 26} style={{ flex: 1 }}>
                <div style={{
                  background: 'rgba(118,185,0,0.06)',
                  borderLeft: `4px solid ${theme.colors.accent}`,
                  padding: '24px 32px',
                  borderRadius: '0 12px 12px 0',
                  fontSize: 30,
                  color: theme.colors.text,
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Tensor Memory (TMEM):</span> dedicated
                  on-chip storage for intermediate matrix results. Reduces trips to main memory.
                </div>
              </FadeIn>
            </div>
          </FadeIn>

        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
