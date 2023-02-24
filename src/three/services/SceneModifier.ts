import { SceneObjsWatcher } from './SceneObjsWatcher';
import * as THREE from 'three';

export class SceneModifier {
  scene: THREE.Scene;
  objWatcher: SceneObjsWatcher;
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.objWatcher = new SceneObjsWatcher();
  }

  addObj = (object: THREE.Object3D) => {
    this.objWatcher.onObjAdded(object);
    this.scene.add(object);
  };

  removeObj = (object: THREE.Object3D) => {
    this.objWatcher.onObjRemoved(object);
    this.scene.remove(object);
  };
}
