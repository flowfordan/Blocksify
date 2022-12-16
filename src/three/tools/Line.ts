import * as THREE from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import { toJS } from 'mobx';

import { getMouseLocation } from '../utils';
import { pointObj } from '../objs3d';
import { Tool } from './Tool';
import { Vector3 } from 'three';
import { Layer } from '../../state';

export class Line extends Tool {
  lineMode: number;
  lineSegments: number;

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, drawMode: number) {
    super(canvas, scene);
    this.lineMode = drawMode; //0: 2-pt line, 1: polyline
    this.lineSegments = 1;
  }

  start = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: Layer) => {
    super.start(camera, plane, layer);

    //set material from layer
    if (!this.layer.content.main) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objPts.line.mat = this.layer.content.main.mat.line;

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
      this.trackObj.updCoords(current2ptLineCoords);
      this.trackObj.add();

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
      //INIT GEOM & FORM
      this.objPts.line.geom = new LineGeometry();
      this.objPts.line.form = new Line2(this.objPts.line.geom, this.objPts.line.mat);

      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coords);

      this.objPts.points.form = pointObj(this.objCoords);

      //OBJ CREATED
      this.objCreated.add(this.objPts.points.form);
      this.objCreated.add(this.objPts.line.form);
      this.scene.add(this.objCreated);

      //TRACK
      this.trackObj.init();

      this.toolState = 2;
    }
    //ON SECOND CLICK
    else if (this.toolState === 2) {
      if (!this.objPts.line.geom || !this.objPts.line.form) {
        throw new Error('There is no Obj Form or Obj Geometry in Tool');
      }
      //LINES HANDLE
      //case of 2-points Line
      if (this.lineMode === 0 || this.lineSegments === 1) {
        this.objPts.line.geom.setPositions(this.objCoords);
      }
      //case of Polyline
      else {
        //RENDER
        this.objPts.line.form.geometry = new LineGeometry();
        this.objPts.line.form.geometry.setPositions(this.objCoords);
        this.objPts.line.form.computeLineDistances();
      }

      this.trackObj.remove();

      //OBJ CREATED
      this.objPts.line.form.layers.set(this.layer.id);
      this.objPts.line.form.computeLineDistances();
      this.objCreated.layers.set(this.layer.id);

      //POINTS HANDLE
      this.objCreated.remove(this.objPts.points.form!);
      this.objPts.points.form = pointObj(this.objCoords);
      this.objPts.points.form.layers.set(this.layer.id);
      this.objCreated.add(this.objPts.points.form);

      this.objCreated.name = this.layer.name;

      //clear and begin new item if LINE
      //begin new segment if PLINE
      if (this.lineMode === 0) {
        this._resetLoop();
      } else {
        this.toolState = 2;
        this.lineSegments++;
      }
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
    //TODO check for null obj - then delete if not null
    this.scene.remove(this.objCreated);

    this._resetLoop(true);

    //rmv EL
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onKey);
  };

  protected _resetLoop = (isDisgraceful?: boolean) => {
    super._resetLoop(isDisgraceful);
    this.trackObj.remove();
    this.tagsManager.stopRender();
    this.snapManager.resetSnap();
    this.lineSegments = 1;
  };
}
