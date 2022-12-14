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
        this.objPtsCoords.line.length = 3;
      } else if (this.lineMode === 1) {
        this.objPtsCoords.line.length = this.lineSegments * 3;
      }

      //SNAP
      this.currentPointerCoord = this.snapManager.snapToCoords(
        mouseLoc,
        2,
        new Vector3(...this.objPtsCoords.line.slice(this.lineSegments * 3 - 3))
      );

      //upd Line
      const coordsCurrent: Array<number> = Object.values(this.currentPointerCoord);
      this.objPtsCoords.line.push(...coordsCurrent);
      const current2ptLineCoords = this.objPtsCoords.line.slice(this.lineSegments * 3 - 3);

      //TRACK
      this.trackObj.add();
      this.trackObj.updCoords(current2ptLineCoords);

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
      //INIT GEOM and FORM
      this.objPts.line.geom = new LineGeometry();
      this.objPts.line.form = new Line2(this.objPts.line.geom, this.objPts.line.mat);

      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objPtsCoords.line.push(...coords);

      this.objPts.points.form = pointObj(this.objPtsCoords.line);
      this.scene.add(this.objPts.points.form);

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
        this.objPts.line.geom.setPositions(this.objPtsCoords.line);
      }
      //case of Polyline
      else {
        this.scene.remove(this.objPts.line.form);
        this.objPts.line.geom = new LineGeometry();
        this.objPts.line.geom.setPositions(this.objPtsCoords.line);
        this.objPts.line.form = new Line2(this.objPts.line.geom, this.objPts.line.mat);
      }

      this.trackObj.remove();

      //if this is PL mode and segment after 1
      //modify existing polyline geometry
      this.objPts.line.form.layers.set(this.layer.id);
      this.scene.add(this.objPts.line.form);
      this.objPts.line.form.computeLineDistances();

      //POINTS HANDLE
      this.scene.remove(this.objPts.points.form!);
      this.objPts.points.form = pointObj(this.objPtsCoords.line);
      this.scene.add(this.objPts.points.form);

      //clear and begin new item if LINE
      //begin new segment if PLINE
      if (this.lineMode === 0) {
        this._resetLoop();
      } else {
        this.toolState = 2;
        this.lineSegments++;
      }
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
    if (this.objPtsCoords.line.length === 3) {
      this.scene.remove(this.objPts.points.form!);
    }

    //start new line
    this._resetLoop();
  };

  stop = () => {
    super.stop();

    //delete began forms
    //TODO check for null obj - then delete if not null
    this.scene.remove(this.objPts.line.form!);
    this.scene.remove(this.objPts.points.form!);

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
