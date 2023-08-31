import React from 'react';
import cn from 'classnames';

import { CardProps } from './Card.props';
import styles from './card.module.scss';

const Card = ({ children, className, colorVariant = 'black', ...props }: CardProps): JSX.Element => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.white]: colorVariant === 'white',
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
