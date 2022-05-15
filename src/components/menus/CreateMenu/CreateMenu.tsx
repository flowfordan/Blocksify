import React from 'react';
import styles from './CreateMenu.module.css';


interface Coords {
    x: number;
    y: number;
    z: number;
};


export const CreateMenu = (props:any): JSX.Element => {

  const {worldCoords} = props;
  
  //initial values
  let coords: Coords = {
    x: 0,
    y: 0,
    z: 0
  };


  const onCreateGeom = () => {
    props.onCrtBtn()  
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
          <button onClick={onCreateGeom}>Create Point</button>
          <div>
            Coordinates
            <div>{`X: ${coords.x}`}</div>
            <div>{`Y: ${coords.y}`}</div>
            <div>{`Z: ${coords.z}`}</div>
          </div>
        </div>
        

      </div>

  );
}