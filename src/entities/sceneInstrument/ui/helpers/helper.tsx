import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import React from 'react';
import { HelperInstrItemProps } from './helper.props';
import { observer } from 'mobx-react-lite';
import { ListItemCheck } from 'shared/ui';

export const HelperInstrItem = observer(({ helperId }: HelperInstrItemProps) => {
  const itemData = instrumentsHelpersModel._getItem(helperId);
  if (!itemData) return null;
  const onItemClick = () => {
    instrumentsHelpersModel.toggleHelperActive(helperId);
  };
  return <ListItemCheck title={itemData.title} isChecked={itemData.isActive} onDoubleClick={() => onItemClick()} />;
});
