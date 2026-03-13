import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2WhoShouldUse } from './scenes/Scene2WhoShouldUse';
import { Scene3Benchmarks } from './scenes/Scene3Benchmarks';
import { Scene4Economics } from './scenes/Scene4Economics';
import { Scene5Software } from './scenes/Scene5Software';
import { Scene6Summary } from './scenes/Scene6Summary';
import { theme, sceneFrames, totalFrames } from './theme';

export const RemotionRoot: React.FC = () => {
  const common = {
    width: theme.width,
    height: theme.height,
    fps: theme.fps,
  };

  return (
    <>
      {/* Full video composition */}
      <Composition
        id="Video2"
        component={Video}
        durationInFrames={totalFrames}
        {...common}
      />

      {/* Individual scene compositions for previewing */}
      <Composition id="Scene1-Intro" component={Scene1Intro} durationInFrames={sceneFrames.scene1_intro} {...common} />
      <Composition id="Scene2-WhoShouldUse" component={Scene2WhoShouldUse} durationInFrames={sceneFrames.scene2_whoShouldUse} {...common} />
      <Composition id="Scene3-Benchmarks" component={Scene3Benchmarks} durationInFrames={sceneFrames.scene3_benchmarks} {...common} />
      <Composition id="Scene4-Economics" component={Scene4Economics} durationInFrames={sceneFrames.scene4_economics} {...common} />
      <Composition id="Scene5-Software" component={Scene5Software} durationInFrames={sceneFrames.scene5_software} {...common} />
      <Composition id="Scene6-Summary" component={Scene6Summary} durationInFrames={sceneFrames.scene6_summary} {...common} />
    </>
  );
};
