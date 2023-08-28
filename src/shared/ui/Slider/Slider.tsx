import React from 'react';
import cn from 'classnames';

import { SliderProps } from './Slider.props';
import './slider.scss';

const Slider = ({ minVal, maxVal, stepVal, val, onSliderChange, onSliderChanged, variant, ...props }: SliderProps) => {
  return (
    <input
      className={cn('slider', { ['slider--dark']: variant === 'dark' })}
      type="range"
      min={minVal}
      max={maxVal}
      step={stepVal}
      value={val}
      onChange={(e) => onSliderChange(e)}
      onMouseUp={onSliderChanged ? (e) => onSliderChanged(e) : () => {}}
      {...props}
    />
  );
};

export { Slider };
