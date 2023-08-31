import React from 'react';
import { Slider } from '../Slider/Slider';
import cn from 'classnames';

import { ComplexSliderProps } from './ComplexSlider.props';
import styles from './complexSlider.module.scss';

export const ComplexSlider = ({
  minVal,
  maxVal,
  stepVal,
  val,
  uiItemId,
  valName,
  onSliderChange,
  onSliderChanged,
  variant = 'default',
  disabled,
  ...props
}: ComplexSliderProps) => {
  //connect to state?
  //TODO connect thru UI manager

  return (
    <div
      className={cn(styles.complexSlider, {
        [styles.dark]: variant === 'dark',
      })}
    >
      <span className={styles.value}>{val}</span>
      <span className={styles.slider}>
        <Slider
          minVal={minVal}
          maxVal={maxVal}
          stepVal={stepVal}
          val={val}
          onSliderChange={onSliderChange}
          onSliderChanged={onSliderChanged}
          variant={variant}
          disabled={disabled}
        />
      </span>
      {valName && <span className={styles.valName}>{valName}</span>}
    </div>
  );
};
