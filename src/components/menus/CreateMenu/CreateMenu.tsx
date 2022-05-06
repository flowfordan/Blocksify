import React from 'react';
import styles from './CreateMenu.module.css';

export const CreateMenu = (props:any): JSX.Element => {
  return (

      <div className={styles.header}>

        Creation Menu
        <div>
          <button>Create Geom</button>
        </div>
        

      </div>

  );
}