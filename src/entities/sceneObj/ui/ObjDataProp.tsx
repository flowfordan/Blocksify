import React from 'react';
import { ObjDataPropProps } from './ObjDataProp.prop';
import './objDataProp.scss';

const ObjDataProp = ({ propName = '_', propValue, ...props }: ObjDataPropProps) => {
  return (
    <div className="objDataProp">
      <span className="objDataProp__name">{propName}</span>
      <span className="objDataProp__value">{propValue}</span>
    </div>
  );
};

export { ObjDataProp };
