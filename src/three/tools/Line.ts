import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, fatLineObj, lMat, lMat2, lGeom } from "../objs3d";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { Layer } from "../../state";


export class Line{

    toolState: number;
    canvas: HTMLCanvasElement;
    rect: DOMRect|null;
    scene: THREE.Scene;
    currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera|null;
    currentPlane: THREE.Plane|null;
    currentCoord: THREE.Vector3;
    currentLineCoords: Array<number>;
    currentLineCoordsV3: Array<THREE.Vector3>;
    lineMode: number;
    lineParts: number;
    line: {
        line: Line2,
        lGeom: LineGeometry,
        lMat: LineMaterial
    };
    guideLine: {
        line: Line2,
        lGeom: LineGeometry,
        lMat: LineMaterial
    };
    form: {
        p1: THREE.Points,
        p2: THREE.Points
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
        this.currentLineCoordsV3 = [];
        this.currentLineCoords = [];

        this.lineMode = drawMode; //0-2pt line, 1-polyline
        this.lineParts = 1;

        this.line = {
            line: new Line2(),
            lGeom: new LineGeometry(),
            lMat: lMat2
        }

        this.guideLine = {
            line: new Line2(),
            lGeom: new LineGeometry(),
            lMat: lMat
        };

        this.form = {
            p1: new THREE.Points(),
            p2: new THREE.Points()
        }
        
        this.toolState = initToolState; //state from 1 to 3
    }

    startDrawing = (camera: typeof this.currentCamera, plane: typeof this.currentPlane, layer:Layer) => {
        console.log('NEW START')
        this.toolState = 1;

        this.layer = layer

        this.currentCamera = camera;
        this.currentPlane = plane;
        
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
            this.currentLineCoordsV3[1] = this.currentCoord;

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
            console.log('Line: first pt')
            console.log(this.line, this.currentLineCoords)

            this.currentLineCoordsV3[0] = new THREE.Vector3().copy(this.currentCoord!);

            let coords: Array<number> = Object.values(this.currentCoord!)
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            console.log(this.currentLineCoords)

            this.form.p1 = pointObj(this.currentLineCoordsV3[0]);

            //adding
            this.scene.add(this.form.p1);

            //GUIDE
            this.guideLine.line = new Line2(this.guideLine.lGeom, this.guideLine.lMat)
            
            this.toolState = 2;
        }

        else if(this.toolState === 2){
            console.log('Line: second pt')

            //handle same-spot-click
            //for mode = 0
            if(this.currentLineCoords.length === 3){
                this.scene.remove(this.form.p1)
                return
            }
            //for mode = 1

            this.currentLineCoordsV3[1] = new THREE.Vector3().copy(this.currentCoord!);
            //check if this is the same (1) point
            console.log('THIS', this.currentLineCoords)
            if(this.currentLineCoordsV3[0] == this.currentCoord){
                console.log('THIS IS ERROR', this.currentLineCoordsV3)
            }
            

            let coords: Array<number> = Object.values(this.currentCoord!)

            this.form.p2 = pointObj(this.currentLineCoordsV3[1]);

            if(this.lineMode === 0 || this.lineParts === 1){
                this.line.line = new Line2(this.line.lGeom, this.line.lMat)
                this.line.lGeom.setPositions(this.currentLineCoords);
                this.scene.remove(this.guideLine.line)
                //adding   
            } else {
                this.scene.remove(this.line.line)
                this.line.lGeom = new LineGeometry()
                this.line.lGeom.setPositions(this.currentLineCoords)
                this.line.line = new Line2(this.line.lGeom, this.line.lMat);
            }
            //if this is PL mode and segment after 1
            //modify existing polyline geometry
            this.line.line.layers.set(this.layer!.id);
            let color = this.layer?.appearance.colorLine
            this.line.line.material.color.setHex(color!)
            this.scene.add(this.form.p2, this.line.line);
            
            console.log('SCENE', this.scene.children)
            console.log(this.line.lGeom, this.line.line.geometry)
            
            
            //clear and begin neww item if line
            //begin new segment if PLine
            if(this.lineMode === 0){
                this._reset();
            } else {
                this.toolState = 2;
                this.lineParts++
            }            
        }
    }

    //private _onPLDone
    private _onDBClick = (e: MouseEvent) => {
        console.log(this.currentLineCoords)
        console.log('PLine created')
        //if dbclick before first point - ignore it
        // if(this.toolState === 1){
        //     return
        // }

        this._reset()
        console.log(this.scene.children)
        

    }

    stopDrawing = () => {
        console.log('Drawing stopped')
        //delete guide and point from scene
        this.scene.remove(this.guideLine.line)
        
        //rmv EL
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        this.canvas.removeEventListener('dblclick', this._onDBClick);

        //remove 1 point of began line
        if(this.toolState === 2){
            this.scene.remove(this.form.p1)
        };

        this.currentLineCoords = [];

        if(this.lineMode === 1){
            this.scene.remove(this.line.line)
            this.lineParts = 1
        }
    }

    private _reset = () => {
        this.line.line = new Line2()
        this.line.lGeom = new LineGeometry()
        this.currentLineCoords = []
        this.toolState = 1;
        this.lineParts = 1
    } 
}