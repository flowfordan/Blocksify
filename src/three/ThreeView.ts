import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';
import { worldPlaneMesh, worldPlane, worldPlaneHelper } from './geometry/worldPlane';

import { getMouseLocation } from './utils';

import { autorun, reaction, toJS } from "mobx";
import { Layer, layersState, sceneState, toolsState } from '../state';

import { LabelRendererController } from './controllers/LabelRenderer.controller';
import { SceneController } from './controllers/Scene.controller';
import { RendererController } from './controllers/Renderer.controller';
import { CameraController } from './controllers/Camera.controller';
import { ToolsController } from './controllers/Tools.controller';

export class ThreeView {
  labelRendererController: LabelRendererController;
  sceneController: SceneController;
  rendererController: RendererController;
  cameraController: CameraController;
  toolsController: ToolsController;

  groundPlane: THREE.Plane;
  stats: any;

  currentLayer: Layer|null;

  constructor(canvasRef: HTMLCanvasElement) {
    this.sceneController = new SceneController();
    this.labelRendererController = new LabelRendererController();
    this.rendererController = new RendererController(canvasRef);
    this.cameraController = new CameraController(this.rendererController.activeElement);
    this.toolsController = new ToolsController(this.sceneController.scene, this.rendererController.activeElement);

    this.groundPlane = worldPlane;
    this.currentLayer = layersState.layers.find(l => l.active)!;



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

    autorun(() => {
      this.toolsController.setActiveTool(this.currentLayer, this.groundPlane, this.cameraController.camera);
    });

    reaction(
      () => layersState.layers.find(l => l.active),
      (value, previousValue, reaction) => {
        if (value?.id !== previousValue?.id){
          this.setLayer();
        }
      }
    );

    //layer visibility
    reaction(
      () => {
        const visibles: Array<boolean> = [];
        const layers = layersState.layers;
        for (const layer of layers){
          visibles.push(layer.visible);
        }
        return visibles;
      },
      (value, prevValue, reaction) => {
        for (let i=0; i<value.length; i++){
          if (value[i] !== prevValue[i]){
            const layer = layersState.layers[i];
            this.cameraController.toggleLayerVisibility(layer.id);
            break;
          }
        }
      }
    );

    //update visibility of layers
    // autorun(() => {
    //   this.cameraController.setLayersVisibility();
    // });

    autorun(() => {
      this.cameraController.setCamera(this.rendererController);
    });

    //TODO concrete conditions
    autorun(() => {
      this.toolsController.helpersManager.renderGrid();
    });
  };

  setLayer = () => {
    const current = layersState.layers.find(l => l.active);
    if (current){
      this.currentLayer = current;
      this.toolsController.setActiveTool(this.currentLayer, this.groundPlane, this.cameraController.camera);
    }
  };

  //to show coords on ground under mouse
  updGlobalCoords = () => {
    if (sceneState.isFetchingGlobalCoords){
      this.rendererController.activeElement.addEventListener( 'pointermove', this.onUpdMouseLoc );
    } else {
      this.rendererController.activeElement.removeEventListener( 'pointermove', this.onUpdMouseLoc );
    }
  };

  //get mouse coords on "ground" plane
  onUpdMouseLoc = (event: MouseEvent) => {
    const mouseLoc = getMouseLocation(
      event, this.rendererController.rect, this.rendererController.activeElement,
      this.cameraController.camera, this.groundPlane);

    //send mouseloc to State
    //TODO:not send new obj every time
    sceneState.setGlobalCoords({
      x: mouseLoc.x,
      y: mouseLoc.y,
      z: mouseLoc.z
    });
  };

  onWindowResize(vpW: number, vpH: number) {
    this.rendererController.renderer.setSize(vpW, vpH, false);
    const aspect = vpW / vpH;
    const viewSize = 200;
    //upd camera ratio depending on cam Type
    this.cameraController.updOnResize(aspect, viewSize);

    this.labelRendererController.renderer.setSize( vpW, vpH );
  }

  // ******************* RENDER LOOP ******************* //
  update() {
    this.labelRendererController.renderer.render(this.sceneController.scene, this.cameraController.camera);
    this.rendererController.renderer.render(this.sceneController.scene, this.cameraController.camera);

    requestAnimationFrame(this.update.bind(this));

    this.cameraController.controls.update();
    this.stats.update();
  }
}