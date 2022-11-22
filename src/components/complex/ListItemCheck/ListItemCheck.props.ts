import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { AssetKey } from '../../_data/assetsData';

export interface ListItemCheckProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  children?: ReactNode;
  title: string;
  isChecked: boolean;
  icon?: AssetKey;
}
