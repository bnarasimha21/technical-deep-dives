import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2WhyB300 } from './scenes/Scene2WhyB300';
import { Scene3Numbers } from './scenes/Scene3Numbers';
import { Scene4DualReticle } from './scenes/Scene4DualReticle';
import { Scene5TensorCores } from './scenes/Scene5TensorCores';
import { Scene6Memory } from './scenes/Scene6Memory';
import { Scene7MultiGpu } from './scenes/Scene7MultiGpu';
import { Scene8Performance } from './scenes/Scene8Performance';
import { Thumbnail } from './scenes/Thumbnail';
import { PromoVideo } from './scenes/PromoVideo';
import { theme, sceneFrames, totalFrames, promoDurationFrames } from './theme';

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
        id="Video1"
        component={Video}
        durationInFrames={totalFrames}
        {...common}
      />

      {/* Individual scene compositions for previewing */}
      <Composition id="Scene1-Hook" component={Scene1Hook} durationInFrames={sceneFrames.scene1_hook} {...common} />
      <Composition id="Scene2-WhyB300" component={Scene2WhyB300} durationInFrames={sceneFrames.scene2_whyB300} {...common} />
      <Composition id="Scene3-Numbers" component={Scene3Numbers} durationInFrames={sceneFrames.scene3_numbers} {...common} />
      <Composition id="Scene4-DualReticle" component={Scene4DualReticle} durationInFrames={sceneFrames.scene4_dualReticle} {...common} />
      <Composition id="Scene5-TensorCores" component={Scene5TensorCores} durationInFrames={sceneFrames.scene5_tensorCores} {...common} />
      <Composition id="Scene6-Memory" component={Scene6Memory} durationInFrames={sceneFrames.scene6_memory} {...common} />
      <Composition id="Scene7-MultiGpu" component={Scene7MultiGpu} durationInFrames={sceneFrames.scene7_multiGpu} {...common} />
      <Composition id="Scene8-Performance" component={Scene8Performance} durationInFrames={sceneFrames.scene8_performance} {...common} />

      {/* Vertical promo for social media (1080×1920, 9:16) */}
      <Composition
        id="PromoVertical"
        component={PromoVideo}
        durationInFrames={promoDurationFrames}
        width={1080}
        height={1920}
        fps={theme.fps}
      />

      {/* YouTube Thumbnail — render a single frame as a still image */}
      <Composition id="Thumbnail" component={Thumbnail} durationInFrames={90} {...common} />
    </>
  );
};
