import { makeAutoObservable, toJS } from 'mobx';
import type { PointerCoords } from 'shared/types';
import { Vector3 } from 'three';

export class SceneModel {
  private _isFetchingPointerCoords: boolean;
  currentPointerCoordsGlobal: PointerCoords;
  readonly baseDirection: Vector3;
  stage: number; //0 - 4

  constructor() {
    this._isFetchingPointerCoords = true;
    this.currentPointerCoordsGlobal = {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    };

    this.baseDirection = new Vector3(1, 0, 0);

    this.stage = 0;

    makeAutoObservable(this);
  }

  toggleCoordsFetching = (status: boolean) => {
    this._isFetchingPointerCoords = status;
    if (!status) {
      this.currentPointerCoordsGlobal.x = 0;
      this.currentPointerCoordsGlobal.y = 0;
      this.currentPointerCoordsGlobal.z = 0;
    }
  };

  setPointerCoords = (coords: PointerCoords) => {
    this.currentPointerCoordsGlobal.x = coords.x;
    this.currentPointerCoordsGlobal.y = coords.y;
    this.currentPointerCoordsGlobal.z = coords.z;
  };
}

export const sceneModel = new SceneModel();