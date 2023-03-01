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
  lvl: IntrumentLvl;
  activeCursor: 'auto' | 'wait' | 'crosshair' | 'pointer';
  autoTriggerFor?: InstrumentsId;
}

export type InstrumentsData = {
  [InstrumentsId.SELECTOR]: { selectedObjData: ''; intersectedObjData: '' };
  [InstrumentsId.INSPECTOR]: { currentObj: '' };
  [InstrumentsId.EDITOR]: { currentData: ''; newData: '' };
  ////...generator
};

export type LvlActiveInstrument = {
  [K in IntrumentLvl]: Instrument | null;
};
