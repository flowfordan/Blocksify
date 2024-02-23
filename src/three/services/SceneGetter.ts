import * as THREE from 'three';

export class SceneGetter {
  constructor() {}

  getAllSceneObjs = (scene: THREE.Scene): Array<THREE.Object3D> => {
    //user property
    const objects: Array<THREE.Object3D> = [];
    scene.traverse((child) => {
      if (child.layers.isEnabled(2)) {
        console.log(child.id);
      }
    });

    return objects;
  };

  getObjsByLayer = (scene: THREE.Scene, layerId: number): Array<THREE.Object3D> => {
    const objects: Array<THREE.Object3D> = [];
    scene.children.forEach((obj) => {
      if (obj.layers.mask === layerId) {
        objects.push(obj);
      }
    });
    return objects;
  };
}
