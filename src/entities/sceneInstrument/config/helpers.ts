import { InstrumentHelper, InstrumentHelpersId, InstrumentsHelpersActivity } from 'shared/types/instrumentsHelpers';

export const AnglesForSnap = [1, 2, 5, 10, 15, 30, 45, 90];
export const DefInstrHelpers: Array<InstrumentHelper> = [
  {
    id: InstrumentHelpersId.SNAP_STEP,
    type: 'snapping',
    title: 'Step',
    isActive: false,
    options: {
      controller: 'range',
      value: 2,
      rangeMin: 0.5,
      rangeMax: 5,
      rangeStep: 0.5,
      selValues: [],
      selVariants: [],
    },
  },
  {
    id: InstrumentHelpersId.SNAP_ANGLE,
    type: 'snapping',
    title: 'Angle',
    isActive: false,
    options: {
      controller: 'selection',
      value: 2,
      rangeMin: 0,
      rangeMax: 0,
      rangeStep: 0,
      selVariants: AnglesForSnap,
      selValues: [2],
    },
  },
  {
    id: InstrumentHelpersId.SNAP_GRID,
    type: 'snapping',
    title: 'Grid',
    isActive: false,
    options: {
      controller: 'none',
      value: 10,
      rangeMin: 0,
      rangeMax: 0,
      rangeStep: 0,
      selValues: [],
      selVariants: [],
    },
  },
  // {
  //   helperID: 3,
  //   type: 'grid',
  //   name: 'show',
  //   isActive: true,
  //   value: 10,
  //   valueName: 'size',
  //   isRange: true,
  //   rangeMin: 0.5,
  //   rangeMax: 20,
  //   rangeStep: 0.5,
  //   isSelection: false,
  //   numbers: [],
  // },
];

export const DefHelpersActivity = DefInstrHelpers.reduce((acc, current) => {
  const { id, isActive } = current;
  return { ...acc, [id]: isActive };
}, {}) as InstrumentsHelpersActivity;
