import { SceneLurker } from './SceneLurker';
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
  private lurker: SceneLurker;

  constructor() {
    this.objIds = null;
    this.lurker = new SceneLurker();
  }

  //remove object(s)
  //call sceneModifier
  //cleanup prop
  removeObjs = (scene: THREE.Scene) => {
    console.log('DISPOSER ON');
    this.lurker.getAllSceneObjs(scene);
  };

  //clear scene
  //remove all objects with fitting userData
  //TODO come up with UD prop
}
