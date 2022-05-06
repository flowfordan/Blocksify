import React, { useState } from 'react';
import { Desk } from '../../components/Desk/Desk';
import styles from './AppPage.module.css';
import { CreateMenu } from '../../components/menus/CreateMenu/CreateMenu';

export const AppPage= (): JSX.Element => {


  const [toggleCrGeom, setToggle] = useState(false)


  const onCrtBtn = () => {
    setToggle(!toggleCrGeom)
  }


  return (

      <div className={styles.page}>


        <div className={styles.menuCreate}>
          <CreateMenu onCrtBtn={onCrtBtn}/>
        </div>

        <div className={styles.canvas}>
          <Desk toggleCrGeom={toggleCrGeom}/>
        </div>

        <div className={styles.menuInspect}>
          Menu Inspect
        </div>

      </div>

  );
}


