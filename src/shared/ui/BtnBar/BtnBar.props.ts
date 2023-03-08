import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { AssetKey } from '../../config/assetsData';

export interface BtnBarProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  iconKey?: AssetKey | string;
  isExpandable?: boolean;
  isActive: boolean;
  btnName?: string;
  isSelected?: boolean;
}
