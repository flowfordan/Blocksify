import * as THREE from 'three';
import { LayersMediator } from 'three/mediators';
import { LayersModel } from 'three/shared';

export class LayersController {
  // currentLayer: Layer;
  layersMediator: LayersMediator;

  constructor(layersModel: LayersModel) {
    // this.currentLayer = this.findActiveLayer();
    this.layersMediator = new LayersMediator();
    // this.init();
  }

  //stuff
  //init layers
  init() {
    this.layersMediator.toggleLayerActive(2);
  }
}
