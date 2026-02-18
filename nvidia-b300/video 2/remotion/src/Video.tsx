import React from 'react';
import { Series } from 'remotion';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2WhoShouldUse } from './scenes/Scene2WhoShouldUse';
import { Scene3Economics } from './scenes/Scene3Economics';
import { Scene4Software } from './scenes/Scene4Software';
import { Scene5Summary } from './scenes/Scene5Summary';
import { sceneFrames } from './theme';

export const Video: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={sceneFrames.scene1_intro}>
        <Scene1Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene2_whoShouldUse}>
        <Scene2WhoShouldUse />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene3_economics}>
        <Scene3Economics />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene4_software}>
        <Scene4Software />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene5_summary}>
        <Scene5Summary />
      </Series.Sequence>
    </Series>
  );
};
