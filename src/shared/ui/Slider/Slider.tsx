import React from 'react';
import cn from 'classnames';

import { SliderProps } from './Slider.props';
import './slider.scss';

const Slider = ({ minVal, maxVal, stepVal, val, onSliderChange, variant, ...props }: SliderProps): JSX.Element => {
  return (
    <input
      className={cn('slider', { ['slider--dark']: variant === 'dark' })}
      type="range"
      min={minVal}
      max={maxVal}
      step={stepVal}
      value={val}
      onChange={(e) => onSliderChange(e)}
      {...props}
    />
  );
};

export { Slider };
