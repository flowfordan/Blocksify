import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import cn from 'classnames';

import styles from './LeftBar.module.css';
import { sceneState, layersState } from '../../state';
import classNames from 'classnames';


interface UICoords {
    x: string;
    y: string;
    z: string;
};

const layers = [
  {
    name: 'Border',
    numThree: 2,
    active: true,
    empty: true,
    editable: true,
    visible: true,
    appearance: {
        colorLine: 0xFF5E32,
        colorArea: 0xFF5E32,
    }
  },
  {
    name: 'Streets',
    numThree: 3,
    active: false,
    empty: false,
    editable: true,
    visible: true,
    appearance: {
        colorLine: 0x533931,
        colorArea: 0x533931,
    }
  },
  {
    name: 'Blocks',
    numThree: 4,
    active: false,
    empty: true,
    editable: false,
    visible: true,
    appearance: {
        colorLine: 0x533931,
        colorArea: 0x533931,
    }
  },
  {
    name: 'Buildings',
    numThree: 5,
    active: false,
    empty: true,
    editable: false,
    visible: false,
    appearance: {
        colorLine: 0x533931,
        colorArea: 0x533931,
    }
  }
]


export const LeftBar = observer((props:any): JSX.Element => {

  const toggleFetchingCoords = () => {
    sceneState.toggleCoordsFetching(!sceneState.isFetchingGlobalCoords)
  }
  
  //initial values
  let coords: UICoords = {
    x: `${sceneState.globalCoords.x.toFixed(2)}`,
    y: `${sceneState.globalCoords.z.toFixed(2)}`,
    z: `${sceneState.globalCoords.y.toFixed(2)}`
  };

  const constructLayersList = (layersArr: typeof layers) => {
    return(
      layersArr.map(l => {
        return (
          <li key={l.numThree} className={cn(styles.layerItem, {
            [styles.layerItem_empty]: l.empty,
            [styles.layerItem_active]: l.active,
            [styles.layerItem_notEditable]: !l.editable,
          })}>{l.name}</li>
        )
      })
    )
  }

  return (
      <div className={styles.leftBar}>

        <div className={styles.layersPanel}>
          <div>Layers</div>
          <ul className={styles.layersList}>
            {constructLayersList(layers)}
          </ul>
        </div>

        <div className={styles.adjustmentsPanel}>
          <span>Adjust</span>
        </div>

        <div className={styles.coordsPanel}>
          

          <div>
            <input type="checkbox" 
            checked={sceneState.isFetchingGlobalCoords}
            onChange={() => toggleFetchingCoords()}/>
            <span>Update coordinates</span>
          </div>

          <div className={styles.coords}>
            <span>{`X: ${coords.x}`}</span>
            <span>{`Y: ${coords.y}`}</span>
            <span>{`Z: ${coords.z}`}</span>
          </div>
        </div>

        


        

      </div>

  );
})