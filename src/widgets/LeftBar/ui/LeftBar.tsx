import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import './leftBar.scss';
import { layersState } from 'shared/model';
import { LayersListItem } from 'components/complex/LayersListItem/LayersListItem';
import { CoordsDisplay } from 'components/complex/CoordsPanel/CoordsPanel';
import { PanelDivision } from 'shared/ui';

export const LeftBar = observer((): JSX.Element => {
  const constructLayersList = (layersArr: typeof layersState.layers) => {
    return layersArr.map((l) => {
      return (
        <LayersListItem
          layerId={l.id}
          name={l.name}
          isEmpty={l.empty}
          isBlocked={l.blocked}
          key={l.id}
          isActive={l.active}
          isVisible={l.visible}
        />
      );
    });
  };

  return (
    <div className={'leftBar'}>
      <PanelDivision header={'Layers'}>{constructLayersList(layersState.layers)}</PanelDivision>

      <PanelDivision header={'Adjust'}>{'There will be adjustments for selected el-s'}</PanelDivision>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay />
      </div>
    </div>
  );
});
