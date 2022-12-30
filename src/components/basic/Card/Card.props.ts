import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  children: ReactNode;
  colorVariant?: 'black' | 'white';
}
