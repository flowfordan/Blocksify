import { Line2, LineMaterial } from 'three-fatline';
import * as THREE from 'three';

import { Layer, layersState } from '../../state';
import { getObjByPointer } from '../utils';

export class Selector {
  rect: DOMRect;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentLayer: Layer;
  selectedObj: THREE.Object3D | null;
  intersectedObj: THREE.Object3D | null;
  cursor: 'pointer';
  toolState: number;
  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene) {
    this.scene = scene;
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.currentCamera = new THREE.PerspectiveCamera();

    this.currentLayer = layersState.currentLayer;

    this.selectedObj = null;
    this.intersectedObj = null;
    this.cursor = 'pointer';
    this.toolState = 0;
  }

  //startTool
  start = (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, plane: THREE.Plane | null, layer: Layer) => {
    console.log('SELECTOR START');
    this.currentCamera = camera;
    this.currentLayer = layer;
    //get current layer data
    //add event listeners
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onClick);
    //'del' window
    this.toolState = 1;
  };

  private _onMouseMove = (e: MouseEvent) => {
    const obj = getObjByPointer(this.scene, e, this.rect, this.canvas, this.currentCamera, this.currentLayer.id);
    this.scene.remove(this.intersectedObj!);
    this.intersectedObj = null;
    if (obj) {
      // console.log(obj);
      this.intersectedObj = obj.clone();
      console.log('dsdsd', this.intersectedObj);
      if (this.intersectedObj instanceof Line2) {
        this.intersectedObj.renderOrder = -1;
        this.intersectedObj.layers.set(0);
        this.intersectedObj.material = new LineMaterial({
          color: 0x81c9fc,
          linewidth: 10,
          resolution: new THREE.Vector2(1920, 1080),
          dashed: false,
          opacity: 1,
        });
        this.scene.add(this.intersectedObj);
      }
    } else {
      this.scene.remove(this.intersectedObj!);
      this.intersectedObj = null;
    }
    //intersect with objects of selected layer
    //highlight (type 1) intersected objects
  };

  private _onClick = () => {
    this.scene.remove(this.selectedObj!);
    //remove selected obj
    if (this.intersectedObj) {
      //set selected obj
      //TODO add visual points of selected obj
      console.log('Intersected:', this.intersectedObj);
      this.selectedObj = this.intersectedObj.clone();
      if (this.selectedObj instanceof Line2) {
        this.selectedObj.renderOrder = -1;
        this.selectedObj.layers.set(0);
        this.selectedObj.material = new LineMaterial({
          color: 0xfd5656,
          linewidth: 10,
          resolution: new THREE.Vector2(1920, 1080),
          dashed: false,
          opacity: 1,
        });
        this.scene.add(this.selectedObj);
      }
    }
  };

  private _highlightIntersected = () => {};

  private _highlightSelected = () => {};

  //handle delete button
  //if selected
  //remove from scene
  //dispose?
  //layer state check is layer empty

  stop = () => {
    console.log('SELECTOR END');
    this.scene.remove(this.intersectedObj!);
    this.scene.remove(this.selectedObj!);
    //null selected
    //remove event listeners
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onClick);
    // window.removeEventListener('keypress', this._onKey);
  };
}
