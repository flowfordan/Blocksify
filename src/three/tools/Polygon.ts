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
    this.obj.polygon.mat = this.layer.content.main!.mat.polygon!;

    //POLYLINE - BORDER
    //TODO if there is contour check
    this.obj.line.mat = this.layer.content.main!.mat.line!;

    //init guide obj
    this.guideObj.polygon.mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('skyblue'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    this.guideObj.polygon.geom = new THREE.Shape();
    const shapeGuideGeom = new THREE.ShapeGeometry(this.guideObj.polygon.geom);

    this.guideObj.polygon.form = new THREE.Mesh(shapeGuideGeom, this.guideObj.polygon.mat);
    this.guideObj.polygon.form.name = 'guide';

    //rotate(by def created on x-z plane)
    this.guideObj.polygon.form.rotateX(Math.PI / 2);

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
    if (this.toolState === 2 && this.objCoords.line.length >= 9) {
      this.scene.remove(this.guideObj.polygon.form!);

      this.guideObj.polygon.geom = new THREE.Shape();
      const pt1 = this.obj.polygon.geom!.getPoints()[0];
      this.guideObj.polygon.geom?.moveTo(pt1.x, pt1.y);
      this.guideObj.polygon.geom?.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      const pt2 = this.obj.polygon.geom!.getPoints()[this.obj.polygon.geom!.getPoints().length - 1];
      this.guideObj.polygon.geom?.lineTo(pt2.x, pt2.y);

      console.log(pt1, pt2);

      this.guideObj.polygon.form = new THREE.Mesh(
        new THREE.ShapeGeometry(this.guideObj.polygon.geom!),
        this.guideObj.polygon.mat!
      );
      this.guideObj.polygon.form.name = 'guide';

      //rotate(by def created on x-z plane)
      this.guideObj.polygon.form.rotateX(Math.PI / 2);

      this.scene.add(this.guideObj.polygon.form!);

      //render tag for lines
      const current2pt = this.objCoords.line.slice(-6);
      const p1 = current2pt.slice(0, 3);
      const p2 = current2pt.slice(3);
      this.tagsManager.renderTag([new Vector3(...p1), new Vector3(...p2)], this.currentPointerCoord);
    }
  };

  _onDrawClick = () => {
    if (this.toolState === 1) {
      //POLYGON SETUP
      this.obj.polygon.geom = new THREE.Shape();
      const shapeGeom = new THREE.ShapeGeometry(this.obj.polygon.geom);

      this.obj.polygon.form = new THREE.Mesh(shapeGeom, this.obj.polygon.mat!);
      this.obj.polygon.form.name = 'border';

      //rotate(by def created on x-z plane)
      this.obj.polygon.form.rotateX(Math.PI / 2);
      this.scene.add(this.obj.polygon.form);

      this.obj.polygon.geom.moveTo(this.currentPointerCoord.x, this.currentPointerCoord.z);

      //POINTS SETUP
      //add pt
      this.obj.points.form = pointObj([this.currentPointerCoord.x, 0, this.currentPointerCoord.z]);
      this.scene.add(this.obj.points.form);

      //LINE-BORDER SETUP
      this.obj.line.geom = new LineGeometry();
      this.obj.line.form = new Line2(this.obj.line.geom, this.obj.line.mat!);
      this.obj.line.form.layers.set(this.layer.id);
      this.scene.add(this.obj.line.form);

      //GUIDE OBJS SETUP
      this.guideObj.line.geom = new LineGeometry();
      this.guideObj.line.form = new Line2(this.guideObj.line.geom, this.guideObj.line.mat!);
      this.scene.add(this.guideObj.line.form);

      this.toolState = 2;
    } else if (this.toolState === 2) {
      this.obj.polygon.geom!.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
      //TODO find way to extend buffer & not create new geom every time
      this.obj.polygon.form!.geometry = new THREE.ShapeGeometry(this.obj.polygon.geom!);

      this.objCoords.line.length = 0;
      const currentLineCoords = V2ArrToNumArr(
        this.obj.polygon.geom!.getPoints(),
        this.currentPlane!.constant //WORLD PLANE LEVEL
      );

      //TODO use spread
      this.objCoords.line.push(...currentLineCoords);
      //close line by pushing start point
      this.objCoords.line.push(this.objCoords.line[0], this.objCoords.line[1], this.objCoords.line[2]);

      //create points
      this.scene.remove(this.obj.points.form!);
      this.obj.points.form = pointObj(currentLineCoords);
      this.scene.add(this.obj.points.form);

      //upd polyline
      //TODO upd geom without cr new
      this.obj.line.form!.geometry = new LineGeometry();
      this.obj.line.form!.geometry.setPositions(this.objCoords.line);
      this.obj.line.form!.computeLineDistances();

      this.scene.remove(this.guideObj.polygon.form!);

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
    this.scene.remove(this.guideObj.polygon.form!);
    super._resetLoop();

    this.tagsManager.stopRender();
  };

  stop() {
    super.stop();

    //delete began forms
    //TODO check for null obj - then delete if not null
    this.scene.remove(this.obj.line.form!);
    this.scene.remove(this.obj.points.form!);
    this.scene.remove(this.obj.polygon.form!);

    this._resetLoop();

    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('click', this._onDrawClick);
    this.canvas.removeEventListener('dblclick', this._onDBClick);
    window.removeEventListener('keypress', this._onEnter);
  }
}
