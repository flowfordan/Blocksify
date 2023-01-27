import { Layer } from './../../state/layersState';
import * as THREE from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import { getLineMat, getPolygonMat, I3dObjLine, I3dObjPoint, I3dObjPolygon, pMat, pointObj } from '../objs3d';

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

  constructor() {
    this.objCreated = new THREE.Object3D();
    this.objParts = {
      line: {
        form: null,
        geom: null,
        mat: getLineMat(),
      },
      points: {
        form: null,
        geom: null,
        mat: pMat,
      },
      polygon: {
        form: null,
        geom: null,
        mat: getPolygonMat(),
      },
    };
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
  };

  //
}
