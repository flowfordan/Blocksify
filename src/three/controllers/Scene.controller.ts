import * as THREE from 'three';
import { worldPlaneHelper, worldPlaneMesh } from '../geometry/worldPlane';
import { cube, myLine } from '../geometry/geometry';
import { dirLight, dirLightHelper, hemiLight } from '../lights';

export class SceneController {
  scene: THREE.Scene;
  constructor() {
    //
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xb3deff);

    //some initial 3dobjects
    this.scene.add(cube, myLine, worldPlaneMesh, worldPlaneHelper);
    cube.material.color.setHex(0x686868);

    //lights
    this.scene.add(dirLight, dirLightHelper, hemiLight);

    //red green blue lines in 0,0
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  addObj = (object: THREE.Object3D) => {
    console.log('ADDED OBJECT');
    this.scene.add(object);
  };

  removeObj = () => {
    console.log('REMOVED OBJECT');
    //scene.remove...
  };
}
