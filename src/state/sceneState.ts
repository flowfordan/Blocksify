import {makeAutoObservable, toJS} from "mobx";
import {Vector3} from 'three';

type Coords = {
    x: number,
    y: number,
    z: number
}
class SceneState{

  isFetchingGlobalCoords: boolean;
  globalCoords: Coords;
  currentCamera: number;
  baseDirection: Vector3;

  constructor(){

    this.isFetchingGlobalCoords = true;
    this.globalCoords = {
      x: 0.00,
      y: 0.00,
      z: 0.00,
    };
    this.currentCamera = 1;

    this.baseDirection = new Vector3(1, 0, 0);

    makeAutoObservable(this);
  }

  changeCamera = (id: number) => {
    this.currentCamera = id;
  };

  toggleCoordsFetching = (status: boolean) => {
    this.isFetchingGlobalCoords = status;
    if (!status){
      this.globalCoords.x = 0;
      this.globalCoords.y = 0;
      this.globalCoords.z = 0;
    }
  };

  setGlobalCoords = (coords: Coords) => {
    this.globalCoords.x = coords.x;
    this.globalCoords.y = coords.y;
    this.globalCoords.z = coords.z;
  };
}

const sceneState = new SceneState();

export {sceneState};
