/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { TopBarProps } from './TopBar.props';

import './topBar.scss';
import { sceneState } from 'shared/model';
import { returnSvgNode } from 'shared/lib/returnSvgNode';
import { BtnBar, withDropDown } from 'shared/ui';
import { DrawInstrMenu, HelpersInstrMenu, SelectorInstr } from 'entities/sceneInstrument';
import { ToolMenu } from 'widgets/ToolMenu';
import { EnvMenuExpander, EnvOptionsMenu } from 'entities/sceneEnv';

export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {
  //TODO: wrap in array tools
  const handleCameraChange = (id: number) => {
    sceneState.changeCamera(id);
  };

  const handleToolChange = (id: number) => {
    //
  };

  const DropDownDrawInstr = withDropDown(DrawInstrMenu);
  const DropDownHelpersInstr = withDropDown(HelpersInstrMenu);
  const DropDownSceneEnvOptions = withDropDown(EnvMenuExpander);

  return (
    <div className={cn(className, 'topBar')} {...props}>
      <div className={'topBar__corner'}>
        <span className={'topBar__corner--logo'}>{returnSvgNode('logo')}</span>
        <BtnBar title={'Import'} isActive={false} />
      </div>

      <div className={'topBar__main'}>
        <div className={'topBar__main--part'}>
          <SelectorInstr />
          <DropDownDrawInstr content={<ToolMenu menuType="drawing" />} />
          <DropDownHelpersInstr content={<ToolMenu menuType="helpers" />} contentClickType={'double'} />
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
          <BtnBar iconKey="viewAll" isActive={false} />
          <BtnBar iconKey="viewCenter" isActive={false} />
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar
            iconKey="viewAll"
            isActive={false}
            title={'Clear Scene'}
            onClick={() => handleToolChange(4)}
            //disable case
          />
        </div>
      </div>

      <div className={'topBar__utils'}>
        <DropDownSceneEnvOptions content={<EnvOptionsMenu />} contentClickType={'double'} />
      </div>
    </div>
  );
});
