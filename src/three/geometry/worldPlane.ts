import * as THREE from 'three'

//base world plane
var worldPlaneGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var worldPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0xcbcbcb, side: THREE.DoubleSide });
var worldPlane = new THREE.Mesh(worldPlaneGeometry, worldPlaneMaterial);
worldPlane.rotateX( - Math.PI / 2);
worldPlane.receiveShadow = true;
worldPlane.name = 'ground';

export {worldPlane};