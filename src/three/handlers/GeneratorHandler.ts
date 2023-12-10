import { ILayerIDs } from 'shared/types';
import { GeneratorAdapter } from 'three/adapters/GeneratorAdapter';
import { adaptersModel } from 'three/model';
import { addObjParallelLines } from './getParallelLine';
/* 
  Service for checking conditions for real-time objects generation (like on adding or changing scene objs)
  calls GenerationAdapter which connects to global state
*/

export class GeneratorHandler {
  generatorAdapter: GeneratorAdapter;
  constructor() {
    this.generatorAdapter = new GeneratorAdapter();
  }
  // generate() {
  //     return this.generator.generate();
  // }

  createParallelLines(obj: THREE.Object3D, layerId: ILayerIDs) {
    addObjParallelLines(obj, layerId);
    this.generatorAdapter.endTask();
    console.log('OBJECT', obj);
  }

  createBlocksFromBoundaries(blocksLayerId: string, border: string, edges: string) {
    //get boundaries/ create from borders + roads
    //add to blocks layer
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
