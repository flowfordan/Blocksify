import type { PointerCoords } from 'shared/types';
import { mediatorsModel } from 'three/model';

/* Mediator of Scene - update scene model values by calling respective methods of model */
export class SceneMediator {
  constructor() {
    //
  }

  setPointerCoords = (coords: PointerCoords) => {
    mediatorsModel.sceneModel.setPointerCoords(coords);
  };
}
