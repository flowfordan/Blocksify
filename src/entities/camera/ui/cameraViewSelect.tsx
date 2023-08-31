import React from 'react';
import { CameraViewId } from 'shared/types';
import { BtnBar } from 'shared/ui';
import { cameraModel } from '../model/cameraModel';
import { observer } from 'mobx-react-lite';

interface CameraViewSelectProps {
  viewId: CameraViewId;
}

/* BUTTONS TO CHOOSE CURRENT CAMERA VIEW: PERSPECIVE, TOP */

export const CameraViewSelect = observer(({ viewId }: CameraViewSelectProps) => {
  const changeCameraView = () => cameraModel.setCameraView(viewId);
  const currentViewId = cameraModel.currentCameraId;
  // if (!selector) return null;
  return (
    <BtnBar
      iconKey={viewId === CameraViewId.PERSPECTIVE ? 'cameraPerspective' : 'cameraTop'}
      isActive={currentViewId === viewId}
      title={viewId === CameraViewId.PERSPECTIVE ? 'Perspective View' : 'Top View'}
      onClick={() => changeCameraView()}
    />
  );
});
