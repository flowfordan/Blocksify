import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SceneView } from 'three/SceneView';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import { sceneEnvModel } from 'entities/sceneEnv';
import { sceneModel } from 'entities/scene';

import './desk.scss';
import { cameraModel } from 'entities/camera';
import useResizeObserver from './useResizeObserver';

export const Desk = () => {
  const [isMounted, setIsMounted] = useState(false);
  // const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [sceneView, setSceneView] = useState<SceneView | null>(null);

  // const canvasScene = useRef<null | HTMLCanvasElement>(null);
  const canvasUI = useRef<null | HTMLCanvasElement>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null);

  const onResize = useCallback((target: HTMLCanvasElement, entry: ResizeObserverEntry) => {
    // Handle the resize event
    if (sceneView) {
      console.log('fire resize', target.offsetWidth, entry.contentRect.width, entry.contentRect.height);
      sceneView.onWindowResize(entry.contentRect.width, entry.contentRect.height);
    }
  }, []);
  const canvasScene = useResizeObserver(onResize);
  console.log(canvasScene.current);

  console.log('Desk');

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      //on view params change
      if (sceneView) {
        sceneView.onWindowResize(entry.contentRect.width, entry.contentRect.height);
      }
    });
  });

  useEffect(() => {
    const innerTreeRef = canvasScene.current;
    if (!innerTreeRef) return;
    setSceneView(
      (prev) =>
        new SceneView(
          innerTreeRef,
          layersModel,
          instrumentsModel,
          instrumentsHelpersModel,
          sceneModel,
          sceneEnvModel,
          cameraModel
        )
    );
    // resizeObserver.observe(innerTreeRef, { box: 'content-box' });

    // if (canvasContainer.current && sceneView) {
    //   const width = canvasContainer.current.offsetWidth;
    //   const height = canvasContainer.current.offsetHeight;
    //   sceneView.onWindowResize(width, height);
    //   // setCanvasSize((prevSizes) => {
    //   //   return {
    //   //     ...prevSizes,
    //   //     width: width,
    //   //     height: height,
    //   //   };
    //   // });
    // }
    console.log('MOUNTED');
  }, [isMounted]);

  //on Mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   if (sceneView && canvasScene.current) {
  //     resizeObserver.observe(canvasScene.current, { box: 'content-box' });
  //   }
  // }, [sceneView]);

  return (
    <div ref={canvasContainer} className={'desk'}>
      {isMounted && typeof window !== 'undefined' ? (
        <canvas
          ref={canvasScene}
          className={'desk__canvasScene'}
          id="canvasScene"
          // width={canvasSize.width}
          // height={canvasSize.height}
        />
      ) : (
        'Canvas'
      )}
    </div>
  );
};
