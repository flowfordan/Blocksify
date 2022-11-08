import { observer } from 'mobx-react-lite';
import React from 'react';
import { CtxMenu } from '../../components/complex/CtxMenu/CtxMenu';

import { Desk } from '../../components/Desk/Desk';
import { RightBar, TopBar, LeftBar } from '../../components/Toolbars';
import { uiState } from '../../state';

import './appPage.scss';


export const AppPage = observer((): JSX.Element => {

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

      {uiState.ctxMenu.isActive && <CtxMenu />}

    </div>
  );
});


