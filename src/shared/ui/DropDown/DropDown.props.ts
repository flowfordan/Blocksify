import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DropDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  colorVariant?: 'black' | 'white';
  btn: JSX.Element;
  list: JSX.Element;
}
