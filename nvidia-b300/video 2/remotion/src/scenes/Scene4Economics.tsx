import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene4Economics: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Cost per token */}
      <Sequence from={0} durationInFrames={fps * 30}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Cost Per Token" subtitle="The metric that actually matters for your budget" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 36 }}>
            <StatBox number="35x" label="Lower cost/M tokens vs Hopper (low latency)" delay={15} />
            <StatBox number="50x" label="Throughput per megawatt vs Hopper" delay={30} />
          </div>

          <Callout delay={fps * 2.5} style={{ marginTop: 32, maxWidth: 900 }}>
            Real-world validation: inference providers have cut costs from{' '}
            <span style={{ color: theme.colors.red }}>$0.20/M tokens</span> on Hopper to{' '}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>$0.05/M tokens</span> on Blackwell with NVFP4.
          </Callout>

          <FadeIn delay={fps * 4}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center', marginTop: 20 }}>
              Even if the per-hour GPU price is higher, you get <span style={{ color: theme.colors.accent, fontWeight: 700 }}>4-5x more work done</span> in that hour.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Decision framework */}
      <Sequence from={fps * 30} durationInFrames={fps * 20}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Fewer GPUs = Lower Total Cost" />

          <div
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 40,
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
                  Choose B300 When
                </div>
                <div style={{ fontSize: 22, color: theme.colors.text, lineHeight: 1.8 }}>
                  Large models (70B+ params)
                  <br />
                  Throughput & latency matter
                  <br />
                  Want fewer GPUs per model
                  <br />
                  Running inference at scale
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
                  Stick with Previous Gen
                </div>
                <div style={{ fontSize: 22, color: theme.colors.text, lineHeight: 1.8 }}>
                  Smaller models (&lt;70B)
                  <br />
                  Experimentation & prototyping
                  <br />
                  Need FP64 for scientific work
                  <br />
                  Budget-constrained deployments
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={fps * 4} style={{ marginTop: 32 }}>
            <p style={{ fontSize: 28, color: theme.colors.accent, textAlign: 'center', fontWeight: 600 }}>
              Quick note on the software stack →
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
