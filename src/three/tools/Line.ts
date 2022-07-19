import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, fatLineObj, lMat, lGeom } from "../objs3d";
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

        this.guideLine = {
            line: new Line2(),
            lGeom: lGeom,
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

            this.currentLineCoordsV3[1] = new THREE.Vector3().copy(this.currentCoord!);

            let coords: Array<number> = Object.values(this.currentCoord!)

            console.log(coords)
            console.log(this.currentLineCoords)


            this.form.p2 = pointObj(this.currentLineCoordsV3[1]);
            let line = fatLineObj(this.currentLineCoords);

            line.layers.set(this.layer!.id);

            let color = this.layer?.appearance.colorLine
            line.material.color.setHex(color!)
            console.log(color, line)

            //adding
            this.scene.add(this.form.p2, line);
            this.scene.remove(this.guideLine.line)
            //push to scene
            
            //clear
            if(this.lineMode === 0){
                this.currentLineCoords = []
                this.toolState = 1;
            } else {
                this.toolState = 2;
                this.lineParts++
            }

            console.log(this.lineParts)
            
        }
    }

    //private _onPLDone

    stopDrawing = () => {
        console.log('Drawing stopped')
        //delete guide and point from scene
        this.scene.remove(this.guideLine.line)
        
        //rmv EL
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);

        //remove 1 point of began line
        if(this.toolState === 2){
            this.scene.remove(this.form.p1)
        };

        this.currentLineCoords = [];

        if(this.lineMode === 1){
            this.lineParts = 1
        }
    }
}