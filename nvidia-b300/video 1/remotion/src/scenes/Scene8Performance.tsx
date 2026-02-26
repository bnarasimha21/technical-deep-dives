import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

const PillBadge: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
}> = ({ icon, title, desc, delay }) => {
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
        borderLeft: `3px solid ${theme.colors.accent2}`,
        borderRadius: 48,
        padding: '32px 52px 32px 44px',
        width: 960,
      }}
    >
      <div style={{ fontSize: 56, flexShrink: 0, lineHeight: 1 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: theme.colors.accent2 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 6 }}>
          {desc}
        </div>
      </div>
    </div>
  );
};

export const Scene8Performance: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene8-performance.m4a')} />
      <Audio src={staticFile('paulyudin-technology-tech-technology-484304.mp3')} volume={0.04} loop />
      {/* Per-GPU claims */}
      <Sequence from={0} durationInFrames={fps * 24}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Performance That Matters" />
          <FadeIn delay={fps * 8}>
            <p style={{ fontSize: 40, color: theme.colors.textMuted, textAlign: 'center', marginTop: -34 }}>
              Official NVIDIA claims
            </p>
          </FadeIn>

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 48 }}>
            <StatBox number="1.5x" label="vs B200 (NVFP4)" delay={fps * 8} speed={30} />
            <StatBox number="7.5x" label="vs H100 (FP8)" delay={fps * 16} />
          </div>

          <FadeIn delay={fps * 19} style={{ marginTop: 36 }}>
            <p style={{ fontSize: 34, color: theme.colors.textMuted, textAlign: 'center' }}>
              Raw compute gains per GPU
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* System-level claims */}
      <Sequence from={fps * 24} durationInFrames={fps * 16}>
        <CenteredSlide>
          <SceneTitle title="Performance That Matters" subtitle="8-GPU System Level vs Hopper" />

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="11x" label="Faster LLM Inference" delay={fps * 6} />
            <StatBox number="7x" label="More Compute" delay={fps * 9} />
            <StatBox number="3.6x" label="More Memory" delay={fps * 13} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Efficiency */}
      <Sequence from={fps * 40} durationInFrames={fps * 34}>
        <CenteredSlide padding="0 100px">
          <StatBox number="5x" label="Throughput per Megawatt vs Hopper" delay={0} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56, alignItems: 'center', marginTop: 48 }}>
            <PillBadge icon="" title="Total Cost of Ownership" desc="Each watt delivers more useful AI work" delay={fps * 8} />
            <PillBadge icon="" title="Cloud Economics" desc="More AI throughput per GPU-hour" delay={fps * 17} />
            <PillBadge icon="" title="Scale Smarter" desc="Fewer instances, more requests served" delay={fps * 23} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* End card */}
      <Sequence from={fps * 74} durationInFrames={fps * 9}>
        <CenteredSlide>
          <FadeIn delay={0} style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 72, color: theme.colors.text }}>
                Next video:{' '}
                <span style={{ color: theme.colors.accent2, fontWeight: 700 }}>Should You Switch to B300?</span>
              </p>
            </div>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
