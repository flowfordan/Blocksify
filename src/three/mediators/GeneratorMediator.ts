import { ICreationConfig, ILayerIDs } from 'shared/types';
import { mediatorsModel } from 'three/model';
export class GeneratorMediator {
  constructor() {
    //
  }

  //stuff
  setGenerationTask = (config: ICreationConfig, obj: THREE.Object3D, layerId: ILayerIDs) => {
    mediatorsModel.generatorModel.setCurrentTask(config, obj, layerId);
  };
}
