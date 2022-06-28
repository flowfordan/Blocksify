import { defCoords } from './actions/defCurrentCoords';
import { createPoint } from './actions/createPoint';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlane} from './geometry/worldPlane';
import { AppStore } from '../store/store';
import { setupStore as store } from '../store/store';
import { UIState, updateCoords } from '../store/reducers/uiSlice';
import { CombinedState } from '@reduxjs/toolkit';
import { DrawState } from '../store/reducers/drawingSlice';




interface ThreeViewIf<T> {
    new(...args: any[]): T;
  }

export class ThreeView {

    store: AppStore;
    state: CombinedState<{
        drawReducer: DrawState;
        uiReducer: UIState;
    }>;
    scene: any;
    renderer: any;
    camera: any;
    light: any;
    controls: any;
    stats: any;
    activeElement: any

    constructor(canvasRef: any) {
        
        this.store = store;
        this.state = store.getState()

        // this.state = {
        //     getCoords: true,
        //     globalCoords: 0,
        // };

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xb3deff );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xEEEEEE);
        this.activeElement = this.renderer.domElement;

        this.camera = camera;

        this.scene.add(cube, worldPlane, gridHelper);
        cube.material.color.setHex(store.getState().uiReducer.color)

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true

        //STATS
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        this.stats.update()

        this.update();
        

        this.store.subscribe(this.changeCubeColor)
        this.updGlobalCoords()
        
    }

    changeCubeColor = () => {
        cube.material.color.setHex(this.store.getState().uiReducer.color) 
    }


    // getWorldCoords(toggle: boolean){
    //     if(!toggle){
    //         return
    //     }
    //     console.log('getWorldCoords')
    //     return this.state.globalCoords;
    // }

    updGlobalCoords = () => {
        console.log(this)
        if(this.state.uiReducer.isFetchingGlobalCoords){
            console.log('pointer move')
            this.activeElement.addEventListener( 'pointermove', this.onGetMouseLoc );
        } else if(!this.state.uiReducer.isFetchingGlobalCoords){
            this.activeElement.removeEventListener( 'pointermove', this.onGetMouseLoc );
        }
    }

    onGetMouseLoc = (event: any) => {
        event.preventDefault();
        //if true start func
        //console.log(this.state.globalCoords)
            //...
            let mouse = new THREE.Vector2();
            let raycaster = new THREE.Raycaster();

            let rect = this.renderer.domElement.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            mouse.x = ( x / this.activeElement.width ) * 2 - 1;
            mouse.y = - ( y / this.activeElement.height ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );

            const intersects = raycaster.intersectObjects( this.scene.children );

            for (let i = 0; i < intersects.length; i++){
                if(intersects[i].object.name === 'ground'){
                   let currentCoords = intersects[i].point;
                   //this.state.uiReducer.globalCoords = currentCoords;
                   this.store.dispatch(updateCoords({
                    x: currentCoords.x, y:currentCoords.y ,z:currentCoords.z
                }))
                   console.log(currentCoords)
                }
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
        //requestAnimationFrame(() => this.updGlobalCoords())

        this.controls.update()
        this.stats.update() 
    }

 

    
}