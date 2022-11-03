import React from 'react';
import { TopBar } from '../Toolbars';
import './header.scss';

export const Header = (props:any): JSX.Element => {
  return (
    <div className={'header'}>
      <TopBar/>
    </div>
  );
};


