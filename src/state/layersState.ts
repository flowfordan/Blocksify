import { makeAutoObservable } from "mobx";
import { LineMaterial } from "three-fatline";
import { layersDefPreset } from "./presets/layersDefPreset";

//TODO: layers structure to include additional obj props
//TODO: include current layer property
interface LayerContentMaterials {
  line: LineMaterial | null,
  polygon: THREE.MeshBasicMaterial | null
}

type LayerID = 'border' | 'streets' | 'blocks' | 'buildings';

interface LayerContentItem {
  id: number,
  name: string,
  descr: string,
  stage: number,
  mat: LayerContentMaterials
}

interface LayerContent {
  //main - manual user created
  //add - auto generated off user-created data
  main: LayerContentItem | null,
  add: {
    rt: LayerContentItem | null,
    auto: LayerContentItem | null
  }
}

export interface Layer {
    name: string;
    id: number; //three layers from 0 to 32
    active: boolean;
    empty: boolean;
    editable: boolean;
    visible: boolean;
  content: LayerContent
}


class LayersState{

  layers: Array<Layer>;

  constructor(){
    this.layers = layersDefPreset;
    makeAutoObservable(this);
  }

  setActiveLayer = (num: number) => {
    //set new active
    const newActive = this.layers.find(item => item.id === num);

    if (newActive){

      if (!newActive.editable){
        //TODO popup window 'Layer is not editable'
        console.log('exit');
        return;
      }

      //set current  active to not active
      const currentActive = this.layers.find(item => item.active);
      if (currentActive){
        const idx = this.layers.indexOf(currentActive);
        this.layers[idx].active = false;
      }

      const idx = this.layers.indexOf(newActive);
      this.layers[idx].active = true;
    }

  };
}

const layersState = new LayersState();

export { layersState };
