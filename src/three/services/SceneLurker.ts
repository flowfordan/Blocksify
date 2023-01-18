import * as THREE from 'three';

export class SceneLurker {
  constructor() {}

  getAllSceneObjs = (scene: THREE.Scene): Array<THREE.Object3D> => {
    //user property
    const objects: Array<THREE.Object3D> = [];
    scene.traverse((child) => {
      // console.log(child, child.layers.isEnabled(2));
      // console.log(child.layers);
      if (child.layers.isEnabled(2)) {
        console.log(child.id);
      }
    });

    return objects;
  };

  getObjsByLayer = (scene: THREE.Scene, layerId: number): Array<THREE.Object3D> => {
    //
    const objects: Array<THREE.Object3D> = [];
    return objects;
  };
}
