import { SceneController } from './../controllers/Scene.controller';
import * as THREE from 'three';

import { Layer, layersState } from '../../shared/model';
import { SnapManager } from '../helpers/SnapManager';
import { TagsManager } from '../helpers/TagManager';
import { TrackObjManager } from '../helpers/TrackObjManager';
import { Handler } from '../services/Handler';

//SUPERCLASS FOR DRAWING TOOLS
export class DrawingTool {
  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  scene: THREE.Scene;
  layer: Layer;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  currentPlane: THREE.Plane | null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  snapManager: SnapManager;
  trackObj: TrackObjManager;

  objCoords: Array<number>;

  handler: Handler;

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, sceneController: SceneController) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.scene = scene;
    this.layer = layersState.currentLayer;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.objCoords = [];

    this.trackObj = new TrackObjManager(scene);
    this.tagsManager = new TagsManager(scene);
    this.snapManager = new SnapManager(scene);
    this.handler = new Handler(sceneController);
  }

  //START METHOD
  start(camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: Layer) {
    //set tool state
    //assign layer, camera and plane
    this.toolState = 1;
    this.layer = layer;
    this.currentCamera = camera;
    this.currentPlane = plane;
  }

  //REFRESH LOOP
  //if came from STOp - disgraceful
  protected _resetLoop(isDisgraceful?: boolean) {
    this.toolState = 1;
    this.objCoords = [];

    //layerState
    if (!isDisgraceful) {
      layersState.setIsLayerEmpty(true);
    }
  }

  //STOP METHOD
  stop() {
    this.toolState = 0;
  }
}
