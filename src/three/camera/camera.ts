import * as THREE from 'three';
import { renderer } from '../renderer/renderer';

export const camera = new THREE.PerspectiveCamera(
    75,
    renderer.domElement.width / renderer.domElement.height,
    // window.innerWidth / window.innerHeight, 
    0.1, 
    2000)

camera.position.set(15, 20, 20)