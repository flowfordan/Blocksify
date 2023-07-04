import { LineMaterial } from 'three-fatline';
import { ICommonObjData, IObjDataProps, OBJ_GENERAL_TYPE } from './objs';

export enum ILayerIDs {
  borders = 2,
  streets = 3,
  blocks = 4,
  buildings = 5,
}

type LayerID = `${ILayerIDs}` extends `${infer T extends number}` ? T : never;

type ILayerName = Capitalize<keyof typeof ILayerIDs>;

//TODO: include current layer property
interface LayerContentMaterials {
  line: LineMaterial;
  polygon: THREE.MeshBasicMaterial;
}

interface LayerContentItem {
  id: number;
  name: string;
  descr: string;
  stage: number;
  mat: LayerContentMaterials;
}

interface LayerContent {
  //main - manual user created
  //add - auto generated off user-created data
  main: LayerContentItem | null;
  add: {
    rt: LayerContentItem | null;
    auto: LayerContentItem | null;
  };
}

interface PartsData {
  main: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_PRIM_PT>;
  add: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SECOND_PT>;
}

export interface Layer {
  name: ILayerName;
  id: LayerID; //three layers from 0 to 32
  active: boolean;
  empty: boolean;
  editable: boolean;
  visible: boolean;
  blocked: boolean;
  content: LayerContent;
  objectsQuantity: number; //only main objects
  objDefaultData: IObjDataProps[keyof IObjDataProps];
  ptsData: PartsData;
}
