import { SceneModifier } from 'three/services/SceneModifier';
import { Line2, LineMaterial } from 'three-fatline';
import * as THREE from 'three';

import { getObjByPointer } from '../utils';
import { Object3D } from 'three';
import { ILayer } from '../../shared/types/layers';
import { InstrumentsAdapter } from 'three/adapters/InstrumentsAdapter';
import { HandlerFactory, _HandlerFX, _HandlerMain } from 'three/services';
import {
  IsObjDataOfObjLineSegment,
  IsObjDataOfObjMain,
  IsObjDataOfObjPrimPt,
  IsObjDataOfObjSecondaryPt,
} from 'shared/types/objs';
import { getObjPrimPtLine } from 'three/shared/lib/getChildrenByCondition';

export class SelectorInstrument {
  rect: DOMRect;
  canvas: HTMLCanvasElement;
  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentLayer: ILayer | null;
  _selectedObj: THREE.Object3D | null;
  _intersectedObj: THREE.Object3D | null;
  renderedObjs: {
    selectedObj: THREE.Object3D | null;
    selectedPoints: THREE.Points | null;
    intersectedObj: THREE.Object3D | null;
  };
  toolState: number;

  adapter: InstrumentsAdapter;
  handler: _HandlerMain;
  handlerFX: _HandlerFX;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, adapter: InstrumentsAdapter) {
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
    this.adapter = adapter;
  }

  get selectedObj() {
    return this._selectedObj;
  }

  set selectedObj(obj: THREE.Object3D | null) {
    this._selectedObj = obj;
    //notify state
    this.adapter.setSelectorSelectedObjData(obj);
  }

  get intersectedObj() {
    return this._intersectedObj;
  }

  set intersectedObj(obj: THREE.Object3D | null) {
    this._intersectedObj = obj;
    //notify state
    this.adapter.setSelectorIntersectedObjData(obj);
  }

  //startTool
  start = (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, plane: THREE.Plane | null, layer: ILayer) => {
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
      this.currentLayer._id
    );
    this.handlerFX.removeOverlayObj('temp');
    this.intersectedObj = null;
    if (!obj) return;
    //case 1 - intersected main_obj
    if (IsObjDataOfObjMain(obj.userData)) {
      //
      this.intersectedObj = obj;
    } else if (IsObjDataOfObjPrimPt(obj.userData) || IsObjDataOfObjSecondaryPt(obj.userData)) {
      //case 2 - intersected its part
      //get parent
      this.intersectedObj = obj.parent;
    } else if (IsObjDataOfObjLineSegment(obj.userData)) {
      //case 3 - subchildren, subparts
      if (!obj.parent) return;
      this.intersectedObj = obj.parent.parent;
    }
    //intersected - is main obj
    //render main_obj ->- children prim_pt -> line segment
    if (!this.intersectedObj) return;
    //get line segment of prim_pt
    const lineToRender = getObjPrimPtLine(this.intersectedObj);
    //const lineToRender = this.intersectedObj.children.find((i) => i instanceof Line2);
    // this.renderedObjs.intersectedObj = lineToRender ? lineToRender.clone() : null;
    this.handlerFX.createOverlayObj(lineToRender, 'temp');
  };

  private _onClick = () => {
    this.handlerFX.removeOverlayObj('perm');
    this.selectedObj = null;
    if (this.intersectedObj) {
      //set selected obj
      this.selectedObj = this.intersectedObj;
      const lineToRender = getObjPrimPtLine(this.selectedObj);
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
