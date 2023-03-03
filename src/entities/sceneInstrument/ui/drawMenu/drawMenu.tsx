import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';

export const DrawInstrMenu = observer(() => {
  const activeTool = instrumentsModel.instruments.find((i) => i.isActive);
  //open/close menu widget - common for page
  if (!activeTool) {
    return <BtnBar isExpandable iconKey="line" isActive={false} title={'Drawing Tools'} onClick={() => {}} />;
  }
  return <BtnBar isExpandable iconKey="line" isActive={true} title={activeTool.title} onClick={() => {}} />;
});

{
  /* <BtnBar
iconKey={activeTool && activeTool.type === 'draw' ? activeTool.name : 'line'}
isActive={Boolean(activeTool) && activeTool?.type === 'draw'}
onClick={(e) => handleMenuOpen(e, 'tools')}
isExpandable
title={'Drawing tools'}
isSelected={uiState.ctxMenu.currentContent === 'tools'}
/> */
}
