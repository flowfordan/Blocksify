import React from 'react';

import { SliderProps } from './Slider.props';
import './slider.scss';
import { instrumentsState } from '../../model';

const Slider = ({ minVal, maxVal, stepVal, val, ...props }: SliderProps): JSX.Element => {
  //connect to state?
  //TODO connect thru UI manager
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('slider change');
  };

  return (
    <input
      className={'slider'}
      type="range"
      min={minVal}
      max={maxVal}
      step={stepVal}
      value={val}
      onChange={(e) => handleValueChange(e)}
    />
  );
};

export { Slider };
