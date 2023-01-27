import { SceneController } from './../controllers/Scene.controller';
import * as THREE from 'three';
import { toJS } from 'mobx';

import { getMouseLocation } from '../utils';
import { DrawingTool } from './DrawingTool';
import { Vector3 } from 'three';
import { Layer } from '../../state';

export class Line extends DrawingTool {
  lineMode: number;
  lineSegments: number;

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, drawMode: number, sceneController: SceneController) {
    super(canvas, scene, sceneController);
    this.lineMode = drawMode; //0: 2-pt line, 1: polyline
    this.lineSegments = 1;
  }

  start = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: Layer) => {
    super.start(camera, plane, layer);

    //start snap manager
    this.snapManager.start();
    //El set
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onDrawClick);
    this.canvas.addEventListener('dblclick', this._onDBClick);
    window.addEventListener('keypress', this._onKey);
  };

  private _onMouseMove = (e: MouseEvent) => {
    const mouseLoc = getMouseLocation(e, this.rect, this.canvas, this.currentCamera!, this.currentPlane!);
    //upd coords
    if (this.toolState === 1) {
      this.currentPointerCoord = this.snapManager.snapToCoords(mouseLoc);
    }

    if (this.toolState === 2) {
      //UPDATING LINE COORDS
      //cut pushed to right amount - 1 chunk before new push
      if (this.lineMode === 0) {
        this.objCoords.length = 3;
      } else if (this.lineMode === 1) {
        this.objCoords.length = this.lineSegments * 3;
      }

      //SNAP
      this.currentPointerCoord = this.snapManager.snapToCoords(
        mouseLoc,
        2,
        new Vector3(...this.objCoords.slice(this.lineSegments * 3 - 3))
      );

      //upd Line
      const coordsCurrent: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coordsCurrent);
      const current2ptLineCoords = this.objCoords.slice(this.lineSegments * 3 - 3);
      //TRACK
      this.builder.updTrack(current2ptLineCoords);
      this.builder.renderTrack();
      //TAG
      this.tagsManager.renderTag(
        [new Vector3(...current2ptLineCoords.slice(0, 3))],
        this.currentPointerCoord,
        this.snapManager.snapOptions
      );
    }
  };

  private _onDrawClick = () => {
    //ON FIRST CLICK
    if (this.toolState === 1) {
      //create obj
      this.builder.createObj('line', this.objCoords, this.layer);

      //update coordinates
      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coords);

      //render
      this.builder.renderObj();
      //TRACK
      this.builder.createTrack();

      this.toolState = 2;
    }
    //ON SECOND CLICK
    else if (this.toolState === 2) {
      //update line or polyline
      if (this.lineMode === 0) {
        this.builder.updObj('line', this.objCoords);
      } else {
        this.builder.updObj('pline', this.objCoords);
      }

      //clear and begin new item if LINE
      //begin new segment if PLINE
      if (this.lineMode === 0) {
        this._resetLoop();
      } else {
        this.toolState = 2;
        this.lineSegments++;
      }
      this.builder.removeTrack();
      console.log(this.scene.children);
    }
  };

  private _onKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this._resetLoop();
    }
  };

  //private _onPLDone
  private _onDBClick = (e: MouseEvent) => {
    e.preventDefault();
    //HANDLE SAME SPOT DBCLICK
    if (this.objCoords.length === 3) {
      this.scene.remove(this.objPts.points.form!);
    }

    //start new line
    this._resetLoop();
  };

  stop = () => {
    super.stop();
    //delete began forms
    this.builder.removeObj();

    this._resetLoop(true);
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onKey);

    console.log(this.scene.children);
    console.log(this.currentCamera);
  };

  protected _resetLoop = (isDisgraceful?: boolean) => {
    super._resetLoop(isDisgraceful);
    this.builder.reset();
    this.builder.removeTrack();
    //
    this.tagsManager.stopRender();
    this.snapManager.resetSnap();

    this.lineSegments = 1;
  };
}
