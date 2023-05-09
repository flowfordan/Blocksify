import { LayersMediator } from './../mediators/LayersMediator';
import { IsObjDataOfObjMain } from 'shared/types/objs';
import { SceneGetter } from './SceneGetter';

export class SceneObjsWatcher {
  layersMediator: LayersMediator;
  sceneGetter: SceneGetter;
  constructor() {
    this.layersMediator = new LayersMediator();
    //layersMediator
    this.sceneGetter = new SceneGetter();
  }

  onObjAdded = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      console.log('ADDED USER OBJ');
      this._registerLayerObjsChange('add', obj.userData.layerId.value);
    }
  };

  onObjRemoved = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      console.log('ADDED USER OBJ');
      this._registerLayerObjsChange('remove', obj.userData.layerId.value);
    }
  };

  onObjPropChanged = (obj: THREE.Object3D) => {
    console.log('PROP CHANGED:', obj);
  };

  private _registerLayerObjsChange = (operation: 'add' | 'remove', layerId: number) => {
    const multiplier = operation === 'add' ? 1 : -1;
    this.layersMediator.updLayerObjsCount(multiplier, layerId);
  };
}
