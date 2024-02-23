import { makeAutoObservable } from 'mobx';
import { ICreationConfig, ILayer, ILayerIDs, ObjCreationType, ObjGenerationTemplate } from 'shared/types';
/* 
Generator model 

*/

interface IGenerationTask {
  creationType: ObjCreationType;
  template: ObjGenerationTemplate;
  inputObj?: THREE.Object3D;
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

  setCurrentTask = (config: ICreationConfig, objLayerId: ILayerIDs, objToUpd?: THREE.Object3D) => {
    this.currentTask = {
      creationType: config.creationType,
      template: config.generationTemplate,
      inputObj: objToUpd,
      objLayerId: objLayerId,
      // applyToLayerId: config.applyToLayerId,
    };
  };

  cleanTask = () => {
    this.currentTask = null;
  };
}

export const generatorModel = new GeneratorModel();
