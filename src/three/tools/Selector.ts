import { Line2, LineMaterial } from 'three-fatline';
import * as THREE from 'three';

import { Layer, layersState } from '../../shared/model';
import { getObjByPointer } from '../utils';
import { Object3D } from 'three';
import { Handler } from '../services/Handler';
import { SceneController } from '../controllers/Scene.controller';

export class Selector {
  rect: DOMRect;
  canvas: HTMLCanvasElement;
  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentLayer: Layer;
  selectedObj: THREE.Object3D | null;
  intersectedObj: THREE.Object3D | null;
  renderedObjs: {
    selectedObj: THREE.Object3D | null;
    selectedPoints: THREE.Points | null;
    intersectedObj: THREE.Object3D | null;
  };
  toolState: number;
  handler: Handler;
  constructor(canvas: HTMLCanvasElement, sceneController: SceneController) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.currentCamera = new THREE.PerspectiveCamera();

    this.currentLayer = layersState.currentLayer;

    this.selectedObj = null;
    this.intersectedObj = null;
    this.renderedObjs = {
      selectedObj: null,
      selectedPoints: null,
      intersectedObj: null,
    };
    this.toolState = 0;

    this.handler = new Handler(sceneController);
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
      this.handler.sceneController.scene,
      e,
      this.rect,
      this.canvas,
      this.currentCamera,
      this.currentLayer.id
    );
    this.handler.removeOverlayObj();
    this.intersectedObj = null;
    if (obj) {
      const parent = obj.parent;
      if (parent instanceof Object3D) {
        this.intersectedObj = parent;

        const lineToRender = parent.children.find((i) => i instanceof Line2);
        // this.renderedObjs.intersectedObj = lineToRender ? lineToRender.clone() : null;
        this.handler.createOverlayObj(lineToRender);
      }
    }
  };

  private _onClick = () => {
    // this.scene.remove(this.renderedObjs.selectedObj!);
    // this.scene.remove(this.renderedObjs.selectedPoints!);
    this.selectedObj = null;
    //remove selected obj
    if (this.intersectedObj && this.renderedObjs.intersectedObj) {
      //set selected obj
      this.selectedObj = this.intersectedObj;
      //line to render
      this.renderedObjs.selectedObj = this.renderedObjs.intersectedObj.clone();
      if (this.renderedObjs.selectedObj instanceof Line2) {
        this.renderedObjs.selectedObj.renderOrder = 1;
        this.renderedObjs.selectedObj.layers.set(0);
        this.renderedObjs.selectedObj.material = new LineMaterial({
          color: 0xfd5656,
          linewidth: 10,
          resolution: new THREE.Vector2(1920, 1080),
          dashed: false,
          opacity: 1,
        });
        // this.scene.add(this.renderedObjs.selectedObj);
      }
      //points to render
      const pointsToRender = this.selectedObj.children.find((i) => i instanceof THREE.Points);
      if (pointsToRender instanceof THREE.Points) {
        this.renderedObjs.selectedPoints = pointsToRender.clone();
        this.renderedObjs.selectedPoints.renderOrder = 2;
        this.renderedObjs.selectedPoints.material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 9,
          sizeAttenuation: false,
        });
        // this.scene.add(this.renderedObjs.selectedPoints);
      }
    }
  };

  private _onKey = (event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.selectedObj) {
        // this.scene.remove(this.selectedObj);
        // this.scene.remove(this.renderedObjs.selectedObj!);
        // this.scene.remove(this.renderedObjs.selectedPoints!);
        this.selectedObj = null;
      }
    }
  };

  stop = () => {
    console.log('SELECTOR END');
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
