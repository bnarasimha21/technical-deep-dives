import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

const HbmStack: React.FC<{ index: number; fps: number }> = ({ index, fps }) => {
  const frame = useCurrentFrame();
  const stackDelay = fps * 4 + index * Math.floor(fps * 1.2); // stagger each stack ~1.2s apart

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* 12-layer stack — layers build up from bottom */}
      {Array.from({ length: 12 }).map((_, j) => {
        const layerDelay = stackDelay + j * 3; // 3 frames between each layer
        const progress = spring({ frame: frame - layerDelay, fps, config: { damping: 14, stiffness: 100 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scaleY = interpolate(progress, [0, 1], [0.3, 1], { extrapolateRight: 'clamp' });
        return (
          <div
            key={j}
            style={{
              width: 110,
              height: 10,
              background: `rgba(118, 185, 0, ${0.3 + (j / 12) * 0.7})`,
              borderRadius: 2,
              opacity,
              transform: `scaleY(${scaleY})`,
            }}
          />
        );
      })}
      {/* 36 GB label appears after all layers */}
      <FadeIn delay={stackDelay + 12 * 3 + fps}>
        <div style={{ fontSize: 22, color: theme.colors.textMuted, marginTop: 6 }}>36 GB</div>
      </FadeIn>
    </div>
  );
};

const PopCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
}> = ({ icon, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame: frame - delay, fps, config: { damping: 8, stiffness: 80 } });
  const scale = interpolate(pop, [0, 0.5, 0.75, 1], [0, 1.15, 0.95, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(pop, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(pop, [0, 0.5, 1], [0, 0.8, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 16,
        padding: '32px 28px',
        width: 360,
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: `0 0 ${30 * glowOpacity}px ${10 * glowOpacity}px rgba(0, 128, 255, ${0.4 * glowOpacity})`,
      }}
    >
      <div style={{ fontSize: 60 }}>{icon}</div>
      <div style={{ fontSize: 34, fontWeight: 700, color: theme.colors.accent2, marginTop: 14 }}>
        {title}
      </div>
      <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 10, lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
};

export const Scene6Memory: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene6-memory.m4a')} />
      {/* HBM3e architecture */}
      <Sequence from={0} durationInFrames={fps * 39}>
        <CenteredSlide padding="0 100px">
          <FadeIn delay={0}>
            <SceneTitle title="288 GB HBM3e" />
          </FadeIn>
          <FadeIn delay={fps * 7}>
            <p style={{ fontSize: 40, color: theme.colors.textMuted, textAlign: 'center', marginTop: -34 }}>
              8x 12-Hi stacks · 8 TB/s bandwidth · 8,192-bit interface
            </p>
          </FadeIn>

          {/* 8 HBM stacks appear one by one with layers building up (5–18s) */}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 40 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <HbmStack key={i} index={i} fps={fps} />
            ))}
          </div>

          {/* Math text at 19s */}
          <FadeIn delay={fps * 19}>
            <p style={{ fontSize: 30, color: theme.colors.textMuted, textAlign: 'center', marginTop: 16 }}>
              8 stacks × 36 GB per stack = <span style={{ color: theme.colors.accent, fontWeight: 700 }}>288 GB total</span>
            </p>
          </FadeIn>

          {/* Highlight stat at 27s */}
          <FadeIn delay={fps * 25}>
            <p style={{ fontSize: 30, color: theme.colors.textMuted, textAlign: 'center', marginTop: 20 }}>
              That's <span style={{ color: theme.colors.accent, fontWeight: 700 }}>8,192-bit memory interface</span>, 4,096 bits per die
            </p>
          </FadeIn>

          {/* Bandwidth callout at 30s */}
          <Callout delay={fps * 30} style={{ marginTop: 28, maxWidth: 900 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>8 TB/s bandwidth</span> feeds data to tensor cores fast enough to keep up with compute.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Why it matters */}
      <Sequence from={fps * 39} durationInFrames={fps * 29}>
        <CenteredSlide>
          <SceneTitle title="Why 288 GB Matters" />

          <div style={{ display: 'flex', gap: 40, marginTop: 48, justifyContent: 'center' }}>
            <PopCard icon="" title="Larger Models" desc="Fewer GPUs = simpler deployment, lower cost" delay={fps * 3} />
            <PopCard icon="" title="Bigger KV Caches" desc="Longer context windows for reasoning models" delay={fps * 11} />
            <PopCard icon="" title="Higher Batch Sizes" desc="Better utilization = more tokens/sec" delay={fps * 21} />
          </div>

        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
