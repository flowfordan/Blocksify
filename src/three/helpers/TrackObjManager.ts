import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

import { I3dObjLine, I3dObjPolygon } from '../objs3d';

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
  //method - update position
  //add to scene
  //remove from scene
}

export { TrackObjManager };
