import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { AssetKey } from '../../_data/assetsData';

export interface BtnBarProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  iconKey?: AssetKey;
  isExpandable?: boolean;
  isActive: boolean;
  title?: string;
}