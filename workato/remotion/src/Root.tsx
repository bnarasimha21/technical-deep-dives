import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { layout, sceneDurations, totalDuration } from './theme';
import { Scene0Intro } from './scenes/Scene0Intro';
import { Scene2WhoIsWorkato } from './scenes/Scene2WhoIsWorkato';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Solution } from './scenes/Scene4Solution';
import { Scene5Results } from './scenes/Scene5Results';
import { Scene6BiggerPicture } from './scenes/Scene6BiggerPicture';
import { Scene7Closing } from './scenes/Scene7Closing';

const scenes = [
  { id: 'Scene0-Intro', component: Scene0Intro, duration: sceneDurations.scene0Intro },
  { id: 'Scene2-WhoIsWorkato', component: Scene2WhoIsWorkato, duration: sceneDurations.scene2WhoIsWorkato },
  { id: 'Scene3-Problem', component: Scene3Problem, duration: sceneDurations.scene3Problem },
  { id: 'Scene4-Solution', component: Scene4Solution, duration: sceneDurations.scene4Solution },
  { id: 'Scene5-Results', component: Scene5Results, duration: sceneDurations.scene5Results },
  { id: 'Scene6-BiggerPicture', component: Scene6BiggerPicture, duration: sceneDurations.scene6BiggerPicture },
  { id: 'Scene7-Closing', component: Scene7Closing, duration: sceneDurations.scene7Closing },
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
