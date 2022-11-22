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

const helpersDefPreset = [
  {
    helperID: 0,
    type: 'snap',
    name: 'step',
    isActive: false,
    value: 2,
    valueName: '',
    isRange: true,
    rangeMin: 0.5,
    rangeMax: 5,
    rangeStep: 0.5,
    isSelection: false,
    numbers: [],
  },
  {
    helperID: 1,
    type: 'snap',
    name: 'angle',
    isActive: false,
    value: 2,
    valueName: '',
    isRange: false,
    rangeMin: 0,
    rangeMax: 0,
    rangeStep: 0,
    isSelection: true,
    variants: [1, 2, 5, 10, 15, 30, 45, 90],
    numbers: [2],
  },
  {
    helperID: 2,
    type: 'snap',
    name: 'grid',
    isActive: false,
    value: 0,
    valueName: '',
    isRange: false,
    rangeMin: 0,
    rangeMax: 0,
    rangeStep: 0,
    isSelection: false,
    numbers: [],
  },
  {
    helperID: 3,
    type: 'grid',
    name: 'show',
    isActive: true,
    value: 10,
    valueName: 'size',
    isRange: true,
    rangeMin: 0.5,
    rangeMax: 20,
    rangeStep: 0.5,
    isSelection: false,
    numbers: [],
  },
];

export { helpersDefPreset };
