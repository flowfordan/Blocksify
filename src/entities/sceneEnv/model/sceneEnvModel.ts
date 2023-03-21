import { makeAutoObservable } from 'mobx';
import { ISceneEnvOption, SceneEnvOptionId } from 'shared/types';
import { DefSceneEnvOptions } from '../config/sceneEnvOptions';
export class SceneEnvModel {
  sceneEnvOptions: Array<ISceneEnvOption>;
  constructor() {
    this.sceneEnvOptions = DefSceneEnvOptions;
    makeAutoObservable(this);
  }

  toggleSceneEnvItemOptionIsActive = (sceneEnvOptionId: SceneEnvOptionId) => {
    const item = this._getItem(sceneEnvOptionId);
    if (!item) return;
    item.isActive = !item.isActive;
  };

  setItemValue = (id: SceneEnvOptionId, value: number) => {
    const item = this._getItem(id);
    if (!item) return;

    if (item.options.controller === 'range') {
      item.options.value = value;
    } else if (item.options.controller === 'selection') {
      const idx = item.options.selValues.indexOf(value);
      if (idx > -1) {
        //remove
        item.options.selValues = [...item.options.selValues.slice(0, idx), ...item.options.selValues.slice(idx + 1)];
      } else {
        //add
        item.options.selValues.push(value);
      }
    }
  };

  _getItem = (sceneEnvOptionId: SceneEnvOptionId) => {
    const item = this.sceneEnvOptions.find((o) => o.id === sceneEnvOptionId);
    return item;
  };

  //
}

export const sceneEnvModel = new SceneEnvModel();
