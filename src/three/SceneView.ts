/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import {
  LabelRendererController,
  RendererController,
  SceneController,
  CameraController,
  InstrumentsController,
  LayersController,
  SceneEnvController,
  CommonController,
  GeneratorController,
} from './controllers';
import type {
  InstrumentsHelpersModel,
  InstrumentsModel,
  LayersModel,
  SceneModel,
  SceneEnvModel,
  CameraModel,
  GeneratorModel,
} from './shared';
import { worldPlane } from './presets';
// import { sceneModel } from 'entities/scene';
// import { cameraModel } from 'entities/camera';
// import { layersModel } from 'entities/layer';
// import { sceneEnvModel } from 'entities/sceneEnv';
// import { instrumentsModel, instrumentsHelpersModel } from 'entities/sceneInstrument';
// import { generatorModel } from 'features/generator';

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
  commonController: CommonController;
  generatorController: GeneratorController;

  groundPlane: THREE.Plane;
  //TODO remove any
  stats: any;

  constructor(
    canvasRef: HTMLCanvasElement,
    layersModel: LayersModel,
    instrumentsModel: InstrumentsModel,
    instrumentsHelpersModel: InstrumentsHelpersModel,
    sceneModel: SceneModel,
    sceneEnvModel: SceneEnvModel,
    cameraModel: CameraModel,
    generatorModel: GeneratorModel
  ) {
    this.groundPlane = worldPlane;
    //utility
    this.rendererController = new RendererController(canvasRef);
    this.labelRendererController = new LabelRendererController();
    //scene init
    this.sceneController = new SceneController(sceneModel);
    //
    this.sceneEnvController = new SceneEnvController(this.sceneController.modifier, sceneEnvModel);
    this.layersController = new LayersController(layersModel);
    this.cameraController = new CameraController(this.rendererController, layersModel, cameraModel);
    this.instrumentsController = new InstrumentsController(
      this.rendererController.activeElement,
      this.sceneController.modifier,
      this.cameraController.camera,
      this.groundPlane,
      layersModel,
      instrumentsModel,
      instrumentsHelpersModel
    );
    this.commonController = new CommonController(
      this.cameraController,
      this.instrumentsController,
      this.layersController,
      this.sceneController,
      layersModel,
      cameraModel,
      instrumentsModel
    );
    this.generatorController = new GeneratorController(generatorModel, this.sceneController.modifier);

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
    this.initLayers();
  }

  initLayers() {
    this.layersController.init();
  }

  onWindowResize(vpW: number, vpH: number) {
    this.rendererController.renderer.setSize(vpW, vpH, false);
    const aspect = vpW / vpH;
    const viewSize = 200;
    // //upd camera ratio depending on cam Type
    this.cameraController.updOnResize(aspect, viewSize);

    this.labelRendererController.renderer.setSize(vpW, vpH);
  }

  private _storeSubscribe() {
    //if camera changed - pass new camera to instruments controller
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
