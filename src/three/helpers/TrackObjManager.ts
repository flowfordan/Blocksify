import * as THREE from 'three';
import { Vector2, Vector3 } from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

//TODO common type for track and actual obj
interface I3dObjPoint {
  form: THREE.Points | null;
  geom: THREE.BufferGeometry | null;
  mat: THREE.PointsMaterial | null;
}

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
// helper objects to show future lines/shapes
// while drawing
class TrackObjManager {
  scene: THREE.Scene;
  objs: {
    line: I3dObjLine;
    polygon: I3dObjPolygon;
  };

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.objs = {
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

    //default track materials
    this.objs.line.mat = new LineMaterial({
      color: 0x0e89e1,
      linewidth: 2,
      resolution: new THREE.Vector2(1920, 1080),
      dashed: true,
      opacity: 0.8,
    });

    this.objs.polygon.mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('skyblue'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
  }

  //set obj from exact geometry & material
  init = (isPolygon = false) => {
    if (isPolygon) {
      this.objs.polygon.geom = new THREE.Shape();
      const shapeTrackGeom = new THREE.ShapeGeometry(this.objs.polygon.geom);

      this.objs.polygon.form = new THREE.Mesh(shapeTrackGeom, this.objs.polygon.mat);
      this.objs.polygon.form.name = 'track-polygon';

      //rotate(by def created on x-z plane)
      this.objs.polygon.form.rotateX(Math.PI / 2);
    }
    //line
    this.objs.line.geom = new LineGeometry();
    this.objs.line.form = new Line2(this.objs.line.geom, this.objs.line.mat);
    this.objs.line.form.name = 'track-line';
  };

  updCoords = (coords: Array<number>) => {
    this.objs.line.geom.setPositions(coords);
    this.objs.line.form.computeLineDistances();
  };

  updPolygon = (pt1: Vector2, pt2: Vector2, pointerCoords: Vector3) => {
    this.scene.remove(this.objs.polygon.form);
    this.objs.polygon.geom = new THREE.Shape();
    //draw triangle track obj
    this.objs.polygon.geom.moveTo(pt1.x, pt1.y);
    this.objs.polygon.geom.lineTo(pointerCoords.x, pointerCoords.z);
    this.objs.polygon.geom.lineTo(pt2.x, pt2.y);
    this.objs.polygon.form = new THREE.Mesh(new THREE.ShapeGeometry(this.objs.polygon.geom), this.objs.polygon.mat);
    //rotate(by def created on x-z plane)
    this.objs.polygon.form.rotateX(Math.PI / 2);
  };

  //add to scene
  add = (isPolygon = false) => {
    if (isPolygon) {
      this.scene.add(this.objs.polygon.form);
    }
    this.scene.add(this.objs.line.form);
  };

  //remove from scene
  remove = (isPolygon = false) => {
    if (isPolygon) {
      this.scene.remove(this.objs.polygon.form);
    }
    this.scene.remove(this.objs.line.form);
  };
}

export { TrackObjManager };
