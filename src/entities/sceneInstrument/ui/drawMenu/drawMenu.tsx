import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';

export const DrawInstrMenu = observer((props: { isOpened: boolean }) => {
  const activeTool = instrumentsModel.instruments.find((i) => i.isActive && i.type === 'draw');
  //open/close menu widget - common for page

  return (
    <BtnBar
      isSelected={props.isOpened ? true : false}
      isExpandable
      iconKey="line"
      isActive={activeTool ? true : false}
      title={activeTool ? activeTool.title : 'Drawing Tools'}
      // onClick={() => {}}
    />
  );
});
