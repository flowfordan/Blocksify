import * as THREE from "three";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

import { Layer } from "../../state";

interface I3dObj {
	form: Line2 | THREE.Mesh| THREE.Points | null,
    geom: THREE.Shape | null,
    mat: LineMaterial | THREE.MeshBasicMaterial | THREE.PointsMaterial | null
}

const null3dObj = {form: null, geom: null, mat: null}

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
		line: I3dObj,
		points: I3dObj,
		polygon: I3dObj
	};

	objCoords:{
		line: [],
		polygon: []
	}

	// helper objects to show future lines/shapes
	// while drawing
	guideObj: {
		line: I3dObj | null,
		polygon: I3dObj | null
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
			line: null3dObj, 
			points: null3dObj, 
			polygon: null3dObj};
		this.objCoords = {line: [], polygon: []}

		this.guideObj = {line: null, polygon: null};
	}

	//START METHOD
	startDrawing(camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, 
		layer: typeof this.layer) {
		console.log('TOOL START');

		//set tool state
		//assign layer, camera and plane
		//activate EL
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
		
		this.obj.line = null3dObj;
		this.obj.points = null3dObj;
		this.obj.polygon = null3dObj;

		this.objCoords = {line: [], polygon: []}
	}
}


