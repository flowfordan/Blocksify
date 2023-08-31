import { sceneModel } from 'entities/scene/model/sceneModel';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { CoordUnit } from '../coordUnit/CoordUnit';
import styles from './coordsPanel.module.scss';

export const CoordsPanel = observer(() => {
  const currentCoords = sceneModel.currentPointerCoordsGlobal;

  return (
    <div className={styles.coordsPanel}>
      <span className={styles.coordsPanel__cell}>
        <CoordUnit coord="X" value={currentCoords.x} />
      </span>
      <span className={styles.coordsPanel__cell}>
        <CoordUnit coord="Y" value={currentCoords.z} />
      </span>
      <span className={styles.coordsPanel__cell}>
        <CoordUnit coord="Z" value={currentCoords.y} />
      </span>
    </div>
  );
});
