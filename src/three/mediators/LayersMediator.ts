import { mediatorsModel } from 'three/model';
export class LayersMediator {
  constructor() {
    //
  }

  _setIsLayerEmpty = (layerId: number) => {
    const model = mediatorsModel.layersModel;
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
    mediatorsModel.layersModel.setLayerObjectsNumber(layerId, quant);
    this._setIsLayerEmpty(layerId);
  };
}
