import { cube, worldPlaneHelper, worldPlaneMesh } from 'three/presets';
import { SceneObjsWatcher } from './SceneObjsWatcher';
import * as THREE from 'three';
import { LayerID } from 'shared/types';

export class SceneModifier {
  scene: THREE.Scene;
  objWatcher: SceneObjsWatcher;
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.objWatcher = new SceneObjsWatcher();
  }

  addObj = (object: THREE.Object3D) => {
    this.objWatcher.onObjAdd(object);
    this.scene.add(object);
    this.objWatcher.onObjAdded(object);
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

  //reading data from scene
  getSceneObjectsByLayerId = (layerId: LayerID) => {
    const objects: Array<THREE.Object3D> = [];
    this.scene.children.forEach((obj) => {
      const testLayer = new THREE.Layers();
      testLayer.set(layerId);
      if (obj.layers.test(testLayer)) {
        objects.push(obj);
      }
    });
    return objects;
  };
}
