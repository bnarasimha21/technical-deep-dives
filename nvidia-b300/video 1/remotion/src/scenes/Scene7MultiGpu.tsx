import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile, Img, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

const RevealLine: React.FC<{ children: React.ReactNode; delay: number; color?: string }> = ({ children, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-20, 0]);

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)`, fontSize: 34, color: color || theme.colors.text, lineHeight: 1.9 }}>
      {children}
    </div>
  );
};

/** Animated card wrapper with scale-up entrance and border glow */
const ConnectCard: React.FC<{
  children: React.ReactNode;
  title: string;
  delay: number;
  accentColor: string;
}> = ({ children, title, delay, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 60 } });
  const scale = interpolate(pop, [0, 0.5, 0.8, 1], [0.85, 1.04, 0.98, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(pop, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(pop, [0, 0.4, 1], [0, 0.7, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        flex: 1,
        opacity,
        transform: `scale(${scale})`,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: `4px solid ${accentColor}`,
        padding: '36px 40px',
        borderRadius: '0 12px 12px 0',
        boxShadow: `0 0 ${20 * glowOpacity}px ${8 * glowOpacity}px ${accentColor}33`,
      }}
    >
      <div style={{ fontSize: 42, fontWeight: 700, color: accentColor, marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ height: 1, background: `${accentColor}40`, marginBottom: 20 }} />
      {children}
    </div>
  );
};

export const Scene7MultiGpu: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene7-multi-gpu.m4a')} />
      {/* 8-GPU system overview */}
      <Sequence from={0} durationInFrames={fps * 38}>
        <CenteredSlide padding="0 100px">
          <FadeIn delay={0}>
            <SceneTitle title="Multi-GPU Scaling" />
          </FadeIn>
          <FadeIn delay={fps * 7}>
            <p style={{ fontSize: 32, color: theme.colors.textMuted, textAlign: 'center', marginTop: 8 }}>
              8x B300 GPUs + Intel Xeon CPUs + 2 TB system memory
            </p>
          </FadeIn>

          {/* DGX B300 image — appears with subtitle */}
          <FadeIn delay={fps * 7} style={{ marginTop: 36, textAlign: 'center' }}>
            <Img
              src={staticFile('dgx-b300-exploded.png')}
              style={{
                width: 750,
                objectFit: 'contain',
                borderRadius: 12,
              }}
            />
          </FadeIn>

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="2.1 TB" label="GPU Memory" delay={fps * 16} />
            <StatBox number="108" label="PFLOPS FP4 Dense" delay={fps * 23} />
            <StatBox number="~14 kW" label="System Power" delay={fps * 35} />
          </div>

        </CenteredSlide>
      </Sequence>

      {/* NVLink + inter-node */}
      <Sequence from={fps * 38} durationInFrames={fps * 48}>
        <CenteredSlide padding="0 100px">
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', width: '100%', maxWidth: 1300 }}>
            {/* Intra-node card */}
            <ConnectCard title="Intra-node: NVLink 5" delay={0} accentColor={theme.colors.accent}>
              <RevealLine delay={fps * 4}>2x 5th-gen NVSwitch</RevealLine>
              <RevealLine delay={fps * 8}><span style={{ color: theme.colors.accent, fontWeight: 700 }}>1,800 GB/s</span> per GPU</RevealLine>
              <RevealLine delay={fps * 12}><span style={{ color: theme.colors.accent, fontWeight: 700 }}>14.4 TB/s</span> aggregate</RevealLine>
              <RevealLine delay={fps * 16} color={theme.colors.accent}>2x faster than Hopper</RevealLine>
            </ConnectCard>

            {/* Inter-node card */}
            <ConnectCard title="Inter-node: up to 800 Gb/s" delay={fps * 20} accentColor={theme.colors.accent2}>
              <RevealLine delay={fps * 24}>InfiniBand or Ethernet</RevealLine>
              <RevealLine delay={fps * 28}>via NVIDIA <span style={{ color: theme.colors.accent2, fontWeight: 700 }}>ConnectX-8</span></RevealLine>
              <RevealLine delay={fps * 32}>Standard datacenter networking</RevealLine>
            </ConnectCard>
          </div>

          <Callout delay={fps * 38} style={{ marginTop: 36, maxWidth: 900 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Two-tier architecture:</span> NVLink inside the node, high-speed networking outside.
          </Callout>


        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
