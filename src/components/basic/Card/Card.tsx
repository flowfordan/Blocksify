import React from 'react';
import cn from 'classnames';

import { CardProps } from './Card.props';
import './card.scss';
import { toolsState } from '../../../state';

const Card = ({ children, className, colorVariant = 'black', ...props }: CardProps): JSX.Element => {
  return (
    <div className={cn('card', className, {
      ['card_white']: colorVariant === 'white'
    })}>
      {children}
    </div>
  );
};

export { Card };

