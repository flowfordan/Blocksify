import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DropDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  wrapped: JSX.Element;
  contentClickType?: 'regular' | 'double';
}
