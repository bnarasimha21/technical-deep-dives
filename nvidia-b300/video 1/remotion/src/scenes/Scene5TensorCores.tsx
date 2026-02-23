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

/** Animated bar chart showing how two-level scaling preserves accuracy */
const ORIGINAL_HEIGHTS = [85, 40, 72, 55, 95, 30, 68, 48, 90, 35, 78, 60, 50, 88, 42, 65];
const FP4_ONLY_HEIGHTS = [62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62]; // all flattened
const MICRO_HEIGHTS =    [80, 45, 68, 58, 90, 35, 65, 50, 85, 38, 74, 62, 52, 84, 45, 62]; // closer
const FULL_HEIGHTS =     [84, 40, 71, 55, 94, 31, 67, 48, 89, 35, 77, 60, 50, 87, 42, 64]; // nearly exact

const ScalingBars: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing (relative to delay)
  const t = frame - delay;
  const phase1 = spring({ frame: t, fps, config: { damping: 20, stiffness: 60 } }); // original (41s)
  const phase2 = spring({ frame: t - fps * 1.5, fps, config: { damping: 20, stiffness: 60 } }); // fp4 only (~42.5s)
  const phase3 = spring({ frame: t - fps * 3, fps, config: { damping: 20, stiffness: 60 } }); // + micro (44s)
  const phase4 = spring({ frame: t - fps * 9, fps, config: { damping: 20, stiffness: 60 } }); // + macro (50s)

  // Labels fade
  const label1 = interpolate(phase1, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const label2 = interpolate(phase2, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const label3 = interpolate(phase3, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const label4 = interpolate(phase4, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  const getBarHeight = (i: number) => {
    const orig = ORIGINAL_HEIGHTS[i];
    const fp4 = FP4_ONLY_HEIGHTS[i];
    const micro = MICRO_HEIGHTS[i];
    const full = FULL_HEIGHTS[i];

    // Blend through phases
    let h = orig * phase1;
    if (phase2 > 0) h = interpolate(phase2, [0, 1], [orig, fp4]);
    if (phase3 > 0) h = interpolate(phase3, [0, 1], [fp4, micro]);
    if (phase4 > 0) h = interpolate(phase4, [0, 1], [micro, full]);
    return h;
  };

  const getBarColor = () => {
    if (phase4 > 0.5) return theme.colors.accent;
    if (phase3 > 0.5) return theme.colors.accent2;
    if (phase2 > 0.5) return theme.colors.red;
    return theme.colors.text;
  };

  const activeLabel = phase4 > 0.5 ? 3 : phase3 > 0.5 ? 2 : phase2 > 0.5 ? 1 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Bars */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
        {ORIGINAL_HEIGHTS.map((_, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: getBarHeight(i),
              borderRadius: 4,
              background: getBarColor(),
              opacity: phase1 > 0 ? 0.8 : 0,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      {/* Phase labels */}
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
        <div style={{ opacity: label1, textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: activeLabel === 0 ? theme.colors.text : theme.colors.textMuted, fontWeight: activeLabel === 0 ? 700 : 400 }}>
            Original (FP16)
          </div>
        </div>
        <div style={{ opacity: label2, textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: activeLabel === 1 ? theme.colors.red : theme.colors.textMuted, fontWeight: activeLabel === 1 ? 700 : 400 }}>
            FP4 only, detail lost
          </div>
        </div>
        <div style={{ opacity: label3, textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: activeLabel === 2 ? theme.colors.accent2 : theme.colors.textMuted, fontWeight: activeLabel === 2 ? 700 : 400 }}>
            + micro-scale (FP8)
          </div>
        </div>
        <div style={{ opacity: label4, textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: activeLabel === 3 ? theme.colors.accent : theme.colors.textMuted, fontWeight: activeLabel === 3 ? 700 : 400 }}>
            + macro-scale (FP32)
          </div>
        </div>
      </div>
    </div>
  );
};

const BounceNumber: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 40 } });
  const scale = interpolate(progress, [0, 0.4, 1], [1, 1.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <span style={{ display: 'inline-block', transform: `scale(${scale})`, color: theme.colors.accent, fontWeight: 700, fontSize: 48 }}>
      {children}
    </span>
  );
};

/** GPU icon that can dim out */
const GpuIcon: React.FC<{ dim: boolean; delay: number; color: string }> = ({ dim, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = dim ? interpolate(fadeIn, [0, 1], [0, 0.25]) : interpolate(fadeIn, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 8,
        background: dim ? 'rgba(139, 148, 158, 0.1)' : `${color}20`,
        border: `2px solid ${dim ? theme.colors.textMuted : color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        opacity,
      }}
    >
      🖥
    </div>
  );
};

const GpuComparison: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  // Benefits appear after B300 GPUs
  const benefit1 = spring({ frame: frame - delay - fps * 3, fps, config: { damping: 18, stiffness: 60 } });
  const benefit2 = spring({ frame: frame - delay - fps * 4, fps, config: { damping: 18, stiffness: 60 } });
  const benefit3 = spring({ frame: frame - delay - fps * 9, fps, config: { damping: 18, stiffness: 60 } });

  return (
    <div style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
      {/* H100: 9 GPUs */}
      <div style={{ textAlign: 'center' }}>
        <FadeIn delay={delay}>
          <div style={{ fontSize: 28, color: theme.colors.textMuted, marginBottom: 12 }}>H100 (FP8)</div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 52px)', gap: 8 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <GpuIcon key={i} dim={false} delay={delay + i * 3} color={theme.colors.textMuted} />
          ))}
        </div>
        <FadeIn delay={delay}>
          <div style={{ fontSize: 24, color: theme.colors.textMuted, marginTop: 8 }}>9 GPUs</div>
        </FadeIn>
      </div>

      {/* Arrow */}
      <FadeIn delay={delay + fps * 2}>
        <div style={{ fontSize: 48, color: theme.colors.accent }}>→</div>
      </FadeIn>

      {/* B300: 2 GPUs — glow */}
      <div style={{ textAlign: 'center' }}>
        <FadeIn delay={delay + fps * 2}>
          <div style={{ fontSize: 28, color: theme.colors.accent, fontWeight: 700, marginBottom: 12 }}>B300 (NVFP4)</div>
        </FadeIn>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <GpuIcon key={i} dim={false} delay={delay + fps * 2 + i * 3} color={theme.colors.accent} />
          ))}
        </div>
        <FadeIn delay={delay + fps * 2}>
          <div style={{ fontSize: 24, color: theme.colors.accent, fontWeight: 700, marginTop: 8 }}>2 GPUs</div>
        </FadeIn>
      </div>

      {/* Benefits */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ opacity: interpolate(benefit1, [0, 1], [0, 1]), transform: `translateX(${interpolate(benefit1, [0, 1], [20, 0])}px)`, fontSize: 26, color: theme.colors.text }}>
          ✓ Less hardware
        </div>
        <div style={{ opacity: interpolate(benefit2, [0, 1], [0, 1]), transform: `translateX(${interpolate(benefit2, [0, 1], [20, 0])}px)`, fontSize: 26, color: theme.colors.text }}>
          ✓ Less communication overhead
        </div>
        <div style={{ opacity: interpolate(benefit3, [0, 1], [0, 1]), transform: `translateX(${interpolate(benefit3, [0, 1], [20, 0])}px)`, fontSize: 26, color: theme.colors.text }}>
          ✓ Simpler deployment
        </div>
      </div>
    </div>
  );
};

/** Animated pipeline showing softmax bottleneck then 2x speedup */
const PipelineBox: React.FC<{
  label: string;
  color: string;
  width: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ label, color, width, glow, style }) => (
  <div
    style={{
      width,
      height: 90,
      borderRadius: 14,
      border: `2px solid ${color}`,
      background: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontWeight: 700,
      color,
      boxShadow: glow ? `0 0 20px 6px ${color}44` : 'none',
      transition: 'all 0.3s',
      ...style,
    }}
  >
    {label}
  </div>
);

const AttentionPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PIPELINE_WIDTH = 1100;
  const DOT_COUNT = 6;
  const upgradeFrame = fps * 12;
  const upgraded = frame > upgradeFrame;
  const upgradeFlash = spring({ frame: frame - upgradeFrame, fps, config: { damping: 10, stiffness: 60 } });

  // Pipeline appears
  const pipelineIn = spring({ frame, fps, config: { damping: 18, stiffness: 60 } });
  const pipelineOpacity = interpolate(pipelineIn, [0, 1], [0, 1]);

  // Softmax box morphs
  const softmaxWidth = upgraded ? interpolate(upgradeFlash, [0, 1], [160, 240]) : 160;
  const softmaxColor = upgraded
    ? theme.colors.accent
    : theme.colors.amber;
  const softmaxLabel = 'Softmax';
  const badgeOpacity = upgraded ? interpolate(upgradeFlash, [0, 0.5], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  // Dot speed
  const baseSpeed = 1.8;
  const dotSpeed = upgraded ? baseSpeed * 2 : baseSpeed;

  // Bottleneck zone (normalized 0-1 across pipeline)
  const bottleneckCenter = 0.5;
  const bottleneckWidth = 0.12;

  return (
    <div style={{ opacity: pipelineOpacity, marginTop: 24 }}>
      {/* Pipeline boxes */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <PipelineBox label="Input Tokens" color={theme.colors.text} width={230} />
        <div style={{ width: 80, height: 3, background: theme.colors.textMuted }} />
        <div style={{ fontSize: 36, color: theme.colors.textMuted, margin: '0 6px' }}>→</div>
        <div style={{ width: 80, height: 3, background: theme.colors.textMuted }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <PipelineBox
            label={softmaxLabel}
            color={softmaxColor}
            width={softmaxWidth}
            glow={upgraded && upgradeFlash > 0.3}
          />
          <div style={{
            position: 'absolute',
            top: -16,
            right: -16,
            background: theme.colors.accent,
            color: theme.colors.bgDark,
            fontSize: 22,
            fontWeight: 800,
            borderRadius: 20,
            padding: '4px 12px',
            opacity: badgeOpacity,
            transform: `scale(${interpolate(badgeOpacity, [0, 1], [0.5, 1])})`,
          }}>
            2x
          </div>
        </div>
        <div style={{ width: 80, height: 3, background: theme.colors.textMuted }} />
        <div style={{ fontSize: 36, color: theme.colors.textMuted, margin: '0 6px' }}>→</div>
        <div style={{ width: 80, height: 3, background: theme.colors.textMuted }} />
        <PipelineBox label="Output" color={theme.colors.text} width={230} />
      </div>

      {/* Animated dots flowing through */}
      <div style={{ position: 'relative', height: 50, width: PIPELINE_WIDTH, margin: '20px auto 0' }}>
        {frame > fps * 3 && Array.from({ length: DOT_COUNT }).map((_, i) => {
          const offset = i / DOT_COUNT;
          let rawPos = ((frame - fps * 3) * dotSpeed / PIPELINE_WIDTH + offset) % 1;

          // Bottleneck slowdown (only when not upgraded)
          if (!upgraded) {
            const dist = Math.abs(rawPos - bottleneckCenter);
            if (dist < bottleneckWidth) {
              const slowFactor = 0.3 + 0.7 * (dist / bottleneckWidth);
              rawPos = bottleneckCenter + (rawPos - bottleneckCenter) * slowFactor;
            }
          }

          const x = rawPos * PIPELINE_WIDTH;
          const dotColor = upgraded ? theme.colors.accent : theme.colors.amber;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: 13,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: dotColor,
                opacity: 0.8,
                boxShadow: `0 0 8px ${dotColor}88`,
              }}
            />
          );
        })}
      </div>

      {/* Speed label */}
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <FadeIn delay={fps * 3}>
          <span style={{
            fontSize: 32,
            color: upgraded ? theme.colors.accent : theme.colors.amber,
            fontWeight: 700,
          }}>
            {upgraded ? 'Bottleneck resolved: 2x throughput' : 'Softmax bottleneck: data slows down'}
          </span>
        </FadeIn>
      </div>
    </div>
  );
};

/** Animated memory hierarchy showing round trips then TMEM shortcut */
const MemBox: React.FC<{
  label: string;
  color: string;
  opacity?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ label, color, opacity = 1, glow, style }) => (
  <div
    style={{
      width: 320,
      height: 80,
      borderRadius: 14,
      border: `2px solid ${color}`,
      background: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontWeight: 700,
      color,
      opacity,
      boxShadow: glow ? `0 0 20px 6px ${color}44` : 'none',
      ...style,
    }}
  >
    {label}
  </div>
);

const MemoryHierarchy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const diagIn = spring({ frame, fps, config: { damping: 18, stiffness: 60 } });
  const diagOpacity = interpolate(diagIn, [0, 1], [0, 1]);

  const tmemFrame = fps * 9;
  const tmemIn = spring({ frame: frame - tmemFrame, fps, config: { damping: 10, stiffness: 60 } });
  const hasTmem = frame > tmemFrame;

  // Box positions (y)
  const tensorY = 0;
  const tmemY = 150;
  const memoryY = 320;

  // Dot bounce
  const DOT_COUNT = 3;
  const slowSpeed = 0.04;
  const fastSpeed = 0.08;

  // After TMEM: main memory fades
  const memoryOpacity = hasTmem ? interpolate(tmemIn, [0, 1], [1, 0.25]) : 1;

  // Round-trip counter
  const tripSpeed = hasTmem ? fastSpeed : slowSpeed;
  const totalTrips = Math.floor((frame - fps * 3) * tripSpeed / 2);

  return (
    <div style={{ opacity: diagOpacity, position: 'relative', height: 430, width: 580, margin: '20px auto 0' }}>
      {/* Tensor Core */}
      <div style={{ position: 'absolute', top: tensorY, left: 20 }}>
        <MemBox label="Tensor Core" color={theme.colors.accent} />
      </div>

      {/* TMEM — slides in */}
      {hasTmem && (
        <div style={{
          position: 'absolute',
          top: tmemY,
          left: 20,
          transform: `scale(${interpolate(tmemIn, [0, 1], [0.5, 1])})`,
          opacity: interpolate(tmemIn, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <MemBox label="TMEM (256 KB)" color={theme.colors.accent} glow={tmemIn > 0.3 && tmemIn < 0.9} />
        </div>
      )}

      {/* Main Memory */}
      <div style={{ position: 'absolute', top: memoryY, left: 20 }}>
        <MemBox label="Main Memory (HBM)" color={theme.colors.textMuted} opacity={memoryOpacity} />
      </div>

      {/* Dashed connection line */}
      <div style={{
        position: 'absolute',
        left: 178,
        top: 80,
        width: 2,
        height: hasTmem ? 70 : 240,
        borderLeft: `2px dashed ${theme.colors.textMuted}44`,
      }} />
      {hasTmem && (
        <div style={{
          position: 'absolute',
          left: 178,
          top: 230,
          width: 2,
          height: 90,
          borderLeft: `2px dashed ${theme.colors.textMuted}22`,
        }} />
      )}

      {/* Animated data dots */}
      {frame > fps * 3 && Array.from({ length: DOT_COUNT }).map((_, i) => {
        const offset = (i / DOT_COUNT) * Math.PI * 2;
        const bounceTarget = hasTmem ? tmemY + 32 : memoryY + 32;
        const speed = hasTmem ? 0.15 : 0.07;
        const yRaw = Math.sin((frame - fps * 3) * speed + offset);
        const y = interpolate(yRaw, [-1, 1], [tensorY + 80, bounceTarget]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 170 + (i - 1) * 18,
              top: y,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: theme.colors.accent,
              opacity: 0.8,
              boxShadow: `0 0 6px ${theme.colors.accent}88`,
            }}
          />
        );
      })}

      {/* Trip counter / status label */}
      {frame > fps * 3 && (
        <div style={{
          position: 'absolute',
          left: 360,
          top: hasTmem ? tmemY + 24 : memoryY / 2 + 20,
          fontSize: 28,
          color: hasTmem ? theme.colors.accent : theme.colors.textMuted,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {hasTmem ? 'Data stays on-chip' : `Round trips: ${Math.min(totalTrips, 99)}`}
        </div>
      )}
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
          <SceneTitle title="5th-Gen Tensor Cores" subtitle="640 tensor cores" />

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
              <TableRow cells={['NVFP4', '4', '~0.29x', '4x', '~1%']} delay={fps * 11} highlight cellHighlightDelays={[fps * 11, fps * 11, fps * 16, fps * 52, fps * 56]} />
            </tbody>
          </table>

          {/* Two-level scaling visualization */}
          <div style={{ marginTop: 32 }}>
            <ScalingBars delay={fps * 16} />
          </div>

          <FadeIn delay={fps * 40} style={{ marginTop: 36 }}>
            <p style={{ fontSize: 40, color: theme.colors.textMuted, textAlign: 'center', margin: 0 }}>
              <BounceNumber delay={fps * 40}>~3.5x</BounceNumber> memory savings vs FP16 ·{' '}
              <BounceNumber delay={fps * 46}>~1.8x</BounceNumber> savings vs FP8
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* DeepSeek-R1 real-world example */}
      <Sequence from={fps * 86} durationInFrames={fps * 34}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Real-World Payoff" subtitle="DeepSeek-R1: 671 billion parameters" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 950 }}>
            <tbody>
              <TableRow cells={['GPU', 'Precision', 'Model Size', 'GPUs Needed']} isHeader delay={fps * 3} />
              <TableRow cells={['H100 (80 GB)', 'FP16', '1,342 GB', '17']} delay={fps * 7} highlightColor={theme.colors.textMuted} highlight cellHighlightDelays={[null, null, null, fps * 10]} cellHighlightColor={theme.colors.textMuted} />
              <TableRow cells={['H100 (80 GB)', 'FP8', '~671 GB', '9']} delay={fps * 11} highlightColor={theme.colors.textMuted} highlight cellHighlightDelays={[null, null, null, fps * 15]} cellHighlightColor={theme.colors.textMuted} />
              <TableRow cells={['B300 (288 GB)', 'NVFP4', '~383 GB', '2']} delay={fps * 15} highlight cellHighlightDelays={[null, null, null, fps * 23]} />
            </tbody>
          </table>

          <GpuComparison delay={fps * 25} />
        </CenteredSlide>
      </Sequence>

      {/* Attention acceleration — animated pipeline */}
      <Sequence from={fps * 120} durationInFrames={fps * 23}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Attention Acceleration" />
          <AttentionPipeline />
        </CenteredSlide>
      </Sequence>

      {/* Tensor Memory — animated memory hierarchy */}
      <Sequence from={fps * 143} durationInFrames={fps * 16}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Tensor Memory (TMEM)" />
          <MemoryHierarchy />
          <FadeIn delay={fps * 16}>
            <p style={{ fontSize: 30, color: theme.colors.textMuted, textAlign: 'center', marginTop: 20 }}>
              Dedicated on-chip storage: reduces trips to main memory
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
