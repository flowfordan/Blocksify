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

  setStage(layerId: number, count: number, isAsc: boolean) {
    const curStage = adaptersModel.sceneModel.currentStage;
    if (!curStage) throw new Error('No current stage');
    switch (curStage.id) {
      case 'bordered':
        if (layerId === 2 && count === 1 && isAsc) {
          adaptersModel.sceneModel.setStageNext();
        }
        break;
      case 'divided':
        if (layerId === 3 && count === 2 && isAsc) {
          adaptersModel.sceneModel.setStageNext();
        }
        break;
      case 'blocksified':
        if (layerId === 3 && count === 1 && !isAsc) {
          adaptersModel.sceneModel.setStagePrev();
        }
        break;
      case 'start':
        break;
      default:
        break;
    }
    //adaptersModel.sceneModel.setPointerCoords(coords);
    //get current stage
    //if id = 2, and quant = 1 => next stage
    //id = 2, quant = 0 => set 1st stage
    //
    //if id = 3, and quant = 2 => next stage
  }
}
