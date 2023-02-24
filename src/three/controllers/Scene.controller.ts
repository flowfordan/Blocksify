import * as THREE from 'three';
import { worldPlaneHelper, worldPlaneMesh } from '../geometry/worldPlane';
import { cube, myLine } from '../geometry/geometry';
import { dirLight, dirLightHelper, hemiLight } from '../lights';
import { SceneModifier } from 'three/services/SceneModifier';

//CONTROLLER
//initScene
//upd scene env properties
export class SceneController {
  private _scene: THREE.Scene;
  modifier: SceneModifier;
  constructor() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0xb3deff);

    //some initial 3dobjects
    this._scene.add(cube, myLine, worldPlaneMesh, worldPlaneHelper);
    cube.material.color.setHex(0x686868);

    //lights
    this._scene.add(dirLight, dirLightHelper, hemiLight);

    //red green blue lines in 0,0
    const axesHelper = new THREE.AxesHelper(10);
    this._scene.add(axesHelper);

    this.modifier = new SceneModifier(this._scene);
  }

  //watch for state changes
}
