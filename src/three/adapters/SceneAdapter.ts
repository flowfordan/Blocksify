import type { PointerCoords } from 'shared/types';
import { adaptersModel } from 'three/model';

/* Adapter of Scene - update scene model values by calling respective methods of model */
export class SceneAdapter {
  constructor() {
    //
  }

  setPointerCoords = (coords: PointerCoords) => {
    adaptersModel.sceneModel.setPointerCoords(coords);
  };
}
