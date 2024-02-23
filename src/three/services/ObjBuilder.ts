import { PropsEditor } from './PropsEditor';
import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { ILayer } from '../../shared/types/layers';
import {
  I3dObjLine,
  getLineMat,
  getPolygonMat,
  I3dObjPoint,
  I3dObjPolygon,
  pMat,
  pointObj,
  V2ArrToNumArr,
} from 'three/config/objs3d';
import { OBJ_SEGMENT_NAME } from 'shared/types/objs';

interface I3dObjLine_temp {
  form: Line2;
  geom: LineGeometry;
  mat: LineMaterial;
}

interface I3dObjPolygon_temp {
  form: THREE.Mesh;
  geom: THREE.Shape;
  mat: THREE.MeshBasicMaterial;
}

export class ObjBuilder {
  /** main created obj */
  objMain: THREE.Object3D;
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
  tempObjs: {
    line: I3dObjLine_temp;
    polygon: I3dObjPolygon_temp;
  };
  //effect to show what rendered object will look like while creating
  //or interceted selected object
  isRenderable: boolean;
  propsEditor: PropsEditor;

  constructor() {
    this.objMain = new THREE.Object3D();
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
    this.tempObjs = {
      line: {
        form: new Line2(),
        geom: new LineGeometry(),
        mat: new LineMaterial(),
      },
      polygon: {
        form: new THREE.Mesh(),
        geom: new THREE.Shape(),
        mat: new THREE.MeshBasicMaterial(),
      },
    };
    this.isRenderable = false;
    this.propsEditor = new PropsEditor();
  }

  createLine = (objCoords: Array<number>, layer: ILayer) => {
    //prim obj pt
    if (!layer._contentConfig.OBJ_PRIM_PT) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objParts.line.mat = layer._contentConfig.OBJ_PRIM_PT._mat.line;
    this.objParts.line.geom = new LineGeometry();
    this.objParts.line.form = new Line2(this.objParts.line.geom, this.objParts.line.mat);

    this.objParts.points.form = pointObj(objCoords);

    //set ud of segments
    this.propsEditor.setSegmentInitProperties(this.objParts.line.form, 'line');
    this.propsEditor.setSegmentInitProperties(this.objParts.points.form, 'point');
    // this.objParts.line.form.name = OBJ_SEGMENT_NAME.line_segment;
    // this.objParts.points.form.name = OBJ_SEGMENT_NAME.point_segment;

    this.objCreated.add(this.objParts.points.form);
    this.objCreated.add(this.objParts.line.form);

    //set layers data and name
    this.objCreated.layers.set(layer._id);
    this.objParts.line.form.layers.set(layer._id);
    this.objParts.points.form.layers.set(layer._id);
    this.objCreated.name = layer._name;
    //obj data
    this.propsEditor.setObjInitProperties(this.objMain, layer, 'main');
    this.propsEditor.setObjInitProperties(this.objCreated, layer, 'pt_prim');
    //add child to main
    this.objMain.layers.set(layer._id);
    this.objMain.add(this.objCreated);
  };

  createPolygon = (objCoords: Array<number>, layer: ILayer, currentPointerCoord: THREE.Vector3) => {
    //prim obj pt
    //POLYGON
    if (!layer._contentConfig.OBJ_PRIM_PT) {
      throw new Error('Layer doesnt have options to enable drawing on it');
    }
    this.objParts.polygon.geom = new THREE.Shape();
    const shapeGeom = new THREE.ShapeGeometry(this.objParts.polygon.geom);
    this.objParts.polygon.mat = layer._contentConfig.OBJ_PRIM_PT._mat.polygon;
    this.objParts.polygon.form = new THREE.Mesh(shapeGeom, this.objParts.polygon.mat);
    //rotate(by def created on x-z plane)
    this.objParts.polygon.form.rotateX(Math.PI / 2);
    this.objParts.polygon.geom.moveTo(currentPointerCoord.x, currentPointerCoord.z);

    //POINTS
    this.objParts.points.form = pointObj(objCoords);

    //LINE
    this.objParts.line.mat = layer._contentConfig.OBJ_PRIM_PT._mat.line;
    this.objParts.line.geom = new LineGeometry();
    this.objParts.line.form = new Line2(this.objParts.line.geom, this.objParts.line.mat);

    //set prim pt segmants data
    this.propsEditor.setSegmentInitProperties(this.objParts.line.form, 'line');
    this.propsEditor.setSegmentInitProperties(this.objParts.points.form, 'point');
    this.propsEditor.setSegmentInitProperties(this.objParts.polygon.form, 'polygon');
    // this.objParts.line.form.name = OBJ_SEGMENT_NAME.line_segment;
    // this.objParts.points.form.name = OBJ_SEGMENT_NAME.point_segment;
    // this.objParts.polygon.form.name = OBJ_SEGMENT_NAME.polygon_segment;

    //add segmants to prim pt obj
    this.objCreated.add(this.objParts.points.form);
    this.objCreated.add(this.objParts.line.form);
    this.objCreated.add(this.objParts.polygon.form);

    //layers options set
    this.objCreated.layers.set(layer._id);
    this.objParts.line.form.layers.set(layer._id);
    this.objParts.points.form.layers.set(layer._id);
    this.objParts.polygon.form.layers.set(layer._id);
    this.objCreated.name = layer._name;

    //set properties
    this.propsEditor.setObjInitProperties(this.objMain, layer, 'main');
    this.propsEditor.setObjInitProperties(this.objCreated, layer, 'pt_prim');

    this.objMain.layers.set(layer._id);
    this.objMain.add(this.objCreated);
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

  //TEMP
  //initTemp
  initTemp = (obj: I3dObjLine | I3dObjPolygon, isPolygon = false) => {
    if (isPolygon) {
      const polygon = obj as I3dObjPolygon;
      this.tempObjs.polygon.form = polygon.form.clone();
      this.tempObjs.polygon.form.name = 'temp';
    } else {
      //line
      const line = obj as I3dObjLine;
      this.tempObjs.line.form = line.form.clone();
      this.tempObjs.line.form.name = 'temp';
    }
  };

  reset = () => {
    this.objMain = new THREE.Object3D();
    this.objCreated = new THREE.Object3D();

    this.objParts.line.form = new Line2();
    this.objParts.line.geom = new LineGeometry();

    this.objParts.polygon.form = new THREE.Mesh();
    this.objParts.polygon.geom = new THREE.Shape();

    this.objParts.points.form = null;

    this.isRenderable = false;
  };
}
