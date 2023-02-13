import { IObjProperties } from '../../types/objsData';

//OBJS DATA PRESETS FOR LAYERS
export const borderObjPreset: IObjProperties['border'] = {
  layerId: {
    modType: 'constant',
    value: 2,
  },
  name: {
    modType: 'constant',
    value: 'Border',
  },
  objArea: {
    modType: 'calculated',
    value: 0,
  },
  objMaxFloors: {
    modType: 'editable',
    value: 0,
  },
  objMinFloors: {
    modType: 'editable',
    value: 0,
  },
};

export const streetsObjPreset: IObjProperties['street'] = {
  layerId: {
    modType: 'constant',
    value: 3,
  },
  name: {
    modType: 'constant',
    value: 'Street',
  },
  objLength: {
    modType: 'calculated',
    value: 0,
  },
  objWidth: {
    modType: 'editable',
    value: 0,
  },
};

export const blocksObjPreset: IObjProperties['block'] = {
  layerId: {
    modType: 'constant',
    value: 4,
  },
  name: {
    modType: 'constant',
    value: 'Block',
  },
  objArea: {
    modType: 'calculated',
    value: 0,
  },
};

export const buildingsObjPreset: IObjProperties['building'] = {
  layerId: {
    modType: 'constant',
    value: 5,
  },
  name: {
    modType: 'constant',
    value: 'Building',
  },
  objFloors: {
    modType: 'calculated',
    value: 0,
  },
};
