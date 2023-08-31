import * as THREE from 'three';

import { Layer, layersState } from '../../state';
import { SnapManager } from '../helpers/SnapManager';
import { TagsManager } from '../helpers/TagManager';
import { TrackObjManager } from '../helpers/TrackObjManager';
import { I3dObjLine, I3dObjPoint, I3dObjPolygon, pMat, getLineMat, getPolygonMat } from '../objs3d';

//SUPERCLASS FOR TOOLS
export class Tool {
  toolState: number;
  canvas: HTMLCanvasElement;
  rect: DOMRect;
  scene: THREE.Scene;
  layer: Layer;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  currentPlane: THREE.Plane | null;
  currentPointerCoord: THREE.Vector3;

  tagsManager: TagsManager;
  snapManager: SnapManager;
  trackObj: TrackObjManager;

  cursor: 'crosshair';

  //object being created by tool
  objCreated: THREE.Object3D;
  objCoords: Array<number>;
  //object parts being created
  objPts: {
    line: I3dObjLine;
    points: I3dObjPoint;
    polygon: I3dObjPolygon;
  };

  constructor(canvas: HTMLCanvasElement, scene: THREE.Scene) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.scene = scene;
    this.layer = layersState.currentLayer;
    this.toolState = 0; //state from 0 to 3

    this.currentCamera = null;
    this.currentPlane = null;

    this.currentPointerCoord = new THREE.Vector3();

    this.objCreated = new THREE.Object3D();
    this.objPts = {
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
    this.objCoords = [];

    this.trackObj = new TrackObjManager(scene);
    this.tagsManager = new TagsManager(scene);
    this.snapManager = new SnapManager(scene);

    this.cursor = 'crosshair';
  }

  //START METHOD
  start(camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer: Layer) {
    //set tool state
    //assign layer, camera and plane
    this.toolState = 1;
    this.layer = layer;
    this.currentCamera = camera;
    this.currentPlane = plane;

    this.objCreated = new THREE.Object3D();

    //TODO check for snapping options
  }

  //REFRESH LOOP
  //if came from STOp - disgraceful
  protected _resetLoop(isDisgraceful?: boolean) {
    this.toolState = 1;

    this.objPts.line.form = null;
    this.objPts.line.geom = null;

    this.objPts.polygon.form = null;
    this.objPts.polygon.geom = null;

    this.objPts.points.form = null;

    this.objCoords = [];

    //layerState
    if (!isDisgraceful) {
      layersState.setIsLayerEmpty(true);
    }
  }

  //STOP METHOD
  stop() {
    this.toolState = 0;
  }
}
