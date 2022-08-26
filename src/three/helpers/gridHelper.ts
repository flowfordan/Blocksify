import * as THREE from 'three'

const gridHelper = new THREE.GridHelper( 5000, 5000, 0x4AA8FF, 0xC3C3C3 );
gridHelper.position.y = -0.01;
gridHelper.position.x = 0;

gridHelper.visible = false


const getGridHelper = (size: number, name: string) => {
	const totalSize = 5000;
	const division = totalSize/size;
	const helper = new THREE.GridHelper( 5000, division, 0x4AA8FF, 0xC3C3C3 );
	helper.name = name;
	return helper
}

export {gridHelper, getGridHelper}