import React from "react";
import { observer } from "mobx-react-lite";
import { sceneState } from "../../../state";
import "./coordsPanel.scss";

interface UICoords {
    x: string;
    y: string;
    z: string;
}

export const CoordsDisplay = observer((): JSX.Element => {

  const toggleFetchingCoords = () => {
    sceneState.toggleCoordsFetching(!sceneState.isFetchingGlobalCoords);
  };

  //initial values
  const coords: UICoords = {
    x: `${sceneState.globalCoords.x.toFixed(2)}`,
    y: `${sceneState.globalCoords.z.toFixed(2)}`,
    z: `${sceneState.globalCoords.y.toFixed(2)}`
  };

  return (
    <>
      <div className={'coordsPanel'}>
        <span>{`X: ${coords.x}`}</span>
        <span>{`Y: ${coords.y}`}</span>
        <span>{`Z: ${coords.z}`}</span>
      </div>
    </>
  );
});
