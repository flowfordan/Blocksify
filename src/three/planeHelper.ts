import * as THREE from 'three'

export const gridHelper = new THREE.GridHelper( 500, 50, 0x0000ff, 0x808080 );
gridHelper.position.y = 0.01;
gridHelper.position.x = 0;