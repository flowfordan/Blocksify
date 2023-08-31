import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Desk } from 'widgets/Desk';
import { LeftBar } from 'widgets/LeftBar';
import { RightBar } from 'widgets/RightBar';
import { TopBar } from 'widgets/TopBar';
import { StageBar } from 'widgets/StageBar';

import styles from './appPage.module.scss';
import dynamic from 'next/dynamic';

export const AppPage = observer(() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.appPage}>
      {isMounted && typeof window !== 'undefined' ? (
        <>
          <TopBar className={styles.topBar} />
          <div className={styles.canvas}>
            <Desk />
          </div>
          <div className={styles.leftBar}>
            <LeftBar />
          </div>
          <div className={styles.rightBar}>
            <RightBar />
          </div>
          <StageBar className={styles.stageBar} />
          <div className={styles.version}>{'BLOCKSIFY v0.3.0-shatsk-alpha'}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});
