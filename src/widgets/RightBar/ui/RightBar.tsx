import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './rightBar.module.scss';
import { PanelDivision } from 'shared/ui';

export const RightBar = observer((): JSX.Element => {
  return (
    <div className={styles.rightBar}>
      <PanelDivision header={'Analysis'}>{'There will be analysis instruments'}</PanelDivision>
    </div>
  );
});
