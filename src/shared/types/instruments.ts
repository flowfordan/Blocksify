export enum InstrumentsId {
  LINE = 'line',
  PLINE = 'pLine',
  POLYGON = 'polygon',
  SELECTOR = 'selector',
  EDITOR = 'objEditor',
  INSPECTOR = 'objInspector',
  CLEANER = 'cleaner',
}

export type InstrumentsTitle = 'Line' | 'Polyline' | 'Polygon' | 'Inspector' | 'Generator' | 'name';

interface Instrument {
  id: InstrumentsId;
  title: InstrumentsTitle;
  active: boolean;
  type: 'draw' | 'select' | 'inspect' | 'remove' | 'generate' | 'other';
  lvl: 1 | 2 | 3;
  cursorType: 'auto' | 'wait' | 'crosshair' | 'pointer';
}

const test: Instrument = {
  id: InstrumentsId.LINE
}
