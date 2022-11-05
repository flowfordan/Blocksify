import React from 'react';
import cn from 'classnames';

import { BtnProps } from './Btn.props';
import './btn.scss';


const Btn = ({ children, className, heightConfiguration = 'spilled', ...props }: BtnProps): JSX.Element => {
  return (
    <button className={cn(className, 'btn', {
      ['btn_spilled']: heightConfiguration==='spilled'
    })} {...props}>
      {children}
    </button>
  );
};

export { Btn };

