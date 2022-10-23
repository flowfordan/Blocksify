import React, { useState } from 'react';
import { Desk } from '../../components/Desk/Desk';
import styles from './AppPage.module.css';
import { LeftBar } from '../../components/Toolbars/LeftBar';
import { RightBar, TopBar } from '../../components/Toolbars';

export const AppPage= (): JSX.Element => {

  return (
    <div className={styles.page}>

      <div className={styles.topBar}>
        <TopBar/>
      </div>

      <div className={`${styles.sideBar} ${styles.leftBar}`}>
        <LeftBar/>
      </div>

      <div className={styles.canvas}>
        <Desk />
      </div>

      <div className={`${styles.sideBar} ${styles.rightBar}`} id="right-bar">
        <RightBar/>
      </div>

    </div>
  );
};


