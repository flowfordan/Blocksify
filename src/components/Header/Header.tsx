import React from 'react';
import { TopBar } from '../Toolbars';
import styles from './Header.module.css';

export const Header = (props:any): JSX.Element => {
  return (
    <div className={styles.header}>
      <TopBar/>
    </div>
  );
}

 
