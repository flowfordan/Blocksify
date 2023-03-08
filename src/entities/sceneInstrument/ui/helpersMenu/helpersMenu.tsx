import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';

export const HelpersInstrMenu = observer((props: { isOpened: boolean }) => {
  const helpersActivity = instrumentsHelpersModel.isHelpersActive;
  //open/close menu widget - common for page

  const isAnyActive = Object.values(helpersActivity).includes(true);

  return (
    <BtnBar
      isSelected={props.isOpened ? true : false}
      isExpandable
      iconKey="helper"
      isActive={isAnyActive}
      title={'Helpers'}
      // onClick={() => {}}
    />
  );
});
