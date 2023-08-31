import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
// import { AssetKey } from '../../config/assetsData';
import { IconID } from 'shared/config';

export interface BtnBarProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  iconKey?: IconID;
  isExpandable?: boolean;
  isActive: boolean;
  btnName?: string;
  isSelected?: boolean;
}
