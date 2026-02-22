import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

const StackLayer: React.FC<{ label: string; items: string[]; delay: number; color: string; width: number }> = ({
  label,
  items,
  delay,
  color,
  width,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: 'center',
        width,
      }}
    >
      <div
        style={{
          background: `${color}15`,
          border: `1px solid ${color}`,
          borderRadius: 10,
          padding: '16px 24px',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color }}>{label}</div>
        <div style={{ fontSize: 18, color: theme.colors.textMuted, marginTop: 6 }}>{items.join(' · ')}</div>
      </div>
    </div>
  );
};

export const Scene4Software: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Compatibility checklist */}
      <Sequence from={0} durationInFrames={fps * 20}>
        <CenteredSlide>
          <SceneTitle title="Software Compatibility" subtitle="Good news for developers: the software story is seamless" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40, alignItems: 'flex-start', maxWidth: 700, margin: '40px auto 0' }}>
            {[
              { text: 'Full CUDA 12 compatibility — existing code runs without changes', delay: 15 },
              { text: 'PyTorch, TensorFlow, JAX — all supported', delay: 30 },
              { text: 'vLLM, SGLang, TensorRT-LLM — NVFP4 support from day one', delay: 45 },
              { text: 'cuDNN, cuBLAS, NCCL — all updated for B300', delay: 60 },
              { text: 'NCCL is NVLink 5 aware — faster multi-GPU communication', delay: 75 },
            ].map((item) => (
              <FadeIn key={item.text} delay={item.delay} direction="up">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24, color: theme.colors.accent }}>✓</span>
                  <span style={{ fontSize: 24, color: theme.colors.text }}>{item.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Stack pyramid */}
      <Sequence from={fps * 20} durationInFrames={fps * 25}>
        <CenteredSlide>
          <SceneTitle title="Software Stack" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginTop: 40,
            }}
          >
            <StackLayer
              label="Applications"
              items={['Your AI Models & Services']}
              delay={15}
              color={theme.colors.accent}
              width={500}
            />
            <StackLayer
              label="Frameworks"
              items={['PyTorch', 'TensorFlow', 'JAX', 'vLLM', 'SGLang', 'TensorRT-LLM (NVFP4 from day one)']}
              delay={30}
              color={theme.colors.accent2}
              width={680}
            />
            <StackLayer
              label="Libraries"
              items={['cuDNN', 'cuBLAS', 'NCCL (NVLink 5 aware)']}
              delay={45}
              color={theme.colors.amber}
              width={740}
            />
            <StackLayer
              label="CUDA 12"
              items={['Full compatibility', 'Existing code runs without changes']}
              delay={60}
              color={theme.colors.text}
              width={860}
            />
            <StackLayer
              label="Hardware"
              items={['NVIDIA B300 Blackwell Ultra']}
              delay={75}
              color={theme.colors.accent}
              width={980}
            />
          </div>

          <Callout delay={fps * 4} style={{ marginTop: 32, maxWidth: 900 }}>
            Deploy existing models on B300 instances. Add{' '}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>NVFP4 quantization</span> for the biggest
            memory and throughput gains.
          </Callout>

          {/* Transition */}
          <FadeIn delay={fps * 5} style={{ marginTop: 24 }}>
            <p style={{ fontSize: 28, color: theme.colors.accent, textAlign: 'center', fontWeight: 600 }}>
              Wrapping up
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
