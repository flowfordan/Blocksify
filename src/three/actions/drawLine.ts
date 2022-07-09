import * as THREE from 'three';
import { pointObj, lineObj } from '../objs3d';


function drawingLine (this: any, loc: THREE.Vector3) {
    if(this.toolsState.line.status === 1){ //
        //writing 1st coord for line
        this.toolsState.line.coords[0] = new THREE.Vector3().copy(loc);
    }

    if(this.toolsState.line.status === 2){
        //writing second coord for line
        this.toolsState.line.coords[1] = new THREE.Vector3().copy(loc);
    }

    if(this.toolsState.line.status === 3){
        //cycle to 0 stage to create new linew within active Drawing-line-mode
        this.toolsState.line.status = 0;
    }       
}

function startDrawingLine (this: any) { //entry point method
    if(this.rdxState().drawReducer.isDrawLine && this.toolsState.line.status === 0){
        this.toolsState.line.status = 1;
        this.controls.enableRotate = false;
        //event listeners
        this.activeElement.addEventListener( 'click', this.onDrawClick); //pointerdown?
        window.addEventListener('keydown', this.onDrawKeyDown); //esc, right mouse
    }
    else if(!this.rdxState().drawReducer.isDrawLine){
        this.toolsState.line.status = 0;
        this.activeElement.removeEventListener( 'click', this.onDrawClick);
        this.controls.enableRotate = true;
    }
};

function drawClick (this: any) {
    if(this.toolsState.line.status === 1){
        console.log('click 1');
        //create point
        let point = pointObj(this.toolsState.line.coords[0]);
        this.scene.add(point);

        setTimeout(() => this.toolsState.line.status = 2, 0)
    }

    if(this.toolsState.line.status === 2){
        console.log('click 2')
        //create point
        let point = pointObj(this.toolsState.line.coords[1]);
        this.scene.add(point);

        //create line
        const line = lineObj(this.toolsState.line.coords)
        this.scene.add( line );
        console.log(this.scene)

        this.toolsState.line.status = 3;        
    }
}

export {drawingLine, startDrawingLine, drawClick}