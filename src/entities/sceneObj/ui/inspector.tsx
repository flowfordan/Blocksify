import React, { useRef, useState } from 'react';
import { ObjDataPropProps } from './ObjDataProp.prop';
import './objDataProp.scss';
import { ComplexSlider } from 'shared/ui';

const ObjDataProp = ({ propName = '_', propValue, isEditable, controls, propId, ...props }: ObjDataPropProps) => {
  const [slideVal, setSlideVal] = useState(propValue);
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
    <div className="objDataProp">
      <span className="objDataProp__name">{propName}</span>
      <span className="objDataProp__value">
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
          />
        ) : (
          propValue
        )}
      </span>
    </div>
  );
};

export { ObjDataProp };
