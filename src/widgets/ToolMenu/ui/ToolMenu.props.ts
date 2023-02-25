import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ToolMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  menuType: 'drawing' | 'helpers';
}
