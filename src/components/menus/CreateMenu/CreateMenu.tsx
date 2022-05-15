import React from 'react';
import styles from './CreateMenu.module.css';

export const CreateMenu = (props:any): JSX.Element => {

  const {worldCoords} = props

  const onCreateGeom = () => {
    props.onCrtBtn()  
  };

  

  return (

      <div className={styles.header}>

        Creation Menu
        <div>
          <button onClick={onCreateGeom}>Create Point</button>
          <div>
            Coordinates
            <div>{`X: ${worldCoords.x.toFixed(2)}`}</div>
            <div>{`Y: ${worldCoords.z.toFixed(2)}`}</div>
            <div>{`Z: ${worldCoords.y.toFixed(2)}`}</div>
          </div>
        </div>
        

      </div>

  );
}