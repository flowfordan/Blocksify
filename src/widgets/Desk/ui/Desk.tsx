import React, { useEffect, useRef, useState } from 'react';
import { SceneView } from 'three/SceneView';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import { sceneEnvModel } from 'entities/sceneEnv';
import { sceneModel } from 'entities/scene';

import './desk.scss';

export const Desk = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [sceneView, setSceneView] = useState<SceneView | null>(null);

  const canvasScene = useRef<null | HTMLCanvasElement>(null);
  const canvasUI = useRef<null | HTMLCanvasElement>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null);

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      //on view params change
      if (sceneView) {
        sceneView.onWindowResize(entry.contentRect.width, entry.contentRect.height);
      }
    });
  });

  //on Mount
  useEffect(() => {
    const innerTreeRef = canvasScene.current;
    if (!innerTreeRef) throw new Error('There is no canvas ref!');
    setSceneView(
      (prev) =>
        new SceneView(innerTreeRef, layersModel, instrumentsModel, instrumentsHelpersModel, sceneModel, sceneEnvModel)
    );

    if (canvasContainer.current) {
      const width = canvasContainer.current.offsetWidth;
      const height = canvasContainer.current.offsetHeight;
      setCanvasSize((prevSizes) => {
        return {
          ...prevSizes,
          width: width,
          height: height,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (sceneView && canvasScene.current) {
      resizeObserver.observe(canvasScene.current, { box: 'content-box' });
    }
  }, [sceneView]);

  return (
    <div ref={canvasContainer} className={'desk'}>
      <canvas
        ref={canvasScene}
        className={'desk__canvasScene'}
        id="canvasScene"
        // width={canvasSize.width}
        // height={canvasSize.height}
      />
    </div>
  );
};
