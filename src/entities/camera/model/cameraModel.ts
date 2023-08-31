import { makeAutoObservable } from 'mobx';
import { CameraViewId } from 'shared/types';

export class CameraModel {
  currentCameraId: CameraViewId;
  constructor() {
    this.currentCameraId = CameraViewId.PERSPECTIVE;

    makeAutoObservable(this);
  }

  setCameraView = (id: CameraViewId) => {
    this.currentCameraId = id;

    console.log('CHANGED CAMERA TO', id);
  };
}

export const cameraModel = new CameraModel();
