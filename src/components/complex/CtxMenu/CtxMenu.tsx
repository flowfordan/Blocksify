import React, { useEffect } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { CtxMenuProps } from './CtxMenu.props';
import { uiState } from '../../../shared/model';
import { Card } from '../../../shared/ui/Card/Card';
import { HelpersMenu } from '../HelpersMenu/HelpersMenu';
import { ToolsMenu } from '../ToolsMenu/ToolsMenu';

import './ctxMenu.scss';

const ctxMenuId = 'ctx-menu';

const CtxMenu = observer(({ children, className, ...props }: CtxMenuProps): JSX.Element => {
  //take position x and y
  //take content type
  let menuContent = null;
  const menuPosX = uiState.ctxMenu.posX;
  const menuPosY = uiState.ctxMenu.posY;

  switch (uiState.ctxMenu.currentContent) {
    case 'helpers':
      menuContent = <HelpersMenu />;
      break;
    case 'tools':
      menuContent = <ToolsMenu />;
      break;
    default:
      menuContent = null;
      break;
  }

  const handleOutsideClick = (e: MouseEvent) => {
    const menuEl = document.getElementById(ctxMenuId);
    const target = e.target;
    //check if click inside menu
    //if inside
    //return
    //else
    if (menuEl?.contains(target as Node)) {
      return;
    } else {
      uiState.setCtxMenu(null);
    }
  };

  //TODO event listeners
  useEffect(() => {
    //add EL
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Card
      className={cn(className, 'ctxMenu')}
      id={ctxMenuId}
      style={{ left: `${menuPosX}px`, top: `${menuPosY}px` }}
      {...props}
    >
      {menuContent}
    </Card>
  );
});

export { CtxMenu };
