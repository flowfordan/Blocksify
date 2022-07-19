import * as THREE from 'three';
import { renderer } from '../renderer/renderer';

const camera = new THREE.PerspectiveCamera(
    75,
    renderer.domElement.width / renderer.domElement.height, 
    0.1, 
    2000)

camera.position.set(15, 20, 20)

let width = renderer.domElement.width
let height = renderer.domElement.height
let aspect = width/height
let viewSize = 100
const orhtoCamera = new THREE.OrthographicCamera(
    aspect*viewSize / -2, aspect*viewSize / 2, viewSize / 2, viewSize / -2, 0, 1000
)

orhtoCamera.position.set(0, 15, 0)
orhtoCamera.lookAt(0,0,0)

export {camera, orhtoCamera}