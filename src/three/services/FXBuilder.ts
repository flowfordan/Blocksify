import * as THREE from 'three';
import { Vector2, Vector3 } from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
interface I3dObjLine {
  form: Line2;
  geom: LineGeometry;
  mat: LineMaterial;
}

interface I3dObjPolygon {
  form: THREE.Mesh;
  geom: THREE.Shape;
  mat: THREE.MeshBasicMaterial;
}
export class FXBuilder {
  //effect to show actual object part to be created or changed
  trackObjs: {
    line: I3dObjLine;
    polygon: I3dObjPolygon;
  };
  //effect to show what rendered object will look like whule creating
  //or interceted selected object
  tempObjs: {
    line: I3dObjLine;
    polygon: I3dObjPolygon;
  };

  overlayObj: I3dObjLine;

  constructor() {
    this.trackObjs = {
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
    this.overlayObj = {
      form: new Line2(),
      geom: new LineGeometry(),
      mat: new LineMaterial(),
    };

    //default track materials
    this.trackObjs.line.mat = new LineMaterial({
      color: 0x0e89e1,
      linewidth: 2,
      resolution: new THREE.Vector2(1920, 1080),
      dashed: true,
      opacity: 0.8,
    });

    this.trackObjs.polygon.mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('skyblue'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });

    this.overlayObj.mat = new LineMaterial({
      color: 0x81c9fc,
      linewidth: 10,
      resolution: new THREE.Vector2(1920, 1080),
      dashed: false,
      opacity: 1,
    });
  }

  //init tracking
  initTrack = (isPolygon = false) => {
    if (isPolygon) {
      this.trackObjs.polygon.geom = new THREE.Shape();
      const shapeTrackGeom = new THREE.ShapeGeometry(this.trackObjs.polygon.geom);

      this.trackObjs.polygon.form = new THREE.Mesh(shapeTrackGeom, this.trackObjs.polygon.mat);
      this.trackObjs.polygon.form.name = 'track-polygon';

      //rotate(by def created on x-z plane)
      this.trackObjs.polygon.form.rotateX(Math.PI / 2);
    }
    //line
    this.trackObjs.line.geom = new LineGeometry();
    this.trackObjs.line.form = new Line2(this.trackObjs.line.geom, this.trackObjs.line.mat);
    this.trackObjs.line.form.name = 'track-line';
  };

  updTrack = (coords: Array<number>) => {
    this.trackObjs.line.geom.setPositions(coords);
    this.trackObjs.line.form.computeLineDistances();
  };

  updTrackPolygon = (pt1: Vector2, pt2: Vector2, pointerCoords: Vector3) => {
    this.trackObjs.polygon.geom = new THREE.Shape();
    //draw triangle track obj
    this.trackObjs.polygon.geom.moveTo(pt1.x, pt1.y);
    this.trackObjs.polygon.geom.lineTo(pointerCoords.x, pointerCoords.z);
    this.trackObjs.polygon.geom.lineTo(pt2.x, pt2.y);
    this.trackObjs.polygon.form = new THREE.Mesh(
      new THREE.ShapeGeometry(this.trackObjs.polygon.geom),
      this.trackObjs.polygon.mat
    );
    //rotate(by def created on x-z plane)
    this.trackObjs.polygon.form.rotateX(Math.PI / 2);
  };

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

  initOverlayObj = (obj: THREE.Object3D<THREE.Event>) => {
    if (obj instanceof Line2) {
      this.overlayObj.form = obj.clone();

      this.overlayObj.form.renderOrder = -1;
      this.overlayObj.form.layers.set(0);
      this.overlayObj.form.material = this.overlayObj.mat;
    }
  };
}
