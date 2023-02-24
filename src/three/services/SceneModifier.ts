import { SceneObjsWatcher } from './SceneObjsWatcher';
import * as THREE from 'three';
import { cube, myLine } from 'three/config/geometry/geometry';
import { worldPlaneHelper, worldPlaneMesh } from 'three/config/geometry/worldPlane';

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

  _initSceneTempGeometry = () => {
    //some initial 3dobjects
    this.scene.add(cube, myLine, worldPlaneMesh, worldPlaneHelper);
    cube.material.color.setHex(0x686868);
  };
}
