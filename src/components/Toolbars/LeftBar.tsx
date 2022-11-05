import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import cn from 'classnames';

import './leftBar.scss';
import { sceneState, layersState } from '../../state';
import { CoordsDisplay } from '../complex/CoordsPanel/CoordsPanel';

import { LayersListItem } from '../complex/LayersListItem/LayersListItem';

export const LeftBar = observer((props:any): JSX.Element => {

  const handleSelectLayer = (num: number) => {
    layersState.setActiveLayer(num);
  };

  const constructLayersList = (layersArr: typeof layersState.layers) => {
    return (
      layersArr.map(l => {
        return (
          <LayersListItem name={l.name} isEmpty={false} key={l.id} isActive={l.active} isVisible={l.visible} onClick={() => handleSelectLayer(l.id)}/>
        );
      })
    );
  };


  return (
    <div className={'leftBar'}>

      <div className={'leftBar__layersPanel'}>
        <div>Layers</div>
        <>
          {constructLayersList(layersState.layers)}
        </>
      </div>

      <div className={'leftBar__adjustmentsPanel'}>
        <span>Adjust</span>
      </div>

      <div className={'leftBar__coordsPanel'}>
        <CoordsDisplay/>
      </div>

    </div>

  );
});