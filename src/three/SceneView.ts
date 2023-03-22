/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { worldPlaneMesh, worldPlane, worldPlaneHelper } from './config/geometry/worldPlane';
import {
  LabelRendererController,
  RendererController,
  SceneController,
  CameraController,
  InstrumentsController,
  LayersController,
  SceneEnvController,
} from './controllers';
import type { InstrumentsHelpersModel, InstrumentsModel, LayersModel, SceneModel, SceneEnvModel } from './shared';

export class SceneView {
  //utility controllers
  labelRendererController: LabelRendererController;
  rendererController: RendererController;
  //scene parts controllers
  sceneController: SceneController;
  sceneEnvController: SceneEnvController;
  cameraController: CameraController;
  instrumentsController: InstrumentsController;
  layersController: LayersController;

  groundPlane: THREE.Plane;
  //TODO remove any
  stats: any;

  constructor(
    canvasRef: HTMLCanvasElement,
    layersModel: LayersModel,
    instrumentsModel: InstrumentsModel,
    instrumentsHelpersModel: InstrumentsHelpersModel,
    sceneModel: SceneModel,
    sceneEnvModel: SceneEnvModel
  ) {
    this.groundPlane = worldPlane;
    //utility
    this.rendererController = new RendererController(canvasRef);
    this.labelRendererController = new LabelRendererController();
    //scene init
    this.sceneController = new SceneController(sceneModel);
    this.sceneEnvController = new SceneEnvController(this.sceneController.modifier, sceneEnvModel);
    this.layersController = new LayersController(layersModel);
    this.cameraController = new CameraController(this.rendererController, layersModel);
    this.instrumentsController = new InstrumentsController(
      this.rendererController.activeElement,
      this.sceneController.modifier,
      this.cameraController.camera,
      this.groundPlane,
      layersModel,
      instrumentsModel,
      instrumentsHelpersModel
    );

    //STATS
    this.stats = Stats();
    //document.body.appendChild(this.stats.dom);
    this.stats.update();
    this.update();

    //subscription to observe App State
    // this.updState();
    this.sceneController.startPointerCoordsUpd(
      this.rendererController.activeElement,
      this.cameraController.camera,
      this.groundPlane
    );
  }

  onWindowResize(vpW: number, vpH: number) {
    this.rendererController.renderer.setSize(vpW, vpH, false);
    const aspect = vpW / vpH;
    const viewSize = 200;
    //upd camera ratio depending on cam Type
    this.cameraController.updOnResize(aspect, viewSize);

    this.labelRendererController.renderer.setSize(vpW, vpH);
  }

  // ******************* RENDER LOOP ******************* //
  update() {
    this.labelRendererController.renderer.render(this.sceneController.modifier.scene, this.cameraController.camera);
    this.rendererController.renderer.render(this.sceneController.modifier.scene, this.cameraController.camera);

    requestAnimationFrame(this.update.bind(this));

    this.cameraController.controls.update();
    this.stats.update();
  }
}
