/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DropDownProps } from './DropDown.props';
import './dropDown.scss';

interface IDropDownInject {
  isOpened: boolean;
}

export const withDropDown =
  <P extends object>(TriggerComponent: React.ComponentType<P & IDropDownInject>) =>
  ({ wrapped, contentClickType = 'regular', ...props }: DropDownProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const triggerEl = useRef<HTMLDivElement>(null);
    const contentEl = useRef<HTMLSpanElement>(null);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

    const handleTriggerClick = () => {
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
      } else if (contentEl.current && contentEl.current.contains(clickTarget as Node)) {
        //click inside CONTENT list
        if (contentClickType === 'regular') setIsOpened(false);
      } else {
        //click OUTSIDE of dropdown
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
        // window.addEventListener('dblclick', handleDBClickWhenOpened);
      } else {
        //remove EL
        window.removeEventListener('click', handleClickWhenOpened);
        window.removeEventListener('keydown', handleKeyWhenOpened);
        // window.removeEventListener('dblclick', handleDBClickWhenOpened);
      }
    }, [handleClickWhenOpened, handleKeyWhenOpened, isOpened]);

    return (
      <>
        <span onClick={() => handleTriggerClick()} ref={triggerEl}>
          <TriggerComponent isOpened={isOpened} {...(props as P)} />
        </span>
        {isOpened && (
          <span className="dropDown__list" style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }} ref={contentEl}>
            {wrapped}
          </span>
        )}
      </>
    );
  };
