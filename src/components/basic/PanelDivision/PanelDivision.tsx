import React from 'react';
import cn from 'classnames';

import { PanelDivisionProps } from './PanelDivision.props';
import './panelDivision.scss';
import { toolsState } from '../../../state';

const PanelDivision = ({ children, header, ...props }: PanelDivisionProps): JSX.Element => {
  return (
    <div className={'panelDivision'}>
      <div className={'panelDivision__header'}>{header}</div>
      <div className={'panelDivision__content'}>{children}</div>
    </div>
  );
};

export { PanelDivision };
