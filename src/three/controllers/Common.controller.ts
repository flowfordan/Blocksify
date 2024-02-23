import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { camera } from '../camera/camera';
import { RendererController } from './Renderer.controller';
import { autorun, reaction, toJS } from 'mobx';
import { CameraModel, InstrumentsModel, LayersModel } from 'three/shared';
import { CameraViewId } from 'shared/types';
import { CameraController } from './Camera.controller';
import { InstrumentsController } from './Instruments.controller';
import { LayersController } from './Layers.controller';
import { SceneController } from './Scene.controller';

/* Controller that is responsible for common actions like camera change, layers visibility, etc. */

export class CommonController {
  cameraController: CameraController;
  instrumentsController: InstrumentsController;
  layersController: LayersController;
  sceneController: SceneController;
  layersModel: LayersModel;
  cameraModel: CameraModel;
  instrumentsModel: InstrumentsModel;
  constructor(
    camController: CameraController,
    instrumentsController: InstrumentsController,
    layersController: LayersController,
    sceneController: SceneController,
    layersModel: LayersModel,
    cameraModel: CameraModel,
    instrumentsModel: InstrumentsModel
  ) {
    this.cameraController = camController;
    this.instrumentsController = instrumentsController;
    this.layersController = layersController;
    this.sceneController = sceneController;
    this.layersModel = layersModel;
    this.cameraModel = cameraModel;
    this.instrumentsModel = instrumentsModel;

    this._storeSubscribe();
  }

  updateCamera = (cameraViewId: CameraViewId) => {
    //update camera controller
    this.cameraController.setCamera(cameraViewId);

    //update camera data for instrumentsController
    this.instrumentsController.updateCurrentCamera(this.cameraController.camera);
  };

  private _storeSubscribe = () => {
    //camera change
    reaction(
      () => {
        return this.cameraModel.currentCameraId;
      },
      (value, prevValue, reaction) => {
        this.updateCamera(value);
      }
    );

    //CHANGE SCNENE STAGE IF OBJS ADDED - BORDER
    reaction(
      () => {
        return this.layersModel.getLayerById(2)?.objsQuantity;
      },
      (cur, prev, reaction) => {
        if (typeof cur === 'undefined') return;
        if (cur === 1) {
          this.sceneController.updateSceneStage(this.layersModel.currentLayer._id, cur, prev);
        } else if (cur === 0) {
          this.sceneController.updateSceneStage(this.layersModel.currentLayer._id, cur, prev);
        }
      }
    );
    //STREETS
    reaction(
      () => {
        return this.layersModel.getLayerById(3)?.objsQuantity;
      },
      (cur, prev, reaction) => {
        if (typeof cur === 'undefined') return;
        if (cur === 2 || cur === 1) {
          this.sceneController.updateSceneStage(this.layersModel.currentLayer._id, cur, prev);
        }
      }
    );
  };
}
