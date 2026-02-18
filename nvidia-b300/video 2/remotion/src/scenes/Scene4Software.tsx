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
      <Sequence from={0} durationInFrames={fps * 45}>
        <CenteredSlide>
          <SceneTitle title="Software Stack" subtitle="Seamless compatibility. No rewrites needed." />

          {/* Stack pyramid */}
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
              items={['PyTorch', 'TensorFlow', 'JAX', 'vLLM', 'SGLang', 'TensorRT-LLM']}
              delay={30}
              color={theme.colors.accent2}
              width={620}
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
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
