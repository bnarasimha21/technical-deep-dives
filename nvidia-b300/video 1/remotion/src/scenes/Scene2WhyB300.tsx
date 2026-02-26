import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';

import { theme } from '../theme';

const ModelSplitAnimation: React.FC<{ startDelay: number }> = ({ startDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modelAppear = spring({ frame: frame - startDelay, fps, config: { damping: 22, stiffness: 40 } });

  const splitStart = startDelay + fps * 3;
  const splitProgress = spring({ frame: frame - splitStart, fps, config: { damping: 18, stiffness: 18 } });

  const b300Start = splitStart + fps * 4;
  const b300Progress = spring({ frame: frame - b300Start, fps, config: { damping: 18, stiffness: 25 } });

  // 9 GPU fragment offsets with random-looking angles
  const gpuOffsets = [
    { x: -155, y: -70, rot: -10 },
    { x: -45, y: -80, rot: 5 },
    { x: 70, y: -65, rot: -6 },
    { x: -135, y: 15, rot: 8 },
    { x: -15, y: 10, rot: -3 },
    { x: 100, y: 20, rot: 7 },
    { x: -110, y: 95, rot: -5 },
    { x: 10, y: 100, rot: 4 },
    { x: 120, y: 90, rot: -8 },
  ];

  const modelOpacity = interpolate(splitProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });
  const shakeAmount = interpolate(splitProgress, [0, 0.15, 0.3], [0, 6, 0], { extrapolateRight: 'clamp' });
  const shakeX = Math.sin(frame * 1.5) * shakeAmount;

  const labelOpacity = interpolate(splitProgress, [0.6, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b300LabelOpacity = interpolate(b300Progress, [0.5, 1], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ marginTop: 60, width: '100%' }}>
      <div style={{ display: 'flex', gap: 100, justifyContent: 'center', alignItems: 'center' }}>
        {/* Left side: model block → 9 scattered GPU fragments */}
        <div style={{ textAlign: 'center', position: 'relative', width: 420, height: 260 }}>
          {/* Model block (fades out) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: `translate(-50%, -50%) translateX(${shakeX}px)`,
              opacity: modelAppear * modelOpacity,
              width: 340,
              height: 100,
              borderRadius: 16,
              border: `2px solid ${theme.colors.text}`,
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 700,
              color: theme.colors.text,
              letterSpacing: 3,
            }}
          >
            LARGE MODEL
          </div>

          {/* 9 scattered GPU fragments */}
          {gpuOffsets.map((offset, i) => {
            const gpuOpacity = interpolate(splitProgress, [0.2, 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const moveX = interpolate(splitProgress, [0.2, 1], [0, offset.x], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const moveY = interpolate(splitProgress, [0.2, 1], [0, offset.y], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const rotate = interpolate(splitProgress, [0.2, 1], [0, offset.rot], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${moveX}px)`,
                  top: `calc(40% + ${moveY}px)`,
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  opacity: gpuOpacity,
                  width: 65,
                  height: 65,
                  borderRadius: 10,
                  border: `2px solid ${theme.colors.textMuted}`,
                  background: 'rgba(139, 148, 158, 0.1)',
                  boxShadow: `0 0 ${interpolate(splitProgress, [0.5, 1], [0, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px rgba(139, 148, 158, 0.2)`,
                }}
              />
            );
          })}

          <p
            style={{
              fontSize: 26,
              color: theme.colors.textMuted,
              position: 'absolute',
              bottom: -50,
              width: '100%',
              opacity: labelOpacity,
              fontWeight: 600,
            }}
          >
            More GPUs needed
          </p>
        </div>

        {/* VS */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: theme.colors.textMuted,
            opacity: interpolate(b300Progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          vs
        </div>

        {/* Right side: 2 B300 boxes */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            {[0, 1].map((i) => {
              const pop = spring({ frame: frame - b300Start - i * 6, fps, config: { damping: 12, stiffness: 60 } });
              const scale = interpolate(pop, [0, 0.5, 0.8, 1], [0.3, 1.1, 0.95, 1], { extrapolateRight: 'clamp' });
              const opacity = interpolate(pop, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
              const glow = interpolate(pop, [0, 0.5, 1], [0, 20, 12], { extrapolateRight: 'clamp' });
              return (
                <div
                  key={i}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 16,
                    border: `3px solid ${theme.colors.accent}`,
                    background: 'rgba(118,185,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    fontWeight: 800,
                    color: theme.colors.accent,
                    opacity,
                    transform: `scale(${scale})`,
                    boxShadow: `0 0 ${glow}px rgba(118,185,0,0.5)`,
                  }}
                >
                  B300
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 26, color: theme.colors.accent, marginTop: 16, fontWeight: 600, opacity: b300LabelOpacity }}>
            Fits in fewer GPUs
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Datacenter → Factory transformation morph.
 * Phase 1: Server rack appears (stacked horizontal bars)
 * Phase 2: Rack morphs — roof angles up, chimney rises, gears appear and spin
 * Phase 3: "B300 = Engine" label with glow
 */
const FactoryMorph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timings (relative to sequence start)
  const rackAppear = spring({ frame, fps, config: { damping: 18, stiffness: 60 } });
  const morphProgress = spring({ frame: frame - fps * 4, fps, config: { damping: 14, stiffness: 30 } });
  const gearsAppear = spring({ frame: frame - fps * 6, fps, config: { damping: 14, stiffness: 50 } });
  const engineAppear = spring({ frame: frame - fps * 12, fps, config: { damping: 12, stiffness: 50 } });

  const rackOpacity = interpolate(rackAppear, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  // Morph values
  const roofAngle = interpolate(morphProgress, [0, 1], [0, -12], { extrapolateRight: 'clamp' });
  const chimneyHeight = interpolate(morphProgress, [0, 1], [0, 70], { extrapolateRight: 'clamp' });
  const chimneyOpacity = interpolate(morphProgress, [0.3, 0.6], [0, 1], { extrapolateRight: 'clamp' });
  const rackColor = interpolate(morphProgress, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // Gear rotation
  const gearRotation = frame * 2;
  const gearOpacity = interpolate(gearsAppear, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  // Smoke particles
  const smokeOpacity = interpolate(morphProgress, [0.6, 1], [0, 0.6], { extrapolateRight: 'clamp' });

  // Engine label
  const engineScale = interpolate(engineAppear, [0, 0.5, 0.8, 1], [0.8, 1.06, 0.97, 1], { extrapolateRight: 'clamp' });
  const engineOpacity = interpolate(engineAppear, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
  const engineGlow = interpolate(engineAppear, [0, 0.5, 1], [0, 0.8, 0.3], { extrapolateRight: 'clamp' });

  // Interpolated border color: gray → green
  const borderR = Math.round(interpolate(rackColor, [0, 1], [80, 118]));
  const borderG = Math.round(interpolate(rackColor, [0, 1], [80, 185]));
  const borderB = Math.round(interpolate(rackColor, [0, 1], [80, 0]));
  const borderColorStr = `rgb(${borderR}, ${borderG}, ${borderB})`;

  // Server rack bar colors morph to green
  const barBg = (idx: number) => {
    const baseAlpha = 0.1 + (idx / 6) * 0.15;
    const greenAlpha = 0.15 + (idx / 6) * 0.25;
    const alpha = interpolate(rackColor, [0, 1], [baseAlpha, greenAlpha]);
    const r = Math.round(interpolate(rackColor, [0, 1], [255, 118]));
    const g = Math.round(interpolate(rackColor, [0, 1], [255, 185]));
    const b = Math.round(interpolate(rackColor, [0, 1], [255, 0]));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, position: 'relative' }}>
      {/* Smoke particles above chimney */}
      {[0, 1, 2].map((i) => {
        const yOff = ((frame * 0.8 + i * 30) % 80);
        const xDrift = Math.sin(frame * 0.05 + i * 2) * 8;
        const particleOpacity = smokeOpacity * interpolate(yOff, [0, 40, 80], [0.6, 0.3, 0], { extrapolateRight: 'clamp' });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: -30 - yOff,
              left: `calc(50% + 80px + ${xDrift}px)`,
              width: 12 + i * 4,
              height: 12 + i * 4,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              opacity: particleOpacity,
              filter: 'blur(4px)',
            }}
          />
        );
      })}

      {/* Main building structure */}
      <div
        style={{
          opacity: rackOpacity,
          position: 'relative',
          width: 360,
          height: 260,
        }}
      >
        {/* Roof (morphs from flat to angled) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background: `linear-gradient(180deg, ${borderColorStr}33, transparent)`,
            borderRadius: '12px 12px 0 0',
            transform: `perspective(400px) rotateX(${roofAngle}deg)`,
            transformOrigin: 'bottom center',
            borderTop: `2px solid ${borderColorStr}`,
            borderLeft: `2px solid ${borderColorStr}`,
            borderRight: `2px solid ${borderColorStr}`,
          }}
        />

        {/* Chimney */}
        <div
          style={{
            position: 'absolute',
            top: -chimneyHeight,
            right: 60,
            width: 36,
            height: chimneyHeight,
            background: `linear-gradient(180deg, ${borderColorStr}, ${borderColorStr}66)`,
            borderRadius: '4px 4px 0 0',
            opacity: chimneyOpacity,
          }}
        />

        {/* Main body — server bars inside */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
            border: `2px solid ${borderColorStr}`,
            borderRadius: '0 0 12px 12px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
            padding: '16px 24px',
          }}
        >
          {/* Server bars / factory internals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 20,
                borderRadius: 4,
                background: barBg(i),
                border: `1px solid ${borderColorStr}44`,
              }}
            />
          ))}

          {/* Gear overlays */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: gearOpacity,
            }}
            viewBox="0 0 360 220"
          >
            {/* Large gear */}
            <g transform={`translate(120, 110) rotate(${gearRotation})`}>
              <circle cx="0" cy="0" r="35" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.5" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={Math.cos(angle) * 25}
                    y1={Math.sin(angle) * 25}
                    x2={Math.cos(angle) * 42}
                    y2={Math.sin(angle) * 42}
                    stroke={theme.colors.accent}
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                );
              })}
              <circle cx="0" cy="0" r="8" fill={theme.colors.accent} opacity="0.3" />
            </g>
            {/* Small gear (counter-rotating) */}
            <g transform={`translate(240, 80) rotate(${-gearRotation * 1.5})`}>
              <circle cx="0" cy="0" r="22" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" opacity="0.4" />
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={Math.cos(angle) * 16}
                    y1={Math.sin(angle) * 16}
                    x2={Math.cos(angle) * 28}
                    y2={Math.sin(angle) * 28}
                    stroke={theme.colors.accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                );
              })}
              <circle cx="0" cy="0" r="5" fill={theme.colors.accent} opacity="0.25" />
            </g>
          </svg>
        </div>
      </div>

      {/* B300 = Engine label */}
      <div
        style={{
          marginTop: 32,
          opacity: engineOpacity,
          transform: `scale(${engineScale})`,
          padding: '18px 48px',
          borderRadius: 14,
          background: 'rgba(118, 185, 0, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1.5px solid rgba(118, 185, 0, 0.3)`,
          boxShadow: `0 0 ${20 * engineGlow}px ${8 * engineGlow}px rgba(118, 185, 0, 0.4)`,
        }}
      >
        <span style={{ fontSize: 38, color: theme.colors.text }}>
          The B300 is the{' '}
          <span style={{ color: theme.colors.accent, fontWeight: 700 }}>engine</span> of that factory.
        </span>
      </div>
    </div>
  );
};

/**
 * 3D flip card — starts face-down (showing "?"), flips to reveal content.
 */
const FlipCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  color: string;
  delay: number;
}> = ({ icon, title, desc, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance (slides up)
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 60 } });
  const enterOpacity = interpolate(enter, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
  const enterY = interpolate(enter, [0, 1], [40, 0], { extrapolateRight: 'clamp' });

  // Flip starts 1s after card appears
  const flipDelay = delay + fps * 1;
  const flip = spring({ frame: frame - flipDelay, fps, config: { damping: 16, stiffness: 40 } });
  const rotateY = interpolate(flip, [0, 1], [0, 180], { extrapolateRight: 'clamp' });

  // Show front (?) when < 90°, back (content) when >= 90°
  const showBack = rotateY >= 90;

  // Glow after flip completes
  const glowPulse = flip > 0.95 ? 0.3 + Math.sin(frame * 0.1) * 0.15 : 0;

  const cardStyle: React.CSSProperties = {
    width: 300,
    height: 340,
    borderRadius: 20,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `translateY(${enterY}px) perspective(800px) rotateY(${rotateY}deg)`,
    opacity: enterOpacity,
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 28px',
  };

  return (
    <div style={cardStyle}>
      {/* Front face (?) — visible when not flipped */}
      <div
        style={{
          ...faceStyle,
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1.5px solid rgba(255, 255, 255, 0.15)`,
          opacity: showBack ? 0 : 1,
        }}
      >
        <div style={{ fontSize: 80, color: theme.colors.textMuted, fontWeight: 300 }}>?</div>
      </div>

      {/* Back face (content) — visible after flip */}
      <div
        style={{
          ...faceStyle,
          transform: 'rotateY(180deg)',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1.5px solid ${color}40`,
          boxShadow: `0 0 ${16 * glowPulse}px ${6 * glowPulse}px ${color}66`,
          opacity: showBack ? 1 : 0,
        }}
      >
        <div style={{ fontSize: 56 }}>{icon}</div>
        <div style={{ fontSize: 32, fontWeight: 700, color, marginTop: 16, textAlign: 'center' }}>{title}</div>
        <div style={{ fontSize: 24, color: theme.colors.textMuted, marginTop: 12, lineHeight: 1.4, textAlign: 'center' }}>{desc}</div>
      </div>
    </div>
  );
};

/**
 * Animated GPU timeline — horizontal line draws itself,
 * nodes pop up at each GPU, pulse travels along the line.
 */
const gpus = [
  { name: 'V100', year: '2017' },
  { name: 'A100', year: '2020' },
  { name: 'H100', year: '2022' },
  { name: 'B200', year: '2024' },
  { name: 'B300', year: '2025' },
];

const GpuTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalWidth = 1000;
  const nodeSpacing = totalWidth / (gpus.length - 1);
  const lineY = 60; // vertical center for the line

  // Line draws left to right over ~4s
  const lineDraw = spring({ frame, fps, config: { damping: 30, stiffness: 20 } });
  const lineWidth = totalWidth * lineDraw;

  // Pulse dot travels along the line continuously after it's drawn
  const pulseX = lineDraw > 0.9 ? ((frame * 4) % (totalWidth + 40)) - 20 : -100;
  const pulseOpacity = lineDraw > 0.9 ? 0.7 : 0;

  return (
    <div style={{ position: 'relative', width: totalWidth, height: 200, marginTop: 48 }}>
      {/* Base line (track) */}
      <div
        style={{
          position: 'absolute',
          top: lineY - 1,
          left: 0,
          width: totalWidth,
          height: 2,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 1,
        }}
      />

      {/* Animated drawn line */}
      <div
        style={{
          position: 'absolute',
          top: lineY - 1.5,
          left: 0,
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, ${theme.colors.accent}66, ${theme.colors.accent})`,
          borderRadius: 2,
          boxShadow: `0 0 8px ${theme.colors.accent}44`,
        }}
      />

      {/* Traveling pulse dot */}
      <div
        style={{
          position: 'absolute',
          top: lineY - 5,
          left: pulseX,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: theme.colors.accent,
          opacity: pulseOpacity,
          boxShadow: `0 0 12px ${theme.colors.accent}`,
          transition: 'none',
        }}
      />

      {/* GPU nodes */}
      {gpus.map((gpu, i) => {
        const nodeX = i * nodeSpacing;
        const nodeDelay = Math.floor(fps * 0.8 * i) + 10; // stagger ~0.8s apart
        const pop = spring({ frame: frame - nodeDelay, fps, config: { damping: 12, stiffness: 70 } });
        const nodeScale = interpolate(pop, [0, 0.5, 0.8, 1], [0, 1.15, 0.95, 1], { extrapolateRight: 'clamp' });
        const nodeOpacity = interpolate(pop, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' });

        const isLast = i === gpus.length - 1;
        const accentColor = isLast ? theme.colors.accent : theme.colors.text;
        const glowOpacity = isLast && pop > 0.9 ? 0.3 + Math.sin(frame * 0.1) * 0.15 : 0;

        return (
          <div
            key={gpu.name}
            style={{
              position: 'absolute',
              left: nodeX,
              top: 0,
              width: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Node dot on the line */}
            <div
              style={{
                position: 'absolute',
                top: lineY - 7,
                left: -7,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: isLast ? theme.colors.accent : 'rgba(255,255,255,0.3)',
                border: `2px solid ${isLast ? theme.colors.accent : 'rgba(255,255,255,0.5)'}`,
                opacity: nodeOpacity,
                transform: `scale(${nodeScale})`,
                boxShadow: isLast ? `0 0 ${12 + glowOpacity * 20}px ${theme.colors.accent}` : 'none',
              }}
            />

            {/* Card above the line */}
            <div
              style={{
                position: 'absolute',
                top: lineY + 24,
                transform: `translateX(-50%) scale(${nodeScale})`,
                opacity: nodeOpacity,
                textAlign: 'center',
                background: isLast ? 'rgba(118, 185, 0, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1.5px solid ${isLast ? 'rgba(118, 185, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 12,
                padding: '14px 24px',
                boxShadow: isLast ? `0 0 ${10 + glowOpacity * 16}px rgba(118, 185, 0, 0.3)` : 'none',
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: accentColor }}>{gpu.name}</div>
              <div style={{ fontSize: 22, color: theme.colors.textMuted, marginTop: 4 }}>{gpu.year}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Animated arrow that draws itself between two StatBoxes */
const GrowthArrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draw = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 50 } });
  const opacity = interpolate(draw, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' });
  const lineScale = interpolate(draw, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(draw, [0.7, 1], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ display: 'flex', alignItems: 'center', opacity, width: 48 }}>
      <svg width="48" height="24" viewBox="0 0 48 24">
        {/* Line that draws itself */}
        <line
          x1="0" y1="12" x2={36 * lineScale} y2="12"
          stroke={theme.colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Arrowhead appears at end */}
        <polygon
          points="32,4 46,12 32,20"
          fill={theme.colors.accent}
          opacity={arrowOpacity}
        />
      </svg>
    </div>
  );
};

export const Scene2WhyB300: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene2-whyb300.m4a')} />
      {/* GPU timeline animation — animated horizontal line with nodes */}
      <Sequence from={Math.round(fps * 0.5)} durationInFrames={Math.round(fps * 7.5)}>
        <CenteredSlide>
          <SceneTitle title="GPU Evolution" />
          <GpuTimeline />
        </CenteredSlide>
      </Sequence>

      {/* Model growth stats */}
      <Sequence from={fps * 8} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Why B300 Exists" />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 48 }}>
            <StatBox number="175B" label="GPT-3 (2020)" delay={fps * 2} />
            <GrowthArrow delay={fps * 5} />
            <StatBox number="671B" label="DeepSeek-R1 (2025)" delay={fps * 6} />
            <GrowthArrow delay={fps * 9} />
            <StatBox number="∞" label="And Growing..." delay={fps * 10} />
          </div>

          {/* Animated model split vs single GPU */}
          <ModelSplitAnimation startDelay={fps * 19} />
        </CenteredSlide>
      </Sequence>

      {/* AI Factory vision — datacenter → factory morph */}
      <Sequence from={fps * 43} durationInFrames={fps * 17}>
        <CenteredSlide padding="0 120px">
          <SceneTitle title="The AI Factory Era" />

          <FadeIn delay={fps * 1} style={{ marginTop: 20 }}>
            <p style={{ fontSize: 42, textAlign: 'center', lineHeight: 1.7, maxWidth: 1000 }}>
              NVIDIA's vision: data centers as{' '}
              <span style={{ color: theme.colors.accent2, fontWeight: 700 }}>AI factories</span>
            </p>
          </FadeIn>

          <FactoryMorph />
        </CenteredSlide>
      </Sequence>

      {/* Deliberate trade-offs — animated gauges */}
      <Sequence from={fps * 60} durationInFrames={fps * 29}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Deliberate Trade-offs" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 50 }}>
            <FlipCard
              icon=""
              title="Memory Capacity"
              desc="Models keep getting bigger"
              color={theme.colors.accent}
              delay={fps * 5}
            />
            <FlipCard
              icon=""
              title="NVFP4"
              desc="4-bit precision is production-ready"
              color={theme.colors.accent2}
              delay={fps * 9}
            />
            <FlipCard
              icon=""
              title="NVLink Bandwidth"
              desc="MoE architectures are the future"
              color="#FFB400"
              delay={fps * 14}
            />
          </div>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
