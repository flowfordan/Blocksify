import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, fatLineObj, lMat, lMat2, lGeom, pMat } from "../objs3d";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { Tool } from "./Tool";
import { toJS } from "mobx";


export class Line extends Tool{
    lineMode: number;
    lineParts: number;
   
    //TODO: active layer to constructor to adjust settings? like color and width
    constructor(canvas: HTMLCanvasElement, 
        scene: THREE.Scene, drawMode: number){
		super(canvas, scene)

        this.lineMode = drawMode; //0: 2pt line, 1:polyline
        this.lineParts = 1;
    }

    startDrawing = (camera: typeof this.currentCamera, 
		plane: typeof this.currentPlane, layer: typeof this.layer) => {
        console.log('LINE START')
		super.startDrawing(camera, plane, layer);

		//TODO null layer fix?
		this.obj.line.mat = this.layer!.content.main!.mat.line!;
        
        this.canvas.addEventListener('mousemove', this._onMouseMove);
        this.canvas.addEventListener('click', this._onDrawClick);
        this.canvas.addEventListener('dblclick', this._onDBClick);
		window.addEventListener('keypress', this._onEnter);

    }

    private _onMouseMove = (e: MouseEvent) => {
        //get coords
        const mouseLoc = getMouseLocation(
            e, this.rect!, this.canvas, 
            this.currentCamera!, this.currentPlane!);
        //upd coords
        this.currentPointerCoord = mouseLoc;
        
        if(this.toolState === 2){
            console.log('Line: upd')

            //UPDATING LINE COORDS
            //cut pushed to right amount - 1 chunk before new push
            if(this.lineMode === 0){
                this.objCoords.line.length = 3;            
            } else if (this.lineMode === 1){
                this.objCoords.line.length = this.lineParts * 3
            }

            let coords: Array<number> = Object.values(this.currentPointerCoord!)
            this.objCoords.line.push.apply(this.objCoords.line, coords);

			//TODO GUIDE LINE
            this.scene.add(this.guideObj.line.form!);
            this.lineMode === 0?this.guideObj.line.geom!.setPositions(this.objCoords.line)
            :
            this.guideObj.line.geom!.setPositions(this.objCoords.line.slice(this.lineParts * 3 - 3));

            this.guideObj.line.form!.computeLineDistances();
        }
    }

    private _onDrawClick = () => {
        if(this.toolState === 1){
            console.log('Line: first pt');
			console.log(this.obj.line)

			//INIT GEOM and FORM
			this.obj.line.geom = new LineGeometry();
			this.obj.line.form = new Line2(this.obj.line.geom, this.obj.line.mat!);

            let coords: Array<number> = Object.values(this.currentPointerCoord!);
            this.objCoords.line.push.apply(this.objCoords.line, coords);

            this.obj.points.form = pointObj(this.objCoords.line);
            this.scene.add(this.obj.points.form);

            //GUIDELINE
            this.guideObj.line.form = new Line2(
				this.guideObj.line.geom!, this.guideObj.line.mat!);
            
            this.toolState = 2;
        }

        else if(this.toolState === 2){
            console.log('Line: second pt')                        
            //LINES HANDLE
			//case of 2-points Line
            if(this.lineMode === 0 || this.lineParts === 1){ 
				this.obj.line.geom!.setPositions(this.objCoords.line);

                this.scene.remove(this.guideObj.line.form!)
            } 
			//case of Polyline
			else {
                this.scene.remove(this.obj.line.form!)
                this.obj.line.geom = new LineGeometry()
                this.obj.line.geom.setPositions(this.objCoords.line)
                this.obj.line.form = new Line2(this.obj.line.geom, this.obj.line.mat!);
            }

            //if this is PL mode and segment after 1
            //modify existing polyline geometry
            this.obj.line.form!.layers.set(this.layer!.id);
            this.scene.add(this.obj.line.form!);
			this.obj.line.form!.computeLineDistances();

            //POINTS HANDLE
            this.scene.remove(this.obj.points.form!)
            this.obj.points.form = pointObj(this.objCoords.line)
            this.scene.add(this.obj.points.form)
     
            
            //clear and begin new item if LINE
            //begin new segment if PLINE
            if(this.lineMode === 0){
                this._resetLoop();
            } else {
                this.toolState = 2;
                this.lineParts++
            }            
        }
    }

	private _onEnter = (event: KeyboardEvent) => {
		if(event.key === 'Enter'){
			this._resetLoop();
		}
	}

    //private _onPLDone
    private _onDBClick = (e: MouseEvent) => {
        //HANDLE SAME SPOT DBCLICK
        if(this.objCoords.line.length === 3){
            this.scene.remove(this.obj.points.form!)
        }

		//start new line
        this._resetLoop()
        console.log(this.scene.children)
    }

    stopDrawing = () => {
        console.log('Line Drawing stopped');
		super.stopDrawing();
        //delete began forms
		//TODO check for null obj - then delete if not null
        this.scene.remove(this.guideObj.line.form!);
        this.scene.remove(this.obj.line.form!);
        this.scene.remove(this.obj.points.form!);

        this._resetLoop();
        
        //rmv EL
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        this.canvas.removeEventListener('dblclick', this._onDBClick);
		window.removeEventListener('keypress', this._onEnter);
    }

    protected _resetLoop = () => {
		super._resetLoop();
        console.log('THIS LAYER', toJS(this.scene.children))
        this.scene.remove(this.guideObj.line.form!);

        this.obj.line.form = null;
		this.obj.line.geom = null;

        this.obj.points.form = new THREE.Points();
        this.objCoords.line = [];

        this.lineParts = 1;
    } 
}