import * as THREE from 'three';

import { SnapManager } from '../helpers/SnapManager';
import { TagsManager } from '../helpers/TagManager';
import { Handler } from '../services/Handler';
import { SceneModifier } from 'three/services/SceneModifier';
import { Layer } from 'shared/types/layers';
import type { InstrumentsHelpersModel } from 'three/shared';

//SUPERCLASS FOR DRAWING TOOLS
export class DrawingTool {
  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  layer: Layer | null;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  currentPlane: THREE.Plane | null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  snapManager: SnapManager;

  objCoords: Array<number>;

  handler: Handler;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, helpersModel: InstrumentsHelpersModel) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.layer = null;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.objCoords = [];

    this.tagsManager = new TagsManager(sceneModifier.scene);
    this.snapManager = new SnapManager(sceneModifier, helpersModel);
    this.handler = new Handler(sceneModifier);
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
  }

  //STOP METHOD
  stop() {
    this.toolState = 0;
  }
}
