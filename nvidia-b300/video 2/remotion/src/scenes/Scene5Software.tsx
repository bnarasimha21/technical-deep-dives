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

export const Scene5Software: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Compatibility checklist */}
      <Sequence from={0} durationInFrames={fps * 22}>
        <CenteredSlide>
          <SceneTitle title="Software Compatibility" subtitle="No rewrites needed — deploy and go" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', maxWidth: 750, margin: '40px auto 0' }}>
            {[
              { text: 'Full CUDA 12 compatibility — your existing code runs unchanged', delay: 15 },
              { text: 'PyTorch, TensorFlow, JAX — all supported natively', delay: 28 },
              { text: 'vLLM, SGLang, TensorRT-LLM — NVFP4 support from day one', delay: 41 },
              { text: 'cuDNN, cuBLAS, NCCL — all updated and NVLink 5 aware', delay: 54 },
              { text: 'Add NVFP4 quantization for biggest memory + throughput gains', delay: 67 },
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
      <Sequence from={fps * 22} durationInFrames={fps * 28}>
        <CenteredSlide>
          <SceneTitle title="The Software Stack" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginTop: 36,
            }}
          >
            <StackLayer
              label="Your Applications"
              items={['AI Models & Services']}
              delay={12}
              color={theme.colors.accent}
              width={450}
            />
            <StackLayer
              label="Inference Servers"
              items={['vLLM', 'SGLang', 'TensorRT-LLM', 'Triton']}
              delay={24}
              color={theme.colors.accent2}
              width={580}
            />
            <StackLayer
              label="Frameworks"
              items={['PyTorch', 'TensorFlow', 'JAX', 'NeMo']}
              delay={36}
              color={theme.colors.amber}
              width={680}
            />
            <StackLayer
              label="Libraries"
              items={['cuDNN', 'cuBLAS', 'NCCL (NVLink 5)', 'cuSPARSE']}
              delay={48}
              color={theme.colors.text}
              width={780}
            />
            <StackLayer
              label="CUDA 12"
              items={['Full backward compatibility', 'NVFP4 intrinsics', 'Enhanced MMA']}
              delay={60}
              color={theme.colors.accent2}
              width={880}
            />
            <StackLayer
              label="Hardware: NVIDIA B300 Blackwell Ultra"
              items={['15 PFLOPS FP4', '288 GB HBM3e', '8 TB/s']}
              delay={72}
              color={theme.colors.accent}
              width={980}
            />
          </div>

          <Callout delay={fps * 4} style={{ marginTop: 28, maxWidth: 900 }}>
            The practical takeaway: deploy your existing models on B300, add{' '}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>NVFP4 quantization</span>, and the
            performance gains are largely automatic.
          </Callout>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
