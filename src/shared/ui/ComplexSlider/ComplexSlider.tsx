import React from 'react';
import { Slider } from '../Slider/Slider';
import cn from 'classnames';

import { ComplexSliderProps } from './ComplexSlider.props';
import './complexSlider.scss';

export const ComplexSlider = ({
  minVal,
  maxVal,
  stepVal,
  val,
  uiItemId,
  valName,
  onSliderChange,
  variant = 'default',
  ...props
}: ComplexSliderProps) => {
  //connect to state?
  //TODO connect thru UI manager

  return (
    <div
      className={cn('complexSlider', {
        ['complexSlider--dark']: variant === 'dark',
      })}
    >
      <span className={'complexSlider__value'}>{val}</span>
      <span className={'complexSlider__slider'}>
        <Slider
          minVal={minVal}
          maxVal={maxVal}
          stepVal={stepVal}
          val={val}
          onSliderChange={onSliderChange}
          variant={variant}
        />
      </span>
      {valName && <span className={'complexSlider__valName'}>{valName}</span>}
    </div>
  );
};
