import * as THREE from 'three';

const _vec2 = new THREE.Vector2();
const _vec3 = new THREE.Vector3();

//raycaster
const raycaster = new THREE.Raycaster();

//default trs is 1
raycaster.params.Line!.threshold = 1;
raycaster.params.Points!.threshold = 1;

export { _vec2, _vec3, raycaster };
