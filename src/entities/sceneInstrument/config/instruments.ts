import { Instrument, InstrumentsId, InstrumentsData } from 'shared/types';

export const DefInstruments: Array<Instrument> = [
  {
    id: InstrumentsId.LINE,
    title: 'Line',
    isActive: false,
    isAvailable: true,
    lvl: 'top',
    type: 'draw',
    activeCursor: 'crosshair',
  },
  {
    id: InstrumentsId.PLINE,
    title: 'Polyline',
    isActive: false,
    isAvailable: true,
    lvl: 'top',
    type: 'draw',
    activeCursor: 'crosshair',
  },
  {
    id: InstrumentsId.POLYGON,
    title: 'Polygon',
    isActive: false,
    isAvailable: true,
    lvl: 'top',
    type: 'draw',
    activeCursor: 'crosshair',
  },
  {
    id: InstrumentsId.SELECTOR,
    title: 'Selector',
    isActive: false,
    isAvailable: true,
    lvl: 'top',
    type: 'select',
    activeCursor: 'pointer',
    autoTriggerFor: InstrumentsId.INSPECTOR,
  },
  {
    id: InstrumentsId.INSPECTOR,
    title: 'Inspector',
    isActive: false,
    isAvailable: false,
    lvl: 'middle',
    type: 'other',
    activeCursor: 'wait',
  },
  {
    id: InstrumentsId.EDITOR,
    title: 'Editor',
    isActive: false,
    isAvailable: false,
    lvl: 'low',
    type: 'other',
    activeCursor: 'wait',
  },
];

export const DefInstrumentsData: InstrumentsData = {
  selector: { selectedObjData: '', intersectedObjData: '' },
  inspector: { currentObj: '' },
  editor: { currentData: '', newData: '' },
};