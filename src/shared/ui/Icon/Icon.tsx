import React from 'react';
import { IconID, iconsData } from '../../config/icons';
import { IconProps } from './Icon.props';

export const Icon = ({ className, name, size = 24, fill }: IconProps) => {
  const IconSvg = iconsData[name];
  return <IconSvg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} />;
  return <>I</>;
};
