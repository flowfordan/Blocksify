import { LineMaterial } from 'three-fatline';
import { IObjProperties } from './objsData';

export interface ILayerIDs {
  borders: 2;
  streets: 3;
  blocks: 4;
  buildings: 5;
}

type ILayerName = Capitalize<keyof ILayerIDs>;

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

export interface Layer {
  name: ILayerName;
  id: number; //three layers from 0 to 32
  active: boolean;
  empty: boolean;
  editable: boolean;
  visible: boolean;
  blocked: boolean;
  content: LayerContent;
  objectsQuantity: number; //only main objects
  objData?: IObjProperties;
}
