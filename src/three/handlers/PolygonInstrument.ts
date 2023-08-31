import { SceneModifier } from 'three/services/SceneModifier';
import * as THREE from 'three';
import { getMouseLocation } from '../utils';
import { _DrawingInstrument } from './_DrawingInstrument';
import { Vector3 } from 'three';
import { V2ArrToNumArr } from 'three/config/objs3d';
import { InstrumentsHelpersModel } from 'three/shared';

export class PolygonInstrument extends _DrawingInstrument {
  polygonParts: number;

  constructor(canvas: HTMLCanvasElement, sceneModifier: SceneModifier, helper: InstrumentsHelpersModel) {
    super(canvas, sceneModifier, helper);
    this.polygonParts = 1;
  }

  start = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: typeof this.layer) => {
    super.start(camera, plane, layer!);
    //start snap manager
    // this.snapManager.start();
    //add EL
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onDrawClick);
    this.canvas.addEventListener('dblclick', this._onDBClick);
    window.addEventListener('keypress', this._onEnter);
  };

  _onMouseMove = (e: MouseEvent) => {
    const mouseLoc = getMouseLocation(e, this.rect, this.canvas, this.currentCamera!, this.currentPlane!);
    //upd coords
    // this.currentPointerCoord = this.snapManager.snapToCoords(mouseLoc);
    //TODO temp
    this.currentPointerCoord = mouseLoc;

    //upd guideLine
    //1, 2, currentpoint
    //show when 2 pts created
    if (this.toolState === 2) {
      const coordsCurrent: Array<number> = Object.values(this.currentPointerCoord);
      //while 1point
      if (this.objCoords.length <= 6) {
        //TRACK
        //repetition to create buffer for 3points array
        const trackObjCoords = [...this.objCoords, ...coordsCurrent, ...coordsCurrent];
        this.objManagerFX.updTrack(trackObjCoords);
        this.objManagerFX.renderTrack();
        //TAG
        this.tagsManager.renderTag([new Vector3(...this.objCoords)], this.currentPointerCoord);
      } else {
        const points = this.objManager.getObjPolygonPoints();
        const pt1 = points[0];
        const pt2 = points[points.length - 1]; //last pie point
        const pt1N = V2ArrToNumArr([pt1], this.currentPlane!.constant);
        const pt2N = V2ArrToNumArr([pt2], this.currentPlane!.constant);

        const trackObjCoords = [...pt1N, ...coordsCurrent, ...pt2N];

        //TRACK
        this.objManagerFX.updTrackPolygon(pt1, pt2, this.currentPointerCoord);
        this.objManagerFX.updTrack(trackObjCoords);
        this.objManagerFX.renderTrack(true);
        //TAG
        this.tagsManager.renderTag([new Vector3(...pt1N), new Vector3(...pt2N)], this.currentPointerCoord);
      }
    }
  };

  _onDrawClick = () => {
    if (this.toolState === 1) {
      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coords);
      //create obj
      this.objManager.createObj('polygon', this.objCoords, this.layer!, this.currentPointerCoord);
      //TRACK
      this.objManagerFX.createTrack(true);
      this.toolState = 2;
    } else if (this.toolState === 2) {
      //first upd - only polygon form
      //will fire only if 1 pt created
      this.objManager.updObj('polygon', this.objCoords, this.currentPointerCoord);

      //upd OBJ coords
      this.objCoords.length = 0;
      const currentLineCoords = V2ArrToNumArr(
        this.objManager.getObjPolygonPoints(),
        this.currentPlane!.constant //WORLD PLANE LEVEL
      );
      this.objCoords.push(...currentLineCoords);
      //CLOSE line by pushing start point
      this.objCoords.push(...this.objCoords.slice(0, 3));
      //updating
      this.objManager.updObj('polygon', this.objCoords, this.currentPointerCoord);

      this.tagsManager.stopRender();
      this.objManagerFX.removeTrack();
    }
  };

  private _onDBClick = () => {
    console.log('Double CLICK? What did you expect?');
  };

  private _onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this._resetLoop();
    }
  };

  stop() {
    super.stop();
    //delete began forms
    this.objManager.removeObj();

    this._resetLoop(true);
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onEnter);
  }

  protected _resetLoop = (isDisgraceful?: boolean) => {
    super._resetLoop(isDisgraceful);
    if (!isDisgraceful) {
      this.objManager.renderObj();
    }
    this.objManager.reset();
    this.objManagerFX.removeTrack();
    //TRACK, TAG, SNAP
    this.tagsManager.stopRender();
    // this.snapManager.resetSnap();
  };
}
