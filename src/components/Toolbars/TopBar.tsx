import { observer } from "mobx-react-lite";

import styles from './TopBar.module.css';
import { sceneState, toolsState } from '../../state';
import { useState } from "react";

import { HelpersMenu } from "../HelpersMenu/HelpersMenu";

export const TopBar = observer((props:any): JSX.Element => {

	const [isMenuOpened, toggleMenuOpened] = useState(false);

  const { drawingTools } = toolsState;

  let activeToolId = drawingTools.find(i => i.active)? 
    drawingTools.find(i => i.active)!.id : undefined

	const handleMenuOpen = () => {
		toggleMenuOpened(!isMenuOpened);
	}

  //TODO: wrap in array tools
  const handleCameraChange = (id: number) => {
    sceneState.changeCamera(id)
  }

  const handleToolChange = (id: number) => {
    toolsState.setActiveTool(id)
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
          <span className={activeToolId === 0? styles.buttonActive : styles.button} 
          onClick={() => handleToolChange(0)}>
            Line
          </span>
          <span className={activeToolId === 1? styles.buttonActive : styles.button} 
          onClick={() => handleToolChange(1)}>
            Polyline
          </span>
          <span className={activeToolId === 2? styles.buttonActive : styles.button} 
          onClick={() => handleToolChange(2)}>
            Polygon
          </span>

          <div className={styles.toolsOptions}>
			{/* TODO disabled if any instrument is active */}
            <div className={isMenuOpened? styles.buttonActive : styles.button}>
				<div className={styles.menuItemReciever}  onClick={() => handleMenuOpen()}></div>
              <div>{`Snapping`}</div>
			  <div className={styles.menuOpener}>{`>`}</div>


				{isMenuOpened && <HelpersMenu />}
            </div>
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