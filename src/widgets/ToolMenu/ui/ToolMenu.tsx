import React from 'react';
import { ToolMenuProps } from './ToolMenu.props';
import { DrawInstrItem, HelperInstrItem, instrumentsModel, instrumentsHelpersModel } from 'entities/sceneInstrument';
import { observer } from 'mobx-react-lite';
import { Card, Division } from 'shared/ui';
import { Instrument, InstrumentHelper } from 'shared/types';

export const ToolMenu = observer(({ menuType }: ToolMenuProps) => {
  const items =
    menuType === 'drawing'
      ? instrumentsModel.instruments.filter((el) => el.type === 'draw')
      : instrumentsHelpersModel.helpers;

  const RenderDrawItems = () => {
    return (
      <>
        {(items as Instrument[]).map((i) => {
          return <DrawInstrItem key={i.id} instrId={i.id} />;
        })}
      </>
    );
  };

  const RenderHelperItems = () => {
    return (
      <Division header="snapping">
        {(items as InstrumentHelper[]).map((i) => {
          return <HelperInstrItem key={i.id} helperId={i.id} />;
        })}
      </Division>
    );
  };

  return <Card>{menuType === 'drawing' ? <RenderDrawItems /> : <RenderHelperItems />}</Card>;
});
