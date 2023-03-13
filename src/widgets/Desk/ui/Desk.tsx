/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { SceneView } from 'three/SceneView';
import './desk.scss';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';

export const Desk = (): JSX.Element => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  // const [sceneView, setSceneView] = useState<SceneView | null>(null);

  let sceneView: any;
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
    sceneView = new SceneView(innerTreeRef, layersModel, instrumentsModel);
    // setSceneView(new SceneView(innerTreeRef, layersModel, instrumentsModel));
    resizeObserver.observe(innerTreeRef, { box: 'content-box' });

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
