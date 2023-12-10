import { ICreationConfig, ILayerIDs } from 'shared/types';
import { adaptersModel } from 'three/model';

export class GeneratorAdapter {
  constructor() {
    //
  }

  /*
    onAfterAdding
    check which layer changed
    iterate layers configs to find if layer main obj creation should be triggered
   */

  setGenerationTask(obj: THREE.Object3D, objLayerId: ILayerIDs, eventType: 'add' | 'added' | 'remove') {
    //retrieve layer with config
    console.log('mediator set task', obj, objLayerId);
    const layerData = adaptersModel.layersModel.getLayerById(objLayerId);
    if (!layerData) return;

    switch (eventType) {
      case 'add':
        console.log('CONFIG', layerData);
        //CASE FOR SECONDARY PT OBJECTS
        const config = layerData._creationObjsConfig.OBJ_SECOND_PT;
        console.log('CONFIG', config);
        if (!config) return;
        adaptersModel.generatorModel.setCurrentTask(config, objLayerId, obj);
        break;
      case 'added':
        const triggeredLayer = adaptersModel.layersModel.layers.find(
          (l) => l._creationObjsConfig.OBJ_PRIM_PT?.triggeredByLayerChange === objLayerId
        );
        if (!triggeredLayer || !triggeredLayer._creationObjsConfig.OBJ_PRIM_PT) return;
        //reacting for main part creation (for now)
        const objMainCreateConfig = triggeredLayer._creationObjsConfig.OBJ_PRIM_PT;
        break;
      default:
        break;
    }
  }

  endTask() {
    adaptersModel.generatorModel.cleanTask();
  }
}
