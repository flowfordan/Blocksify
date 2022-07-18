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

          <div className={styles.tools}>

            <div className={styles.drawingTools}>
              <span className={toolsState.isDrawLine? styles.buttonActive : styles.button} 
              onClick={handleOnDrawLine}>
                Draw Line
              </span>
              <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
              onClick={handleOnDrawPLine}>
                Draw Polyline
              </span>
            </div>

      </div>

  );
})