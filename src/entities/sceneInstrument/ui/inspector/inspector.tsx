import React, { useRef, useState } from 'react';
import { ObjDataPropProps } from './inspector.prop';
import styles from './inspector.module.scss';
import { ComplexSlider } from 'shared/ui';

export const InspectorInstr = ({
  propName = '_',
  propValue,
  isEditable,
  controls,
  propId,
  ...props
}: ObjDataPropProps) => {
  const [slideVal, setSlideVal] = useState(propValue.toString());
  const timer = useRef<NodeJS.Timeout | null>(null);
  const controlsSpecs = controls ? controls[propId as keyof typeof controls] : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    timer.current && clearTimeout(timer.current);
    setSlideVal(e.target.value);

    timer.current = setTimeout(() => {
      console.log('change value throttle', e.target.value);
    }, 500);
  };
  return (
    <div className={styles.objDataProp}>
      <span className={styles.objDataProp__name}>{propName}</span>
      <span className={styles.objDataProp__value}>
        {isEditable && controlsSpecs?.controlType === 'slide' ? (
          <ComplexSlider
            minVal={controlsSpecs.minVal}
            maxVal={controlsSpecs.maxVal}
            stepVal={controlsSpecs.step}
            val={parseInt(slideVal)}
            valName={'width'}
            onSliderChange={(e) => handleChange(e)}
            // onSliderChanged={(e) => handleChanged(e)}
            variant="dark"
            disabled
          />
        ) : typeof propValue === 'number' ? (
          propValue.toFixed(2)
        ) : (
          propValue
        )}
      </span>
    </div>
  );
};
