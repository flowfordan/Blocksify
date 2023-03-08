import React from 'react';
import { AssetKey, assetsData } from '../config/assetsData';

export const returnSvgNode = (iconKey: AssetKey) => {
  if (!iconKey) {
    return <></>;
  }
  const IconToRender = assetsData[iconKey];
  return <IconToRender />;
};
