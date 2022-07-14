import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, lineObj, fatLineObj, fatGuideLineObj, lMat, lGeom } from "../objs3d";
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';


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
    guideLine: {
        line: Line2,
        lGeom: LineGeometry,
        lMat: LineMaterial
    }

    constructor(canvas: HTMLCanvasElement, rect: DOMRect, scene: THREE.Scene, initToolState: number){
        
        this.canvas = canvas;
        this.rect = rect;
        this.scene = scene;

        this.currentCamera = null;
        this.currentPlane = null;

        this.currentCoord = new THREE.Vector3();
        this.currentLineCoordsV3 = [];
        this.currentLineCoords = [];

        this.guideLine = {
            line: new Line2(),
            lGeom: lGeom,
            lMat: lMat
        };
        
        this.toolState = initToolState; //state from 1 to 3
    }

    startDrawing = (camera: typeof this.currentCamera, plane: typeof this.currentPlane) => {
        this.toolState = 1;

        this.currentCamera = camera;
        this.currentPlane = plane;
        

        this.canvas.addEventListener('mousemove', this._onMouseMove);

        this.canvas.addEventListener('click', this._onDrawClick);

        //TODO: keyDown(Esc or Right Mouse) - AFFECT PARENT CLASS
        //abort drawing by esc
        //TODO: delete parts of not-finished-line
        // onDrawKeyDown = (event: any ) => {
        //     if(event.key === "Escape"){
        //         this.store.dispatch(toggleDrawLine(false))
        //     }
        // }
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

            //updating guide line
            this.currentLineCoords.length = 3
            let coords: Array<number> = Object.values(this.currentCoord!)
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            // let guideLine = new FatGuideLineObj(this.currentLineCoords).init();
            
            this.scene.add(this.guideLine.line);
            this.guideLine.lGeom.setPositions(this.currentLineCoords);
            this.guideLine.line.computeLineDistances();
        }
    }

    private _onDrawClick = () => {
        if(this.toolState === 1){
            console.log('Line: first pt')

            this.currentLineCoordsV3[0] = new THREE.Vector3().copy(this.currentCoord!);

            let coords: Array<number> = Object.values(this.currentCoord!)
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            let point = pointObj(this.currentLineCoordsV3[0]);
            //adding
            this.scene.add(point);

            //GUIDE
            this.guideLine.line = new Line2(this.guideLine.lGeom, this.guideLine.lMat)

            this.toolState = 2;
        }

        else if(this.toolState === 2){
            console.log('Line: second pt')

            this.currentLineCoordsV3[1] = new THREE.Vector3().copy(this.currentCoord!);

            let coords: Array<number> = Object.values(this.currentCoord!)
            this.currentLineCoords.push.apply(this.currentLineCoords, coords);

            let point = pointObj(this.currentLineCoordsV3[1]);
            // let line = lineObj(this.currentLineCoordsV3)
            let line = fatLineObj(this.currentLineCoords)

            //adding
            this.scene.add(point, line);
            //push to scene
            this.toolState = 1;
            //clear
            this.currentLineCoords = []
        }

    }

    stopDrawing = () => {
        //delete guide from scene
        this.scene.remove(this.guideLine.line)
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
        console.log(this.guideLine.line)
        console.log(this.scene.children)
    }
}