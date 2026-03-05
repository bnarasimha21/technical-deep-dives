import React from 'react';
import { Sequence } from 'remotion';
import { Scene0Intro } from './scenes/Scene0Intro';
import { Scene2WhoIsWorkato } from './scenes/Scene2WhoIsWorkato';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Solution } from './scenes/Scene4Solution';
import { Scene5Results } from './scenes/Scene5Results';
import { Scene6BiggerPicture } from './scenes/Scene6BiggerPicture';
import { Scene7Closing } from './scenes/Scene7Closing';
import { sceneDurations } from './theme';
import { ensureFontsLoaded } from './fonts';

export const Video: React.FC = () => {
  ensureFontsLoaded();

  const scenes = [
    { Component: Scene0Intro, duration: sceneDurations.scene0Intro },
    { Component: Scene2WhoIsWorkato, duration: sceneDurations.scene2WhoIsWorkato },
    { Component: Scene3Problem, duration: sceneDurations.scene3Problem },
    { Component: Scene4Solution, duration: sceneDurations.scene4Solution },
    { Component: Scene5Results, duration: sceneDurations.scene5Results },
    { Component: Scene6BiggerPicture, duration: sceneDurations.scene6BiggerPicture },
    { Component: Scene7Closing, duration: sceneDurations.scene7Closing },
  ];

  let currentFrame = 0;

  return (
    <>
      {scenes.map(({ Component, duration }, i) => {
        const from = currentFrame;
        currentFrame += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration} name={`Scene ${i + 1}`}>
            <Component />
          </Sequence>
        );
      })}
    </>
  );
};
