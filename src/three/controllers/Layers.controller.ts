import * as THREE from "three";
import { Layer, layersState } from "../../state";

export class LayersController {
  currentLayer: Layer | null;

  constructor(){
    this.currentLayer = layersState.layers.find(l => l.active)!;
  }

  setActiveLayer = (layer: Layer) => {
    if (layer){
      this.currentLayer = layer;
    }
  };
}