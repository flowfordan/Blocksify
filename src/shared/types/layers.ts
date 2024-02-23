import { LineMaterial } from 'three-fatline';
import { ICommonObjData, IObjDataProps, OBJ_GENERAL_TYPE } from './objs';
import { InstrumentsId } from './instruments';

export enum ILayerIDs {
  init = 0,
  borders = 2,
  streets = 3,
  blocks = 4,
  buildings = 5,
}

export type LayerID = `${ILayerIDs}` extends `${infer T extends number}` ? T : never;

type ILayerName = Capitalize<keyof typeof ILayerIDs>;

//TODO: include current layer property
interface LayerContentMaterials {
  line: LineMaterial;
  polygon: THREE.MeshBasicMaterial;
}

interface LayerContentItem {
  _id: number;
  _name: string;
  _descr: string;
  _stage: number;
  _mat: LayerContentMaterials;
}

interface ILayerContentConfig {
  [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: LayerContentItem | null;
  [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: LayerContentItem | null;
}

interface PartsData {
  main: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_PRIM_PT>;
  add: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SECOND_PT>;
}

//CREATION OBJS CONFIG
export type ObjCreationType = 'manual' | 'generation_on_add' | 'generation_manual_trigger' | null;
export type ObjGenerationTemplate = 'parallel' | 'block' | 'build' | null;
export interface ICreationConfig {
  creationType: ObjCreationType;
  triggeredByLayerChange: LayerID | null;
  generationTemplate: ObjGenerationTemplate;
}

interface ILayerCreationConfig {
  [OBJ_GENERAL_TYPE.OBJ_PRIM_PT]: ICreationConfig | null; //null - manual obj creation
  [OBJ_GENERAL_TYPE.OBJ_SECOND_PT]: ICreationConfig | null;
}

export interface ILayer {
  _name: ILayerName;
  _id: LayerID; //three layers from 0 to 32
  //_stageWhenActive: number; //stage when layer is active
  active: boolean;
  empty: boolean;
  editable: boolean;
  visible: boolean;
  blocked: boolean;
  /**   Available instruments when Layer is Active */
  _disabledInstruments: Array<InstrumentsId>;
  objsQuantity: number; //only main objects
  objDefaultData: IObjDataProps[keyof IObjDataProps];
  ptsData: PartsData; //main & subpts obj data config
  _creationObjsConfig: ILayerCreationConfig;
  _contentConfig: ILayerContentConfig;
}
