import { observer } from 'mobx-react-lite';
import React from 'react';
import { Desk } from 'widgets/Desk';
import { LeftBar } from 'widgets/LeftBar';
import { RightBar } from 'widgets/RightBar';
import { TopBar } from 'widgets/TopBar';
import { CtxMenu } from '../../components/complex/CtxMenu/CtxMenu';

import { uiState } from '../../shared/model';

import './appPage.scss';

export const AppPage = observer((): JSX.Element => {
  return (
    <div className="appPage">
      <TopBar className="appPage__topBar" />

      <div className="appPage__canvas">
        <Desk />
      </div>

      <div className={`appPage__leftBar`}>
        <LeftBar />
      </div>

      <div className={`appPage__rightBar`}>
        <RightBar />
      </div>

      {uiState.ctxMenu.isActive && <CtxMenu />}
    </div>
  );
});
