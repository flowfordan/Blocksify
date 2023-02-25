import { instrumentsModel } from 'entities/sceneInstrument';
import React from 'react';
import { DrawInstrItemProps } from './draw.props';
import { observer } from 'mobx-react-lite';
import { ListItemCheck } from 'shared/ui';

export const DrawInstrItem = observer(({ tool }: DrawInstrItemProps) => {
  const toolData = instrumentsModel.getToolData(tool);
  if (!toolData) return null;
  const onItemClick = () => {
    instrumentsModel.toggleActiveTool(toolData.name);
  };
  return (
    <ListItemCheck title={toolData.name} isChecked={toolData.isActive} icon={'line'} onClick={() => onItemClick()} />
  );
});
