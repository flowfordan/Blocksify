import { IObjDataProps } from './objs';

export enum InstrumentsId {
  LINE = 'line',
  PLINE = 'pLine',
  POLYGON = 'polygon',
  SELECTOR = 'selector',
  EDITOR = 'editor',
  INSPECTOR = 'inspector',
  CLEANER = 'cleaner',
}

export type InstrumentsTitle =
  | 'Line'
  | 'Polyline'
  | 'Polygon'
  | 'Editor'
  | 'Selector'
  | 'Inspector'
  | 'Generator'
  | 'name';

type IntrumentLvl = 'top' | 'middle' | 'low';
export interface Instrument {
  id: InstrumentsId;
  title: InstrumentsTitle;
  isActive: boolean;
  isAvailable: boolean;
  type: 'draw' | 'select' | 'inspect' | 'remove' | 'generate' | 'other';
  activity: 'continous' | 'one-click';
  lvl: IntrumentLvl;
  activeCursor: 'auto' | 'wait' | 'crosshair' | 'pointer';
  autoTriggerFor?: InstrumentsId;
}

export interface INewObjDataToSet {
  name: string;
  value: string;
}

export type InstrumentsData = {
  // [InstrumentsId.SELECTOR]: {
  //   selectedObjData: IObjDataProps[keyof IObjDataProps] | null;
  //   intersectedObjData: IObjDataProps[keyof IObjDataProps] | null;
  //   //data to set - for selected obj
  //   //prop name and prop value
  // };
  [InstrumentsId.INSPECTOR]: {
    selectedObjData: IObjDataProps[keyof IObjDataProps] | null;
    intersectedObjData: IObjDataProps[keyof IObjDataProps] | null;
    dataToSet: INewObjDataToSet | null;
  };
  [InstrumentsId.EDITOR]: { currentData: ''; newData: '' };
  ////...generator
};

export type LvlActiveInstrument = {
  [K in IntrumentLvl]: Instrument | null;
};
