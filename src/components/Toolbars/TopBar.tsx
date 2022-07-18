import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite"

import styles from './TopBar.module.css';
import { sceneState, toolsState } from '../../state';

interface UICoords {
  x: string;
  y: string;
  z: string;
};

export const TopBar = observer((props:any): JSX.Element => {

  const handleOnDrawLine = () => {
    toolsState.toggleDrawLine(!toolsState.isDrawLine);
  }

  const handleOnDrawPLine = () => {
    toolsState.toggleDrawPLine(!toolsState.isDrawPLine);
  }

  const toggleFetchingCoords = () => {
    sceneState.toggleCoordsFetching(!sceneState.isFetchingGlobalCoords)
  }

    //initial values
    let coords: UICoords = {
      x: `${sceneState.globalCoords.x.toFixed(2)}`,
      y: `${sceneState.globalCoords.z.toFixed(2)}`,
      z: `${sceneState.globalCoords.y.toFixed(2)}`
    };

  return (

    <div className={styles.appHeader}>

      <div className={styles.corner}>
        <span className={styles.logo}>
          BLOCKSIFY
        </span>
        <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Import
          </span>
      </div>
      
      <div className={styles.tools}>

        <div className={styles.drawingTools}>
          <span className={toolsState.isDrawLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawLine}>
            Line
          </span>
          <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawPLine}>
            Polyline
          </span>
          <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Polygone
          </span>

          <div className={styles.toolsOptions}>
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              {`Snapping>`}
            </span>
          </div>
        </div>              
        
        <div className={styles.cameraOptions}>
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              Top
            </span>
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              Perspective
            </span>
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              ViewAll
            </span>
        </div>

        <div>
          K
        </div>

      </div>
      
      <div>
      <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Save
          </span>
      </div>

    </div>
  );
})