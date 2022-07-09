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

import { _vec3, _vec2, raycaster } from './common';

import { drawClick, drawingLine, startDrawingLine } from './actions/drawLine';

interface ItoolsState {
    line: {
        status: number 
        coords: Array<THREE.Vector3>
    }, 
    polyline: {
        status: number,
        coords: Array<THREE.Vector3>
    }
}

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
    toolsState: ItoolsState;
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
        //subscriptions
        this.store.subscribe(this.changeCubeColor);
        this.store.subscribe(this.updGlobalCoords);
        this.store.subscribe(this.onStartDrawingLine);

        this.updGlobalCoords();
    }

    rdxState = () => store.getState();
    //TODO: methods for getting different reducers

    onDrawingLine = drawingLine.bind(this);
    onStartDrawingLine = startDrawingLine.bind(this);
    onDrawClick = drawClick.bind(this);

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
    onUpdMouseLoc = (event: PointerEvent) => {
        let mouseLoc = this.getMouseLocation(event);
        this.store.dispatch(updateCoords({
            x: mouseLoc.x, 
            y: mouseLoc.y,
            z:mouseLoc.z
        })) //send mouseloc to UI

        //check active tool and trigger drawing
        if(this.rdxState().drawReducer.isDrawLine){
            this.onDrawingLine(mouseLoc);
        }
    };

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

    //abort drawing by esc
    //TODO: delete parts of not-finished-line
    onDrawKeyDown = (event: any ) => {
        if(event.key === "Escape"){
            this.store.dispatch(toggleDrawLine(false))
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