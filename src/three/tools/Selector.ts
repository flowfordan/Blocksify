import * as THREE from 'three';

export class Selector {
  selectedObj: THREE.Object3D | null;
  cursor: 'pointer';
  toolState: number;
  constructor(){
    //
    this.selectedObj = null;
    this.cursor = 'pointer';
    this.toolState = 0;
  }

  //startTool
  start = () => {
    //add event listeners
    // this.canvas.addEventListener('mousemove', this._onMouseMove);
    // this.canvas.addEventListener('click', this._onDrawClick);
  };

  private _onMouseMove = () => {
    //intersect with objects of selected layer
    //highlight (type 1) intersected objects
  };

  private _onClick = () => {
    //set object to current Selected object
    //highlight this object
  };

  stop = () => {
    //null selected
    //remove event listeners
  };
}