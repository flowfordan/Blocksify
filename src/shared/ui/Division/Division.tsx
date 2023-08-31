import React from 'react';
import cn from 'classnames';

import { DivisionProps } from './Division.props';
import styles from './division.module.scss';

const Division = ({ children, header, ...props }: DivisionProps): JSX.Element => {
  return (
    <div className={styles.division}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { Division };
