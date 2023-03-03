import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { AssetKey } from '../../../components/_data/assetsData';

export interface BtnBarProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  iconKey?: AssetKey | string;
  isExpandable?: boolean;
  isActive: boolean;
  btnName?: string;
  isSelected?: boolean;
}
