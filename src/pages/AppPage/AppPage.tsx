import React, { useState } from 'react';
import { Desk } from '../../components/Desk/Desk';
import './appPage.scss';
import { LeftBar } from '../../components/Toolbars/LeftBar';
import { RightBar, TopBar } from '../../components/Toolbars';

export const AppPage= (): JSX.Element => {

  return (
    <div className='appPage'>

      <div className='appPage__topBar'>
        <TopBar/>
      </div>

      <div className={`appPage__sideBar appPage__leftBar`}>
        <LeftBar/>
      </div>

      <div className='appPage__canvas'>
        <Desk />
      </div>

      <div className={`appPage__sideBar appPage__rightBar`} id="right-bar">
        <RightBar/>
      </div>

    </div>
  );
};


