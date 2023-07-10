import { ILayerIDs } from 'shared/types';
import { GeneratorMediator } from 'three/mediators/GeneratorMediator';
import { mediatorsModel } from 'three/model';
/* 
  Service for checking conditions for real-time objects generation (like on adding or changing scene objs)
  calls GenerationMediator which connects to global state
*/

class GeneratorService {
  generatorMediator: GeneratorMediator;
  constructor() {
    this.generatorMediator = new GeneratorMediator();
  }
  // generate() {
  //     return this.generator.generate();
  // }

  //CHECK SELF
  //CHECK IMPACT
  //SET TASKS TO GENERATE

  //check generation on self - then generation on other layers
  checkGenerationImpact = () => {};

  triggerGeneration = (obj: THREE.Object3D, objLayerId: ILayerIDs, eventType: 'add' | 'remove') => {
    //retrieve layer with config
    const layerData = mediatorsModel.layersModel.getLayerById(objLayerId);
    if (!layerData) return;
    //CASE FOR SECONDARY PT OBJECTS
    const config = layerData._creationObjsConfig.OBJ_SECOND_PT;
    if (!config) return;
    this.generatorMediator.setGenerationTask(config, obj, objLayerId);
  };

  //checkGenerationConditions
  //check what kind of action occured
  //checks obj layer config for fixed conditions
  //dynamic conditions (stage?)
  //generatorMediator.getCurrentSceneStage()
}
