import * as THREE from "three";
import { Layer } from "../../state";
import { Tool } from "./Tool";


export class Polygon extends Tool{

	constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
		super(canvas, scene);
	}

	startDrawing = (camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, 
		layer: typeof this.layer) => {
		super.startDrawing(camera, plane, layer);
		//do specific stuff
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
		console.log(heartShape.getPoints())
	}

	protected _resetLoop = () => {
		super._resetLoop();
	}

	stopDrawing() {
		super.stopDrawing();
	}
}