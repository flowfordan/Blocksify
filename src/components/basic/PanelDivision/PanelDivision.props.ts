import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PanelDivisionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  header: string;
}