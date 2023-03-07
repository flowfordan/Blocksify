/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DropDownProps } from './DropDown.props';
import './dropDown.scss';

interface IDropDownInject {
  isOpened: boolean;
  // onClick(): void;
}

export const withDropDown =
  <P extends object>(TriggerComponent: React.ComponentType<P & IDropDownInject>) =>
  ({ list, ...props }: DropDownProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const triggerEl = useRef<HTMLDivElement>(null);
    //menuPos
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const handleBtnClick = () => {
      //set position
      if (!isOpened && triggerEl.current) {
        const rect = triggerEl.current.getBoundingClientRect();
        setMenuPos((prevVal) => {
          return { ...prevVal, x: rect.left, y: rect.bottom };
        });
      }
      setIsOpened(!isOpened);
    };

    const handleClickWhenOpened = useCallback((e: MouseEvent) => {
      const clickTarget = e.target;
      //check if click inside trigger
      if (triggerEl.current && triggerEl.current.contains(clickTarget as Node)) {
        //
      } else {
        setIsOpened(false);
      }
    }, []);

    const handleKeyWhenOpened = useCallback((e: KeyboardEvent) => {
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
        window.removeEventListener('click', handleClickWhenOpened);
        window.removeEventListener('keydown', handleKeyWhenOpened);
      }
    }, [handleClickWhenOpened, handleKeyWhenOpened, isOpened]);

    console.log(menuPos);
    return (
      <>
        <span onClick={() => handleBtnClick()} ref={triggerEl}>
          <TriggerComponent isOpened={isOpened} {...(props as P)} />
        </span>
        {isOpened && (
          <span className="dropDown__list" style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }}>
            {list}
          </span>
        )}
      </>
    );
  };
