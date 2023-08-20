/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';

//raycaster
const raycaster = new THREE.Raycaster();

//default trs is 1
// raycaster.params.Line!.threshold = 1;
// raycaster.params.Points!.threshold = 1;
raycaster.params = {
  Mesh: { threshold: 1 },
  Line: { threshold: 0.5 },
  LOD: {},
  Points: { threshold: 1 },
  Sprite: { threshold: 1 },
  // Line2: { threshold: 25 },
};
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
(raycaster.params as any).Line2! = { threshold: 25 };

export { raycaster };
