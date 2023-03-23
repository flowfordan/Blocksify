import React from 'react';
import { BtnBar } from 'shared/ui';
import { observer } from 'mobx-react-lite';

export const EnvMenuExpander = observer((props: { isOpened: boolean }) => {
  return (
    <BtnBar
      isSelected={props.isOpened ? true : false}
      isExpandable
      iconKey={'sceneEnv'}
      isActive={false}
      title={'Scene Options'}
    />
  );
});
