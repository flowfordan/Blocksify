import React from 'react';
import cn from 'classnames';

import { BtnProps } from './Btn.props';
import styles from './btn.module.scss';

const Btn = ({ children, className, heightConfiguration = 'spilled', ...props }: BtnProps): JSX.Element => {
  return (
    <button
      className={cn(className, styles.btn, {
        [styles.spilled]: heightConfiguration === 'spilled',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export { Btn };
