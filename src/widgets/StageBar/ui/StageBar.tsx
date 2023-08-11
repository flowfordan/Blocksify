import React from 'react';
import { StageBarProps } from './StageBar.props';
import { DrawInstrItem, HelperInstrItem, instrumentsModel, instrumentsHelpersModel } from 'entities/sceneInstrument';
import { observer } from 'mobx-react-lite';
import { Card, Division } from 'shared/ui';
import { Instrument, InstrumentHelper } from 'shared/types';
import './stageBar.scss';
import cn from 'classnames';

export const StageBar = observer(({ className }: StageBarProps) => {
  return (
    <div className={cn(className, 'stageBar')}>
      <span className={'stageBar__btn'}>Btn</span>
      <span className={'stageBar__bar'}>Bar</span>
    </div>
  );
});
