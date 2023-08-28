import * as THREE from 'three';
import { Plane } from 'three';
import { COLORS_SCENE } from 'three/config/consts';

//base world plane
const worldPlaneGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
const worldPlaneMaterial = new THREE.MeshStandardMaterial({
  color: COLORS_SCENE.ground,
  side: THREE.DoubleSide,
});

const worldPlaneMesh = new THREE.Mesh(worldPlaneGeometry, worldPlaneMaterial);
worldPlaneMesh.rotateX(-Math.PI / 2);
worldPlaneMesh.receiveShadow = true;
worldPlaneMesh.name = 'ground';
//lower ground mesh to avoid clipping wt lines (sen on top ortho view)
worldPlaneMesh.position.y = -0.015;

const worldPlaneLevel = 0;

const worldPlane = new Plane(new THREE.Vector3(0, 1, 0), worldPlaneLevel);
const worldPlaneHelper = new THREE.PlaneHelper(worldPlane, 1, 0xffff00);

export { worldPlaneMesh, worldPlane, worldPlaneHelper };
