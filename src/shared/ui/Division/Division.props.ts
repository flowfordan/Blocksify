import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DivisionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  children: ReactNode;
  header?: string;
}
