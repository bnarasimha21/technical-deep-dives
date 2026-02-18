import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2WhoShouldUse } from './scenes/Scene2WhoShouldUse';
import { Scene3Economics } from './scenes/Scene3Economics';
import { Scene4Software } from './scenes/Scene4Software';
import { Scene5Summary } from './scenes/Scene5Summary';
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
      <Composition id="Scene3-Economics" component={Scene3Economics} durationInFrames={sceneFrames.scene3_economics} {...common} />
      <Composition id="Scene4-Software" component={Scene4Software} durationInFrames={sceneFrames.scene4_software} {...common} />
      <Composition id="Scene5-Summary" component={Scene5Summary} durationInFrames={sceneFrames.scene5_summary} {...common} />
    </>
  );
};
