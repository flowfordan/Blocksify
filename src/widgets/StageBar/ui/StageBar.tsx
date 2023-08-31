import React, { useState } from 'react';
import { StageBarProps } from './StageBar.props';
import { observer } from 'mobx-react-lite';
import styles from './stageBar.module.scss';
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
    <div className={cn(className, styles.stageBar)}>
      <button className={styles.btn} onClick={() => handleShowBar()}>
        <svg>
          <use href={`/icons/stage_bundle.svg#${currentStage?.id}`} />
        </svg>
      </button>
      <span
        className={cn(styles.bar, {
          [styles.active]: isBarVisible,
        })}
      >
        <span className={styles.barTail}></span>
        <Stages />
      </span>
    </div>
  );
});
