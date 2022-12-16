import * as THREE from 'three';
import { pointObj, V2ArrToNumArr } from '../objs3d';
import { getMouseLocation } from '../utils';
import { Tool } from './Tool';
import { Line2, LineGeometry } from 'three-fatline';
import { Vector3 } from 'three';

export class Polygon extends Tool {
  polygonParts: number;

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene) {
    super(canvas, scene);
    this.polygonParts = 1;
  }

  start = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: typeof this.layer) => {
    super.start(camera, plane, layer);
    //POLYGON
    //init material
    if (!this.layer.content.main) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objPts.polygon.mat = this.layer.content.main.mat.polygon;
    this.objPts.line.mat = this.layer.content.main.mat.line;

    //add EL
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onDrawClick);
    this.canvas.addEventListener('dblclick', this._onDBClick);
    window.addEventListener('keypress', this._onEnter);
  };

  _onMouseMove = (e: MouseEvent) => {
    const mouseLoc = getMouseLocation(e, this.rect, this.canvas, this.currentCamera!, this.currentPlane!);

    //upd coords
    this.currentPointerCoord = mouseLoc;

    //upd guideLine
    //1, 2, currentpoint
    //show when 2 pts created
    if (this.toolState === 2 && this.objCoords.length >= 9) {
      // this.scene.remove(this.trackObj.polygon.form!);

      // this.trackObj.polygon.geom = new THREE.Shape();
      //initial empty point
      const pt1 = this.objPts.polygon.geom!.getPoints()[0];
      console.log(pt1);
      // this.trackObj.polygon.geom?.moveTo(pt1.x, pt1.y);
      // this.trackObj.polygon.geom?.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      const pt2 = this.objPts.polygon.geom!.getPoints()[this.objPts.polygon.geom!.getPoints().length - 1];
      // this.trackObj.polygon.geom?.lineTo(pt2.x, pt2.y);
      console.log(pt2);

      // this.trackObj.polygon.form = new THREE.Mesh(
      //   new THREE.ShapeGeometry(this.trackObj.polygon.geom!),
      //   this.trackObj.polygon.mat!
      // );
      // this.trackObj.polygon.form.name = 'guide';

      //rotate(by def created on x-z plane)
      // this.trackObj.polygon.form.rotateX(Math.PI / 2);

      // this.scene.add(this.trackObj.polygon.form!);

      //TRACK
      // this.trackObj.updCoords(current2ptLineCoords);
      // this.trackObj.add();

      //TAG
      const current2pt = this.objCoords.slice(-6);
      const p1 = current2pt.slice(0, 3);
      const p2 = current2pt.slice(3);
      this.tagsManager.renderTag([new Vector3(...p1), new Vector3(...p2)], this.currentPointerCoord);
    }
  };

  _onDrawClick = () => {
    if (this.toolState === 1) {
      //POLYGON
      this.objPts.polygon.geom = new THREE.Shape();
      const shapeGeom = new THREE.ShapeGeometry(this.objPts.polygon.geom);
      this.objPts.polygon.form = new THREE.Mesh(shapeGeom, this.objPts.polygon.mat);
      //rotate(by def created on x-z plane)
      this.objPts.polygon.form.rotateX(Math.PI / 2);
      this.objPts.polygon.geom.moveTo(this.currentPointerCoord.x, this.currentPointerCoord.z);

      const coords: Array<number> = Object.values(this.currentPointerCoord);
      this.objCoords.push(...coords);

      //POINTS
      this.objPts.points.form = pointObj(this.objCoords);

      //LINE-BORDER SETUP
      this.objPts.line.geom = new LineGeometry();
      this.objPts.line.form = new Line2(this.objPts.line.geom, this.objPts.line.mat);

      //RENDER
      this.scene.add(this.objPts.polygon.form);
      this.scene.add(this.objPts.line.form);

      this.scene.add(this.objPts.points.form);

      //TRACK
      this.trackObj.init(true);

      this.toolState = 2;
    } else if (this.toolState === 2) {
      if (!this.objPts.line.geom || !this.objPts.line.form || !this.objPts.polygon.geom || !this.objPts.polygon.form) {
        throw new Error('There is no Obj Form or Obj Geometry in Tool');
      }
      //POLYGON
      this.objPts.polygon.geom.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      this.objPts.polygon.form.geometry = new THREE.ShapeGeometry(this.objPts.polygon.geom);

      this.objCoords.length = 0;
      const currentLineCoords = V2ArrToNumArr(
        this.objPts.polygon.geom.getPoints(),
        this.currentPlane!.constant //WORLD PLANE LEVEL
      );

      //TODO use spread
      this.objCoords.push(...currentLineCoords);
      //close line by pushing start point
      this.objCoords.push(this.objCoords[0], this.objCoords[1], this.objCoords[2]);

      //POINTS
      this.scene.remove(this.objPts.points.form!);
      this.objPts.points.form = pointObj(currentLineCoords);
      this.scene.add(this.objPts.points.form);

      //upd polyline
      //TODO upd geom without cr new
      this.objPts.line.form.geometry = new LineGeometry();
      this.objPts.line.form.geometry.setPositions(this.objCoords);
      this.objPts.line.form.computeLineDistances();

      // this.scene.remove(this.trackObj.polygon.form!);
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

  protected _resetLoop = () => {
    // this.scene.remove(this.trackObj.polygon.form!);
    super._resetLoop();

    this.tagsManager.stopRender();
  };

  stop() {
    super.stop();

    //delete began forms
    //TODO check for null obj - then delete if not null
    this.scene.remove(this.objPts.line.form!);
    this.scene.remove(this.objPts.points.form!);
    this.scene.remove(this.objPts.polygon.form!);

    this._resetLoop();

    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onEnter);
  }
}
