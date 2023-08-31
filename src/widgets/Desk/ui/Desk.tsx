import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SceneView } from 'three/SceneView';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import { sceneEnvModel } from 'entities/sceneEnv';
import { sceneModel } from 'entities/scene';

import styles from './desk.module.scss';
import { cameraModel } from 'entities/camera';
import useResizeObserver from './useResizeObserver';
import { generatorModel } from 'features/generator';

export const Desk = () => {
  const [isMounted, setIsMounted] = useState(false);
  // const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  // const [sceneView, setSceneView] = useState<SceneView | null>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null);
  const sceneViewRef = useRef<SceneView | null>(null);

  const onResize = useCallback(
    (target: HTMLCanvasElement, entry: ResizeObserverEntry) => {
      // Handle the resize event
      if (sceneViewRef.current) {
        sceneViewRef.current.onWindowResize(entry.contentRect.width, entry.contentRect.height);
      }
    },
    [sceneViewRef.current, isMounted]
  );
  const canvasScene = useResizeObserver(onResize);

  useEffect(() => {
    if (!isMounted) return;
    const innerTreeRef = canvasScene.current;
    if (!innerTreeRef) return;
    sceneViewRef.current = new SceneView(
      innerTreeRef,
      layersModel,
      instrumentsModel,
      instrumentsHelpersModel,
      sceneModel,
      sceneEnvModel,
      cameraModel,
      generatorModel
    );
  }, [isMounted]);

  //on Mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div ref={canvasContainer} className={styles.desk}>
      <canvas
        ref={canvasScene}
        className={styles.canvasScene}
        id="canvasScene"
        // width={canvasSize.width}
        // height={canvasSize.height}
      />
      {/* {isMounted && typeof window !== 'undefined' ? (
        <canvas
          ref={canvasScene}
          className={'desk__canvasScene'}
          id="canvasScene"
          // width={canvasSize.width}
          // height={canvasSize.height}
        />
      ) : (
        'Canvas'
      )} */}
    </div>
  );
};
