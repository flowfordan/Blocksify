import React from 'react';

import { ListItemCheckProps } from './ListItemCheck.props';
import styles from './ListItemCheck.module.css';

import TickIcon from '../../../assets/icons/tick.svg';


const ListItemCheck = ({ title, isChecked, icon, children, ...props }: ListItemCheckProps): JSX.Element => {

  return (
    <div className={icon ? styles.listItemCheck : styles.listItemCheck_bold} {...props}>
      <span className={styles.check}>{isChecked && <TickIcon />}</span>
      {icon && <span className={styles.icon}>I</span>}
      <span className={styles.title}>{title}</span>
      <span className={styles.content}>{children}</span>
    </div>
  );
};

export { ListItemCheck };

