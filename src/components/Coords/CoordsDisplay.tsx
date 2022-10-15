import {observer} from "mobx-react-lite";
import {sceneState} from "../../state";
import styles from "./CoordsDisplay.module.css";

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
    </>
  );
});
