import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { camera } from 'three/presets';
import { RendererController } from './Renderer.controller';
import { autorun, reaction, toJS } from 'mobx';
import { CameraModel, LayersModel } from 'three/shared';
import { CameraViewId } from 'shared/types';

export class CameraController {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  controls: OrbitControls;
  rendererController: RendererController;
  layersModel: LayersModel;
  cameraModel: CameraModel;
  constructor(rendererController: RendererController, layersModel: LayersModel, cameraModel: CameraModel) {
    this.rendererController = rendererController;
    this.layersModel = layersModel;
    this.cameraModel = cameraModel;

    this.camera = camera();
    this.controls = new OrbitControls(this.camera, rendererController.activeElement);
    this.setCamera(cameraModel.currentCameraId);

    this._storeSubscribe();
  }

  setCamera = (cameraViewId: CameraViewId) => {
    //0 - top camera, 1 - perspective
    if (cameraViewId === CameraViewId.TOP) {
      this.camera = camera(this.rendererController.renderer, 0);
      this.controls = new OrbitControls(this.camera, this.rendererController.activeElement);
      //this.controls.enableDamping = true;
      this.controls.enableRotate = false;
      //enable all existing layers
      this.layersModel.layers.forEach((i) => this.camera.layers.enable(i._id));
    } else {
      this.camera = camera(this.rendererController.renderer, 1);
      this.controls = new OrbitControls(this.camera, this.rendererController.activeElement);
      //enable all existing layers
      this.layersModel.layers.forEach((i) => this.camera.layers.enable(i._id));
    }
  };

  cameraZoom = () => {
    this.camera.translateZ(20);
  };

  //default layers visibility for all layers
  setLayersVisibility = (): void => {
    //TODO rewrite - no need to iterate every time
    //make it specific for buttoned layer
    //ugly
    this.layersModel.layers.forEach((i) => {
      if (i.visible) {
        this.camera.layers.enable(i._id);
      } else {
        this.camera.layers.disable(i._id);
      }
    });
  };

  toggleLayerVisibility = (layerId: number) => {
    const layer = this.layersModel.layers.find((l) => l._id === layerId);
    if (!layer) {
      throw new Error(
        `Trying to find layer to set visibility. 
        There is no layer with such id`
      );
    }
    if (layer.visible) {
      this.camera.layers.enable(layer._id);
    } else {
      this.camera.layers.disable(layer._id);
    }
  };

  updOnResize = (aspect: number, viewSize: number) => {
    //
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = aspect;
    } else {
      this.camera.left = (aspect * viewSize) / -2;
      this.camera.right = (aspect * viewSize) / 2;
      this.camera.top = viewSize / 2;
      this.camera.bottom = viewSize / -2;
    }

    this.camera.updateProjectionMatrix();
  };

  private _storeSubscribe = () => {
    reaction(
      () => {
        const visibles: Array<boolean> = [];
        const layers = this.layersModel.layers;
        for (const layer of layers) {
          visibles.push(layer.visible);
        }
        return visibles;
      },
      (value, prevValue, reaction) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i] !== prevValue[i]) {
            const layer = this.layersModel.layers[i];
            this.toggleLayerVisibility(layer._id);
            break;
          }
        }
      }
    );
  };
}
