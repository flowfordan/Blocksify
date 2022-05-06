import { createPoint } from './actions/createPoint';
import { camera } from './camera/camera';
import { gridHelper } from './planeHelper';
import { dirLight, dirLightHelper, hemiLight } from './lights';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {cube} from './geometry/geometry';
import Stats from 'three/examples/jsm/libs/stats.module';
import {worldPlane} from './geometry/worldPlane';




interface ThreeViewIf<T> {
    new(...args: any[]): T;
  }

export class ThreeView {

    scene: any;
    renderer: any;
    camera: any;
    light: any;
    controls: any;
    stats: any

    constructor(canvasRef: any) {
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xffffff );
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xEEEEEE);

        this.camera = camera;

        // Create meshes, materials, etc.
        this.scene.add(cube, worldPlane, gridHelper);

        //lights
        this.scene.add(dirLight, dirLightHelper, hemiLight)


        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true

        //STATS
        this.stats = Stats()
        document.body.appendChild(this.stats.dom)
        this.stats.update()

        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //
    //updateValue(value) {
      // Whatever you need to do with React props
    //}

    //testbtn
    createGeom(value: boolean) {
        if(value){
            this.scene.background = new THREE.Color( 0xffffff );
            createPoint(this.scene, this.renderer)
        }
        else {
            this.scene.background = new THREE.Color( 0x759FC6 );
        }
        console.log('create geom', value)
    };


    onMouseMove() {
      // Mouse moves
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