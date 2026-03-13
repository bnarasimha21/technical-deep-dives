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
      <Sequence from={fps * 15} durationInFrames={fps * 25}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <p style={{ fontSize: 28, color: theme.colors.textMuted, textAlign: 'center', marginBottom: 24 }}>
              Quick recap from Video 1
            </p>
          </FadeIn>

          {/* Single B300 stats */}
          <FadeIn delay={5}>
            <p style={{ fontSize: 20, color: theme.colors.accent, textAlign: 'center', marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
              PER GPU
            </p>
          </FadeIn>
          <div style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
            <StatBox number="15" label="PFLOPS (FP4)" delay={8} />
            <StatBox number="288" label="GB HBM3e" delay={16} />
            <StatBox number="208B" label="Transistors" delay={24} />
          </div>

          {/* 8×B300 stats */}
          <FadeIn delay={fps * 1.5}>
            <p style={{ fontSize: 20, color: theme.colors.accent2, textAlign: 'center', marginTop: 20, marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
              8×B300 RACK
            </p>
          </FadeIn>
          <div style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
            <StatBox number="120" label="PFLOPS (FP4)" delay={fps * 1.5 + 5} color={theme.colors.accent2} />
            <StatBox number="2,304" label="GB HBM3e" delay={fps * 1.5 + 13} color={theme.colors.accent2} />
            <StatBox number="NVLink 5" label="GPU Interconnect" delay={fps * 1.5 + 21} color={theme.colors.accent2} numberFontSize={44} />
          </div>

          <FadeIn delay={fps * 3.5} style={{ marginTop: 24 }}>
            <p style={{ fontSize: 30, color: theme.colors.text, textAlign: 'center' }}>
              Now the question: <span style={{ color: theme.colors.accent, fontWeight: 700 }}>should you actually use it?</span>
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
