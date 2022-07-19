import * as THREE from 'three'
import { Plane } from 'three';

//base world plane
const worldPlaneGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
const worldPlaneMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcbcbcb, 
    side: THREE.DoubleSide });

const worldPlaneMesh = new THREE.Mesh(worldPlaneGeometry, worldPlaneMaterial);
worldPlaneMesh.rotateX( - Math.PI / 2);
worldPlaneMesh.receiveShadow = true;
worldPlaneMesh.name = 'ground';
worldPlaneMesh.position.y = -0.01

const worldPlane = new Plane(new THREE.Vector3( 0, 1, 0 ))
const worldPlaneHelper = new THREE.PlaneHelper( worldPlane, 1, 0xffff00 );

export {worldPlaneMesh, worldPlane, worldPlaneHelper};