import React from 'react';

import { ComplexSliderProps } from './ComplexSlider.props';
import './complexSlider.scss';

import { Slider } from '../../basic/Slider/Slider';

const ComplexSlider = ({
  minVal,
  maxVal,
  stepVal,
  val,
  uiItemId,
  valName,
  ...props
}: ComplexSliderProps): JSX.Element => {
  //connect to state?
  //TODO connect thru UI manager

  return (
    <div className={'complexSlider'}>
      <span className={'complexSlider__value'}>{val}</span>
      <span className={'complexSlider__slider'}>
        <Slider minVal={minVal} maxVal={maxVal} stepVal={stepVal} val={val} uiItemId={uiItemId} />
      </span>
      {valName && <span className={'complexSlider__valName'}>{valName}</span>}
    </div>
  );
};

export { ComplexSlider };
