import React from 'react';

import { Desk } from '../../components/Desk/Desk';
import { RightBar, TopBar, LeftBar } from '../../components/Toolbars';

import './appPage.scss';


export const AppPage = (): JSX.Element => {

  return (
    <div className='appPage'>

      <TopBar className='appPage__topBar'/>

      <div className='appPage__canvas'>
        <Desk />
      </div>


      <div className={`appPage__leftBar`}>
        <LeftBar/>
      </div>


      <div className={`appPage__rightBar`}>
        <RightBar/>
      </div>

    </div>
  );
};


