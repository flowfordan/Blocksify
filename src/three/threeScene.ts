import { AppStore } from './../store/store';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlane} from './geometry/worldPlane';
import { setupStore as store } from '../store/store';




interface ThreeSceneIf<T> {
    new(...args: any[]): T;
  }

export const threeScene: any = {   
    init(canvasRef: any) {
        
        this.canvasDomEl = canvasRef
        this.store = store;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xffffff );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasDomEl,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xEEEEEE);


        this.camera = camera;

        // Create meshes, materials, etc.
        this.scene.add(cube, worldPlane, gridHelper);

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)

        this.controls = new OrbitControls(this.camera, this.canvasDomEl)
        this.controls.enableDamping = true

        //STATS
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        this.stats.update()

        this.update();
        this.subscribe()    
    },

    subscribe(){
        store.subscribe(this.changeCubeColor)
    },

    changeCubeColor(){
        console.log('COLOR CHANGE THREE SCENE', this) 
        console.log(store)
        cube.material.color.setHex(store.getState().envReducer.color)
        
    },




    // onWindowResize(vpW:any, vpH:any) {
    //     this.renderer.setSize(vpW, vpH);
    //     this.camera.aspect = vpW / vpH
    //     this.camera.updateProjectionMatrix()
    // }



    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));

        this.controls.update()
        this.stats.update()
        //console.log(this.store.getState().envReducer.color)
        //this.store.dispatch(sidebarSlice.actions.inc(1))
        
    }

 

    
}