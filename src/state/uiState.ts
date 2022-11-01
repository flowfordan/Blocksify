import { makeAutoObservable } from "mobx";
import { LineMaterial } from "three-fatline";
import { layersDefPreset } from "./presets/layersDefPreset";


//topBar, leftBar, rightBar, desk,
//popup - conversation with user
//layers
//tools
//camera

class UIState{

  // layers: Array<Layer>;

  constructor(){
    // this.layers = layersDefPreset;
    makeAutoObservable(this);
  }

}

const uiState = new UIState();

export { uiState };
