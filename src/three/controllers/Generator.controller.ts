import { reaction } from 'mobx';
import { ILayerIDs, ObjGenerationTemplate } from 'shared/types';
import { GeneratorService } from 'three/services/GeneratorService';
import { GeneratorModel } from 'three/shared';

export class GeneratorController {
  generatorService: GeneratorService;
  constructor(private generatorModel: GeneratorModel) {
    this.generatorService = new GeneratorService();
    this._storeSubscribe();
  }

  setOnAddGeneration(mainObj: THREE.Object3D, layerId: ILayerIDs, template: ObjGenerationTemplate) {
    if (template === 'parallel') {
      this.generatorService.createParallelLines(mainObj);
    }
  }

  private _storeSubscribe() {
    //watch for new task in generator
    reaction(
      () => {
        return this.generatorModel.currentTask;
      },
      (cur, prev) => {
        if (cur) {
          if (cur.creationType === 'generation_on_add')
            this.setOnAddGeneration(cur.inputObj, cur.objLayerId, cur.template);
        }
      }
    );
  }
}
