import * as THREE from "three";
import { Layer } from "../../state";
import { pointObj, V2ArrToNumArr } from "../objs3d";
import { getMouseLocation } from "../utils";
import { Tool } from "./Tool";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { CompressedTextureLoader } from "three";


export class Polygon extends Tool{

	polygonParts: number;

	constructor(canvas: HTMLCanvasElement, scene: THREE.Scene){
		super(canvas, scene);
		this.polygonParts = 1;
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
		this.obj.line.mat = this.layer?.content.main?.mat.line!;
		this.obj.line.geom = new LineGeometry();

		this.obj.line.form = new Line2(this.obj.line.geom, this.obj.line.mat);
		this.obj.line.form.layers.set(this.layer!.id);
		this.scene.add(this.obj.line.form);

		
		//init guide obj
		this.guideObj.polygon.mat = new THREE.MeshBasicMaterial( { 
			color: new THREE.Color('skyblue'), 
			side: THREE.DoubleSide, 
			transparent:true,
			opacity: 0.5 
		} );
		this.guideObj.polygon.geom = new THREE.Shape();
		const shapeGuideGeom = new THREE.ShapeGeometry(this.guideObj.polygon.geom);

		this.guideObj.polygon.form = new THREE.Mesh( shapeGuideGeom, this.guideObj.polygon.mat );
		this.guideObj.polygon.form.name = 'guide'

		//rotate(by def created on x-z plane)
		this.guideObj.polygon.form.rotateX( Math.PI / 2);

		
		//add EL
		this.canvas.addEventListener('mousemove', this._onMouseMove);
        this.canvas.addEventListener('click', this._onDrawClick);
        this.canvas.addEventListener('dblclick', this._onDBClick);
		window.addEventListener('keypress', this._onEnter);
  
	}

	_onMouseMove = (e: MouseEvent) => {
		//get coords
        const mouseLoc = getMouseLocation(
            e, this.rect!, this.canvas, 
            this.currentCamera!, this.currentPlane!);
        
        //upd coords
        this.currentPointerCoord = mouseLoc;

		//upd guideLine
		//1, 2, currentpoint
		//show when 2 pts created
		if(this.toolState === 2 && this.objCoords.line.length >= 9){
			this.scene.remove(this.guideObj.polygon.form!)

			this.guideObj.polygon.geom = new THREE.Shape();
			const pt1 = this.obj.polygon.geom!.getPoints()[0];
			this.guideObj.polygon.geom?.moveTo(pt1.x, pt1.y)
			this.guideObj.polygon.geom?.lineTo(this.currentPointerCoord.x, this.currentPointerCoord.z)
			const pt2 = this.obj.polygon.geom!.getPoints()[this.obj.polygon.geom!.getPoints().length-1];
			this.guideObj.polygon.geom?.lineTo(pt2.x, pt2.y)

			
			this.guideObj.polygon.form = new THREE.Mesh( new THREE.ShapeGeometry( this.guideObj.polygon.geom! ), this.guideObj.polygon.mat! );
			this.guideObj.polygon.form.name = 'guide'
	
			//rotate(by def created on x-z plane)
			this.guideObj.polygon.form.rotateX( Math.PI / 2);

			this.scene.add(this.guideObj.polygon.form!)

			console.log(this.scene.children)
			console.log(this.guideObj.polygon.form!)
		}
			
	};

	_onDrawClick = () => {
		if(this.obj.polygon.geom && this.toolState === 1){
			this.obj.polygon.geom.moveTo(this.currentPointerCoord.x, this.currentPointerCoord.z);

			//add pt
			this.obj.points.form = pointObj([this.currentPointerCoord.x, 0, this.currentPointerCoord.z]);
            this.scene.add(this.obj.points.form);

			//add guideLine
			this.guideObj.line.geom = new LineGeometry();
			this.guideObj.line.form = new Line2(this.guideObj.line.geom, this.guideObj.line.mat!);
			this.scene.add(this.guideObj.line.form);

			//add guidePoly

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
			this.scene.remove(this.obj.points.form!);
			this.obj.points.form = pointObj(currentLineCoords);
            this.scene.add(this.obj.points.form);

			//upd polyline
			//TODO upd geom without cr new
			this.obj.line.form!.geometry = new LineGeometry();
			this.obj.line.form!.geometry.setPositions(this.objCoords.line);
			this.obj.line.form!.computeLineDistances();


			this.scene.remove(this.guideObj.polygon.form!)

			console.log(this.scene.children)
		}
		
	};

	_onDBClick = () => {

	};

	private _onEnter = (event: KeyboardEvent) => {
		if(event.key === 'Enter'){
			this._resetLoop();
		}
	}

	protected _resetLoop = () => {
		super._resetLoop();
		this.scene.remove(this.guideObj.polygon.form!)

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
		window.removeEventListener('keypress', this._onEnter);

	}
}