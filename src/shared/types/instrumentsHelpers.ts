//preset config
/*
  helperID - id of helper
  type - type snap/grid
  name - spacing/angle/grid/visibility
  type + name - final helper characterisation

  isActive: false,
  value - main current number - for sliders only
  valueName - UI name of slider
  isRange - UI - slidr or checkboxes
  rangeMin: 0.5,
  rangeMax: 5,
  rangeStep: 0.5,
  isSelection - UI checkboxes or not
  numbers - UI - for checkboxes only - selected values

*/

import { IControllerOptions } from './options';

export enum InstrumentHelpersId {
  SNAP_GRID = 'snap_grid',
  SNAP_ANGLE = 'snap_angle',
  SNAP_STEP = 'snap_step',
}

export type InstrumentHelperTitle = 'Grid' | 'Step' | 'Node' | 'Angle' | '_name';

type IntrumentHelperType = 'snapping' | 'other';

export interface InstrumentHelper {
  id: InstrumentHelpersId;
  type: IntrumentHelperType;
  title: InstrumentHelperTitle;
  isActive: boolean;
  options: IControllerOptions;
}

export type InstrumentsHelpersActivity = {
  [ID in InstrumentHelpersId]: boolean;
};
