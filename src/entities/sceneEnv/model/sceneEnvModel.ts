import { makeAutoObservable } from 'mobx';
import { ISceneEnvOption } from 'shared/types';
export class SceneEnvModel {
  //grid
  //background
  //
  sceneEnvOptions: Array<ISceneEnvOption>;
  grid: {
    isVisible: boolean;
    size: number;
  };
  constructor() {
    this.sceneEnvOptions = [];
    this.grid = {
      isVisible: true,
      size: 10,
    };
    makeAutoObservable(this);
  }

  toggleGridVisibility = () => {
    this.grid.isVisible = !this.grid.isVisible;
  };

  setGridSize = (newSize: number) => {
    this.grid.size = newSize;
  };
}

export const sceneEnvModel = new SceneEnvModel();
