//Abstract class for DrawingInstruments: lines, plines, polygons

import { Layer } from 'shared/types';

export abstract class DrawingInstrument {
  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  layer: Layer | null;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  currentPlane: THREE.Plane | null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  // snapManager: SnapManager;

  objCoords: Array<number>;

  handler: Handler;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.layer = null;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.objCoords = [];

    this.tagsManager = new TagsManager(sceneModifier.scene);
    // this.snapManager = new SnapManager(sceneModifier.scene);
    this.handler = new Handler(sceneModifier);
  }
}
