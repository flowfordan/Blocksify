import * as THREE from 'three';
// import { instrumentsState } from '../../shared/model';
import { Disposer } from '../services/Disposer';
import { _InstrumentCont } from './_InstrumentCont';
/* 
Cleaner
Instrument for scene cleaner - all scene obj or by layer
*/
export class Cleaner implements _InstrumentCont {
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
  start = () => {
    this.cleanUp('scene');
  };

  private cleanUp = (type: 'scene' | 'layer', layerId?: number) => {
    if (type === 'scene') {
      //clean scene
      //set stage 1
      //disposer scene
      this.disposer.removeObjs(this.scene);
    } else if (type === 'layer' && layerId !== undefined) {
      //clean layer
    } else {
      throw new Error('Cleaner. Layer ID was not defined');
    }
    this.endCleanUp();
  };

  private endCleanUp = () => {
    // const cleaner = instrumentsState.tools.find((t) => t.name === 'cleaner');
    // if (cleaner) {
    //   // instrumentsState.setActiveTool(cleaner.id);
    // }
  };

  stop = () => {};
}
