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
import { Btn } from "../basic/Btn/Btn";
import { BtnBar } from "../complex/BtnBar/BtnBar";



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
        <div className={'topBar__main--part'}>
          <BtnBar iconKey='selector' isActive={activeTool?.id === 3}/>

          <BtnBar iconKey={activeTool ? activeTool.name : 'line'} isActive={Boolean(activeTool)} onClick={() => handleMenuOpen('tools')} isExpandable/>
          {isToolsMenuOpened && <ToolsMenu />}

          {/* TODO disabled if any instrument is active */}
          <BtnBar iconKey={'helper'} isActive={false} onClick={() => handleMenuOpen('snap')} isExpandable/>
          {isSnapMenuOpened && <HelpersMenu />}
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar iconKey='cameraTop' onClick={() => {handleCameraChange(0);}} isActive={sceneState.currentCamera === 0}/>
          <BtnBar iconKey='cameraPerspective' onClick={() => {handleCameraChange(1);}} isActive={sceneState.currentCamera === 1}/>

        </div>

        <div className={'topBar__main--part'}>
          <BtnBar iconKey='viewAll' isActive={false}/>
          <BtnBar iconKey='viewCenter' isActive={false}/>
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