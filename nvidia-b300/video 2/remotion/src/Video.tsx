import React from 'react';
import { Series } from 'remotion';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2WhoShouldUse } from './scenes/Scene2WhoShouldUse';
import { Scene3Benchmarks } from './scenes/Scene3Benchmarks';
import { Scene4Economics } from './scenes/Scene4Economics';
import { Scene5Software } from './scenes/Scene5Software';
import { Scene6Summary } from './scenes/Scene6Summary';
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
      <Series.Sequence durationInFrames={sceneFrames.scene3_benchmarks}>
        <Scene3Benchmarks />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene4_economics}>
        <Scene4Economics />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene5_software}>
        <Scene5Software />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene6_summary}>
        <Scene6Summary />
      </Series.Sequence>
    </Series>
  );
};
