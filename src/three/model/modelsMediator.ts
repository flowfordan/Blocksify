import { InstrumentsModel, LayersModel } from 'three/shared';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';

export class ModelsMediator {
  layersModel: LayersModel;
  instrumentsModel: InstrumentsModel;
  constructor(layers: LayersModel, instruments: InstrumentsModel) {
    this.layersModel = layers;
    this.instrumentsModel = instruments;
  }
}

export const modelsMediator = new ModelsMediator(layersModel, instrumentsModel);
