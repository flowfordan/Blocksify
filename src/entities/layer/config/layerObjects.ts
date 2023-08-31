import { IObjDataProps, OBJ_GENERAL_TYPE } from 'shared/types/objs';

//OBJS DATA PRESETS FOR LAYERS
export const borderObjPreset: IObjDataProps[2] = {
  OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_MAIN,
  layerId: {
    editType: 'constant',
    value: 2,
  },
  objName: {
    editType: 'constant',
    value: 'Border',
    pubTitle: 'name',
  },
  objArea: {
    editType: 'calculated',
    value: 0,
    pubTitle: 'area',
  },
  objMaxFloors: {
    editType: 'editable',
    value: 0,
    pubTitle: 'max floors',
  },
  objMinFloors: {
    editType: 'editable',
    value: 0,
    pubTitle: 'min floors',
  },
};

export const streetsObjPreset: IObjDataProps[3] = {
  OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_MAIN,
  layerId: {
    editType: 'constant',
    value: 3,
  },
  objName: {
    editType: 'constant',
    value: 'Street',
    pubTitle: 'name',
  },
  objLength: {
    editType: 'calculated',
    value: 0,
    pubTitle: 'length',
  },
  objWidth: {
    editType: 'editable',
    value: 10, //default data
    pubTitle: 'width',
  },
};

export const blocksObjPreset: IObjDataProps[4] = {
  OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_MAIN,
  layerId: {
    editType: 'constant',
    value: 4,
  },
  objName: {
    editType: 'constant',
    value: 'Block',
    pubTitle: 'name',
  },
  objArea: {
    editType: 'calculated',
    value: 0,
    pubTitle: 'area',
  },
};

export const buildingsObjPreset: IObjDataProps[5] = {
  OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_MAIN,
  layerId: {
    editType: 'constant',
    value: 5,
  },
  objName: {
    editType: 'constant',
    value: 'Building',
    pubTitle: 'name',
  },
  objFloors: {
    editType: 'calculated',
    value: 0,
    pubTitle: 'floors',
  },
};
