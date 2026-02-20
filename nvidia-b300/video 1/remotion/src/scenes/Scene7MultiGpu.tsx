import React from 'react';
import { Sequence, useVideoConfig, Audio, staticFile, Img } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { StatBox } from '../components/StatBox';
import { FadeIn } from '../components/FadeIn';
import { theme } from '../theme';

export const Scene7MultiGpu: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene7-multi-gpu.m4a')} />
      {/* 8-GPU system overview */}
      <Sequence from={0} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Multi-GPU Scaling" subtitle="8x B300 GPUs + Intel Xeon CPUs + 2 TB system memory" />

          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="2.1 TB" label="GPU Memory" delay={15} />
            <StatBox number="108" label="PFLOPS FP4 Dense" delay={30} />
            <StatBox number="~14 kW" label="System Power" delay={45} />
          </div>

          {/* DGX B300 exploded view */}
          <FadeIn delay={fps * 2} style={{ marginTop: 36, textAlign: 'center' }}>
            <Img
              src={staticFile('dgx-b300-exploded.png')}
              style={{
                width: 750,
                objectFit: 'contain',
                borderRadius: 12,
              }}
            />
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center', marginTop: 12 }}>
              DGX B300 — 144 PFLOPS FP4 sparse | 72 PFLOPS FP8 training
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* NVLink + inter-node */}
      <Sequence from={fps * 35} durationInFrames={fps * 54}>
        <CenteredSlide padding="0 100px">
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', width: '100%', maxWidth: 1000 }}>
            <FadeIn delay={fps * 3} style={{ flex: 1 }}>
              <div
                style={{
                  background: 'rgba(118,185,0,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent}`,
                  padding: '24px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 700, color: theme.colors.accent }}>
                  Intra-node: NVLink 5
                </div>
                <div style={{ fontSize: 30, color: theme.colors.text, marginTop: 12, lineHeight: 1.6 }}>
                  2x 5th-gen NVSwitch
                  <br />
                  14.4 TB/s aggregate
                  <br />
                  1,800 GB/s per GPU
                  <br />
                  <span style={{ color: theme.colors.accent }}>2x faster than Hopper</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={fps * 15} style={{ flex: 1 }}>
              <div
                style={{
                  background: 'rgba(0,128,255,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent2}`,
                  padding: '24px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 700, color: theme.colors.accent2 }}>
                  Inter-node: up to 800 Gb/s
                </div>
                <div style={{ fontSize: 30, color: theme.colors.text, marginTop: 12, lineHeight: 1.6 }}>
                  InfiniBand or Ethernet
                  <br />
                  via NVIDIA ConnectX-8
                  <br />
                  Standard datacenter networking
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={fps * 30} style={{ marginTop: 32 }}>
            <p style={{ fontSize: 32, color: theme.colors.textMuted, textAlign: 'center' }}>
              Two-tier architecture: NVLink inside the node, high-speed networking outside.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
