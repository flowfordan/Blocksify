import * as THREE from "three";
import { getMouseLocation } from "../utils";
import { pointObj, lineObj } from "../objs3d";


export class Line{

    toolState: number;
    canvas: HTMLCanvasElement;
    rect: DOMRect|null;
    scene: THREE.Scene;
    currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera|null;
    currentPlane: THREE.Plane|null;
    currentCoords: THREE.Vector3|null;
    currentLine: Array<THREE.Vector3>;


    //super
    constructor(canvas: HTMLCanvasElement, rect: DOMRect, scene: THREE.Scene, initToolState: number){
        
        this.canvas = canvas;
        this.rect = rect;
        this.scene = scene;

        this.currentCamera = null;
        this.currentPlane = null;

        this.currentCoords = null;
        this.currentLine = [];
        
        this.toolState = initToolState; //state from 1 to 3
    }


    startDrawing = (camera: typeof this.currentCamera, plane: typeof this.currentPlane) => { //fires when state === 1
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
        this.currentCoords = mouseLoc;
        
        if(this.toolState === 2){
            console.log('Line: upd')
            this.currentLine[1] = this.currentCoords;
        }
    }

    private _onDrawClick = () => {
        if(this.toolState === 1){
            console.log('Line: first pt')

            this.currentLine[0] = new THREE.Vector3().copy(this.currentCoords!);

            let point = pointObj(this.currentLine[0]);
            //adding
            this.scene.add(point);

            this.toolState = 2;
        }

        else if(this.toolState === 2){
            console.log('Line: second pt')
            this.currentLine[1] = new THREE.Vector3().copy(this.currentCoords!);

            let point = pointObj(this.currentLine[1]);
            let line = lineObj(this.currentLine)
            //adding
            this.scene.add(point, line);
            //push to scene
            this.toolState = 1;
        }

    }

    stopDrawing = () => {
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('click', this._onDrawClick);
    }
}