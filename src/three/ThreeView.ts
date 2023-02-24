/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { autorun, reaction, toJS } from 'mobx';

import { worldPlaneMesh, worldPlane, worldPlaneHelper } from './geometry/worldPlane';
import { getMouseLocation } from './utils';
import { layersState, sceneState } from '../shared/model';
import { LabelRendererController } from './controllers/LabelRenderer.controller';
import { SceneController } from './controllers/Scene.controller';
import { RendererController } from './controllers/Renderer.controller';
import { CameraController } from './controllers/Camera.controller';
import { InstrumentsController } from './controllers/Instruments.controller';
import { LayersController } from './controllers/Layers.controller';

export class ThreeView {
  //utility controllers
  labelRendererController: LabelRendererController;
  rendererController: RendererController;
  //scene parts controllers
  sceneController: SceneController;
  cameraController: CameraController;
  instrumentsController: InstrumentsController;
  layersController: LayersController;

  groundPlane: THREE.Plane;
  //TODO remove any
  stats: any;

  constructor(canvasRef: HTMLCanvasElement) {
    //utility
    this.rendererController = new RendererController(canvasRef);
    this.labelRendererController = new LabelRendererController();
    //scene
    this.sceneController = new SceneController();
    this.layersController = new LayersController();
    this.cameraController = new CameraController(this.rendererController.activeElement);
    this.instrumentsController = new InstrumentsController(
      this.rendererController.activeElement,
      this.sceneController.modifier
    );

    this.groundPlane = worldPlane;

    //STATS
    this.stats = Stats();
    //document.body.appendChild(this.stats.dom);
    this.stats.update();
    this.update();

    //subscription to observe App State
    this.updState();
  }

  updState = () => {
    autorun(() => {
      this.updGlobalCoords();
    });

    //observe change in isActive property status
    //fire when changed
    autorun(() => {
      this.instrumentsController.setActiveTool(
        layersState.currentLayer,
        this.groundPlane,
        this.cameraController.camera
      );
    });

    //layer swap
    reaction(
      () => layersState.layers.find((l) => l.active),
      (value, previousValue, reaction) => {
        if (value?.id !== previousValue?.id) {
          if (!value) {
            throw new Error('Layer not found');
          }
          layersState.setCurrentLayer(value);
          this.instrumentsController.setActiveTool(value, this.groundPlane, this.cameraController.camera);
        }
      }
    );

    //layer visibility
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
            this.cameraController.toggleLayerVisibility(layer.id);
            break;
          }
        }
      }
    );

    autorun(() => {
      this.cameraController.setCamera(this.rendererController);
    });

    //TODO concrete conditions
    autorun(() => {
      this.instrumentsController.helpersManager.renderGrid();
    });
  };

  //to show coords on ground under mouse
  updGlobalCoords = () => {
    if (sceneState.isFetchingGlobalCoords) {
      this.rendererController.activeElement.addEventListener('pointermove', this.onUpdMouseLoc);
    } else {
      this.rendererController.activeElement.removeEventListener('pointermove', this.onUpdMouseLoc);
    }
  };

  //get mouse coords on "ground" plane
  onUpdMouseLoc = (event: MouseEvent) => {
    const mouseLoc = getMouseLocation(
      event,
      this.rendererController.rect,
      this.rendererController.activeElement,
      this.cameraController.camera,
      this.groundPlane
    );

    //send mouseloc to State
    //TODO:not send new obj every time
    sceneState.setGlobalCoords({
      x: mouseLoc.x,
      y: mouseLoc.y,
      z: mouseLoc.z,
    });
  };

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
