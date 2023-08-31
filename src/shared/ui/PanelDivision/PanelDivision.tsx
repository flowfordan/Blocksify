import React from 'react';
import cn from 'classnames';

import { PanelDivisionProps } from './PanelDivision.props';
import styles from './panelDivision.module.scss';

const PanelDivision = ({ children, header, ...props }: PanelDivisionProps): JSX.Element => {
  return (
    <div className={styles.panelDivision} {...props}>
      <div className={styles.header}>{header && header}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { PanelDivision };
