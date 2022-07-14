import { Line } from './tools/Line';
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
import { updateCoords } from '../store/reducers/uiSlice';
import { toggleDrawLine } from '../store/reducers/drawingSlice';

import { getMouseLocation } from './utils';


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
    tools: {
        line: Line
    }

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

        //TOOLS STATE
        this.tools = {
            line: new Line(this.activeElement, this.rect, this.scene, 0),
            //pLine: new pLine()
        }

        //STATS
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        this.stats.update();
        this.update();

        //subscriptions
        this.store.subscribe(this.changeCubeColor);
        this.store.subscribe(this.updGlobalCoords);

        this.store.subscribe(this.setActiveDrawingTool);

        this.updGlobalCoords();
    }

    rdxState = () => store.getState();
    //TODO: methods for getting different reducers

    setActiveDrawingTool = () => {
        if(this.rdxState().drawReducer.isDrawLine 
            && this.tools.line.toolState === 0){
                this.tools.line.startDrawing(this.camera, this.groundPlane);
                this.listenToAbort();
                
        } else if (!this.rdxState().drawReducer.isDrawLine 
        && this.tools.line.toolState !== 0) {
            this.tools.line.stopDrawing();
            this.tools.line.toolState = 0;

            window.removeEventListener('keydown', this.onAbort)
        }

        //TODO:else if for POLYLINE
    }

    listenToAbort = () => {
        //handle escape
        window.addEventListener('keydown', this.onAbort)
    }

    onAbort = (event: KeyboardEvent) => {
        if(event.key === "Escape"){
            this.store.dispatch(toggleDrawLine(false));
            this.setActiveDrawingTool();
        }
    }

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

    //get mouse coords on "ground" plane
    onUpdMouseLoc = (event: MouseEvent) => {
        let mouseLoc = getMouseLocation(
            event, this.rect, this.activeElement,
            this.camera, this.groundPlane);
        
        this.store.dispatch(updateCoords({
            x: mouseLoc.x, 
            y: mouseLoc.y,
            z:mouseLoc.z
        })) //send mouseloc to UI
    };

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