import React from 'react';

import { SliderProps } from './Slider.props';
import styles from './Slider.module.css';

const Slider = ({ minVal, maxVal, stepVal, val, ...props }: SliderProps): JSX.Element => {
  return (
    <input className={styles.slider} type="range"
      min={minVal} max={maxVal}
      step={stepVal}
      value={val}
      // onChange={(e) => handleValueChange(e, item.helperID)}
    />
  );
};

export { Slider };

