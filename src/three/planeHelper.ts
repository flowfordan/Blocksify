import * as THREE from 'three'

export const gridHelper = new THREE.GridHelper( 500, 50, 0x4AA8FF, 0xC3C3C3 );
gridHelper.position.y = -0.01;
gridHelper.position.x = 0;