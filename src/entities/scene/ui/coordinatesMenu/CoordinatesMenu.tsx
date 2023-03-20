import { sceneModel } from 'entities/scene/model/sceneModel';
import { observer } from 'mobx-react-lite';
import React from 'react';

export const CoordinatesMenu = observer(() => {
  const currentCoords = sceneModel.currentPointerCoordsGlobal;

  return (
    <div>
      <span>{`X: ${currentCoords.x}`}</span>
      <span>{`Y: ${currentCoords.y}`}</span>
      <span>{`Z: ${currentCoords.z}`}</span>
    </div>
  );
});
