import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { Scene0Hook } from './scenes/Scene0Hook';
import { Scene1Problem } from './scenes/Scene1Problem';
import { Scene3KVRouting } from './scenes/Scene3KVRouting';
import { Scene4Benchmarks } from './scenes/Scene4Benchmarks';
import { Scene6Closing } from './scenes/Scene6Closing';
import { sceneDurations, voDurations } from './theme';
import { ensureFontsLoaded } from './fonts';

// Voiceover file mapping per scene (paragraph-level files for precise timing)
const voiceovers: Record<string, string[]> = {
  Scene0Hook: ['vo-Scene0-Hook.mp3'],
  Scene1Problem: [
    'vo-Scene2-Problem-Paragraph1.mp3',
    'vo-Scene2-Problem-Paragraph2.mp3',
    'vo-Scene2-Problem-Paragraph3.mp3',
    'vo-Scene2-Problem-Paragraph4.mp3',
    'vo-Scene2-Problem-Paragraph5.mp3',
  ],
  Scene3KVRouting: [
    'vo-Scene3-KV-Paragraph1.mp3',
    'vo-Scene3-KV-Paragraph2.mp3',
    'vo-Scene3-KV-Paragraph3.mp3',
    'vo-Scene3-KV-Paragraph4.mp3',
  ],
  Scene4Benchmarks: [
    'vo-Scene4-Benchmarks-Paragraph1.mp3',
    'vo-Scene4-Benchmarks-Paragraph2.mp3',
    'vo-Scene4-Benchmarks-Paragraph3.mp3',
  ],
  Scene6Closing: ['vo-Scene5-Closing.mp3'],
};

// Frame offsets for each paragraph within a scene (cumulative)
const voOffsets: Record<string, number[]> = {
  Scene0Hook: [0],
  Scene1Problem: [
    0,
    voDurations.scene1Problem.p1,
    voDurations.scene1Problem.p1 + voDurations.scene1Problem.p2,
    voDurations.scene1Problem.p1 + voDurations.scene1Problem.p2 + voDurations.scene1Problem.p3,
    voDurations.scene1Problem.p1 + voDurations.scene1Problem.p2 + voDurations.scene1Problem.p3 + voDurations.scene1Problem.p4,
  ],
  Scene3KVRouting: [
    0,
    voDurations.scene3KVRouting.p1,
    voDurations.scene3KVRouting.p1 + voDurations.scene3KVRouting.p2,
    voDurations.scene3KVRouting.p1 + voDurations.scene3KVRouting.p2 + voDurations.scene3KVRouting.p3,
  ],
  Scene4Benchmarks: [
    0,
    voDurations.scene4Benchmarks.p1,
    voDurations.scene4Benchmarks.p1 + voDurations.scene4Benchmarks.p2,
  ],
  Scene6Closing: [0],
};

const scenes = [
  { key: 'Scene0Hook', Component: Scene0Hook, duration: sceneDurations.scene0Hook },
  { key: 'Scene1Problem', Component: Scene1Problem, duration: sceneDurations.scene1Problem },
  { key: 'Scene3KVRouting', Component: Scene3KVRouting, duration: sceneDurations.scene3KVRouting },
  { key: 'Scene4Benchmarks', Component: Scene4Benchmarks, duration: sceneDurations.scene4Benchmarks },
  { key: 'Scene6Closing', Component: Scene6Closing, duration: sceneDurations.scene6Closing },
];

export const Video: React.FC = () => {
  ensureFontsLoaded();

  let currentFrame = 0;

  return (
    <>
      <Audio src={staticFile('bg-music.mp3')} volume={0.01} loop />
      {scenes.map(({ key, Component, duration }) => {
        const from = currentFrame;
        currentFrame += duration;
        const sceneVOs = voiceovers[key] || [];
        const sceneOffsets = voOffsets[key] || [];
        return (
          <Sequence key={key} from={from} durationInFrames={duration} name={key}>
            <Component />
            {sceneVOs.map((file, i) => (
              <Sequence key={file} from={sceneOffsets[i] || 0}>
                <Audio src={staticFile(file)} volume={1} />
              </Sequence>
            ))}
          </Sequence>
        );
      })}
    </>
  );
};
