import React, { useState } from 'react';
import { Desk } from '../../components/Desk/Desk';
import styles from './AppPage.module.css';
import { CreateMenu } from '../../components/menus/CreateMenu/CreateMenu';

export const AppPage= (): JSX.Element => {

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
        </div>

      </div>
  );
}


