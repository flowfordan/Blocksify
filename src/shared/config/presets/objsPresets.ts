import { IObjProperties } from '../../types/objsData';

//OBJS DATA PRESETS FOR LAYERS
export const borderObjPreset: IObjProperties[2] = {
  objGeneralType: 'joined_title_obj',
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

export const streetsObjPreset: IObjProperties[3] = {
  objGeneralType: 'joined_title_obj',
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

export const blocksObjPreset: IObjProperties[4] = {
  objGeneralType: 'joined_title_obj',
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

export const buildingsObjPreset: IObjProperties[5] = {
  objGeneralType: 'joined_title_obj',
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
