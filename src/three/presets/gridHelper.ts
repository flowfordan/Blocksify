import * as THREE from 'three';

export const gridHelper = new THREE.GridHelper(5000, 5000, 0x4aa8ff, 0xc3c3c3);
gridHelper.position.y = -0.01;
gridHelper.position.x = 0;

gridHelper.visible = false;

export const getGridHelper = (size: number, name = 'gridHelper') => {
  const totalSize = 5000;
  const division = totalSize / size;
  const helper = new THREE.GridHelper(5000, division, 0x4aa8ff, 0xc3c3c3);
  helper.name = name;
  return helper;
};

// export { gridHelper, getGridHelper };
