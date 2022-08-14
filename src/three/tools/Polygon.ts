import * as THREE from "three";
import { Layer } from "../../state";
import { getMouseLocation } from "../utils";
import { Tool } from "./Tool";


export class Polygon extends Tool{

	constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
		super(canvas, scene);
	}

	startDrawing = (camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, 
		layer: typeof this.layer) => {
		super.startDrawing(camera, plane, layer);
		
		//init form, geometry, material
		this.obj.polygon.mat = new THREE.MeshBasicMaterial( { 
			color: new THREE.Color('moccasin'), 
			side: THREE.DoubleSide, 
			transparent:true,
			opacity: 0.5 
		} );

		this.obj.polygon.geom = new THREE.Shape();

		//geometry creation
		const geometry = new THREE.ShapeGeometry();
		this.obj.polygon.form = new THREE.Mesh( geometry, this.obj.polygon.mat );

		//rotate(by def created on x-z plane)
		this.obj.polygon.form.rotateX( Math.PI / 2);
		this.scene.add( this.obj.polygon.form );
		
		//init guide obj
		
		//add EL
		this.canvas.addEventListener('mousemove', this._onMouseMove);
        this.canvas.addEventListener('click', this._onDrawClick);
        this.canvas.addEventListener('dblclick', this._onDBClick); 
	}

	_onMouseMove = (e: MouseEvent) => {
		//get coords
        const mouseLoc = getMouseLocation(
            e, this.rect!, this.canvas, 
            this.currentCamera!, this.currentPlane!);
        
        //upd coords
        this.currentPointerCoord = mouseLoc;
	};

	_onDrawClick = () => {
		if(this.obj.polygon.geom && this.toolState === 1){
			this.obj.polygon.geom.moveTo(this.currentPointerCoord.x, this.currentPointerCoord.z);

			this.toolState = 2

		} else if (this.obj.polygon.geom && this.toolState === 2) {
			this.obj.polygon.geom.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
			this.obj.polygon.form!.geometry = new THREE.ShapeGeometry( this.obj.polygon.geom );
			console.log(this.scene.children)
		}
		
	};

	_onDBClick = () => {

	};

	protected _resetLoop = () => {
		super._resetLoop();
	}

	stopDrawing() {
		super.stopDrawing();

		this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        this.canvas.removeEventListener('dblclick', this._onDBClick);
	}
}