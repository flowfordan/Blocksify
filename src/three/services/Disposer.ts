import { SceneGetter } from './SceneGetter';
import * as THREE from 'three';
/*
Disposer
recieves objs data to remove
calls SceneModifier

can recieve 1 or several objs to call for removal
obj id
*/
export class Disposer {
  //
  objIds: Array<string> | null;
  private sceneGetter: SceneGetter;

  constructor() {
    this.objIds = null;
    this.sceneGetter = new SceneGetter();
    // this.sceneController
  }

  //remove object(s)
  //call sceneModifier
  //cleanup prop
  removeObjs = (scene: THREE.Scene) => {
    this.sceneGetter.getAllSceneObjs(scene);
  };

  //clear scene
  //remove all objects with fitting userData
  //TODO come up with UD prop
}
