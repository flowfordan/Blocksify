import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TopBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
