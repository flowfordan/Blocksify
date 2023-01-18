import React from 'react';

import { SliderProps } from './Slider.props';
import './slider.scss';
import { instrumentsState } from '../../../state';

const Slider = ({ minVal, maxVal, stepVal, val, uiItemId, ...props }: SliderProps): JSX.Element => {
  //connect to state?
  //TODO connect thru UI manager
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const newValue = Number(e.target.value);
    instrumentsState.setHelperValue(itemId, newValue);
  };

  return (
    <input
      className={'slider'}
      type="range"
      min={minVal}
      max={maxVal}
      step={stepVal}
      value={val}
      onChange={(e) => handleValueChange(e, uiItemId)}
    />
  );
};

export { Slider };
