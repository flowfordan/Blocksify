import React from 'react';
import styles from './CreateMenu.module.css';

export const CreateMenu = (props:any): JSX.Element => {


  const onCreateGeom = () => {
    props.onCrtBtn()  
  }

  return (

      <div className={styles.header}>

        Creation Menu
        <div>
          <button onClick={onCreateGeom}>Create Geom</button>
        </div>
        

      </div>

  );
}