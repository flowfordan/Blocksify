import { makeAutoObservable } from 'mobx';
import { LineMaterial } from 'three-fatline';
import { layersDefPreset } from './presets/layersDefPreset';

//TODO: layers structure to include additional obj props
//TODO: include current layer property
interface LayerContentMaterials {
  line: LineMaterial;
  polygon: THREE.MeshBasicMaterial;
}

type LayerID = 'border' | 'streets' | 'blocks' | 'buildings';

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
  name: string;
  id: number; //three layers from 0 to 32
  active: boolean;
  empty: boolean;
  editable: boolean;
  visible: boolean;
  blocked: boolean;
  content: LayerContent;
}

class LayersState {
  layers: Array<Layer>;
  currentLayer: Layer;

  constructor() {
    this.layers = layersDefPreset;
    this.currentLayer = this.setCurrentLayer();
    makeAutoObservable(this);
  }

  setCurrentLayer = (layer?: Layer) => {
    if (layer) {
      this.currentLayer = layer;
      return layer;
    } else {
      const activeLayer = this.layers.find((l) => l.active);
      if (!activeLayer) {
        throw new Error('Among all layers there should be 1 ACTIVE!');
      }
      return activeLayer;
    }
  };

  toggleActiveLayer = (num: number) => {
    //set new active
    const newActive = this.layers.find((item) => item.id === num);

    if (newActive) {
      if (!newActive.editable) {
        //TODO popup window 'Layer is not editable'
        console.log('exit');
        return;
      }

      //set current  active to not active
      const currentActive = this.layers.find((item) => item.active);
      if (currentActive) {
        const idx = this.layers.indexOf(currentActive);
        this.layers[idx].active = false;
      }

      const idx = this.layers.indexOf(newActive);
      this.layers[idx].active = true;
      this.currentLayer = this.layers[idx];
    }
  };

  setLayerVisibility = (layerId: number) => {
    const idx = this.layers.findIndex((el) => el.id === layerId);
    if (idx > -1) {
      this.layers[idx].visible = !this.layers[idx].visible;
    }
  };

  //TODO case after Selector Delete
  setIsLayerEmpty = (onDrawLoopEnd: boolean) => {
    const currentActive = this.layers.find((item) => item.active);
    //case for ufter draw check
    if (currentActive && currentActive.empty && onDrawLoopEnd) {
      currentActive.empty = false;
    } else if (currentActive && !currentActive.empty && !onDrawLoopEnd) {
      console.log('search obj with layer id === current, if found 1 . - return, not found - set empty');
    }
  };
}

const layersState = new LayersState();

export { layersState };
