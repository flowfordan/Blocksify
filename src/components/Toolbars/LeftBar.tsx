import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite"

import styles from './LeftBar.module.css';
import { sceneState, toolsState } from '../../state';


interface UICoords {
    x: string;
    y: string;
    z: string;
};


export const LeftBar = observer((props:any): JSX.Element => {

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
      <div className={styles.leftBar}>

        <div className={styles.layersPanel}>
          <div>Layers</div>
        </div>

        <div className={styles.adjustmentsPanel}>
          <span>Adjust</span>
        </div>

        <div className={styles.coordsPanel}>
          

          <div>
            <input type="checkbox" 
            checked={sceneState.isFetchingGlobalCoords}
            onChange={() => toggleFetchingCoords()}/>
            <span>Update coordinates</span>
          </div>

          <div className={styles.coords}>
            <span>{`X: ${coords.x}`}</span>
            <span>{`Y: ${coords.y}`}</span>
            <span>{`Z: ${coords.z}`}</span>
          </div>
        </div>

        


        

      </div>

  );
})