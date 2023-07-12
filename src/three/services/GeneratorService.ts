import { ILayerIDs } from 'shared/types';
import { GeneratorMediator } from 'three/mediators/GeneratorMediator';
import { mediatorsModel } from 'three/model';
import { setParallelLine } from './getParallelLine';
/* 
  Service for checking conditions for real-time objects generation (like on adding or changing scene objs)
  calls GenerationMediator which connects to global state
*/

export class GeneratorService {
  generatorMediator: GeneratorMediator;
  constructor() {
    this.generatorMediator = new GeneratorMediator();
  }
  // generate() {
  //     return this.generator.generate();
  // }

  createParallelLines(obj: THREE.Object3D) {
    setParallelLine(obj).then((res) => {
      if (res) {
        this.generatorMediator.endTask();
      }
    });
  }

  //CHECK SELF
  //CHECK IMPACT
  //SET TASKS TO GENERATE

  //checkGenerationConditions
  //check what kind of action occured
  //checks obj layer config for fixed conditions
  //dynamic conditions (stage?)
  //generatorMediator.getCurrentSceneStage()
}
