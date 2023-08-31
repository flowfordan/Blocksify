import { observer } from 'mobx-react-lite';
import React from 'react';
import { CoordsUnitProps } from './CoordUnit.props';
// import './coordUnit.scss';

export const CoordUnit = observer(({ coord, value, fixValue = 2 }: CoordsUnitProps) => {
  const fix = fixValue > 20 || fixValue < 20 ? 2 : fixValue;
  const renderValue = `${value.toFixed(fix)}`;
  return (
    <div className="coordUnit">
      <span>{`${coord}:`}</span>
      <span>{renderValue}</span>
    </div>
  );
});
