import * as THREE from 'three';
import { Disposer } from '../services/Disposer';
/* 
Cleaner
Instrument for scene cleaner - all scene obj or by layer
*/
export class Cleaner {
  isAvialable: boolean;
  isActive: boolean;
  scene: THREE.Scene;
  disposer: Disposer;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.disposer = new Disposer();
    this.isAvialable = true;
    this.isActive = false;
  }

  //clean scene
  //cleanUp
  cleanUp = (type: 'scene' | 'layer', layerId?: number) => {
    if (type === 'scene') {
      //clean scene
      //set stage 1
      //disposer scene
      this.disposer.removeObjs(this.scene);
      console.log('CLEANER ON');
    } else if (type === 'layer' && layerId !== undefined) {
      //clean layer
    } else {
      throw new Error('Cleaner. Layer ID was not defined');
    }
  };
}
