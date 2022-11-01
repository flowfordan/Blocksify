import * as THREE from "three";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

import { Layer } from "../../state";
import { SnapManager } from "../helpers/SnapManager";
import { TagsManager } from "../helpers/TagManager";
import { pMat } from "../objs3d";

interface I3dObjPoint {
  form: THREE.Points | null,
  geom: THREE.BufferGeometry | null,
  mat: THREE.PointsMaterial | null
}

interface I3dObjLine {
  form: Line2 | null,
    geom: LineGeometry | null,
    mat: LineMaterial | null
}

interface I3dObjPolygon {
  form: THREE.Mesh | null,
    geom: THREE.Shape | null,
    mat: THREE.MeshBasicMaterial | null
}

const null3dObj = { form: null, geom: null, mat: null };

const empty3dObjPoint = {
  form: new THREE.Points(), geom: new THREE.BufferGeometry(), mat: pMat
};
const empty3dObjLine = {
  form: new Line2(), geom: new LineGeometry(), mat: new LineMaterial()
};
const empty3dObjPolygon = {
  form: new THREE.Mesh(), geom: new THREE.Shape(), mat: new THREE.MeshBasicMaterial()
};

//SUPERCLASS FOR TOOLS
export class Tool {

  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect|null;
  scene: THREE.Scene;
  layer: Layer|null;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera|null;
  currentPlane: THREE.Plane|null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  snapManager: SnapManager | null;

  cursor: 'crosshair';

  //objects being created
  obj:{
    line: I3dObjLine,
    points: I3dObjPoint,
    polygon: I3dObjPolygon
  };

  objCoords:{
    line: Array<number>,
    polygon: []
  };

  // helper objects to show future lines/shapes
  // while drawing
  guideObj: {
    line: I3dObjLine,
    polygon: I3dObjPolygon
  };

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.scene = scene;
    this.layer = null;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.obj = {
      line: {
        form: null,
        geom: null,
        mat: null
      },
      points: {
        form: null,
        geom: null,
        mat: pMat
      },
      polygon: {
        form: null,
        geom: null,
        mat: null
      } };

    this.objCoords = { line: [], polygon: [] };

    this.guideObj = {
      line: {
        form: new Line2(),
        geom: new LineGeometry(),
        mat: new LineMaterial()
      },
      polygon: {
        form: new THREE.Mesh(),
        geom: new THREE.Shape(),
        mat: new THREE.MeshBasicMaterial()
      }
    };

    this.tagsManager = new TagsManager(scene);
    this.snapManager = null;

    this.cursor = 'crosshair';
  }

  //START METHOD
  start(camera: typeof this.currentCamera,
    plane: typeof this.currentPlane,
    layer: typeof this.layer) {
    console.log('TOOL START');

    //set tool state
    //assign layer, camera and plane
    this.toolState = 1;
    this.layer = layer;
    this.currentCamera = camera;
    this.currentPlane = plane;

    //TODO check for snapping options

    //guideLine
    this.guideObj.line.mat = new LineMaterial({
      color: 0x0E89E1,
      linewidth: 2,
      resolution: new THREE.Vector2(1920, 1080),
      dashed: true,
      opacity: 0.8
    });
  }


  //REFRESH LOOP
  protected _resetLoop() {
    this.toolState = 1;

    //CLEAN UP
    this.obj.line.form = null;
    this.obj.line.geom = null;

    this.obj.polygon.form = null;
    this.obj.polygon.geom = null;

    this.obj.points.form = null;

    this.objCoords.line = [];
  }

  //STOP METHOD
  stop() {
    console.log('TOOL STOP');
    //tool state to 0
    this.toolState = 0;
  }
}


