import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropDownProps } from './DropDown.props';
import './dropDown.scss';

export const DropDown = ({ btn, list, ...props }: DropDownProps) => {
  //state
  const [isOpened, setIsOpened] = useState(false);
  const triggerEl = useRef<HTMLDivElement>(null);
  const handleBtnClick = () => {
    setIsOpened(!isOpened);
  };

  const handleClickWhenOpened = useCallback((e: MouseEvent) => {
    console.log('CLICK OUTSIDE');
    const clickTarget = e.target;
    //check if click inside trigger
    if (triggerEl.current && triggerEl.current.contains(clickTarget as Node)) {
      //
    } else {
      setIsOpened(false);
    }
  }, []);

  const handleKeyWhenOpened = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      setIsOpened(false);
    }
  }, []);

  //handle clicks
  //- outside trigger: close
  //- on trigger: open/close
  useEffect(() => {
    if (isOpened) {
      //set EL
      window.addEventListener('click', handleClickWhenOpened);
      window.addEventListener('keydown', handleKeyWhenOpened);
    } else {
      //remove EL
      console.log('REMOVE EL');
      window.removeEventListener('click', handleClickWhenOpened);
      window.removeEventListener('keydown', handleKeyWhenOpened);
    }
  }, [handleClickWhenOpened, handleKeyWhenOpened, isOpened]);

  console.log(isOpened);

  return (
    <>
      <span onClick={() => handleBtnClick()} ref={triggerEl}>
        {btn}
      </span>
      {isOpened && <span className="dropDown__list">{list}</span>}
    </>
  );
};
