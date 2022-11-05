import { getLineMat, getPolygonMat } from "../../three/objs3d";

//objects 3d materials
//LAYER 2 - BORDER
//main
const borderMainContent = {
  id: 0,
  name: 'Border',
  descr: 'Border or/and Zone inside Border ',
  stage: 0,
  mat: {
    line: getLineMat(0x1d5e9a, 5, true),
    polygon: getPolygonMat()
  }
};

//LAYER 3 - STREETS
//main
const streetsMainContent = {
  id: 0,
  name: 'Street axis',
  descr: 'Street axis',
  stage: 0,
  mat: {
    line: getLineMat(0x533931),
    polygon: null
  }
};

//add
const streetsAddContent = {
  rt: {
    id: 0, name: 'Street sides',
    descr: 'Street sides',
    stage: 0,
    mat: {
      line: getLineMat(0x533931),
      polygon: null
    }
  },
  auto: {
    id: 1,
    name: 'Street area',
    descr: 'Street area - polygon (public territory)',
    stage: 1,
    mat: {
      line: getLineMat(0x533931),
      polygon: getPolygonMat()
    }
  }
};

//LAYER 4 - BLOCKS
//main

//add
const blocksAddContent = {
  rt: null,
  auto: {
    id: 1,
    name: 'Block area',
    descr: 'Block area territory',
    stage: 1,
    mat: {
      line: getLineMat(0x533931),
      polygon: getPolygonMat()
    }
  }
};

//LAYER 5 - BUILDINGS
//add
const buildingsAddContent = {
  rt: null,
  auto: {
    id: 1, name: 'Building',
    descr: 'Building volume',
    stage: 1,
    mat: {
      line: getLineMat(0x533931),
      polygon: getPolygonMat()
    }
  }
};

//LAYERS
//TODO: utility layer with
//TODO: property utility: bool
//guides and helpers options
const layersDefPreset = [ {
  name: 'Border',
  id: 2,
  active: true,
  empty: true,
  editable: true,
  visible: true,
  content: {
    main: borderMainContent,
    add: {
      rt: null,
      auto: null
    }
  }
},
{
  name: 'Streets',
  id: 3,
  active: false,
  empty: false,
  editable: true,
  visible: true,
  content: {
    main: streetsMainContent,
    add: streetsAddContent
  }
},
{
  name: 'Blocks',
  id: 4,
  active: false,
  empty: true,
  editable: false,
  visible: true,
  content: {
    main: null,
    add: blocksAddContent
  }
},
{
  name: 'Buildings',
  id: 5,
  active: false,
  empty: true,
  editable: false,
  visible: false,
  content: {
    main: null,
    add: buildingsAddContent
  }
}
];

export { layersDefPreset };