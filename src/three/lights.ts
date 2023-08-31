import * as THREE from 'three';

//creating light

//dirLight
export const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-1, 5, 5);
dirLight.position.multiplyScalar(30);
dirLight.castShadow = true;
dirLight.shadow.bias = 0.0001;
dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;

//area where shadows are working
const side = 100;
dirLight.shadow.camera.top = side;
dirLight.shadow.camera.bottom = -side;
dirLight.shadow.camera.left = side;
dirLight.shadow.camera.right = -side;

export const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5);

// first one
export const mainLight = new THREE.SpotLight(undefined, 5);
mainLight.position.set(-125, 125, -12.5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 4096;
mainLight.shadow.mapSize.height = 4096;
mainLight.shadow.radius = 1;
mainLight.intensity = 1;

export const mainLightHelper = new THREE.SpotLightHelper(mainLight, 5);

//third
export const hemiLight = new THREE.HemisphereLight(0x85bfde, 0xffffff, 0.8);
//hemiLight.color.setHSL( 0.6, 1, 0.1 );
//hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set(0, 50, 0);
