import * as THREE from 'three';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlaneMesh, worldPlane, worldPlaneHelper} from './geometry/worldPlane';
import { AppStore } from '../store/store';
import { setupStore as store } from '../store/store';
import { UIState, updateCoords } from '../store/reducers/uiSlice';
import { _vec3, _vec2, raycaster } from './common';
import { makeTest } from './actions/makeTest';
import { pointObj, lineObj } from './objs3d';


export class ThreeView {

    store: AppStore;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    activeElement: HTMLCanvasElement;
    rect: DOMRect;
    camera: any;
    groundPlane: typeof worldPlane;
    light: any;
    controls: OrbitControls;
    stats: any;
    toolsState: any;
    //listeningStatus: boolean;
    

    constructor(canvasRef: HTMLCanvasElement) {
        
        this.store = store;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xb3deff );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xEEEEEE);
        this.activeElement = this.renderer.domElement;

        this.rect = canvasRef.getBoundingClientRect();

        this.camera = camera;

        this.groundPlane = worldPlane;

        //3dobjects
        this.scene.add(cube, worldPlaneMesh, worldPlaneHelper, gridHelper);
        cube.material.color.setHex(store.getState().uiReducer.color)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera,  this.activeElement)
        this.controls.enableDamping = true;

        //TEMP TOOLS STATE
        this.toolsState = {
            line: {
                status: 0,//0 - off, 1 -activated, 2 - betw 1 & 2 click, 3 - after 2 click 
                coords: []
            }, 
            polyline: {
                status: 0,
                coords: []
            }
        }

        //STATS
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        this.stats.update();



        this.update();
        

        this.store.subscribe(this.changeCubeColor);
        this.store.subscribe(this.updGlobalCoords);
        this.store.subscribe(this.startDrawingLine);

        this.updGlobalCoords();
    }


    //test
    checkTest = makeTest.bind(this)

    rdxState = () => store.getState();
    //TODO: methods for getting different reducers

    changeCubeColor = () => {
        cube.material.color.setHex(this.rdxState().uiReducer.color) 
    }

    //to show coords on ground under mouse
    updGlobalCoords = () => {
        if(this.rdxState().uiReducer.isFetchingGlobalCoords){
            this.activeElement.addEventListener( 'pointermove', this.onUpdMouseLoc );
        } else if(!this.rdxState().uiReducer.isFetchingGlobalCoords){
            this.activeElement.removeEventListener( 'pointermove', this.onUpdMouseLoc );
        }   
    }

    //TODO:take to dif module
    getMouseLocation = (event: PointerEvent) => {
        event.preventDefault();

        const x = event.clientX - this.rect.left;
        const y = event.clientY - this.rect.top;

        _vec2.x = ( x / this.activeElement.width ) * 2 - 1;
        _vec2.y = - ( y / this.activeElement.height ) * 2 + 1;
        raycaster.setFromCamera( _vec2, this.camera );

        raycaster.ray.intersectPlane(this.groundPlane, _vec3);

        return _vec3;
    }

    //get mouse coords on "ground" plane
    onUpdMouseLoc = (event: PointerEvent) => {
        let mouseLoc = this.getMouseLocation(event);
        this.store.dispatch(updateCoords({
            x: mouseLoc.x, 
            y: mouseLoc.y, 
            z:mouseLoc.z
        })) //send mouseloc to UI

        //check active tool
        if(this.rdxState().drawReducer.isDrawLine){
            console.log('draw')
            this.drawLine(mouseLoc);
            this.checkTest()
        }
    };

    startDrawingLine = () => { //entry point method
        if(this.rdxState().drawReducer.isDrawLine && this.toolsState.line.status === 0){
            this.toolsState.line.status = 1;
            this.activeElement.addEventListener( 'click', this.onDrawClick); //pointerdown?
            this.controls.enableRotate = false;
        }
        else if(!this.rdxState().drawReducer.isDrawLine){
            this.toolsState.line.status = 0;
            this.activeElement.removeEventListener( 'click', this.onDrawClick);
            this.controls.enableRotate = true;
        }
    };


    drawLine = (loc: THREE.Vector3) => {
        //esc or right mouse - dispatch false delete line
        if(this.toolsState.line.status === 1){ //
            //listening to 1st coord of line
            this.toolsState.line.coords[0] = new THREE.Vector3().copy(loc);
        }

        if(this.toolsState.line.status === 2){
            this.toolsState.line.coords[1] = new THREE.Vector3().copy(loc);
        }

        if(this.toolsState.line.status === 3){
            this.toolsState.line.status = 0;
            this.activeElement.removeEventListener( 'click', this.onDrawClick);
        }       
    }



    onDrawClick = () => {
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

    onWindowResize(vpW:any, vpH:any) {
        this.renderer.setSize(vpW, vpH);
        this.camera.aspect = vpW / vpH
        this.camera.updateProjectionMatrix()
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));

        this.controls.update()
        this.stats.update() 
    }

 

    
}