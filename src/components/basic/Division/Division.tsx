import React from 'react';
import cn from 'classnames';

import { DivisionProps } from './Division.props';
import './division.scss';
import { instrumentsState } from '../../../state';

const Division = ({ children, header, ...props }: DivisionProps): JSX.Element => {
  return (
    <div className={'division'}>
      <div className={'division__header'}>{header}</div>
      <div className={'division__content'}>{children}</div>
    </div>
  );
};

export { Division };
