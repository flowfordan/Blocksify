import { Layer } from '../../shared/model';
import * as THREE from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import {
  getLineMat,
  getPolygonMat,
  I3dObjLine,
  I3dObjPoint,
  I3dObjPolygon,
  pMat,
  pointObj,
  V2ArrToNumArr,
} from '../objs3d';

export class ObjBuilder {
  //
  //current created object
  objCreated: THREE.Object3D;
  // objCoords: Array<number>;
  //object parts being created
  objParts: {
    line: I3dObjLine;
    points: I3dObjPoint;
    polygon: I3dObjPolygon;
  };
  isRenderable: boolean;

  constructor() {
    this.objCreated = new THREE.Object3D();
    this.objParts = {
      line: {
        form: new Line2(),
        geom: new LineGeometry(),
        mat: getLineMat(),
      },
      points: {
        form: null,
        geom: null,
        mat: pMat,
      },
      polygon: {
        form: new THREE.Mesh(),
        geom: new THREE.Shape(),
        mat: getPolygonMat(),
      },
    };
    this.isRenderable = false;
  }

  createLine = (objCoords: Array<number>, layer: Layer) => {
    //
    if (!layer.content.main) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objParts.line.mat = layer.content.main.mat.line;
    this.objParts.line.geom = new LineGeometry();
    this.objParts.line.form = new Line2(this.objParts.line.geom, this.objParts.line.mat);

    this.objParts.points.form = pointObj(objCoords);

    this.objCreated.add(this.objParts.points.form);
    this.objCreated.add(this.objParts.line.form);

    //
    this.objCreated.layers.set(layer.id);
    this.objParts.line.form.layers.set(layer.id);
    this.objParts.points.form.layers.set(layer.id);
    this.objCreated.name = layer.name;
  };

  createPolygon = (objCoords: Array<number>, layer: Layer, currentPointerCoord: THREE.Vector3) => {
    //
    this.objParts.polygon.geom = new THREE.Shape();
    const shapeGeom = new THREE.ShapeGeometry(this.objParts.polygon.geom);
    this.objParts.polygon.form = new THREE.Mesh(shapeGeom, this.objParts.polygon.mat);
    //rotate(by def created on x-z plane)
    this.objParts.polygon.form.rotateX(Math.PI / 2);
    this.objParts.polygon.geom.moveTo(currentPointerCoord.x, currentPointerCoord.z);
    //POINTS
    this.objParts.points.form = pointObj(objCoords);

    //LINE
    if (!layer.content.main) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objParts.line.mat = layer.content.main.mat.line;
    this.objParts.line.geom = new LineGeometry();
    this.objParts.line.form = new Line2(this.objParts.line.geom, this.objParts.line.mat);

    //OBJ CREATED
    this.objCreated.add(this.objParts.points.form);
    this.objCreated.add(this.objParts.line.form);
    this.objCreated.add(this.objParts.polygon.form);

    //
    //layers options set
    this.objCreated.layers.set(layer.id);
    this.objParts.line.form.layers.set(layer.id);
    this.objParts.points.form.layers.set(layer.id);
    this.objParts.polygon.form.layers.set(layer.id);
    this.objCreated.name = layer.name;
  };

  updateLine = (type: 0 | 1, newCoords: Array<number>) => {
    if (!this.objParts.line.geom || !this.objParts.line.form) {
      throw new Error('There is no Obj Form or Obj Geometry in Tool');
    }
    if (type === 0) {
      this.objParts.line.geom.setPositions(newCoords);
    } else {
      this.objParts.line.form.geometry = new LineGeometry();
      this.objParts.line.form.geometry.setPositions(newCoords);
    }
    this.objParts.line.form.computeLineDistances();
    //points
    const position = Float32Array.from(newCoords);
    this.objParts.points.form!.geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    this.isRenderable = true;
  };

  updatePolygon = (newCoords: Array<number>, currentPointerCoord: THREE.Vector3) => {
    if (
      !this.objParts.line.geom ||
      !this.objParts.line.form ||
      !this.objParts.polygon.geom ||
      !this.objParts.polygon.form
    ) {
      throw new Error('There is no Obj Form or Obj Geometry in Tool');
    }

    //check for 1st update
    console.log('BUILDER coords length', newCoords.length);
    if (newCoords.length < 6) {
      //POLYGON
      this.objParts.polygon.geom.lineTo(currentPointerCoord.x, currentPointerCoord.z);
      this.objParts.polygon.form.geometry = new THREE.ShapeGeometry(this.objParts.polygon.geom);
      return;
    } else {
      //POLYGON
      this.objParts.polygon.geom.lineTo(currentPointerCoord.x, currentPointerCoord.z);
      this.objParts.polygon.form.geometry = new THREE.ShapeGeometry(this.objParts.polygon.geom);
      //points upd
      const currentLineCoords = V2ArrToNumArr(
        this.objParts.polygon.geom.getPoints(),
        0 //WORLD PLANE LEVEL
      );
      const position = Float32Array.from(currentLineCoords);
      this.objParts.points.form!.geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

      //line upd
      this.objParts.line.form.geometry = new LineGeometry();
      this.objParts.line.form.geometry.setPositions(newCoords);
      this.objParts.line.form.computeLineDistances();
    }
    this.isRenderable = true;
  };

  reset = () => {
    this.objCreated = new THREE.Object3D();

    this.objParts.line.form = new Line2();
    this.objParts.line.geom = new LineGeometry();

    this.objParts.polygon.form = new THREE.Mesh();
    this.objParts.polygon.geom = new THREE.Shape();

    this.objParts.points.form = null;

    this.isRenderable = false;
  };
}
