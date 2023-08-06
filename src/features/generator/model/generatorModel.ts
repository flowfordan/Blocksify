import { makeAutoObservable } from 'mobx';
import { ICreationConfig, ILayer, ILayerIDs, ObjCreationType, ObjGenerationTemplate } from 'shared/types';
/* 
Generator model 

*/

interface IGenerationTask {
  creationType: ObjCreationType;
  template: ObjGenerationTemplate;
  inputObj: THREE.Object3D;
  objLayerId: ILayerIDs;
  // applyToLayerId: ILayerIDs;
}

export class GeneratorModel {
  //current scene stage (from scene model)

  // layers: Array<ILayer>;
  // currentLayer: ILayer;
  //current generation task
  currentTask: IGenerationTask | null = null;

  constructor() {
    // this.layers = DefLayers;
    // this.currentLayer = this.setCurrentLayer();
    makeAutoObservable(this);
  }

  setCurrentTask = (config: ICreationConfig, obj: THREE.Object3D, objLayerId: ILayerIDs) => {
    this.currentTask = {
      creationType: config.creationType,
      template: config.generationTemplate,
      inputObj: obj,
      objLayerId: objLayerId,
      // applyToLayerId: config.applyToLayerId,
    };
    console.log('start task', Date.now());
  };

  cleanTask = () => {
    this.currentTask = null;
    console.log('end task', Date.now());
  };
}

export const generatorModel = new GeneratorModel();
