import { makeAutoObservable } from 'mobx';
import { ILayer } from 'shared/types';
import { DefLayers, InitLayer } from '../config/layers';

export class LayersModel {
  layers: Array<ILayer>;
  currentLayer: ILayer;

  constructor() {
    this.layers = DefLayers;
    this.currentLayer = InitLayer;
    // this.init();
    makeAutoObservable(this);
  }

  init = () => {
    this.toggleActiveLayer(2);
  };

  setCurrentLayer = (layer?: ILayer) => {
    if (layer) {
      this.currentLayer = layer;
      return layer;
    } else {
      const activeLayer = this.layers.find((l) => l.active);
      if (!activeLayer) {
        throw new Error('No active layers');
      }
      return activeLayer;
    }
  };

  toggleActiveLayer = (num: number) => {
    //set new active
    const newActive = this.layers.find((item) => item._id === num);

    if (newActive) {
      if (!newActive.editable) {
        //TODO popup window 'Layer is not editable'
        return;
      }

      //set current  active to not active
      const currentActive = this.layers.find((item) => item.active);
      if (currentActive) {
        const idx = this.layers.indexOf(currentActive);
        this.layers[idx].active = false;
      }

      const idx = this.layers.indexOf(newActive);
      this.layers[idx].active = true;
      this.currentLayer = this.layers[idx];
    }
  };

  setLayerVisibility = (layerId: number) => {
    const idx = this.layers.findIndex((el) => el._id === layerId);
    if (idx > -1) {
      this.layers[idx].visible = !this.layers[idx].visible;
    }
  };

  //TODO case after Selector Delete
  setIsLayerEmpty = (isEmpty: boolean, id: number) => {
    const layer = this.layers.find((l) => l._id === id);
    if (layer) {
      layer.empty = isEmpty;
    }
  };

  setLayerObjectsNumber = (layerId: number, num: number) => {
    const layer = this.layers.find((l) => l._id === layerId);
    if (layer) {
      layer.objsQuantity = layer.objsQuantity + num;
    }
  };

  getLayerById = (layerId: number) => {
    const layer = this.layers.find((l) => l._id === layerId);
    if (!layer) return null;
    return layer;
  };
}

export const layersModel = new LayersModel();
