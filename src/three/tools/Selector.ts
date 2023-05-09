import { SceneModifier } from 'three/services/SceneModifier';
import { Line2, LineMaterial } from 'three-fatline';
import * as THREE from 'three';

import { getObjByPointer } from '../utils';
import { Object3D } from 'three';
import { Layer } from '../../shared/types/layers';
import { InstrumentsMediator } from 'three/mediators/InstrumentsMediator';
import { HandlerFactory, _HandlerFX, _HandlerMain } from 'three/services';

export class Selector {
  rect: DOMRect;
  canvas: HTMLCanvasElement;
  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentLayer: Layer | null;
  _selectedObj: THREE.Object3D | null;
  _intersectedObj: THREE.Object3D | null;
  renderedObjs: {
    selectedObj: THREE.Object3D | null;
    selectedPoints: THREE.Points | null;
    intersectedObj: THREE.Object3D | null;
  };
  toolState: number;

  mediator: InstrumentsMediator;
  handler: _HandlerMain;
  handlerFX: _HandlerFX;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, mediator: InstrumentsMediator) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.currentCamera = new THREE.PerspectiveCamera();

    //TODO pass currentLayer on start
    this.currentLayer = null;

    this._selectedObj = null;
    this._intersectedObj = null;

    this.renderedObjs = {
      selectedObj: null,
      selectedPoints: null,
      intersectedObj: null,
    };
    this.toolState = 0;

    const handlerFactory = new HandlerFactory();

    this.handler = new (handlerFactory.createHandler('main'))(sceneModifier);
    this.handlerFX = new (handlerFactory.createHandler('fx'))(sceneModifier);
    this.mediator = mediator;
  }

  get selectedObj() {
    return this._selectedObj;
  }

  set selectedObj(obj: THREE.Object3D | null) {
    console.log('SETTER of SELECTOR');
    this._selectedObj = obj;
    //notify state
    this.mediator.setSelectorSelectedObjData(obj);
  }

  get intersectedObj() {
    return this._intersectedObj;
  }

  set intersectedObj(obj: THREE.Object3D | null) {
    this._intersectedObj = obj;
    //notify state
    this.mediator.setSelectorIntersectedObjData(obj);
  }

  //startTool
  start = (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, plane: THREE.Plane | null, layer: Layer) => {
    this.currentCamera = camera;
    this.currentLayer = layer;
    //get current layer data
    //add event listeners
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onClick);
    window.addEventListener('keydown', this._onKey);
    this.toolState = 1;
  };

  private _onMouseMove = (e: MouseEvent) => {
    if (!this.currentLayer) throw new Error('Layer is not specified');
    const obj = getObjByPointer(
      this.handler.sceneModifier.scene,
      e,
      this.rect,
      this.canvas,
      this.currentCamera,
      this.currentLayer.id
    );
    this.handlerFX.removeOverlayObj('temp');
    this.intersectedObj = null;
    if (obj) {
      const parent = obj.parent;
      if (parent instanceof Object3D) {
        this.intersectedObj = parent;

        const lineToRender = parent.children.find((i) => i instanceof Line2);
        // this.renderedObjs.intersectedObj = lineToRender ? lineToRender.clone() : null;
        this.handlerFX.createOverlayObj(lineToRender, 'temp');
      }
    }
  };

  private _onClick = () => {
    this.handlerFX.removeOverlayObj('perm');
    this.selectedObj = null;
    console.log('ON CLICK inters obj:', this.intersectedObj);
    if (this.intersectedObj) {
      //set selected obj
      this.selectedObj = this.intersectedObj;
      const lineToRender = this.selectedObj.children.find((i) => i instanceof Line2);
      //line to render
      this.handlerFX.createOverlayObj(lineToRender, 'perm');
    }
  };

  private _onKey = (event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.selectedObj) {
        this.handler.sceneModifier.removeObj(this.selectedObj);
        this.handlerFX.removeOverlayObj('all');
        this.selectedObj = null;
      }
    }
  };

  stop = () => {
    console.log('SELECTOR END');
    this.handlerFX.removeOverlayObj('all');
    this.selectedObj = null;
    this.intersectedObj = null;
    //null selected
    //remove event listeners
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onClick);
    window.removeEventListener('keydown', this._onKey);
  };
}
