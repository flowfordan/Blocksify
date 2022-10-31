import React from 'react';
import cn from 'classnames';

import { CardProps } from './Card.props';
import styles from './Card.module.css';
import { toolsState } from '../../../state';

const Card = ({ children, className, colorVariant = 'black', ...props }: CardProps): JSX.Element => {
  return (
    <div className={cn(styles.card, className, {
      [styles.card_white]: colorVariant === 'white'
    })}>
      {children}
    </div>
  );
};

export { Card };

