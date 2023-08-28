import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';
import { IconID } from 'shared/config';

const getIconKeyFromToolId = (id?: InstrumentsId): IconID => {
  switch (id) {
    case InstrumentsId.LINE:
      return 'line';
    case InstrumentsId.PLINE:
      return 'pLine';
    case InstrumentsId.SELECTOR:
      return 'selector';
    case InstrumentsId.EDITOR:
      return 'selector';
    case InstrumentsId.POLYGON:
      return 'polygon';
    default:
      return 'line';
  }
};

export const DrawInstrMenu = observer((props: { isOpened: boolean }) => {
  const activeTool = instrumentsModel.instruments.find((i) => i.isActive && i.type === 'draw');
  //open/close menu widget - common for page
  //function to get icon key from instrument id

  return (
    <BtnBar
      isSelected={props.isOpened ? true : false}
      isExpandable
      iconKey={getIconKeyFromToolId(activeTool?.id)}
      isActive={activeTool ? true : false}
      title={activeTool ? activeTool.title : 'Drawing Tools'}
    />
  );
});
