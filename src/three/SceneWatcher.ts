import { SceneGetter } from './services/SceneGetter';
import { LayersController } from './controllers/Layers.controller';
export class SceneWatcher {
  layersController: LayersController;
  sceneGetter: SceneGetter;
  constructor(layersController: LayersController) {
    this.layersController = layersController;
    this.sceneGetter = new SceneGetter();
  }
  //onObjAdded - upd layer status
  //onObjRemoved
  //onPropChanged
  onObjAdded = (obj: THREE.Object3D) => {
    if (obj.userData['type'] === 'main' && typeof obj.userData['layerId'] === 'number') {
      console.log('RENDERED:', obj.name, 'Layer ID:', obj.userData.layerId);
      //upd Layer status
      this.updLayerStatus('add', obj.userData.layerId);
    }
  };

  onObjRemoved = (obj: THREE.Object3D, scene: THREE.Scene) => {
    if (obj.userData['type'] === 'main' && typeof obj.userData['layerId'] === 'number') {
      console.log('REMOVED:', obj.name, 'Layer ID:', obj.userData.layerId);
      this.updLayerStatus('remove', obj.userData.layerId);
    }
  };

  onObjPropChanged = (obj: THREE.Object3D) => {
    console.log('PROP CHANGED:', obj);
  };

  private updLayerStatus = (operation: 'add' | 'remove', layerId: number) => {
    //upd objects count
    if (operation === 'add') {
      this.layersController.setObjectsQuantity(true, 1, layerId);
    } else {
      this.layersController.setObjectsQuantity(false, 1, layerId);
    }

    //check emptiness
    this.layersController.setIsLayerEmpty(layerId);
  };
}
