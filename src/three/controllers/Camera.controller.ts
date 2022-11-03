import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { layersState, sceneState } from "../../state";
import { camera } from '../camera/camera';
import { RendererController } from "./Renderer.controller";

export class CameraController {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  controls: OrbitControls;
  constructor(activeElement: HTMLCanvasElement){
    //
    this.camera = camera();
    this.controls = new OrbitControls(this.camera, activeElement);
  }

  setCamera = (rendererController: RendererController) => {
    //0 - top camera, 1 - perspective
    const curCamId = sceneState.currentCamera;
    if (curCamId === 0){
      this.camera = camera(rendererController.renderer, curCamId);
      this.controls = new OrbitControls(this.camera, rendererController.activeElement);
      //this.controls.enableDamping = true;
      this.controls.enableRotate = false;
      //enable all existing layers
      layersState.layers.forEach(i => this.camera.layers.enable(i.id));
    } else if (curCamId === 1){
      this.camera = camera(rendererController.renderer, curCamId);
      this.controls = new OrbitControls(this.camera, rendererController.activeElement);
      //enable all existing layers
      layersState.layers.forEach(i => this.camera.layers.enable(i.id));
    }
  };

  updOnResize = (aspect: number, viewSize: number) => {
    //
    if (this.camera instanceof THREE.PerspectiveCamera){
      this.camera.aspect = aspect;
    } else {
      this.camera.left = aspect*viewSize / -2;
      this.camera.right = aspect*viewSize / 2;
      this.camera.top = viewSize / 2;
      this.camera.bottom = viewSize / -2;
    }

    this.camera.updateProjectionMatrix();
  };
}