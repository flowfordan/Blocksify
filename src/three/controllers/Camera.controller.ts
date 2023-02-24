import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { layersState, sceneState } from '../../shared/model';
import { camera } from '../camera/camera';
import { RendererController } from './Renderer.controller';
import { autorun, reaction, toJS } from 'mobx';

export class CameraController {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  controls: OrbitControls;
  rendererController: RendererController;
  constructor(rendererController: RendererController) {
    this.rendererController = rendererController;
    this.camera = camera();
    this.controls = new OrbitControls(this.camera, rendererController.activeElement);

    this._storeSubscribe();
  }

  setCamera = (rendererController: RendererController) => {
    //0 - top camera, 1 - perspective
    const curCamId = sceneState.currentCamera;
    if (curCamId === 0) {
      this.camera = camera(rendererController.renderer, curCamId);
      this.controls = new OrbitControls(this.camera, rendererController.activeElement);
      //this.controls.enableDamping = true;
      this.controls.enableRotate = false;
      //enable all existing layers
      layersState.layers.forEach((i) => this.camera.layers.enable(i.id));
    } else if (curCamId === 1) {
      this.camera = camera(rendererController.renderer, curCamId);
      this.controls = new OrbitControls(this.camera, rendererController.activeElement);
      //enable all existing layers
      layersState.layers.forEach((i) => this.camera.layers.enable(i.id));
    }
  };

  //default layers visibility for all layers
  setLayersVisibility = (): void => {
    //TODO rewrite - no need to iterate every time
    //make it specific for buttoned layer
    //ugly
    layersState.layers.forEach((i) => {
      if (i.visible) {
        this.camera.layers.enable(i.id);
      } else {
        this.camera.layers.disable(i.id);
      }
    });
  };

  toggleLayerVisibility = (layerId: number) => {
    const layer = layersState.layers.find((l) => l.id === layerId);
    if (!layer) {
      throw new Error(
        `Trying to find layer to set visibility. 
        There is no layer with such id`
      );
    }
    if (layer.visible) {
      this.camera.layers.enable(layer.id);
    } else {
      this.camera.layers.disable(layer.id);
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
    //camera change
    autorun(() => {
      this.setCamera(this.rendererController);
    });
    //layer visibility change
    reaction(
      () => {
        const visibles: Array<boolean> = [];
        const layers = layersState.layers;
        for (const layer of layers) {
          visibles.push(layer.visible);
        }
        return visibles;
      },
      (value, prevValue, reaction) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i] !== prevValue[i]) {
            const layer = layersState.layers[i];
            this.toggleLayerVisibility(layer.id);
            break;
          }
        }
      }
    );
  };
}
