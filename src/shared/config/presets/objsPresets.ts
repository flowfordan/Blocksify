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
    pubPropTitle: 'name',
  },
  objArea: {
    modType: 'calculated',
    value: 0,
    pubPropTitle: 'area',
  },
  objMaxFloors: {
    modType: 'editable',
    value: 0,
    pubPropTitle: 'max floors',
  },
  objMinFloors: {
    modType: 'editable',
    value: 0,
    pubPropTitle: 'min floors',
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
    pubPropTitle: 'name',
  },
  objLength: {
    modType: 'calculated',
    value: 0,
    pubPropTitle: 'length',
  },
  objWidth: {
    modType: 'editable',
    value: 0,
    pubPropTitle: 'width',
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
    pubPropTitle: 'name',
  },
  objArea: {
    modType: 'calculated',
    value: 0,
    pubPropTitle: 'area',
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
    pubPropTitle: 'name',
  },
  objFloors: {
    modType: 'calculated',
    value: 0,
    pubPropTitle: 'floors',
  },
};
