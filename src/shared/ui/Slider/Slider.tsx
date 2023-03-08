import React from 'react';

import { SliderProps } from './Slider.props';
import './slider.scss';

const Slider = ({ minVal, maxVal, stepVal, val, onSliderChange, ...props }: SliderProps): JSX.Element => {
  return (
    <input
      className={'slider'}
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
