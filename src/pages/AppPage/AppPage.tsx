import React, { useState } from 'react';
import { Desk } from '../../components/Desk/Desk';
import styles from './AppPage.module.css';
import { CreateMenu } from '../../components/menus/CreateMenu/CreateMenu';
import { cubeState } from '../../state/cubeState';

export const AppPage= (): JSX.Element => {

  const handleClrChange = () => {
    if(cubeState.cubeColor === 0xFF724C){
      cubeState.setCubeColor(0x6CC1FF)
    } else {
      cubeState.setCubeColor(0xFF724C)
    }
      
  }

  return (

      <div className={styles.page}>

        <div className={styles.menuCreate}>
          <CreateMenu/>
        </div>

        <div className={styles.canvas}>
          <Desk />
        </div>

        <div className={styles.menuInspect} id="inspect">
          Menu Inspect
          <div>
            <div>Change Color</div>
            <button onClick={() => handleClrChange()}>Change Clr</button>
          </div>
        </div>

      </div>

  );
}


