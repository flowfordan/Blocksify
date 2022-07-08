import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { drawingSlice } from '../../../store/reducers/drawingSlice';
import { uiSlice } from '../../../store/reducers/uiSlice';
import styles from './CreateMenu.module.css';


interface UICoords {
    x: string;
    y: string;
    z: string;
};


export const CreateMenu = (props:any): JSX.Element => {

  const {isDrawLine, isDrawPLine} = useAppSelector(state => state.drawReducer);
  const {color, globalCoords, isFetchingGlobalCoords} = useAppSelector(state => state.uiReducer);

  const {toggleDrawLine, toggleDrawPLine} = drawingSlice.actions;
  const {changeCubeColor, toggleUpdCoords} = uiSlice.actions;

  const dispatch = useAppDispatch();

  const handleColorChange = () => {
    dispatch(changeCubeColor(color === 0xffffff? 0xff00ff : 0xffffff))
  }

  const handleOnDrawLine = () => {
    dispatch(toggleDrawLine(!isDrawLine))
  }

  const handleOnDrawPLine = () => {
    dispatch(toggleDrawPLine(!isDrawPLine))
  }

  const handleFetchingCoordsToggle = () => {
    dispatch(toggleUpdCoords(!isFetchingGlobalCoords))
  }
  
  //initial values
  let coords: UICoords = {
    x: '0',
    y: '0',
    z: '0'
  };

  if(globalCoords && isFetchingGlobalCoords){
    coords.x = globalCoords.x.toFixed(2);
    coords.y = globalCoords.z.toFixed(2);
    coords.z = globalCoords.y.toFixed(2);
  }

  return (
      <div className={styles.header}>

        <h4>Creation Menu</h4>

        <div >
          <div className={styles.drawingTools}>
            <div className={isDrawLine? styles.buttonActive : styles.button} 
            onClick={handleOnDrawLine}>
              Draw Line
            </div>
            <div className={isDrawPLine? styles.buttonActive : styles.button} 
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
            checked={isFetchingGlobalCoords}
            onChange={() => handleFetchingCoordsToggle()}/><span>Update coordinates</span>
          </div>
          <hr/>
          <div>
            <div>Change Color</div>
            <button onClick={() => handleColorChange()}>Change Color</button>
          </div>
        </div>
        

      </div>

  );
}