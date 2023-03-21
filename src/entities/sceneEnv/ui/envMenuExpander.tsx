import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';

export const EnvMenuExpander = observer((props: { isOpened: boolean }) => {
  return (
    <BtnBar
      isSelected={props.isOpened ? true : false}
      isExpandable
      iconKey={'helper'}
      isActive={false}
      title={'Scene Options'}
    />
  );
});
