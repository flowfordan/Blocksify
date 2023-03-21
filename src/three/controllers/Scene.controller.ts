import { PointerCoords } from './../../shared/types/scene';
import * as THREE from 'three';
import { dirLight, dirLightHelper, hemiLight } from '../config/lights';
import { SceneModifier } from 'three/services/SceneModifier';
import { SceneModel } from 'three/shared';
import { getMouseLocation } from 'three/utils';
import { SceneMediator } from 'three/mediators';

//CONTROLLER
//initScene
//upd scene env properties
export class SceneController {
  private _scene: THREE.Scene;
  modifier: SceneModifier;
  sceneModel: SceneModel;
  private mediator: SceneMediator;
  private pointerCoords: PointerCoords;
  constructor(sceneModel: SceneModel) {
    this._scene = new THREE.Scene();
    this.sceneModel = sceneModel;
    this._scene.background = new THREE.Color(0xb3deff);

    //TODO to sceneEnv
    //lights
    this._scene.add(dirLight, dirLightHelper, hemiLight);

    //red green blue lines in 0,0
    const axesHelper = new THREE.AxesHelper(10);
    this._scene.add(axesHelper);

    this.modifier = new SceneModifier(this._scene);
    //TODO to sceneEnv Controller
    this.modifier._initSceneTempGeometry();

    this.mediator = new SceneMediator();
    this.pointerCoords = { x: 0.0, y: 0.0, z: 0.0 };
    //start EL to watch for pointercoords
    // this.updatePointerCoords();
  }

  startPointerCoordsUpd = (
    activeEl: HTMLCanvasElement,
    currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    plane: THREE.Plane
  ) => {
    // if (this.sceneModel.) {
    activeEl.addEventListener('pointermove', (e) => this.onUpdPointerCoords(e, activeEl, currentCamera, plane));
    // } else {
    //   this.rendererController.activeElement.removeEventListener('pointermove', this.onUpdMouseLoc);
    // }
  };

  onUpdPointerCoords = (
    event: MouseEvent,
    activeEl: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    plane: THREE.Plane
  ) => {
    //calc coordinates
    const mouseLoc = getMouseLocation(event, activeEl.getBoundingClientRect(), activeEl, camera, plane);
    //upd coords value
    this.pointerCoords.x = mouseLoc.x;
    this.pointerCoords.y = mouseLoc.y;
    this.pointerCoords.z = mouseLoc.z;
    //mediator - set coords
    this.mediator.setPointerCoords(this.pointerCoords);
  };
}
