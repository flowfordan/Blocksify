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
    //console.log('Scne Modifier: Obj Added', object);
    this.objWatcher.onObjAdded(object);
    this.scene.add(object);
    console.log(this.scene.children);
  };

  addObjs = (...objects: Array<THREE.Object3D>) => {
    this.scene.add(...objects);
  };

  //TODO join with addObj
  addUtilObjs = (objs: Array<THREE.Object3D>) => {
    this.scene.add(...objs);
  };

  removeObj = (object: THREE.Object3D) => {
    this.objWatcher.onObjRemoved(object);
    this.scene.remove(object);
  };

  removeObjs = (...objects: Array<THREE.Object3D>) => {
    // this.objWatcher.onObjRemoved(object);
    this.scene.remove(...objects);
  };

  _initSceneTempGeometry = () => {
    //some initial 3dobjects
    // this.scene.add(cube, myLine, worldPlaneMesh, worldPlaneHelper);
    this.scene.add(cube, worldPlaneMesh, worldPlaneHelper);
    cube.material.color.setHex(0x686868);
  };
}
