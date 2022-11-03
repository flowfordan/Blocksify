import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import cn from 'classnames';

import styles from './LeftBar.module.css';
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
          <LayersListItem name={l.name} isEmpty={false} key={l.id} isActive={l.active}/>
        );
      })
    );
  };


  return (
    <div className={styles.leftBar}>

      <div className={styles.layersPanel}>
        <div>Layers</div>
        <div className={styles.layersList}>
          {constructLayersList(layersState.layers)}
        </div>


      </div>

      <div className={styles.adjustmentsPanel}>
        <span>Adjust</span>

      </div>

      <div className={styles.coordsPanel}>
        <CoordsDisplay/>
      </div>

    </div>

  );
});