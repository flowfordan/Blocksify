import * as THREE from 'three';

import { SceneModifier } from 'three/services/SceneModifier';
import { ILayer } from 'shared/types/layers';
import type { InstrumentsHelpersModel } from 'three/shared';
import { HandlerFactory, _HandlerFX, _HandlerMain } from 'three/services';
import { SnapManager, TagsManager } from './managers';

//SUPERCLASS FOR DRAWING TOOLS
export class _DrawingInstrument {
  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  layer: ILayer | null;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  currentPlane: THREE.Plane | null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  snapManager: SnapManager;

  objCoords: Array<number>;

  handler: _HandlerMain;
  handlerFX: _HandlerFX;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, helpersModel: InstrumentsHelpersModel) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.layer = null;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.objCoords = [];

    this.tagsManager = new TagsManager(sceneModifier);
    this.snapManager = new SnapManager(sceneModifier, helpersModel);

    const handlerFactory = new HandlerFactory();
    this.handler = new (handlerFactory.createHandler('main'))(sceneModifier);
    this.handlerFX = new (handlerFactory.createHandler('fx'))(sceneModifier);
  }

  //START METHOD
  start(camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: ILayer) {
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
