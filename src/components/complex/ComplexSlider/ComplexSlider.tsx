import React from 'react';

import { ComplexSliderProps } from './ComplexSlider.props';
import styles from './ComplexSlider.module.css';

import { Slider } from '../../basic/Slider/Slider';


const ComplexSlider = ({ minVal, maxVal, stepVal, val, uiItemId, valName, ...props }: ComplexSliderProps): JSX.Element => {
  //connect to state?
  //TODO connect thru UI manager

  return (
    <div className={styles.complexSlider}>
      <span className={styles.complexSlider_value}>{val}</span>
      <span className={styles.complexSlider_slider}><Slider minVal={minVal} maxVal={maxVal} stepVal={stepVal} val={val} uiItemId={uiItemId} /></span>
      {valName && <span className={styles.complexSlider_valName}>{valName}</span>}
    </div>
  );
};

export { ComplexSlider };

