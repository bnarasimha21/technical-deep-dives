import React from 'react';
import { Series, Audio, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2WhyB300 } from './scenes/Scene2WhyB300';
import { Scene3Numbers } from './scenes/Scene3Numbers';
import { Scene4DualReticle } from './scenes/Scene4DualReticle';
import { Scene5TensorCores } from './scenes/Scene5TensorCores';
import { Scene6Memory } from './scenes/Scene6Memory';
import { Scene7MultiGpu } from './scenes/Scene7MultiGpu';
import { Scene8Performance } from './scenes/Scene8Performance';
import { sceneFrames } from './theme';

export const Video: React.FC = () => {
  return (
    <>
    <Audio src={staticFile('paulyudin-technology-tech-technology-484304.mp3')} volume={0.04} loop />
    <Series>
      <Series.Sequence durationInFrames={sceneFrames.scene1_hook}>
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene2_whyB300}>
        <Scene2WhyB300 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene3_numbers}>
        <Scene3Numbers />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene4_dualReticle}>
        <Scene4DualReticle />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene5_tensorCores}>
        <Scene5TensorCores />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene6_memory}>
        <Scene6Memory />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene7_multiGpu}>
        <Scene7MultiGpu />
      </Series.Sequence>
      <Series.Sequence durationInFrames={sceneFrames.scene8_performance}>
        <Scene8Performance />
      </Series.Sequence>
    </Series>
    </>
  );
};
