import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Desk } from 'widgets/Desk';
import { LeftBar } from 'widgets/LeftBar';
import { RightBar } from 'widgets/RightBar';
import { TopBar } from 'widgets/TopBar';
import { StageBar } from 'widgets/StageBar';

import './appPage.scss';
import dynamic from 'next/dynamic';

export const AppPage = observer(() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="appPage">
      {isMounted && typeof window !== 'undefined' ? (
        <>
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
          <StageBar className={'appPage__stageBar'} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
});
