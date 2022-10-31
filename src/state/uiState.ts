import { makeAutoObservable } from "mobx";
import { LineMaterial } from "three-fatline";
import { layersDefPreset } from "./presets/layersDefPreset";


//topBar, leftBar, rightBar, desk,
//popup - conversation with user

class UIState{

  // layers: Array<Layer>;

  constructor(){
    // this.layers = layersDefPreset;
    makeAutoObservable(this);
  }

  // setActiveLayer = (num: number) => {
  //   //set new active
  //   const newActive = this.layers.find(item => item.id === num);

  //   if (newActive){

  //     if (!newActive.editable){
  //       //TODO popup window 'Layer is not editable'
  //       console.log('exit');
  //       return;
  //     }

  //     //set current  active to not active
  //     const currentActive = this.layers.find(item => item.active);
  //     if (currentActive){
  //       const idx = this.layers.indexOf(currentActive);
  //       this.layers[idx].active = false;
  //     }

  //     const idx = this.layers.indexOf(newActive);
  //     this.layers[idx].active = true;
  //   }
  // };
}

const uiState = new UIState();

export { uiState };
