import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { theme } from '../theme';

const CheckItem: React.FC<{ text: string; detail?: string; delay: number }> = ({ text, detail, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)`, marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 28, color: theme.colors.accent }}>✓</span>
        <span style={{ fontSize: 26, color: theme.colors.text }}>{text}</span>
      </div>
      {detail && (
        <span style={{ fontSize: 20, color: theme.colors.textMuted, marginLeft: 40 }}>{detail}</span>
      )}
    </div>
  );
};

const CrossItem: React.FC<{ text: string; detail?: string; delay: number }> = ({ text, detail, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)`, marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 28, color: theme.colors.red }}>✗</span>
        <span style={{ fontSize: 26, color: theme.colors.text }}>{text}</span>
      </div>
      {detail && (
        <span style={{ fontSize: 20, color: theme.colors.textMuted, marginLeft: 40 }}>{detail}</span>
      )}
    </div>
  );
};

export const Scene2WhoShouldUse: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Sequence from={0} durationInFrames={fps * 60}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Who Should Use B300" />

          <div
            style={{
              display: 'flex',
              gap: 60,
              marginTop: 48,
              justifyContent: 'center',
              width: '100%',
              maxWidth: 1200,
            }}
          >
            {/* Ideal for */}
            <div style={{ flex: 1 }}>
              <FadeIn delay={10}>
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: theme.colors.accent,
                    marginBottom: 24,
                  }}
                >
                  Ideal For
                </h3>
              </FadeIn>
              <CheckItem text="LLM inference at scale" detail="Primary use case" delay={20} />
              <CheckItem text="AI reasoning / chain-of-thought" detail="2x attention acceleration" delay={35} />
              <CheckItem text="Multimodal AI" detail="Vision + language" delay={50} />
              <CheckItem text="Training large foundation models" delay={65} />
              <CheckItem text="Mixture of Experts" detail="Tensor Memory reduces switching overhead" delay={80} />
            </div>

            {/* Not ideal for */}
            <div style={{ flex: 1 }}>
              <FadeIn delay={fps * 3}>
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: theme.colors.red,
                    marginBottom: 24,
                  }}
                >
                  Not Ideal For
                </h3>
              </FadeIn>
              <CrossItem text="FP64 scientific computing" detail="Only 1.2 TFLOPS" delay={fps * 3 + 15} />
              <CrossItem text="Edge deployment" detail="1,400W" delay={fps * 3 + 30} />
              <CrossItem text="Budget-constrained workloads" detail="H100 may be smarter" delay={fps * 3 + 45} />
            </div>
          </div>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
