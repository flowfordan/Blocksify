import React from 'react';
import cn from 'classnames';

import { CardProps } from './Card.props';
import './card.scss';
import { instrumentsState } from '../../model';

const Card = ({ children, className, colorVariant = 'black', ...props }: CardProps): JSX.Element => {
  return (
    <div
      className={cn('card', className, {
        ['card_white']: colorVariant === 'white',
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
