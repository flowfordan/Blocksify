import * as THREE from 'three';
import { pointObj, V2ArrToNumArr } from '../objs3d';
import { getMouseLocation } from '../utils';
import { DrawingTool } from './DrawingTool';
import { Line2, LineGeometry } from 'three-fatline';
import { Vector3 } from 'three';
import { SceneController } from '../controllers/Scene.controller';

export class Polygon extends DrawingTool {
  polygonParts: number;

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, sceneController: SceneController) {
    super(canvas, scene, sceneController);
    this.polygonParts = 1;
  }

  start = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: typeof this.layer) => {
    super.start(camera, plane, layer);
    //start snap manager
    this.snapManager.start();
    //add EL
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onDrawClick);
    this.canvas.addEventListener('dblclick', this._onDBClick);
    window.addEventListener('keypress', this._onEnter);
  };

  _onMouseMove = (e: MouseEvent) => {
    const mouseLoc = getMouseLocation(e, this.rect, this.canvas, this.currentCamera!, this.currentPlane!);
    //upd coords
    this.currentPointerCoord = this.snapManager.snapToCoords(mouseLoc);

    //upd guideLine
    //1, 2, currentpoint
    //show when 2 pts created
    if (this.toolState === 2) {
      const coordsCurrent: Array<number> = Object.values(this.currentPointerCoord);
      //while 1point
      if (this.objCoords.length <= 6) {
        //TRACK
        const trackObjCoords = [...this.objCoords, ...coordsCurrent];
        this.trackObj.updCoords(trackObjCoords);
        this.trackObj.add();
        //TAG
        this.tagsManager.renderTag([new Vector3(...this.objCoords)], this.currentPointerCoord);
      } else {
        const points = this.handler.getObjPolygonPoints();
        const pt1 = points[0];
        const pt2 = points[points.length - 1]; //last pie point
        const pt1N = V2ArrToNumArr([pt1], this.currentPlane!.constant);
        const pt2N = V2ArrToNumArr([pt2], this.currentPlane!.constant);

        const trackObjCoords = [...pt1N, ...coordsCurrent, ...pt2N];

        //TRACK
        this.trackObj.updPolygon(pt1, pt2, this.currentPointerCoord);
        this.trackObj.updCoords(trackObjCoords);
        this.trackObj.add(true);
        //TAG
        const current2pt = this.objCoords.slice(-6);
        const p1 = current2pt.slice(0, 3);
        const p2 = current2pt.slice(3);
        this.tagsManager.renderTag([new Vector3(...p1), new Vector3(...p2)], this.currentPointerCoord);
      }
    }
  };

  _onDrawClick = () => {
    if (this.toolState === 1) {
      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coords);

      //create and render
      this.handler.createObj('polygon', this.objCoords, this.layer, this.currentPointerCoord);
      // this.handler.renderObj();

      //TRACK
      this.trackObj.init(true);

      this.toolState = 2;
    } else if (this.toolState === 2) {
      //first upd - only polygon form
      this.handler.updObj('polygon', this.objCoords, this.currentPointerCoord);

      //upd OBJ coords
      this.objCoords.length = 0;
      const currentLineCoords = V2ArrToNumArr(
        this.handler.getObjPolygonPoints(),
        this.currentPlane!.constant //WORLD PLANE LEVEL
      );
      console.log('POINTS FROM POLYGON', this.handler.getObjPolygonPoints());
      this.objCoords.push(...currentLineCoords);
      //CLOSE line by pushing start point
      this.objCoords.push(...this.objCoords.slice(0, 3));
      //updating
      this.handler.updObj('polygon', this.objCoords, this.currentPointerCoord);

      this.trackObj.remove(true);
    }
  };

  _onDBClick = () => {
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
    this.handler.removeObj();

    this._resetLoop();
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onEnter);
  }

  protected _resetLoop = () => {
    super._resetLoop();
    this.handler.reset();
    //TRACK, TAG, SNAP
    this.trackObj.remove(true);
    this.tagsManager.stopRender();
    this.snapManager.resetSnap();
  };
}
