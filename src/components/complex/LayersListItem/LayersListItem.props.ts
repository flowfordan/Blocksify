import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { AssetKey } from '../../_data/assetsData';

export interface LayersListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  layerId: number;
  name: string;
  isEmpty: boolean;
  isActive: boolean;
  isVisible: boolean;
  isBlocked?: boolean;
}
