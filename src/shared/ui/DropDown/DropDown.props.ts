import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DropDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  content: JSX.Element;
  contentClickType?: 'regular' | 'double';
}
