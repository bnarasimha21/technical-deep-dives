import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { TableRow } from '../components/TableRow';
import { theme } from '../theme';

const TakeawayCard: React.FC<{ number: string; text: string; delay: number }> = ({ number, text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'rgba(118, 185, 0, 0.08)',
        borderLeft: `4px solid ${theme.colors.accent}`,
        padding: '14px 24px',
        borderRadius: '0 10px 10px 0',
        maxWidth: 800,
        width: '100%',
      }}
    >
      <span style={{ color: theme.colors.accent, fontWeight: 700, fontSize: 24 }}>{number}.</span>{' '}
      <span style={{ fontSize: 24, color: theme.colors.text }}>{text}</span>
    </div>
  );
};

export const Scene5Summary: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Five takeaways */}
      <Sequence from={0} durationInFrames={fps * 30}>
        <CenteredSlide>
          <SceneTitle title="Five Things to Remember" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginTop: 36,
              alignItems: 'center',
            }}
          >
            <TakeawayCard number="1" text="15 PFLOPS of FP4 compute. The single fastest AI GPU you can get today." delay={10} />
            <TakeawayCard number="2" text="288 GB HBM3e. Fit 400B+ parameter models on a single GPU." delay={25} />
            <TakeawayCard number="3" text="Doubles attention calculation speed. Purpose-built for the reasoning model era." delay={40} />
            <TakeawayCard number="4" text="NVFP4: ~3.5x memory savings vs FP16 with ~1% accuracy trade-off. This changes the deployment math." delay={55} />
            <TakeawayCard number="5" text="You don't need to buy hardware. Use it in the Cloud." delay={70} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Roadmap */}
      <Sequence from={fps * 30} durationInFrames={fps * 15}>
        <CenteredSlide>
          <SceneTitle title="What's Next" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 600 }}>
            <tbody>
              <TableRow cells={['Year', 'Architecture', 'Status']} isHeader delay={5} />
              <TableRow cells={['2024', 'Blackwell (B200)', 'Shipping']} delay={15} />
              <TableRow cells={['2025', 'Blackwell Ultra (B300)', 'Current']} delay={25} highlight />
              <TableRow cells={['2026', 'Vera Rubin', 'Announced']} delay={40} />
              <TableRow cells={['2027', 'Rubin Ultra', 'Announced']} delay={55} />
            </tbody>
          </table>

          <FadeIn delay={fps * 3}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center', marginTop: 24 }}>
              Annual cadence: today's top of the line is next year's baseline.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Closing graphic */}
      <Sequence from={fps * 45} durationInFrames={fps * 15}>
        <CenteredSlide padding="0 140px">
          <FadeIn delay={0}>
            <p style={{ fontSize: 36, color: theme.colors.accent, textAlign: 'center', fontWeight: 700, margin: 0 }}>
              The B300 is the most capable AI GPU available.
            </p>
          </FadeIn>
          <FadeIn delay={fps * 1.5} style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
              {[
                'Developers building inference-heavy applications',
                'Startups scaling AI products',
                'Teams training the next generation of models',
              ].map((text, i) => (
                <FadeIn key={text} delay={fps * 2 + i * 15} direction="up">
                  <div
                    style={{
                      border: `1px solid ${theme.colors.accent}`,
                      borderRadius: 12,
                      padding: '20px 24px',
                      width: 260,
                      textAlign: 'center',
                      fontSize: 22,
                      color: theme.colors.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {text}
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={fps * 4}>
            <p style={{ fontSize: 28, color: theme.colors.textMuted, textAlign: 'center', marginTop: 24 }}>
              This is the hardware that makes it possible.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* End card */}
      <Sequence from={fps * 60} durationInFrames={fps * 15}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: theme.colors.accent,
                margin: 0,
                textAlign: 'center',
                fontFamily: theme.fonts.heading,
              }}
            >
              Thanks for Watching
            </h1>
          </FadeIn>
          <FadeIn delay={15}>
            <p style={{ fontSize: 28, color: theme.colors.text, marginTop: 16, textAlign: 'center' }}>
              Should You Switch to B300?
            </p>
          </FadeIn>
          <FadeIn delay={30}>
            <p style={{ fontSize: 22, color: theme.colors.textMuted, marginTop: 8, textAlign: 'center' }}>
              Part 2 of the NVIDIA B300 Blackwell Ultra Series
            </p>
          </FadeIn>
          <FadeIn delay={fps * 1.5} style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>Subscribe</span>
              <span style={{ fontSize: 20, color: theme.colors.textMuted }}>|</span>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>Watch Part 1</span>
              <span style={{ fontSize: 20, color: theme.colors.textMuted }}>|</span>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>More Deep Dives</span>
            </div>
          </FadeIn>
          <FadeIn delay={fps * 2.5}>
            <p style={{ fontSize: 18, color: theme.colors.textMuted, marginTop: 24, textAlign: 'center' }}>
              Sources: NVIDIA Developer Blog, NVIDIA Newsroom, NVIDIA NVFP4 Blog
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
