import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene2WhyB300: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Model growth stats */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Why B300 Exists" subtitle="Models are growing faster than hardware can keep up" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 48 }}>
            <StatBox number="175B" label="GPT-3 (2020)" delay={20} />
            <StatBox number="1T+" label="GPT-4 (2023)" delay={35} />
            <StatBox number="???" label="Reasoning Models (2026)" delay={50} />
          </div>

          <Callout delay={fps * 3} style={{ marginTop: 48, maxWidth: 900 }}>
            The best models today <span style={{ color: theme.colors.accent, fontWeight: 700 }}>do not fit</span> on
            a single GPU. Split across GPUs = more hardware, more complexity, more cost.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* AI Factory vision */}
      <Sequence from={fps * 25} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 120px">
          <SceneTitle title="The AI Factory Era" />

          <FadeIn delay={15} style={{ marginTop: 40 }}>
            <p style={{ fontSize: 32, textAlign: 'center', lineHeight: 1.6, maxWidth: 1000 }}>
              NVIDIA's vision: data centers as AI factories,{' '}
              <span style={{ color: theme.colors.accent }}>producing AI outputs at massive scale</span>.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', gap: 32, marginTop: 48, justifyContent: 'center' }}>
            {[
              { title: 'Memory Capacity', desc: 'Models keep getting bigger' },
              { title: 'NVFP4', desc: '4-bit precision is production-ready' },
              { title: 'NVLink Bandwidth', desc: 'MoE architectures are the future' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={30 + i * 15} direction="up">
                <div
                  style={{
                    border: `1px solid ${theme.colors.accent}`,
                    borderRadius: 12,
                    padding: '24px 28px',
                    width: 260,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.accent }}>{item.title}</div>
                  <div style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 8 }}>{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={fps * 3} style={{ marginTop: 32 }}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center' }}>
              Every design choice points in one direction: large-scale AI inference and training.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
