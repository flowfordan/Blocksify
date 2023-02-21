import { layersState } from 'shared/model';
import * as THREE from 'three';

export class LayersController {
  // currentLayer: Layer;

  constructor() {
    // this.currentLayer = this.findActiveLayer();
  }

  setIsLayerEmpty = (layerId: number) => {
    const currentLayer = layersState.layers.find((l) => l.id === layerId);
    if (!currentLayer) {
      throw new Error('Cant find Layer');
    }
    const layerObjsToRemain = currentLayer.objectsQuantity;
    if (layerObjsToRemain < 1) {
      layersState.setIsLayerEmpty(true, layerId);
    } else {
      layersState.setIsLayerEmpty(false, layerId);
    }
  };

  setObjectsQuantity = (quant: number, layerId: number) => {
    layersState.setLayerObjectsNumber(layerId, quant);
  };
}
