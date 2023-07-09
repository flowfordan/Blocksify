import type { InstrumentsModel, LayersModel, SceneModel } from 'three/shared';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { sceneModel } from 'entities/scene';

export class MediatorsModel {
  layersModel: LayersModel;
  instrumentsModel: InstrumentsModel;
  sceneModel: SceneModel;
  constructor(layers: LayersModel, instruments: InstrumentsModel, scene: SceneModel) {
    this.layersModel = layers;
    this.instrumentsModel = instruments;
    this.sceneModel = scene;
    //generatorModel = new GeneratorModel(layersModel, instrumentsModel, sceneModel);
  }
}

export const mediatorsModel = new MediatorsModel(layersModel, instrumentsModel, sceneModel);
