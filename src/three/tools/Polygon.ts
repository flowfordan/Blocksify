import * as THREE from "three";
import { Layer } from "../../state";


export class Polygon {

	toolState: number;
    canvas: HTMLCanvasElement;
    rect: DOMRect|null;
    scene: THREE.Scene;
	layer: Layer|null;

	constructor(canvas: HTMLCanvasElement, 
        scene: THREE.Scene, initToolState: number){
		this.canvas = canvas;
        this.rect = canvas.getBoundingClientRect();
        this.scene = scene;
        this.layer = null;
		this.toolState = initToolState; //state from 1 to 3
	}



	startDrawing = () => {
		const x = -50, y = -50;

		const heartShape = new THREE.Shape();

		heartShape.moveTo(x, y);
		heartShape.lineTo(40, 10)
		heartShape.lineTo(40, 30)
		heartShape.lineTo(20, 50)
		heartShape.lineTo(10, 30)
		
		const geometry = new THREE.ShapeGeometry( heartShape );
		const material = new THREE.MeshBasicMaterial( { 
			color: new THREE.Color('moccasin'), 
			side: THREE.DoubleSide, 
			transparent:true, 
			opacity: 0.5 } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.rotateX( Math.PI / 2);
		//mesh.position.y = 0.01
		this.scene.add( mesh );
	}

	stopDrawing = () => {

	}
}