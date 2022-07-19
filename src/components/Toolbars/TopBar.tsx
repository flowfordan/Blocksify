import { observer } from "mobx-react-lite"

import styles from './TopBar.module.css';
import { sceneState, toolsState } from '../../state';

export const TopBar = observer((props:any): JSX.Element => {

  const {isDrawLine, isDrawPLine, isDrawPolygon} = toolsState

  //TODO: wrap in array tools
  const handleOnDrawLine = () => {
    toolsState.toggleDrawLine(!isDrawLine);
  }

  const handleOnDrawPLine = () => {
    toolsState.toggleDrawPLine(!isDrawPLine);
  }

  const handleOnDrawPolygon = () => {
    toolsState.toggleDrawPolygon(!isDrawPolygon);
  }

  const handleCameraChange = (id: number) => {
    sceneState.changeCamera(id)
  }



  return (

    <div className={styles.appHeader}>

      <div className={styles.corner}>
        <span className={styles.logo}>
          BLOCKSIFY
        </span>
        <span className={''? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Import
          </span>
      </div>
      
      <div className={styles.tools}>

        <div className={styles.drawingTools}>
          <span className={isDrawLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawLine}>
            Line
          </span>
          <span className={isDrawPLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawPLine}>
            Polyline
          </span>
          <span className={isDrawPolygon? styles.buttonActive : styles.button} 
          onClick={handleOnDrawPolygon}>
            Polygon
          </span>

          <div className={styles.toolsOptions}>
            <span className={''? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              {`Snapping>`}
            </span>
          </div>
        </div>              
        
        <div className={styles.cameraOptions}>
            <span className={sceneState.currentCamera===0? styles.buttonActive : styles.button} 
            onClick={() => {handleCameraChange(0)}}>
              Top
            </span>
            <span className={sceneState.currentCamera===1? styles.buttonActive : styles.button} 
            onClick={() => {handleCameraChange(1)}}>
              Perspective
            </span>
            <span className={''? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              ViewAll
            </span>
        </div>

        <div>
          K
        </div>

      </div>
      
      <div>
      <span className={''? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Save
          </span>
      </div>

    </div>
  );
})