import { IsObjDataOfObjMain } from 'shared/types/objs';
import { SceneGetter } from './SceneGetter';

export class SceneObjsWatcher {
  // layersController: LayersController;
  sceneGetter: SceneGetter;
  constructor() {
    // this.layersController = layersController;
    //layersMediator
    this.sceneGetter = new SceneGetter();
  }

  onObjAdded = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      console.log('ADDED USER OBJ');
    }
  };

  onObjRemoved = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      console.log('ADDED USER OBJ');
    }
  };

  // onObjPropChanged = (obj: THREE.Object3D) => {
  //   console.log('PROP CHANGED:', obj);
  // };

  // private updLayerStatus = (operation: 'add' | 'remove', layerId: number) => {
  //   const multiplier = operation === 'add' ? 1 : -1;
  //   this.layersController.setObjectsQuantity(multiplier, layerId);

  //   //check emptiness
  //   this.layersController.setIsLayerEmpty(layerId);
  // };
}
