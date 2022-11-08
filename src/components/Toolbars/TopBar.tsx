/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from "react";
import cn from 'classnames';
import { observer } from "mobx-react-lite";

import './topBar.scss';
import { sceneState, toolsState, uiState } from '../../state';
import { useState } from "react";

import { HelpersMenu } from "../complex/HelpersMenu/HelpersMenu";
import { ToolsMenu } from "../complex/ToolsMenu/ToolsMenu";
import { BtnBar } from "../complex/BtnBar/BtnBar";
import { TopBarProps } from "./TopBar.props";
import { CtxMenu } from "../complex/CtxMenu/CtxMenu";


export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {

  const [ isSnapMenuOpened, toggleSnapMenuOpened ] = useState(false);
  const [ isToolsMenuOpened, toggleToolsMenuOpened ] = useState(false);


  const { tools } = toolsState;

  const activeTool = tools.find(i => i.active)?
    tools.find(i => i.active)! : undefined;

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, menuType: 'tools' | 'helpers') => {
    const elementPos = e.currentTarget.getBoundingClientRect();
    uiState.setCtxMenu(menuType, elementPos.left, elementPos.bottom);
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
          <BtnBar iconKey='selector' isActive={activeTool?.id === 3} title={'Selector tool'}/>
          <BtnBar iconKey={activeTool ? activeTool.name : 'line'} isActive={Boolean(activeTool)} onClick={(e) => handleMenuOpen(e, 'tools')} isExpandable title={'Drawing tools'}/>
          <BtnBar iconKey={'helper'} isActive={false} onClick={(e) => handleMenuOpen(e, 'helpers')} isExpandable title={'Helpers (snaps, grid)'}/>
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar iconKey='cameraTop' onClick={() => {handleCameraChange(0);}} isActive={sceneState.currentCamera === 0} title={'Top View'}/>
          <BtnBar iconKey='cameraPerspective' onClick={() => {handleCameraChange(1);}} isActive={sceneState.currentCamera === 1} title={'Perspective View'}/>
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