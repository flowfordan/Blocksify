/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { TopBarProps } from './TopBar.props';

import './topBar.scss';

import { BtnBar, withDropDown } from 'shared/ui';
import { DrawInstrMenu, HelpersInstrMenu, SelectorInstr } from 'entities/sceneInstrument';
import { ToolMenu } from 'widgets/ToolMenu';
import { EnvMenuExpander, EnvOptionsMenu } from 'entities/sceneEnv';
import { CameraViewSelect } from 'entities/camera';
import { CameraViewId } from 'shared/types';

import LogoIcon from '../../../shared/assets/icons/logo.svg';

export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {
  const DropDownDrawInstr = withDropDown(DrawInstrMenu);
  const DropDownHelpersInstr = withDropDown(HelpersInstrMenu);
  const DropDownSceneEnvOptions = withDropDown(EnvMenuExpander);

  return (
    <div className={cn(className, 'topBar')} {...props}>
      <div className={'topBar__corner'}>
        <span className={'topBar__corner--logo'}>
          <LogoIcon />
        </span>
        <BtnBar title={'Import'} isActive={false} />
      </div>

      <div className={'topBar__main'}>
        <div className={'topBar__main--part'}>
          <SelectorInstr />
          <DropDownDrawInstr content={<ToolMenu menuType="drawing" />} />
          <DropDownHelpersInstr content={<ToolMenu menuType="helpers" />} contentClickType={'double'} />
        </div>

        <div className={'topBar__main--part'}>
          <CameraViewSelect viewId={CameraViewId.PERSPECTIVE} />
          <CameraViewSelect viewId={CameraViewId.TOP} />
          <BtnBar iconKey="viewAll" isActive={false} />
          <BtnBar iconKey="viewCenter" isActive={false} />
        </div>

        <div className={'topBar__main--part'}>
          <BtnBar
            iconKey="viewAll"
            isActive={false}
            title={'Clear Scene'}
            onClick={() => {}}
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
