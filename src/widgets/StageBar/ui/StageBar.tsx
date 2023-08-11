import React, { useState } from 'react';
import { StageBarProps } from './StageBar.props';
import { DrawInstrItem, HelperInstrItem, instrumentsModel, instrumentsHelpersModel } from 'entities/sceneInstrument';
import { observer } from 'mobx-react-lite';
import { Card, Division } from 'shared/ui';
import { Instrument, InstrumentHelper } from 'shared/types';
import './stageBar.scss';
import cn from 'classnames';

export const StageBar = observer(({ className }: StageBarProps) => {
  const [isBarVisible, setIsBarVisible] = useState(true);
  const handleShowBar = () => {
    setIsBarVisible(!isBarVisible);
  };
  return (
    <div className={cn(className, 'stageBar')}>
      <button className={'stageBar__btn'} onClick={() => handleShowBar()}>
        B
      </button>
      <span
        className={cn('stageBar__bar', {
          ['stageBar__bar--active']: isBarVisible,
        })}
      >
        Bar
      </span>
    </div>
  );
});
