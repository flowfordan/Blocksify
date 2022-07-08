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
import { CombinedState } from '@reduxjs/toolkit';
import { DrawState } from '../store/reducers/drawingSlice';
import { _vec3, _vec2, raycaster } from './common';


export class ThreeView {

    store: AppStore;
    // state: CombinedState<{
    //     drawReducer: DrawState;
    //     uiReducer: UIState;
    // }>;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    activeElement: HTMLCanvasElement;
    rect: DOMRect;
    camera: any;
    groundPlane: typeof worldPlane;
    light: any;
    controls: OrbitControls;
    stats: any;
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

        //set default listeningStatus
       // this.listeningStatus = store.getState().uiReducer.isFetchingGlobalCoords


        //3dobjects
        this.scene.add(cube, worldPlaneMesh, worldPlaneHelper, gridHelper);
        cube.material.color.setHex(store.getState().uiReducer.color)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera,  this.activeElement)
        this.controls.enableDamping = true

        //STATS
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        this.stats.update()


        this.update();
        

        this.store.subscribe(this.changeCubeColor)
        this.store.subscribe(this.updGlobalCoords)

        this.updGlobalCoords();
        console.log(store.getState())
    }


    rdxState = () => store.getState();
    //TODO: methods for getting different reducers

    changeCubeColor = () => {
        cube.material.color.setHex(this.rdxState().uiReducer.color) 
    }

    //to show coords on ground under mouse
    updGlobalCoords = () => {
        if(this.rdxState().uiReducer.isFetchingGlobalCoords){
            //this.listeningStatus = true;
            this.activeElement.addEventListener( 'pointermove', this.onGetMouseLoc );
        } else if(!this.rdxState().uiReducer.isFetchingGlobalCoords){
            //this.listeningStatus = false;
            this.activeElement.removeEventListener( 'pointermove', this.onGetMouseLoc );
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
    onGetMouseLoc = (event: PointerEvent) => {
            let mouseLoc = this.getMouseLocation(event)
            console.log(mouseLoc)
            this.store.dispatch(updateCoords({x: mouseLoc.x, y: mouseLoc.y, z:mouseLoc.z}))
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