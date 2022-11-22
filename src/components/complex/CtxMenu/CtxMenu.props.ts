import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CtxMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  // content: 'tools' | 'helpers';
  //pos
}
