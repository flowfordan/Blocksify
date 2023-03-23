import React from 'react';
import { CameraViewId } from 'shared/types';
import { BtnBar } from 'shared/ui';
import { cameraModel } from '../model/cameraModel';

interface CameraViewSelectProps {
  viewId: CameraViewId;
}

export const CameraViewSelect = ({ viewId }: CameraViewSelectProps) => {
  const changeCameraView = cameraModel.setCameraView(viewId);
  if (!selector) return null;
  return (
    <BtnBar
      iconKey="selector"
      isActive={selector.isActive}
      title={selector.title}
      onClick={() => instrumentsModel.toggleInstrumentActive(InstrumentsId.SELECTOR)}
    />
  );
};
