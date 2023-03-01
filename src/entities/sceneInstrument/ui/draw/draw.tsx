import { instrumentsModel } from 'entities/sceneInstrument';
import React from 'react';
import { DrawInstrItemProps } from './draw.props';
import { observer } from 'mobx-react-lite';
import { ListItemCheck } from 'shared/ui';

export const DrawInstrItem = observer(({ instrId }: DrawInstrItemProps) => {
  const toolData = instrumentsModel._getInstrument(instrId);
  if (!toolData) return null;
  const onItemClick = () => {
    instrumentsModel.toggleInstrumentActive(instrId);
  };
  return (
    <ListItemCheck title={toolData.title} isChecked={toolData.isActive} icon={'line'} onClick={() => onItemClick()} />
  );
});
