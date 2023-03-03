import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { sceneState } from '../../shared/model';
import { camera } from '../camera/camera';
import { RendererController } from './Renderer.controller';
import { autorun, reaction, toJS } from 'mobx';
import { LayersModel } from 'three/shared';

export class CameraController {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  controls: OrbitControls;
  rendererController: RendererController;
  layersModel: LayersModel;
  constructor(rendererController: RendererController, layersModel: LayersModel) {
    this.rendererController = rendererController;
    this.camera = camera();
    this.controls = new OrbitControls(this.camera, rendererController.activeElement);
    this.layersModel = layersModel;

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
      this.layersModel.layers.forEach((i) => this.camera.layers.enable(i.id));
    } else if (curCamId === 1) {
      this.camera = camera(rendererController.renderer, curCamId);
      this.controls = new OrbitControls(this.camera, rendererController.activeElement);
      //enable all existing layers
      this.layersModel.layers.forEach((i) => this.camera.layers.enable(i.id));
    }
  };

  //default layers visibility for all layers
  setLayersVisibility = (): void => {
    //TODO rewrite - no need to iterate every time
    //make it specific for buttoned layer
    //ugly
    this.layersModel.layers.forEach((i) => {
      if (i.visible) {
        this.camera.layers.enable(i.id);
      } else {
        this.camera.layers.disable(i.id);
      }
    });
  };

  toggleLayerVisibility = (layerId: number) => {
    const layer = this.layersModel.layers.find((l) => l.id === layerId);
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
            this.toggleLayerVisibility(layer.id);
            break;
          }
        }
      }
    );
  };
}
