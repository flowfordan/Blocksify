import { SceneModifier } from 'three/services/SceneModifier';
import { InstrumentsAcceptor } from './../acceptors/InstrumentsAcceptor';
import { Line2, LineMaterial } from 'three-fatline';
import * as THREE from 'three';

import { layersState } from '../../shared/model';
import { getObjByPointer } from '../utils';
import { Object3D } from 'three';
import { Handler } from '../services/Handler';
import { Layer } from '../../shared/types/layers';

export class Selector {
  rect: DOMRect;
  canvas: HTMLCanvasElement;
  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentLayer: Layer;
  _selectedObj: THREE.Object3D | null;
  _intersectedObj: THREE.Object3D | null;
  renderedObjs: {
    selectedObj: THREE.Object3D | null;
    selectedPoints: THREE.Points | null;
    intersectedObj: THREE.Object3D | null;
  };
  toolState: number;
  handler: Handler;
  acceptor: InstrumentsAcceptor;
  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, acceptor: InstrumentsAcceptor) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.currentCamera = new THREE.PerspectiveCamera();

    this.currentLayer = layersState.currentLayer;

    this._selectedObj = null;
    this._intersectedObj = null;

    this.renderedObjs = {
      selectedObj: null,
      selectedPoints: null,
      intersectedObj: null,
    };
    this.toolState = 0;

    this.handler = new Handler(sceneModifier);
    this.acceptor = acceptor;
  }

  get selectedObj() {
    return this._selectedObj;
  }

  set selectedObj(obj: THREE.Object3D | null) {
    console.log('SETTER of SELECTOR');
    this._selectedObj = obj;
    //notify state
    this.acceptor.setSelectorSelectedObjData(obj);
  }

  get intersectedObj() {
    return this._intersectedObj;
  }

  set intersectedObj(obj: THREE.Object3D | null) {
    this._intersectedObj = obj;
    //notify state
    this.acceptor.setSelectorIntersectedObjData(obj);
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
    const obj = getObjByPointer(
      this.handler.sceneModifier.scene,
      e,
      this.rect,
      this.canvas,
      this.currentCamera,
      this.currentLayer.id
    );
    this.handler.removeOverlayObj('temp');
    this.intersectedObj = null;
    if (obj) {
      const parent = obj.parent;
      if (parent instanceof Object3D) {
        this.intersectedObj = parent;

        const lineToRender = parent.children.find((i) => i instanceof Line2);
        // this.renderedObjs.intersectedObj = lineToRender ? lineToRender.clone() : null;
        this.handler.createOverlayObj(lineToRender, 'temp');
      }
    }
  };

  private _onClick = () => {
    this.handler.removeOverlayObj('perm');
    this.selectedObj = null;
    console.log('ON CLICK inters obj:', this.intersectedObj);
    if (this.intersectedObj) {
      //set selected obj
      this.selectedObj = this.intersectedObj;
      const lineToRender = this.selectedObj.children.find((i) => i instanceof Line2);
      //line to render
      this.handler.createOverlayObj(lineToRender, 'perm');
    }
  };

  private _onKey = (event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.selectedObj) {
        this.handler.sceneModifier.removeObj(this.selectedObj);
        this.handler.removeOverlayObj('all');
        // this.scene.remove(this.selectedObj);
        // this.scene.remove(this.renderedObjs.selectedObj!);
        // this.scene.remove(this.renderedObjs.selectedPoints!);
        this.selectedObj = null;
      }
    }
  };

  stop = () => {
    console.log('SELECTOR END');
    this.handler.removeOverlayObj('all');
    // this.scene.remove(this.renderedObjs.selectedObj!);
    // this.scene.remove(this.renderedObjs.selectedPoints!);
    // this.scene.remove(this.renderedObjs.intersectedObj!);
    this.selectedObj = null;
    this.intersectedObj = null;
    //null selected
    //remove event listeners
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onClick);
    window.removeEventListener('keydown', this._onKey);
  };
}
