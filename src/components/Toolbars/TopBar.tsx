/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from "react";
import { observer } from "mobx-react-lite";

import styles from './TopBar.module.css';
import { sceneState, toolsState } from '../../state';
import { useState } from "react";

import { HelpersMenu } from "../HelpersMenu/HelpersMenu";
import { ToolsMenu } from "../ToolsMenu/ToolsMenu";
import { returnSvgNode } from "../../helpers/returnSvgNode";



export const TopBar = observer((props:any): JSX.Element => {

  const [ isSnapMenuOpened, toggleSnapMenuOpened ] = useState(false);
  const [ isToolsMenuOpened, toggleToolsMenuOpened ] = useState(false);

  const { drawingTools } = toolsState;

  const activeTool = drawingTools.find(i => i.active)?
    drawingTools.find(i => i.active)! : undefined;

  const handleMenuOpen = (menu: 'tools' | 'snap') => {
    switch (menu){
    case 'tools':
      toggleToolsMenuOpened(!isToolsMenuOpened);
      toggleSnapMenuOpened(false);
      break;
    case 'snap':
      toggleSnapMenuOpened(!isSnapMenuOpened);
      toggleToolsMenuOpened(false);
      break;
    default:
      return;
    }
  };

  //TODO: wrap in array tools
  const handleCameraChange = (id: number) => {
    sceneState.changeCamera(id);
  };

  const handleToolChange = (id: number) => {
    toolsState.setActiveTool(id);
  };

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
          <span className={activeTool && activeTool.id === 0? styles.buttonActive : styles.button} onClick={() => handleMenuOpen('tools')}>
            <span className={styles.btnContentMain}>{activeTool ? returnSvgNode(activeTool.name) : returnSvgNode('line')}</span>
            <span className={styles.btnContentArrow}>{returnSvgNode('arrowHead')}</span>
            {isToolsMenuOpened && <ToolsMenu />}
          </span>
          <div className={styles.toolsOptions}>
            {/* TODO disabled if any instrument is active */}
            <div className={isSnapMenuOpened? styles.buttonActive : styles.button}>
              <div className={styles.menuItemReciever} onClick={() => handleMenuOpen('snap')}></div>
              <div>{`Snapping`}</div>
              <div className={styles.menuOpener}>{returnSvgNode('arrowHead')}</div>
              {isSnapMenuOpened && <HelpersMenu />}
            </div>
          </div>
        </div>

        <div className={styles.cameraOptions}>
          <span className={sceneState.currentCamera===0? styles.buttonActive : styles.button}
            onClick={() => {handleCameraChange(0);}}>
              Top
          </span>
          <span className={sceneState.currentCamera===1? styles.buttonActive : styles.button}
            onClick={() => {handleCameraChange(1);}}>
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
});