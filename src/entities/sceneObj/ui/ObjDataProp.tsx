import React from 'react';
import { ObjDataPropProps } from './ObjDataProp.prop';
import './objDataProp.scss';
import { ComplexSlider } from 'shared/ui';

const ObjDataProp = ({ propName = '_', propValue, isEditable, ...props }: ObjDataPropProps) => {
  return (
    <div className="objDataProp">
      <span className="objDataProp__name">{propName}</span>
      <span className="objDataProp__value">
        {isEditable ? (
          <ComplexSlider
            minVal={1}
            maxVal={100}
            stepVal={1}
            val={10}
            valName={'width'}
            onSliderChange={() => {}}
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
