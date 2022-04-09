import * as THREE from 'three';
import {cube} from './geometry/geometry'

interface ThreeViewIf<T> {
    new(...args: any[]): T;
  }

export class ThreeView {

    scene: any;
    renderer: any;
    camera: any;
    light: any;

    constructor(canvasRef: any) {
        
        this.scene = new THREE.Scene();
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });

        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            2000)
        
        this.camera.position.set(30, 30, 30)

        this.light = new THREE.AmbientLight()
        this.light.intensity = 0.3;

        // Create meshes, materials, etc.
        this.scene.add(cube);

        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //
    //updateValue(value) {
      // Whatever you need to do with React props
    //}

    onMouseMove() {
      // Mouse moves
    }

    onWindowResize(vpW:any, vpH:any) {
        this.renderer.setSize(vpW, vpH);
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }
}