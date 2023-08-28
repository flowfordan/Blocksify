import React, { useState } from 'react';
import { StageBarProps } from './StageBar.props';
import { observer } from 'mobx-react-lite';
import './stageBar.scss';
import cn from 'classnames';
import { Stages } from 'features/stage';
import { sceneModel } from 'entities/scene';

export const StageBar = observer(({ className }: StageBarProps) => {
  const [isBarVisible, setIsBarVisible] = useState(true);
  const currentStage = sceneModel.currentStage;
  const handleShowBar = () => {
    setIsBarVisible(!isBarVisible);
  };
  return (
    <div className={cn(className, 'stageBar')}>
      <button className={'stageBar__btn'} onClick={() => handleShowBar()}>
        <svg>
          <use href={`/icons/stage_bundle.svg#${currentStage?.id}`} />
        </svg>
      </button>
      <span
        className={cn('stageBar__bar', {
          ['stageBar__bar--active']: isBarVisible,
        })}
      >
        <span className="stageBar__bar__tail"></span>
        <Stages />
      </span>
    </div>
  );
});
