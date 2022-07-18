import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite"

import styles from './TopBar.module.css';

export const TopBar = observer((props:any): JSX.Element => {

  return (
      <div className={styles.header}>

          <div>
            <div>Update coordinates</div>
          </div>
        
      </div>

  );
})