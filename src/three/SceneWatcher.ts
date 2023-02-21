import { SceneGetter } from './services/SceneGetter';
import { LayersController } from './controllers/Layers.controller';
import { IsObjDataOfObjMain } from 'shared/types/objs';
export class SceneWatcher {
  layersController: LayersController;
  sceneGetter: SceneGetter;
  constructor(layersController: LayersController) {
    this.layersController = layersController;
    this.sceneGetter = new SceneGetter();
  }

  onObjAdded = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      this.updLayerStatus('add', obj.userData.layerId.value);
    }
  };

  onObjRemoved = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      this.updLayerStatus('remove', obj.userData.layerId.value);
    }
  };

  onObjPropChanged = (obj: THREE.Object3D) => {
    console.log('PROP CHANGED:', obj);
  };

  private updLayerStatus = (operation: 'add' | 'remove', layerId: number) => {
    const multiplier = operation === 'add' ? 1 : -1;
    this.layersController.setObjectsQuantity(multiplier, layerId);

    //check emptiness
    this.layersController.setIsLayerEmpty(layerId);
  };
}
