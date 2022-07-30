import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, fatLineObj, lMat, lMat2, lGeom, pMat } from "../objs3d";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { Layer } from "../../state";
import { BufferGeometry } from "three";
import { toJS } from "mobx";


export class Line{

    toolState: number;
    canvas: HTMLCanvasElement;
    rect: DOMRect|null;
    scene: THREE.Scene;
    currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera|null;
    currentPlane: THREE.Plane|null;
    currentCoord: THREE.Vector3;
    currentLineCoords: Array<number>;
    lineMode: number;
    lineParts: number;
    line: {
        line: Line2,
        lGeom: LineGeometry,
        lMat: LineMaterial
    };
    points: {
        points: THREE.Points,
        geom: BufferGeometry,
        mat: THREE.PointsMaterial
    }
    guideLine: {
        line: Line2,
        lGeom: LineGeometry,
        lMat: LineMaterial
    };
    layer: Layer|null;

    //TODO: active layer to constructor to adjust settings? like color and width
    constructor(canvas: HTMLCanvasElement, 
        scene: THREE.Scene, drawMode: number, initToolState: number){
        
        this.canvas = canvas;
        this.rect = canvas.getBoundingClientRect();
        this.scene = scene;
        this.layer = null;

        this.currentCamera = null;
        this.currentPlane = null;

        this.currentCoord = new THREE.Vector3();
        this.currentLineCoords = [];

        this.lineMode = drawMode; //0-2pt line, 1-polyline
        this.lineParts = 1;

        this.line = {
            line: new Line2(),
            lGeom: new LineGeometry(),
            lMat: new LineMaterial(),
        };

        this.points = {
           points: new THREE.Points(),
           geom: new BufferGeometry(),
           mat: pMat
        }

        this.guideLine = {
            line: new Line2(),
            lGeom: new LineGeometry(),
            lMat: new LineMaterial(),
        };
        
        this.toolState = initToolState; //state from 1 to 3
    }

    startDrawing = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer:Layer) => {
        console.log('NEW START')
        this.toolState = 1;

        this.layer = layer;

        this.currentCamera = camera;
        this.currentPlane = plane;

		//setting forms properties from layer
		this.guideLine.lMat = new LineMaterial({
			color: 0x0E89E1,
			linewidth: 2,
			resolution: new THREE.Vector2(1920, 1080),
			dashed: true,
			opacity: 0.8
		
		});

		this.line.lMat = layer.material.line;
        
        this.canvas.addEventListener('mousemove', this._onMouseMove);
        this.canvas.addEventListener('click', this._onDrawClick);
        //TODO: if polyline - addEL for Right Mouse or Enter
        this.canvas.addEventListener('dblclick', this._onDBClick); 

    }

    private _onMouseMove = (e: MouseEvent) => {
        //get coords
        const mouseLoc = getMouseLocation(
            e, this.rect!, this.canvas, 
            this.currentCamera!, this.currentPlane!);
        
        //upd coords
        this.currentCoord = mouseLoc;
        
        if(this.toolState === 2){
            console.log('Line: upd')

            //UPDATING LINE COORDS
            //cut pushed to right amount - 1 chunk before new push
            if(this.lineMode === 0){
                this.currentLineCoords.length = 3               
            } else if (this.lineMode === 1){
                this.currentLineCoords.length = this.lineParts * 3
            }

            let coords: Array<number> = Object.values(this.currentCoord!)
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            this.scene.add(this.guideLine.line);
            this.lineMode === 0?this.guideLine.lGeom.setPositions(this.currentLineCoords)
            :
            this.guideLine.lGeom.setPositions(this.currentLineCoords.slice(this.lineParts * 3 - 3));

            this.guideLine.line.computeLineDistances();
        }
    }

    private _onDrawClick = () => {
        if(this.toolState === 1){
            console.log('Line: first pt');

            let coords: Array<number> = Object.values(this.currentCoord!);
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            this.points.points = pointObj(this.currentLineCoords);
            this.scene.add(this.points.points);

            //GUIDELINE
            this.guideLine.line = new Line2(this.guideLine.lGeom, this.guideLine.lMat);
            
            this.toolState = 2;
        }

        else if(this.toolState === 2){
            console.log('Line: second pt')                        
            //LINES HANDLE
            if(this.lineMode === 0 || this.lineParts === 1){
                this.line.line = new Line2(this.line.lGeom, this.line.lMat)
                this.line.lGeom.setPositions(this.currentLineCoords);
                this.scene.remove(this.guideLine.line)
            } else {
                this.scene.remove(this.line.line)
                this.line.lGeom = new LineGeometry()
                this.line.lGeom.setPositions(this.currentLineCoords)
                this.line.line = new Line2(this.line.lGeom, this.line.lMat);
            }
            //if this is PL mode and segment after 1
            //modify existing polyline geometry
            this.line.line.layers.set(this.layer!.id);
            this.scene.add(this.line.line);

            //POINTS HANDLE
            this.scene.remove(this.points.points)
            this.points.points = pointObj(this.currentLineCoords)
            this.scene.add(this.points.points)         
            
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

    //private _onPLDone
    private _onDBClick = (e: MouseEvent) => {
        //HANDLE SAME SPOT DBCLICK
        if(this.currentLineCoords.length === 3){
            this.scene.remove(this.points.points)
        }

		//start new line
        this._resetLoop()
        console.log(this.scene.children)
    }

    stopDrawing = () => {
        console.log('Drawing stopped')
        //delete began forms
        this.scene.remove(this.guideLine.line);
        this.scene.remove(this.line.line);
        this.scene.remove(this.points.points);

        this._resetLoop();
        this.toolState = 0;
        
        //rmv EL
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        this.canvas.removeEventListener('dblclick', this._onDBClick);
    }

    private _resetLoop = () => {
        console.log('THIS LAYER', toJS(this.scene.children))
        this.scene.remove(this.guideLine.line);

        this.line.line = new Line2();
        this.line.lGeom = new LineGeometry();

        this.points.points = new THREE.Points();
        this.currentLineCoords = [];
        this.toolState = 1;
        this.lineParts = 1;
    } 
}