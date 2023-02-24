import { layersState } from 'shared/model';

export class LayersMediator {
  constructor() {
    //
  }

  _setIsLayerEmpty = (layerId: number) => {
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

  updLayerObjsCount = (quant: number, layerId: number) => {
    layersState.setLayerObjectsNumber(layerId, quant);
    this._setIsLayerEmpty(layerId);
  };
}
