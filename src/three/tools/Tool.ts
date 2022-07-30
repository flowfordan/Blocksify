import * as THREE from "three";
import { Layer } from "../../state";

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

	constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
		this.canvas = canvas;
		this.rect = canvas.getBoundingClientRect();
		this.scene = scene;
		this.layer = null;
		this.toolState = 0; //state from 0 to 3

		this.currentCamera = null;
		this.currentPlane = null;

		this.currentPointerCoord = new THREE.Vector3();
	}

	//START METHOD
	start = () => {
		//activate EL
	}


	//_MOVE MOUSE EV



	//_CLICK EV


	//REFRESH LOOP
	endLoop = () => {

	}

	//STOP METHOD
	stop = () => {
		//delete EL
		//tool state to 0
		//null objects
	}
}


