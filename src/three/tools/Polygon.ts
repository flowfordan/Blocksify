import * as THREE from "three";
import { Layer } from "../../state";
import { pointObj, V2ArrToNumArr } from "../objs3d";
import { getMouseLocation } from "../utils";
import { Tool } from "./Tool";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';


export class Polygon extends Tool{

	polygonParts: number;

	constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
		super(canvas, scene);
		this.polygonParts = 1;
		console.log('NEW CONSTRUCTOR POLY')
	}

	startDrawing = (camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, 
		layer: typeof this.layer) => {
		super.startDrawing(camera, plane, layer);
		
		//POLYGON
		//init material, geometry, form,
		this.obj.polygon.mat = this.layer?.content.main?.mat.polygon!;
		
		this.obj.polygon.geom = new THREE.Shape();
		const shapeGeom = new THREE.ShapeGeometry(this.obj.polygon.geom);

		this.obj.polygon.form = new THREE.Mesh( shapeGeom, this.obj.polygon.mat );

		this.obj.polygon.form.name = 'border'

		//rotate(by def created on x-z plane)
		this.obj.polygon.form.rotateX( Math.PI / 2);
		this.scene.add( this.obj.polygon.form );

		//POLYGON POLYLINE
		//TODO if there is contour check
		this.obj.line.mat = this.layer?.content.main?.mat.line!
		
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
			console.log(this.obj.polygon.geom.getPoints());

			//add pts
			this.obj.points.form = pointObj([this.currentPointerCoord.x, 0, this.currentPointerCoord.z]);
            this.scene.add(this.obj.points.form);

			this.toolState = 2

		} else if (this.obj.polygon.geom && this.toolState === 2) {

			this.obj.polygon.geom.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z);
			//TODO find way to extend buffer & not create new geom every time
			this.obj.polygon.form!.geometry = new THREE.ShapeGeometry( this.obj.polygon.geom );
			
			this.objCoords.line.length = 0
			const currentLineCoords = V2ArrToNumArr(
				this.obj.polygon.geom.getPoints(), 
				this.currentPlane!.constant //WORLD PLANE LEVEL
			);

			this.objCoords.line.push
			.apply(this.objCoords.line, currentLineCoords);
			//close line by pushing start point
			this.objCoords.line.push(
				this.objCoords.line[0], this.objCoords.line[1], this.objCoords.line[2]
			)


			//create points
			this.scene.remove(this.obj.points.form);
			this.obj.points.form = pointObj(currentLineCoords);
            this.scene.add(this.obj.points.form);

			//create polyline
			this.scene.remove(this.obj.line.form);

			this.obj.line.geom = new LineGeometry();
			this.obj.line.geom.setPositions(this.objCoords.line);

			this.obj.line.form = new Line2(this.obj.line.geom, this.obj.line.mat);
			this.obj.line.form.layers.set(this.layer!.id);

            this.scene.add(this.obj.line.form);
			this.obj.line.form.computeLineDistances();
		}
		
	};

	_onDBClick = () => {

	};

	protected _resetLoop = () => {
		super._resetLoop();

		this.obj.line.form = new Line2();
		this.obj.line.geom = new LineGeometry();

		this.obj.points.form = new THREE.Points();
		this.objCoords.line = [];
	}

	stopDrawing() {
		super.stopDrawing();

		this._resetLoop();

		this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        this.canvas.removeEventListener('dblclick', this._onDBClick);
	}
}