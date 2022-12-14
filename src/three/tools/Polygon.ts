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
    this.objPts.polygon.mat = this.layer.content.main!.mat.polygon!;

    //POLYLINE - BORDER
    //TODO if there is contour check
    this.objPts.line.mat = this.layer.content.main!.mat.line!;

    //init guide obj
    // this.trackObj.polygon.mat = new THREE.MeshBasicMaterial({
    //   color: new THREE.Color('skyblue'),
    //   side: THREE.DoubleSide,
    //   transparent: true,
    //   opacity: 0.5,
    // });
    // this.trackObj.polygon.geom = new THREE.Shape();
    // const shapeGuideGeom = new THREE.ShapeGeometry(this.trackObj.polygon.geom);

    // this.trackObj.polygon.form = new THREE.Mesh(shapeGuideGeom, this.trackObj.polygon.mat);
    // this.trackObj.polygon.form.name = 'guide';

    //rotate(by def created on x-z plane)
    // this.trackObj.polygon.form.rotateX(Math.PI / 2);

    //add EL
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('click', this._onDrawClick);
    this.canvas.addEventListener('dblclick', this._onDBClick);
    window.addEventListener('keypress', this._onEnter);
  };

  _onMouseMove = (e: MouseEvent) => {
    //get coords
    const mouseLoc = getMouseLocation(e, this.rect!, this.canvas, this.currentCamera!, this.currentPlane!);

    //upd coords
    this.currentPointerCoord = mouseLoc;

    //upd guideLine
    //1, 2, currentpoint
    //show when 2 pts created
    if (this.toolState === 2 && this.objPtsCoords.line.length >= 9) {
      // this.scene.remove(this.trackObj.polygon.form!);

      // this.trackObj.polygon.geom = new THREE.Shape();
      const pt1 = this.objPts.polygon.geom!.getPoints()[0];
      // this.trackObj.polygon.geom?.moveTo(pt1.x, pt1.y);
      // this.trackObj.polygon.geom?.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      const pt2 = this.objPts.polygon.geom!.getPoints()[this.objPts.polygon.geom!.getPoints().length - 1];
      // this.trackObj.polygon.geom?.lineTo(pt2.x, pt2.y);

      // this.trackObj.polygon.form = new THREE.Mesh(
      //   new THREE.ShapeGeometry(this.trackObj.polygon.geom!),
      //   this.trackObj.polygon.mat!
      // );
      // this.trackObj.polygon.form.name = 'guide';

      //rotate(by def created on x-z plane)
      // this.trackObj.polygon.form.rotateX(Math.PI / 2);

      // this.scene.add(this.trackObj.polygon.form!);

      //render tag for lines
      const current2pt = this.objPtsCoords.line.slice(-6);
      const p1 = current2pt.slice(0, 3);
      const p2 = current2pt.slice(3);
      this.tagsManager.renderTag([new Vector3(...p1), new Vector3(...p2)], this.currentPointerCoord);
    }
  };

  _onDrawClick = () => {
    if (this.toolState === 1) {
      //POLYGON SETUP
      this.objPts.polygon.geom = new THREE.Shape();
      const shapeGeom = new THREE.ShapeGeometry(this.objPts.polygon.geom);

      this.objPts.polygon.form = new THREE.Mesh(shapeGeom, this.objPts.polygon.mat!);
      this.objPts.polygon.form.name = 'border';

      //rotate(by def created on x-z plane)
      this.objPts.polygon.form.rotateX(Math.PI / 2);
      this.scene.add(this.objPts.polygon.form);

      this.objPts.polygon.geom.moveTo(this.currentPointerCoord.x, this.currentPointerCoord.z);

      //POINTS SETUP
      //add pt
      this.objPts.points.form = pointObj([this.currentPointerCoord.x, 0, this.currentPointerCoord.z]);
      this.scene.add(this.objPts.points.form);

      //LINE-BORDER SETUP
      this.objPts.line.geom = new LineGeometry();
      this.objPts.line.form = new Line2(this.objPts.line.geom, this.objPts.line.mat!);
      this.objPts.line.form.layers.set(this.layer.id);
      this.scene.add(this.objPts.line.form);

      //GUIDE OBJS SETUP
      // this.trackObj.line.geom = new LineGeometry();
      // this.trackObj.line.form = new Line2(this.trackObj.line.geom, this.trackObj.line.mat!);
      // this.scene.add(this.trackObj.line.form);

      this.toolState = 2;
    } else if (this.toolState === 2) {
      this.objPts.polygon.geom!.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      //TODO find way to extend buffer & not create new geom every time
      this.objPts.polygon.form!.geometry = new THREE.ShapeGeometry(this.objPts.polygon.geom!);

      this.objPtsCoords.line.length = 0;
      const currentLineCoords = V2ArrToNumArr(
        this.objPts.polygon.geom!.getPoints(),
        this.currentPlane!.constant //WORLD PLANE LEVEL
      );

      //TODO use spread
      this.objPtsCoords.line.push(...currentLineCoords);
      //close line by pushing start point
      this.objPtsCoords.line.push(this.objPtsCoords.line[0], this.objPtsCoords.line[1], this.objPtsCoords.line[2]);

      //create points
      this.scene.remove(this.objPts.points.form!);
      this.objPts.points.form = pointObj(currentLineCoords);
      this.scene.add(this.objPts.points.form);

      //upd polyline
      //TODO upd geom without cr new
      this.objPts.line.form!.geometry = new LineGeometry();
      this.objPts.line.form!.geometry.setPositions(this.objPtsCoords.line);
      this.objPts.line.form!.computeLineDistances();

      // this.scene.remove(this.trackObj.polygon.form!);

      console.log('POLYGON CHILD', this.scene.children);
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
