import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

export const Scene1Intro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Sequence from={0} durationInFrames={fps * 15}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <h1
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: theme.colors.accent,
                margin: 0,
                fontFamily: theme.fonts.heading,
                textAlign: 'center',
              }}
            >
              Should You Switch to B300?
            </h1>
          </FadeIn>
          <FadeIn delay={15}>
            <p
              style={{
                fontSize: 36,
                color: theme.colors.text,
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              Use Cases, Economics & Software Stack
            </p>
          </FadeIn>
          <FadeIn delay={30}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, marginTop: 8, textAlign: 'center' }}>
              Part 2 of the NVIDIA B300 Blackwell Ultra Series
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Quick recap */}
      <Sequence from={fps * 15} durationInFrames={fps * 15}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <p style={{ fontSize: 28, color: theme.colors.textMuted, textAlign: 'center', marginBottom: 32 }}>
              Quick recap from Video 1
            </p>
          </FadeIn>

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
            <StatBox number="15" label="PFLOPS (FP4)" delay={10} />
            <StatBox number="288" label="GB HBM3e" delay={22} />
            <StatBox number="208B" label="Transistors" delay={34} />
          </div>

          <FadeIn delay={fps * 2} style={{ marginTop: 36 }}>
            <p style={{ fontSize: 30, color: theme.colors.text, textAlign: 'center' }}>
              Now the question: <span style={{ color: theme.colors.accent, fontWeight: 700 }}>should you actually use it?</span>
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
