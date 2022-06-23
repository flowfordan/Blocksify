import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { drawingSlice } from '../../../store/reducers/drawingSlice';
import { envSlice } from '../../../store/reducers/envSlice';
import styles from './CreateMenu.module.css';


interface Coords {
    x: number;
    y: number;
    z: number;
};


export const CreateMenu = (props:any): JSX.Element => {

  const {count, isDrawLine} = useAppSelector(state => state.sidebarReducer);
  const {color, toggleColor} = useAppSelector(state => state.envReducer);

  const {inc, toggleDrawLine} = drawingSlice.actions;
  const {changeCubeColor} = envSlice.actions;

  const dispatch = useAppDispatch();

  const handleColorChange = () => {
    dispatch(changeCubeColor(color === 0xffffff? 0xff00ff : 0xffffff))
  }

  const handleBtnClick = () => {
    dispatch(toggleDrawLine(!isDrawLine))
  }

  const {worldCoords, toggleCrGeom} = props;
  
  //initial values
  let coords: Coords = {
    x: 0,
    y: 0,
    z: 0
  };

  if(worldCoords){
    coords.x = worldCoords.x.toFixed(2);
    coords.y = worldCoords.z.toFixed(2);
    coords.z = worldCoords.y.toFixed(2);
  }
   

  return (

      <div className={styles.header}>

        <h4>Creation Menu</h4>
        <div>
          <div className={isDrawLine? styles.buttonActive : styles.button} 
          onClick={handleBtnClick}>
            Draw Mode
          </div>
          <div>
            Coordinates
            <div>{`X: ${coords.x}`}</div>
            <div>{`Y: ${coords.y}`}</div>
            <div>{`Z: ${coords.z}`}</div>
          </div>
          <hr/>
          <div>
            <div>Count</div>
            <div>{count}</div>
            <button onClick={() => dispatch(inc(1))}>Count</button>
          </div>

          <div>
            <div>Change Color</div>
            <div>{count}</div>
            <button onClick={() => handleColorChange()}>Change Color</button>
          </div>
        </div>
        

      </div>

  );
}