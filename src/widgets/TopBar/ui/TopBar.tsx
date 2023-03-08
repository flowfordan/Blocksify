/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { TopBarProps } from './TopBar.props';

import './topBar.scss';
import { instrumentsState, sceneState } from 'shared/model';
import { returnSvgNode } from 'shared/lib/returnSvgNode';
import { BtnBar, withDropDown } from 'shared/ui';
import { DrawInstrMenu, HelpersInstrMenu, SelectorInstr } from 'entities/sceneInstrument';
import { ToolMenu } from 'widgets/ToolMenu';

export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {
  const { tools } = instrumentsState;

  const activeTool = tools.find((i) => i.active) ? tools.find((i) => i.active)! : undefined;

  //TODO: wrap in array tools
  const handleCameraChange = (id: number) => {
    sceneState.changeCamera(id);
  };

  const handleToolChange = (id: number) => {
    instrumentsState.setActiveTool(id);
  };

  const DropDownDrawInstr = withDropDown(DrawInstrMenu);
  const DropDownHelpersInstr = withDropDown(HelpersInstrMenu);

  return (
    <div className={cn(className, 'topBar')} {...props}>
      <div className={'topBar__corner'}>
        <span className={'topBar__corner--logo'}>{returnSvgNode('logo')}</span>
        <BtnBar title={'Import'} isActive={false} />
      </div>

      <div className={'topBar__main'}>
        <div className={'topBar__main--part'}>
          <SelectorInstr />
          <DropDownDrawInstr list={<ToolMenu menuType="drawing" />} />
          <DropDownHelpersInstr list={<ToolMenu menuType="helpers" />} />
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar
            iconKey="cameraTop"
            onClick={() => {
              handleCameraChange(0);
            }}
            isActive={sceneState.currentCamera === 0}
            title={'Top View'}
          />
          <BtnBar
            iconKey="cameraPerspective"
            onClick={() => {
              handleCameraChange(1);
            }}
            isActive={sceneState.currentCamera === 1}
            title={'Perspective View'}
          />
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar iconKey="viewAll" isActive={false} />
          <BtnBar iconKey="viewCenter" isActive={false} />
          <BtnBar
            iconKey="viewAll"
            isActive={activeTool?.id === 4}
            title={'Clear Scene'}
            onClick={() => handleToolChange(4)}
            //disable case
          />
        </div>
      </div>

      <div>
        <BtnBar title={'Save'} isActive={false} />
      </div>
    </div>
  );
});
