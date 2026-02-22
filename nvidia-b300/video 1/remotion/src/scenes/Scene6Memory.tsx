import React from 'react';
import { Sequence, useVideoConfig, Audio, staticFile } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene6Memory: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene6-memory.m4a')} />
      {/* HBM3e architecture */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="288 GB HBM3e" subtitle="8x 12-Hi stacks · 8 TB/s bandwidth · 8,192-bit interface (4,096 bits per die)" />

          {/* Visual: 8 HBM stacks */}
          <FadeIn delay={20} style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  {/* 12-layer stack */}
                  {Array.from({ length: 12 }).map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: 100,
                        height: 8,
                        background: `rgba(118, 185, 0, ${0.3 + (j / 12) * 0.7})`,
                        borderRadius: 2,
                      }}
                    />
                  ))}
                  <div style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 4 }}>36 GB</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 26, color: theme.colors.textMuted, textAlign: 'center', marginTop: 12 }}>
              8 stacks x 12 DRAM layers x 36 GB = 288 GB total
            </p>
          </FadeIn>

          <Callout delay={fps * 15} style={{ marginTop: 28, maxWidth: 800 }}>
            8 TB/s bandwidth feeds data to tensor cores fast enough to keep up with compute.
          </Callout>
        </CenteredSlide>
      </Sequence>

      {/* Why it matters */}
      <Sequence from={fps * 25} durationInFrames={fps * 48}>
        <CenteredSlide>
          <SceneTitle title="Why 288 GB Matters" />

          <div style={{ display: 'flex', gap: 32, marginTop: 48, justifyContent: 'center' }}>
            {[
              { icon: '📦', title: 'Larger Models', desc: 'Fewer GPUs = simpler deployment, lower cost' },
              { icon: '🔗', title: 'Bigger KV Caches', desc: 'Longer context windows for reasoning models' },
              { icon: '📊', title: 'Higher Batch Sizes', desc: 'Better utilization = more tokens/sec' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={fps * 5 + i * fps * 5} direction="up">
                <div
                  style={{
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 12,
                    padding: '28px 24px',
                    width: 340,
                    textAlign: 'center',
                    background: theme.colors.bgCard,
                  }}
                >
                  <div style={{ fontSize: 56 }}>{item.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: theme.colors.accent, marginTop: 12 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 8 }}>{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={fps * 25} style={{ marginTop: 32 }}>
            <p style={{ fontSize: 32, color: theme.colors.textMuted, textAlign: 'center' }}>
              DeepSeek-R1 671B in NVFP4: ~383 GB. Fits on{' '}
              <span style={{ color: theme.colors.accent, fontWeight: 700 }}>2 B300s</span> vs 9 H100s.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
