import { generatorModel } from 'features/generator';
import { reaction } from 'mobx';
import { ILayerIDs, ObjGenerationTemplate } from 'shared/types';
import { Line2, LineGeometry } from 'three-fatline';
import { getLineMat } from 'three/config/objs3d';
import { GeneratorHandler } from 'three/handlers';
import { SceneModifier } from 'three/services/SceneModifier';
import { GeneratorModel } from 'three/shared';

export class GeneratorController {
  private generatorService: GeneratorHandler;
  constructor(private generatorModel: GeneratorModel, private sceneModifier: SceneModifier) {
    this.generatorService = new GeneratorHandler();
    this.generatorModel = generatorModel;
    this._storeSubscribe();
  }

  performStreetSidesGenerationTask(mainObj: THREE.Object3D, layerId: ILayerIDs) {
    this.generatorService.createParallelLines(mainObj, layerId);
  }

  performBlocksGenerationTask(blocksLayerId: ILayerIDs) {
    //TODO check if layer.createBlocksFromBoundaries
    const BORDER_LAYER_ID = ILayerIDs.borders;
    const STREETS_LAYER_ID = ILayerIDs.streets;
    //retrieve border obj - PRIM PT
    const borderObjs = this.sceneModifier.getSceneObjectsByLayerId(BORDER_LAYER_ID);
    //retrieve edges streets lines - SEC PT
    const streetsObjs = this.sceneModifier.getSceneObjectsByLayerId(STREETS_LAYER_ID);
    const polys = this.generatorService.createBlocksFromAreaAndRoads(borderObjs, streetsObjs);
    //
    const lines: Array<Line2> = [];
    polys.forEach((poly) => {
      const lineObj = new Line2(new LineGeometry(), getLineMat(0x1d5e9a, 7, true, 0.5));
      const coords: Array<number> = [];
      poly.points.forEach((p) => {
        return coords.push(p.x, 0, p.y);
      });
      lineObj.geometry.setPositions(coords);
      lines.push(lineObj);
    });
    //this.sceneModifier.addObjs(...lines);
  }

  private _storeSubscribe() {
    //watch for new task in generator
    reaction(
      () => {
        return this.generatorModel.currentTask;
      },
      (cur, prev) => {
        if (!cur) return;
        if (cur.template === 'parallel' && cur.inputObj) {
          this.performStreetSidesGenerationTask(cur.inputObj, cur.objLayerId);
          return;
        }
        if (cur.template === 'block') {
          this.performBlocksGenerationTask(cur.objLayerId);
          return;
        }
      }
    );
  }
}
