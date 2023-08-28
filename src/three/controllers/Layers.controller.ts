import * as THREE from 'three';
import { LayersAdapter } from 'three/adapters';
import { LayersModel } from 'three/shared';

export class LayersController {
  // currentLayer: Layer;
  layersAdapter: LayersAdapter;

  constructor(layersModel: LayersModel) {
    // this.currentLayer = this.findActiveLayer();
    this.layersAdapter = new LayersAdapter();
    // this.init();
  }

  //stuff
  //init layers
  init() {
    this.layersAdapter.toggleLayerActive(2);
  }
}
