import * as THREE from "three";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

import { Layer } from "../../state";
import { pMat } from "../objs3d";

interface I3dObjPoint {
	form: THREE.Points,
    geom: THREE.BufferGeometry,
    mat: THREE.PointsMaterial
}

interface I3dObjLine {
	form: Line2,
    geom: LineGeometry,
    mat: LineMaterial
}

interface I3dObjPolygon {
	form: THREE.Mesh,
    geom: THREE.Shape,
    mat: THREE.MeshBasicMaterial
}

const null3dObj = {form: null, geom: null, mat: null}

const empty3dObjPoint = {
	form: new THREE.Points(), geom: new THREE.BufferGeometry(), mat: pMat
}
const empty3dObjLine = {
	form: new Line2(), geom: new LineGeometry(), mat: new LineMaterial()
}
const empty3dObjPolygon = {
	form: new THREE.Mesh(), geom: new THREE.Shape(), mat: new THREE.MeshBasicMaterial()
}

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

	//objects being created
	obj:{
		line: I3dObjLine,
		points: I3dObjPoint,
		polygon: I3dObjPolygon
	};

	objCoords:{
		line: Array<number>,
		polygon: []
	}

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
				form: new Line2(), geom: new LineGeometry(), mat: new LineMaterial()
			}, 
			points: {
				form: new THREE.Points(), geom: new THREE.BufferGeometry(), mat: pMat
			}, 
			polygon: {
				form: new THREE.Mesh(), geom: new THREE.Shape(), mat: new THREE.MeshBasicMaterial()
			}};
		
		this.objCoords = {line: [], polygon: []}

		this.guideObj = {line: {
			form: new Line2(), geom: new LineGeometry(), mat: new LineMaterial()
		}, polygon: {
			form: new THREE.Mesh(), geom: new THREE.Shape(), mat: new THREE.MeshBasicMaterial()
		}};
	}

	//START METHOD
	startDrawing(camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, 
		layer: typeof this.layer) {
		console.log('TOOL START');

		//set tool state
		//assign layer, camera and plane
		this.toolState = 1;
        this.layer = layer;
        this.currentCamera = camera;
        this.currentPlane = plane;
	}

	//REFRESH LOOP
	protected _resetLoop() {
		this.toolState = 1;
	}

	//STOP METHOD
	stopDrawing() {
		console.log('TOOL STOP');
		//tool state to 0
		//null objects
		//remove guide and started objcs
		this.toolState = 0;
		
		this.obj.line = empty3dObjLine;
		this.obj.points = empty3dObjPoint;
		this.obj.polygon = empty3dObjPolygon;

		this.objCoords = {line: [], polygon: []}
	}
}


