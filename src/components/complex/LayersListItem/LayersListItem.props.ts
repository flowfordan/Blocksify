import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { AssetKey } from '../../_data/assetsData';

export interface LayersListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  name: string;
  isEmpty: boolean;
  isActive: boolean;
  isVisible: boolean;
  isBlocked?: boolean;
  // children?: ReactNode;
  // title: string;
  // isChecked: boolean;
  // icon?: AssetKey;
}