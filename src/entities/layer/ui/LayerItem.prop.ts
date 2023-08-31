import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface LayerItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  layerId: number;
  name: string;
  isEmpty: boolean;
  isActive: boolean;
  isVisible: boolean;
  isBlocked?: boolean;
  numOfObjs: number;
}
