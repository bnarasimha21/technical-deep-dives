import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene8Performance: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Per-GPU claims */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Performance That Matters" subtitle="Official NVIDIA claims" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 48 }}>
            <StatBox number="1.5x" label="vs B200 (NVFP4)" delay={15} />
            <StatBox number="7.5x" label="vs H100 (FP8)" delay={30} />
          </div>

          <FadeIn delay={fps * 2.5} style={{ marginTop: 36 }}>
            <p style={{ fontSize: 26, color: theme.colors.textMuted, textAlign: 'center' }}>
              Raw compute gains per GPU
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* System-level claims */}
      <Sequence from={fps * 25} durationInFrames={fps * 25}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <h3
              style={{
                fontSize: 36,
                color: theme.colors.accent2,
                fontWeight: 700,
                textAlign: 'center',
                margin: 0,
              }}
            >
              8-GPU System Level
            </h3>
          </FadeIn>

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="11x" label="Faster LLM Inference vs Hopper" delay={15} />
            <StatBox number="7x" label="More Compute" delay={30} />
            <StatBox number="4x" label="More Memory" delay={45} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Efficiency + closing */}
      <Sequence from={fps * 50} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 140px">
          <StatBox number="5x" label="Throughput per Megawatt vs Hopper" delay={0} />

          <Callout delay={fps * 2} style={{ marginTop: 40, maxWidth: 900 }}>
            The number that matters for total cost of ownership. Each watt delivers significantly more useful AI work
            than the previous generation.
          </Callout>

          {/* End card */}
          <FadeIn delay={fps * 5} style={{ marginTop: 48 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 28, color: theme.colors.text }}>
                Next video:{' '}
                <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Should You Switch to B300?</span>
              </p>
              <p style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 12 }}>
                Sources: NVIDIA Developer Blog, NVIDIA Newsroom, NVIDIA NVFP4 Blog
              </p>
            </div>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
