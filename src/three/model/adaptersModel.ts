import type { InstrumentsModel, LayersModel, SceneModel, GeneratorModel } from 'three/shared';
import { layersModel } from 'entities/layer';
import { instrumentsModel } from 'entities/sceneInstrument';
import { sceneModel } from 'entities/scene';
import { generatorModel } from 'features/generator';

export class AdaptersModel {
  layersModel: LayersModel;
  instrumentsModel: InstrumentsModel;
  sceneModel: SceneModel;
  generatorModel: GeneratorModel;
  constructor(layers: LayersModel, instruments: InstrumentsModel, scene: SceneModel, generator: GeneratorModel) {
    this.layersModel = layers;
    this.instrumentsModel = instruments;
    this.sceneModel = scene;
    this.generatorModel = generator;
  }
}

export const adaptersModel = new AdaptersModel(layersModel, instrumentsModel, sceneModel, generatorModel);
