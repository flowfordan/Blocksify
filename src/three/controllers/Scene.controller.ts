import { PointerCoords } from './../../shared/types/scene';
import * as THREE from 'three';
import { SceneModifier } from 'three/services/SceneModifier';
import { SceneModel } from 'three/shared';
import { getMouseLocation } from 'three/utils';
import { SceneAdapter } from 'three/adapters';

//CONTROLLER
//initScene
//upd scene env properties
export class SceneController {
  private _scene: THREE.Scene;
  modifier: SceneModifier;
  sceneModel: SceneModel;
  private adapter: SceneAdapter;
  private pointerCoords: PointerCoords;
  constructor(sceneModel: SceneModel) {
    this._scene = new THREE.Scene();
    this.sceneModel = sceneModel;
    this.modifier = new SceneModifier(this._scene);
    this.adapter = new SceneAdapter();
    this.pointerCoords = { x: 0.0, y: 0.0, z: 0.0 };

    this.modifier._initSceneTempGeometry();
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
    //adapter - set coords
    this.adapter.setPointerCoords(this.pointerCoords);
  };

  updateSceneStage(layerId: number, count: number, prevCount?: number) {
    //get layer id and quantity
    const isAsc = count > (prevCount || 0);
    this.adapter.setStage(layerId, count, isAsc);
  }
}
