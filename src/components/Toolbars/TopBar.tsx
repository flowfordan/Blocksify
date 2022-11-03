/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from "react";
import cn from 'classnames';
import { observer } from "mobx-react-lite";

import './topBar.scss';
import { sceneState, toolsState } from '../../state';
import { useState } from "react";

import { HelpersMenu } from "../HelpersMenu/HelpersMenu";
import { ToolsMenu } from "../ToolsMenu/ToolsMenu";
import { returnSvgNode } from "../../helpers/returnSvgNode";



export const TopBar = observer((props:any): JSX.Element => {

  const [ isSnapMenuOpened, toggleSnapMenuOpened ] = useState(false);
  const [ isToolsMenuOpened, toggleToolsMenuOpened ] = useState(false);

  const { tools } = toolsState;

  const activeTool = tools.find(i => i.active)?
    tools.find(i => i.active)! : undefined;

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

    <div className={'topBar'}>

      <div className={'topBar__corner'}>
        <span className={'topBar__corner--logo'}>
          BLOCKSIFY
        </span>
        <span className={''? 'topBar__btnActive' : 'topBar__btn'}
          onClick={() => {}}>
            Import
        </span>
      </div>

      <div className={'topBar__main'}>
        <div className={'topBar__main--tools'}>

          <span className={cn('topBar__btn', {
            ['topBar__btnActive']: activeTool
          })}>Select</span>

          <span className={cn('topBar__btn', {
            ['topBar__btnActive']: activeTool,
            ['topBar__btnSelected']: isToolsMenuOpened
          })}
          onClick={() => handleMenuOpen('tools')}>
            <span className={'topBar__btn--content'}>{activeTool ? returnSvgNode(activeTool.name) : returnSvgNode('line')}</span>
            <span className={'topBar__btn--content'}>{returnSvgNode('arrowHead')}</span>
            {isToolsMenuOpened && <ToolsMenu />}
          </span>

          {/* TODO disabled if any instrument is active */}
          <div className={cn('topBar__btn', {
            ['topBar__btnSelected']: isSnapMenuOpened
          })}>
            <div className={'topBar__btn--menuItemReciever'} onClick={() => handleMenuOpen('snap')}></div>
            <div>{`Snap`}</div>
            <div className={'topBar__btn--menuOpener'}>{returnSvgNode('arrowHead')}</div>
            {isSnapMenuOpened && <HelpersMenu />}
          </div>
        </div>

        <div className={'topBar__main--cameraOptions'}>
          <span className={sceneState.currentCamera===0? 'topBar__btnActive' : 'topBar__btn'}
            onClick={() => {handleCameraChange(0);}}>
              Top
          </span>
          <span className={sceneState.currentCamera===1? 'topBar__btnActive' : 'topBar__btn'}
            onClick={() => {handleCameraChange(1);}}>
              Perspective
          </span>
          <span className={''? 'topBar__btnActive' : 'topBar__btn'}
            onClick={() => {}}>
              ViewAll
          </span>
        </div>

        <div>
          K
        </div>

      </div>

      <div>
        <span className={''? 'topBar__btnActive' : 'topBar__btn'}
          onClick={() => {}}>
            Save
        </span>
      </div>

    </div>
  );
});