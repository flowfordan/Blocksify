import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DropDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  list: JSX.Element;
}
