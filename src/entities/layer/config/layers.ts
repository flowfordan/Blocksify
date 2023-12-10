import { ILayer, InstrumentsId } from 'shared/types';
import { getLineMat, getPolygonMat } from 'three/config/objs3d';
import { blocksObjPreset, borderObjPreset, buildingsObjPreset, streetsObjPreset } from './layerObjects';
import { OBJ_GENERAL_TYPE } from 'shared/types/objs';
import { COLORS_SCENE } from 'three/config/consts';

//objects 3d materials
//LAYER 2 - BORDER
//main
const borderMainContent = {
  _id: 0,
  _name: 'Border',
  _descr: 'Border or/and Zone inside Border ',
  _stage: 0,
  _mat: {
    line: getLineMat(COLORS_SCENE.border_path, 5, true),
    polygon: getPolygonMat(COLORS_SCENE.border_fill),
  },
};

//LAYER 3 - STREETS
//main
const streetsMainContent = {
  _id: 0,
  _name: 'Street axis',
  _descr: 'Street axis',
  _stage: 0,
  _mat: {
    line: getLineMat(COLORS_SCENE.street_axis, 2, true, 1, 4, 2),
    polygon: getPolygonMat(),
  },
};

//add
const streetsAddContent = {
  _id: 0,
  _name: 'Street sides',
  _descr: 'Street sides',
  _stage: 0,
  _mat: {
    line: getLineMat(COLORS_SCENE.street_border),
    polygon: getPolygonMat(),
  },
};
// const streetsAddContent = {
//   rt: {
//     _id: 0,
//     _name: 'Street sides',
//     _descr: 'Street sides',
//     _stage: 0,
//     _mat: {
//       line: getLineMat(0x533931),
//       polygon: getPolygonMat(),
//     },
//   },
//   auto: {
//     _id: 1,
//     _name: 'Street area',
//     _descr: 'Street area - polygon (public territory)',
//     _stage: 1,
//     _mat: {
//       line: getLineMat(0x533931),
//       polygon: getPolygonMat(),
//     },
//   },
// };

//LAYER 4 - BLOCKS
//main

//add
const blocksAddContent = {
  _id: 1,
  _name: 'Block area',
  _descr: 'Block area territory',
  _stage: 1,
  _mat: {
    line: getLineMat(0x533931),
    polygon: getPolygonMat(),
  },
  // rt: null,
  // auto: {
  //   _id: 1,
  //   _name: 'Block area',
  //   descr: 'Block area territory',
  //   stage: 1,
  //   mat: {
  //     line: getLineMat(0x533931),
  //     polygon: getPolygonMat(),
  //   },
  // },
};

//LAYER 5 - BUILDINGS
//add
const buildingsAddContent = {
  _id: 1,
  _name: 'Building',
  _descr: 'Building volume',
  _stage: 1,
  _mat: {
    line: getLineMat(0x533931),
    polygon: getPolygonMat(),
  },
  // rt: null,
  // auto: {
  //   _id: 1,
  //   _name: 'Building',
  //   descr: 'Building volume',
  //   stage: 1,
  //   mat: {
  //     line: getLineMat(0x533931),
  //     polygon: getPolygonMat(),
  //   },
  // },
};

//LAYERS
//TODO: utility layer with
//TODO: property utility: bool
//guides and helpers options
export const InitLayer: ILayer = {
  _name: 'Init',
  _id: 0,
  active: false,
  empty: true,
  editable: false,
  visible: false,
  blocked: true,
  _disabledInstruments: [],
  _contentConfig: {
    [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
    [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
  },
  objsQuantity: 0,
  objDefaultData: borderObjPreset,
  ptsData: {
    main: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_PRIM_PT },
    add: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SECOND_PT },
  },
  _creationObjsConfig: {
    [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
    [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
  },
};
export const DefLayers: Array<ILayer> = [
  {
    _name: 'Borders',
    _id: 2,
    active: false,
    empty: true,
    editable: true,
    visible: true,
    blocked: false,
    _disabledInstruments: [InstrumentsId.LINE, InstrumentsId.PLINE],
    _contentConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: borderMainContent,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
    },
    objsQuantity: 0,
    objDefaultData: borderObjPreset,
    ptsData: {
      main: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_PRIM_PT },
      add: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SECOND_PT },
    },
    _creationObjsConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
    },
  },
  {
    _name: 'Streets',
    _id: 3,
    active: false,
    empty: true,
    editable: true,
    visible: true,
    blocked: false,
    _disabledInstruments: [InstrumentsId.POLYGON],
    _contentConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: streetsMainContent,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: streetsAddContent,
    },
    objsQuantity: 0,
    objDefaultData: streetsObjPreset,
    ptsData: {
      main: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_PRIM_PT },
      add: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SECOND_PT },
    },
    _creationObjsConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: {
        creationType: 'generation_on_add',
        triggeredByLayerChange: null,
        generationTemplate: 'parallel',
      },
    },
  },
  {
    _name: 'Blocks',
    _id: 4,
    active: false,
    empty: true,
    editable: false,
    visible: true,
    blocked: true,
    _disabledInstruments: [],
    _contentConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: blocksAddContent,
    },
    objsQuantity: 0,
    objDefaultData: blocksObjPreset,
    ptsData: {
      main: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_PRIM_PT },
      add: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SECOND_PT },
    },
    _creationObjsConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: {
        creationType: 'generation_on_add',
        triggeredByLayerChange: 3,
        generationTemplate: 'block',
      },
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
    },
  },
  {
    _name: 'Buildings',
    _id: 5,
    active: false,
    empty: true,
    editable: false,
    visible: false,
    blocked: true,
    _disabledInstruments: [],
    _contentConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: buildingsAddContent,
    },
    objsQuantity: 0,
    objDefaultData: buildingsObjPreset,
    ptsData: {
      main: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_PRIM_PT },
      add: { OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SECOND_PT },
    },
    _creationObjsConfig: {
      [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: null,
      [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: null,
    },
  },
];
