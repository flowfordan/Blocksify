import React, { useState } from 'react';
import { DropDownProps } from './DropDown.props';

export const DropDown = ({ btn, list, ...props }: DropDownProps) => {
  //state
  const [isOpened, setIsOpened] = useState(false);
  const handleBtnClick = () => {
    setIsOpened(!isOpened);
  };
  console.log('STATE', isOpened);
  return (
    <div>
      <span onClick={() => handleBtnClick()}>{btn}</span>
      {isOpened && list}
    </div>
  );
};
