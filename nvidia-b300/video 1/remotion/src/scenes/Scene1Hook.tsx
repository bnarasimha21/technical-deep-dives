import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

const gpuGenerations = [
  { name: 'V100', year: '2017', label: 'GPT-2' },
  { name: 'A100', year: '2020', label: 'GPT-3' },
  { name: 'H100', year: '2022', label: 'GPT-4' },
  { name: 'B300', year: '2025', label: 'Next Gen' },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* GPU Evolution Flash */}
      <Sequence from={0} durationInFrames={fps * 12}>
        <CenteredSlide padding="0 100px">
          <FadeIn delay={0}>
            <p
              style={{
                fontSize: 36,
                color: theme.colors.textMuted,
                textAlign: 'center',
                marginBottom: 40,
              }}
            >
              Every generation of AI has been defined by its hardware
            </p>
          </FadeIn>

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center' }}>
            {gpuGenerations.map((gpu, i) => {
              const delay = 20 + i * 20;
              const progress = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 80 } });
              const isLast = i === gpuGenerations.length - 1;
              return (
                <React.Fragment key={gpu.name}>
                  <div
                    style={{
                      textAlign: 'center',
                      opacity: interpolate(progress, [0, 1], [0, 1]),
                      transform: `scale(${interpolate(progress, [0, 1], [0.7, 1])})`,
                    }}
                  >
                    <div
                      style={{
                        width: isLast ? 140 : 120,
                        height: isLast ? 140 : 120,
                        borderRadius: 16,
                        border: `2px solid ${isLast ? theme.colors.accent : theme.colors.border}`,
                        background: isLast ? 'rgba(118,185,0,0.15)' : theme.colors.bgCard,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isLast ? 32 : 26,
                        fontWeight: 700,
                        color: isLast ? theme.colors.accent : theme.colors.text,
                      }}
                    >
                      {gpu.name}
                    </div>
                    <p style={{ fontSize: 18, color: theme.colors.textMuted, marginTop: 8 }}>{gpu.year}</p>
                    <p style={{ fontSize: 16, color: theme.colors.textMuted }}>{gpu.label}</p>
                  </div>
                  {i < gpuGenerations.length - 1 && (
                    <div
                      style={{
                        fontSize: 28,
                        color: theme.colors.accent,
                        opacity: interpolate(
                          spring({ frame: frame - delay - 10, fps, config: { damping: 20, stiffness: 100 } }),
                          [0, 1], [0, 1]
                        ),
                      }}
                    >
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Title Card */}
      <Sequence from={fps * 12} durationInFrames={fps * 10}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <h1
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: theme.colors.accent,
                margin: 0,
                fontFamily: theme.fonts.heading,
                textAlign: 'center',
              }}
            >
              NVIDIA B300
            </h1>
          </FadeIn>
          <FadeIn delay={15}>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 400,
                color: theme.colors.text,
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              Blackwell Ultra: Technical Deep Dive
            </h2>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Stats Flash */}
      <Sequence from={fps * 22} durationInFrames={fps * 23}>
        <CenteredSlide>
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
            <StatBox number="15" label="PFLOPS (FP4)" delay={0} />
            <StatBox number="288" label="GB HBM3e" delay={12} />
            <StatBox number="208B" label="Transistors" delay={24} />
          </div>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
