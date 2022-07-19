import { observer } from "mobx-react-lite"

import styles from './TopBar.module.css';
import { sceneState, toolsState } from '../../state';

export const TopBar = observer((props:any): JSX.Element => {

  const handleOnDrawLine = () => {
    toolsState.toggleDrawLine(!toolsState.isDrawLine);
  }

  const handleOnDrawPLine = () => {
    toolsState.toggleDrawPLine(!toolsState.isDrawPLine);
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
        <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Import
          </span>
      </div>
      
      <div className={styles.tools}>

        <div className={styles.drawingTools}>
          <span className={toolsState.isDrawLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawLine}>
            Line
          </span>
          <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={handleOnDrawPLine}>
            Polyline
          </span>
          <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Polygone
          </span>

          <div className={styles.toolsOptions}>
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
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
            <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
            onClick={() => {}}>
              ViewAll
            </span>
        </div>

        <div>
          K
        </div>

      </div>
      
      <div>
      <span className={toolsState.isDrawPLine? styles.buttonActive : styles.button} 
          onClick={() => {}}>
            Save
          </span>
      </div>

    </div>
  );
})