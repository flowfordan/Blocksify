import * as THREE from 'three';
import { dirLight, dirLightHelper, hemiLight } from '../config/lights';
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

    //lights
    this._scene.add(dirLight, dirLightHelper, hemiLight);

    //red green blue lines in 0,0
    const axesHelper = new THREE.AxesHelper(10);
    this._scene.add(axesHelper);

    this.modifier = new SceneModifier(this._scene);
    this.modifier._initSceneTempGeometry();
  }

  //watch for state changes
}
