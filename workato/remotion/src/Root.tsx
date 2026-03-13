import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { layout, sceneDurations, totalDuration } from './theme';
import { Scene0Hook } from './scenes/Scene0Hook';
import { Scene1Problem } from './scenes/Scene1Problem';
import { Scene3KVRouting } from './scenes/Scene3KVRouting';
import { Scene4Benchmarks } from './scenes/Scene4Benchmarks';
import { Scene6Closing } from './scenes/Scene6Closing';

const scenes = [
  { id: 'Scene0-Hook', component: Scene0Hook, duration: sceneDurations.scene0Hook },
  { id: 'Scene1-Problem', component: Scene1Problem, duration: sceneDurations.scene1Problem },
  { id: 'Scene3-KVRouting', component: Scene3KVRouting, duration: sceneDurations.scene3KVRouting },
  { id: 'Scene4-Benchmarks', component: Scene4Benchmarks, duration: sceneDurations.scene4Benchmarks },
  { id: 'Scene6-Closing', component: Scene6Closing, duration: sceneDurations.scene6Closing },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorkatoStory"
        component={Video}
        durationInFrames={totalDuration}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      {scenes.map(({ id, component, duration }) => (
        <Composition
          key={id}
          id={id}
          component={component}
          durationInFrames={duration}
          fps={layout.fps}
          width={layout.width}
          height={layout.height}
        />
      ))}
    </>
  );
};
