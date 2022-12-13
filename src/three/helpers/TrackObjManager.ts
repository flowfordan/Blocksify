import * as THREE from 'three';
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

    //exact material
    this.objs.line.mat = new LineMaterial({
      color: 0x0e89e1,
      linewidth: 2,
      resolution: new THREE.Vector2(1920, 1080),
      dashed: true,
      opacity: 0.8,
    });
  }

  //set obj from exact geometry & material
  init = () => {
    this.objs.line.form = new Line2(this.objs.line.geom, this.objs.line.mat);
  };

  updCoords = (coords: Array<number>) => {
    this.objs.line.geom.setPositions(coords);
    this.objs.line.form.computeLineDistances();
  };

  //add to scene
  add = () => {
    //
    this.scene.add(this.objs.line.form);
  };

  //remove from scene
  remove = () => {
    this.scene.remove(this.objs.line.form);
  };
}

export { TrackObjManager };
