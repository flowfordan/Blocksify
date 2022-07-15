import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite"

import styles from './CreateMenu.module.css';
import { sceneState, toolsState } from '../../../state';


interface UICoords {
    x: string;
    y: string;
    z: string;
};


export const CreateMenu = observer((props:any): JSX.Element => {

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
      <div className={styles.header}>

        <h4>Creation Menu</h4>

        <div >
          <div className={styles.drawingTools}>
            <div className={toolsState.isDrawLine? styles.buttonActive : styles.button} 
            onClick={handleOnDrawLine}>
              Draw Line
            </div>
            <div className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={handleOnDrawPLine}>
              Draw Polyline
            </div>
          </div>

          <hr/>

          <div>
            Coordinates
            <div>{`X: ${coords.x}`}</div>
            <div>{`Y: ${coords.y}`}</div>
            <div>{`Z: ${coords.z}`}</div>
          </div>
          <hr/>
          <div>
            <div>Update coordinates</div>
            <input type="checkbox" 
            checked={sceneState.isFetchingGlobalCoords}
            onChange={() => toggleFetchingCoords()}/><span>Update coordinates</span>
          </div>
          <hr/>
        </div>
        

      </div>

  );
})