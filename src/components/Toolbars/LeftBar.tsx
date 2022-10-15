import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";

import cn from 'classnames';

import styles from './LeftBar.module.css';
import {sceneState, layersState} from '../../state';
import {CoordsDisplay} from '../Coords/CoordsDisplay';


export const LeftBar = observer((props:any): JSX.Element => {

  const handleSelectLayer = (num: number) => {
    layersState.setActiveLayer(num);
  };

  const constructLayersList = (layersArr: typeof layersState.layers) => {
    return (
      layersArr.map(l => {
        return (
          <li key={l.id} className={cn(styles.layerItem, {
            [styles.layerItem_empty]: l.empty,
            [styles.layerItem_active]: l.active,
            [styles.layerItem_notEditable]: !l.editable
          })}
          onClick={() => handleSelectLayer(l.id)}>{`${l.name}`}</li>
        );
      })
    );
  };


  return (
    <div className={styles.leftBar}>

      <div className={styles.layersPanel}>
        <div>Layers</div>
        <ul className={styles.layersList}>
          {constructLayersList(layersState.layers)}
        </ul>


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