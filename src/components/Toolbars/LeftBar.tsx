import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import cn from 'classnames';

import './leftBar.scss';
import { sceneState, layersState } from '../../state';
import { CoordsDisplay } from '../complex/CoordsPanel/CoordsPanel';

import { LayersListItem } from '../complex/LayersListItem/LayersListItem';
import { PanelDivision } from '../basic/PanelDivision/PanelDivision';

export const LeftBar = observer((props:any): JSX.Element => {

  const constructLayersList = (layersArr: typeof layersState.layers) => {
    return (
      layersArr.map(l => {
        return (
          <LayersListItem layerId={l.id} name={l.name} isEmpty={l.empty} isBlocked={l.blocked} key={l.id} isActive={l.active} isVisible={l.visible} onClick={() => handleSelectLayer(l.id)}/>
        );
      })
    );
  };


  return (
    <div className={'leftBar'}>

      <PanelDivision header={'Layers'}>
        {constructLayersList(layersState.layers)}
      </PanelDivision>

      <PanelDivision header={'Adjust'}>
        {'There will be adjustments for selected el-s'}
      </PanelDivision>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay/>
      </div>

    </div>

  );
});