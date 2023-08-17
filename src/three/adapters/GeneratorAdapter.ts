import { ICreationConfig, ILayerIDs } from 'shared/types';
import { adaptersModel } from 'three/model';

export class GeneratorAdapter {
  constructor() {
    //
  }

  setGenerationTask(obj: THREE.Object3D, objLayerId: ILayerIDs, eventType: 'add' | 'remove') {
    //retrieve layer with config
    console.log('mediator set task', obj, objLayerId);
    const layerData = adaptersModel.layersModel.getLayerById(objLayerId);
    if (!layerData) return;
    console.log('CONFIG', layerData);
    //CASE FOR SECONDARY PT OBJECTS
    const config = layerData._creationObjsConfig.OBJ_SECOND_PT;
    console.log('CONFIG', config);
    if (!config) return;
    adaptersModel.generatorModel.setCurrentTask(config, obj, objLayerId);
  }

  endTask() {
    adaptersModel.generatorModel.cleanTask();
  }

  //stuff
  // setGenerationTask = (config: ICreationConfig, obj: THREE.Object3D, layerId: ILayerIDs) => {
  //   mediatorsModel.generatorModel.setCurrentTask(config, obj, layerId);
  // };
}
