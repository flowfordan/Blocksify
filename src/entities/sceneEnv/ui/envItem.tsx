import { instrumentsModel } from 'entities/sceneInstrument';
import React, { useCallback } from 'react';
import { DrawInstrItemProps } from './draw.props';
import { observer } from 'mobx-react-lite';
import { ListItemCheck } from 'shared/ui';
import { AssetKey } from 'shared/config/assetsData';
import { InstrumentsId } from 'shared/types';

export const SceneEnvItem = observer(({ instrId }: DrawInstrItemProps) => {
  const toolData = instrumentsModel._getInstrument(instrId);
  if (!toolData) return null;
  const onItemClick = () => {
    instrumentsModel.toggleInstrumentActive(instrId);
  };

  const getIconData = useCallback((): AssetKey => {
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
      onClick={() => onItemClick()}
    />
  );
});
