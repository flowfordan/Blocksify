import { instrumentsModel } from 'entities/sceneInstrument';
import React, { useCallback } from 'react';
import { DrawInstrItemProps } from './draw.props';
import { observer } from 'mobx-react-lite';
import { ListItemCheck } from 'shared/ui';
import { InstrumentsId } from 'shared/types';
import { IconID } from 'shared/config';

export const DrawInstrItem = observer(({ instrId }: DrawInstrItemProps) => {
  const toolData = instrumentsModel._getInstrument(instrId);
  if (!toolData) return null;
  const onItemClick = () => {
    instrumentsModel.toggleInstrumentActive(instrId);
  };

  const getIconData = useCallback((): IconID => {
    switch (toolData.id) {
      case InstrumentsId.LINE:
        return 'line';
      case InstrumentsId.PLINE:
        return 'pLine';
      case InstrumentsId.POLYGON:
        return 'polygon';
      default:
        return 'line';
    }
  }, []);

  return (
    <ListItemCheck
      title={toolData.title}
      isChecked={toolData.isActive}
      icon={getIconData()}
      disabled={!toolData.isAvailable}
      onClick={toolData.isAvailable ? () => onItemClick() : () => {}}
    />
  );
});
