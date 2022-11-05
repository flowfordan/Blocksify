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
import { BtnBar } from "../complex/BtnBar/BtnBar";
import { TopBarProps } from "./TopBar.props";


export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {

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
    <div className={cn(className, 'topBar')} {...props}>

      <div className={'topBar__corner'}>
        <span className={'topBar__corner--logo'}>
          BLOCKSIFY
        </span>
        <BtnBar title={'Import'} isActive={false}/>
      </div>

      <div className={'topBar__main'}>
        <div className={'topBar__main--part'}>
          <BtnBar iconKey='selector' isActive={activeTool?.id === 3}/>

          <BtnBar iconKey={activeTool ? activeTool.name : 'line'} isActive={Boolean(activeTool)} onClick={() => handleMenuOpen('tools')} isExpandable/>
          {isToolsMenuOpened && <ToolsMenu />}

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
        <BtnBar title={'Save'} isActive={false}/>
      </div>

    </div>
  );
});