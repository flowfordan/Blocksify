import { makeAutoObservable } from 'mobx';
import { ILayer } from 'shared/types';
import { DefLayers } from '../config/layers';

export class GeneratorModel {
  // layers: Array<ILayer>;
  // currentLayer: ILayer;

  constructor() {
    // this.layers = DefLayers;
    // this.currentLayer = this.setCurrentLayer();
    makeAutoObservable(this);
  }

  //
}

export const generatorModel = new GeneratorModel();
