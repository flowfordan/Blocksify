import React from 'react';
import { ToolMenuProps } from './ToolMenu.props';
import { DrawInstrItem, instrumentsModel } from 'entities/sceneInstrument';
import { observer } from 'mobx-react-lite';
import { Card } from 'shared/ui';

export const ToolMenu = observer(({ menuType }: ToolMenuProps) => {
  const items = instrumentsModel.drawingTools;
  //connect to config?
  //get list of these items
  //return list
  console.log('Tool Menu');
  return (
    <Card>
      {items.map((i) => {
        return <DrawInstrItem key={i.name} tool={i.name} />;
      })}
    </Card>
  );
});
