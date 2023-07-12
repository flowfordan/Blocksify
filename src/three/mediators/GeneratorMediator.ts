import { ICreationConfig, ILayerIDs } from 'shared/types';
import { mediatorsModel } from 'three/model';
export class GeneratorMediator {
  constructor() {
    //
  }

  setGenerationTask(obj: THREE.Object3D, objLayerId: ILayerIDs, eventType: 'add' | 'remove') {
    //retrieve layer with config
    const layerData = mediatorsModel.layersModel.getLayerById(objLayerId);
    if (!layerData) return;
    //CASE FOR SECONDARY PT OBJECTS
    const config = layerData._creationObjsConfig.OBJ_SECOND_PT;
    if (!config) return;
    mediatorsModel.generatorModel.setCurrentTask(config, obj, objLayerId);
  }

  endTask() {
    mediatorsModel.generatorModel.cleanTask();
  }

  //stuff
  // setGenerationTask = (config: ICreationConfig, obj: THREE.Object3D, layerId: ILayerIDs) => {
  //   mediatorsModel.generatorModel.setCurrentTask(config, obj, layerId);
  // };
}
