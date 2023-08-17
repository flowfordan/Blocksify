import { ILayerIDs } from 'shared/types';
import { GeneratorAdapter } from 'three/adapters/GeneratorAdapter';
import { adaptersModel } from 'three/model';
import { setParallelLine } from './getParallelLine';
/* 
  Service for checking conditions for real-time objects generation (like on adding or changing scene objs)
  calls GenerationAdapter which connects to global state
*/

export class GeneratorService {
  generatorAdapter: GeneratorAdapter;
  constructor() {
    this.generatorAdapter = new GeneratorAdapter();
  }
  // generate() {
  //     return this.generator.generate();
  // }

  createParallelLines(obj: THREE.Object3D, layerId: ILayerIDs) {
    setParallelLine(obj, layerId);
  }

  //CHECK SELF
  //CHECK IMPACT
  //SET TASKS TO GENERATE

  //checkGenerationConditions
  //check what kind of action occured
  //checks obj layer config for fixed conditions
  //dynamic conditions (stage?)
  //generatorAdapter.getCurrentSceneStage()
}
