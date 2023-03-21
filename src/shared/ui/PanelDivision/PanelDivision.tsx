import React from 'react';
import cn from 'classnames';

import { PanelDivisionProps } from './PanelDivision.props';
import './panelDivision.scss';

const PanelDivision = ({ children, header, ...props }: PanelDivisionProps): JSX.Element => {
  return (
    <div className={'panelDivision'} {...props}>
      <div className={'panelDivision__header'}>{header && header}</div>
      <div className={'panelDivision__content'}>{children}</div>
    </div>
  );
};

export { PanelDivision };
