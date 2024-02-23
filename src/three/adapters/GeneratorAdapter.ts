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

  getLayerConfigAddData(layerId: ILayerIDs) {
    const layer = adaptersModel.layersModel.getLayerById(layerId);
    if (!layer) throw new Error('Generator Adapter: No layer found');
    const propertiesToSet = layer.ptsData.add;
    return propertiesToSet;
  }

  setGenerationTask(obj: THREE.Object3D, objLayerId: ILayerIDs, eventType: 'add' | 'added' | 'remove') {
    //retrieve layer with config
    const layerData = adaptersModel.layersModel.getLayerById(objLayerId);
    if (!layerData) return;

    switch (eventType) {
      case 'add':
        //CASE FOR SECONDARY PT OBJECTS
        const config = layerData._creationObjsConfig.OBJ_SECOND_PT;
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
        adaptersModel.generatorModel.setCurrentTask(objMainCreateConfig, triggeredLayer._id);
        break;
      default:
        break;
    }
  }

  endTask() {
    adaptersModel.generatorModel.cleanTask();
  }
}
