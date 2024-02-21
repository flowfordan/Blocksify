/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */
import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { TopBarProps } from './TopBar.props';

import styles from './topBar.module.scss';

import { BtnBar, withDropDown } from 'shared/ui';
import { DrawInstrMenu, HelpersInstrMenu, SelectorInstr } from 'entities/sceneInstrument';
import { ToolMenu } from 'widgets/ToolMenu';
import { EnvMenuExpander, EnvOptionsMenu } from 'entities/sceneEnv';
import { CameraViewSelect } from 'entities/camera';
import { CameraViewId } from 'shared/types';

import LogoIcon from 'shared/assets/icons/logo.svg';

export const TopBar = observer(({ className, ...props }: TopBarProps): JSX.Element => {
  const DropDownDrawInstr = withDropDown(DrawInstrMenu);
  const DropDownHelpersInstr = withDropDown(HelpersInstrMenu);
  const DropDownSceneEnvOptions = withDropDown(EnvMenuExpander);

  return (
    <div className={cn(className, styles.topBar)} {...props}>
      <div className={styles.corner}>
        <span className={styles.corner__logo}>
          <LogoIcon />
        </span>
        <BtnBar title={'Import'} isActive={false} />
      </div>

      <div className={styles.main}>
        <div className={styles.main__part}>
          <SelectorInstr />
          <DropDownDrawInstr wrapped={<ToolMenu menuType="drawing" />} />
          <DropDownHelpersInstr wrapped={<ToolMenu menuType="helpers" />} contentClickType={'double'} />
        </div>

        <div className={styles.main__part}>
          <CameraViewSelect viewId={CameraViewId.PERSPECTIVE} />
          <CameraViewSelect viewId={CameraViewId.TOP} />
          <BtnBar iconKey="viewAll" isActive={false} />
          <BtnBar iconKey="viewCenter" isActive={false} />
        </div>

        <div className={styles.main__part}>
          <BtnBar
            iconKey="viewAll"
            isActive={false}
            title={'Clear Scene'}
            onClick={() => {}}
            //disable case
          />
        </div>
      </div>

      <div className={styles.utils}>
        <DropDownSceneEnvOptions wrapped={<EnvOptionsMenu />} contentClickType={'double'} />
      </div>
    </div>
  );
});
