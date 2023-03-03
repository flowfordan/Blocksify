import { makeAutoObservable } from 'mobx';
import { Layer } from 'shared/types';
import { DefLayers } from '../config/layers';

class LayersModel {
  layers: Array<Layer>;
  currentLayer: Layer;

  constructor() {
    this.layers = DefLayers;
    this.currentLayer = this.setCurrentLayer();
    makeAutoObservable(this);
  }

  setCurrentLayer = (layer?: Layer) => {
    if (layer) {
      this.currentLayer = layer;
      return layer;
    } else {
      const activeLayer = this.layers.find((l) => l.active);
      if (!activeLayer) {
        throw new Error('Among all layers there should be 1 ACTIVE!');
      }
      return activeLayer;
    }
  };

  toggleActiveLayer = (num: number) => {
    //set new active
    const newActive = this.layers.find((item) => item.id === num);

    if (newActive) {
      if (!newActive.editable) {
        //TODO popup window 'Layer is not editable'
        console.log('exit');
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
    const idx = this.layers.findIndex((el) => el.id === layerId);
    if (idx > -1) {
      this.layers[idx].visible = !this.layers[idx].visible;
    }
  };

  //TODO case after Selector Delete
  setIsLayerEmpty = (isEmpty: boolean, id: number) => {
    const layer = this.layers.find((l) => l.id === id);
    if (layer) {
      layer.empty = isEmpty;
    }
  };

  setLayerObjectsNumber = (layerId: number, num: number) => {
    const layer = this.layers.find((l) => l.id === layerId);
    if (layer) {
      layer.objectsQuantity = layer.objectsQuantity + num;
    }
  };
}

export const layersModel = new LayersModel();
