import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene3Economics: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Value proposition */}
      <Sequence from={0} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Cloud GPU Economics" subtitle="More AI work per GPU-hour, even at a higher per-hour price" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="5x" label="Throughput/MW vs Hopper (NVIDIA claim)" delay={15} />
            <StatBox number="288 GB" label="Fewer GPUs needed" delay={30} />
          </div>

          <Callout delay={fps * 2.5} style={{ marginTop: 36, maxWidth: 900 }}>
            Even if the per-hour price is higher than H100, you get significantly more done in that hour. Lower cost per inference for your application.
          </Callout>

          <Callout delay={fps * 4} style={{ marginTop: 16, maxWidth: 900 }}>
            Fewer GPUs = simpler architecture, less communication overhead, lower total cost.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Decision guide */}
      <Sequence from={fps * 35} durationInFrames={fps * 40}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="When to Choose What" />

          <div
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 48,
              justifyContent: 'center',
              width: '100%',
              maxWidth: 1000,
            }}
          >
            <FadeIn delay={15} style={{ flex: 1 }}>
              <div
                style={{
                  background: 'rgba(118,185,0,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent}`,
                  padding: '28px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.accent, marginBottom: 16 }}>
                  Choose B300
                </div>
                <div style={{ fontSize: 22, color: theme.colors.text, lineHeight: 1.8 }}>
                  Large models (70B+ params)
                  <br />
                  Throughput & latency matter
                  <br />
                  Fit more model in fewer GPUs
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={fps * 2} style={{ flex: 1 }}>
              <div
                style={{
                  background: 'rgba(0,128,255,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent2}`,
                  padding: '28px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.accent2, marginBottom: 16 }}>
                  Stick with H100
                </div>
                <div style={{ fontSize: 22, color: theme.colors.text, lineHeight: 1.8 }}>
                  Smaller models
                  <br />
                  Experimentation
                  <br />
                  Need FP64 for scientific workloads
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Transition */}
          <FadeIn delay={fps * 4} style={{ marginTop: 36 }}>
            <p style={{ fontSize: 28, color: theme.colors.accent, textAlign: 'center', fontWeight: 600 }}>
              Quick note on the software stack
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
