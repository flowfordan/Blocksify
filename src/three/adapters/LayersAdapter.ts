import { adaptersModel } from 'three/model';
export class LayersAdapter {
  constructor() {
    //
  }

  toggleLayerActive = (layerId: number) => {
    adaptersModel.layersModel.toggleActiveLayer(layerId);
  };

  _setIsLayerEmpty = (layerId: number) => {
    const model = adaptersModel.layersModel;
    const currentLayer = model.layers.find((l) => l._id === layerId);
    if (!currentLayer) {
      throw new Error('Cant find Layer');
    }
    const layerObjsToRemain = currentLayer.objsQuantity;
    if (layerObjsToRemain < 1) {
      model.setIsLayerEmpty(true, layerId);
    } else {
      model.setIsLayerEmpty(false, layerId);
    }
  };

  updLayerObjsCount = (quant: number, layerId: number) => {
    adaptersModel.layersModel.setLayerObjectsNumber(layerId, quant);
    this._setIsLayerEmpty(layerId);
  };
}
