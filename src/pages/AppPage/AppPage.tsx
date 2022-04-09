import React from 'react';
import { Desk } from '../../components/Desk/Desk';
import styles from './AppPage.module.css';

export const AppPage= (): JSX.Element => {
  return (

      <div className={styles.page}>


        <div className={styles.menuCreate}>
          Menu Create
        </div>

        <div className={styles.canvas}>
          <Desk />
        </div>

        <div className={styles.menuInspect}>
          Menu Inspect
        </div>

      </div>

  );
}


