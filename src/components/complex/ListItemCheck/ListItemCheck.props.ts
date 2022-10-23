import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ListItemCheckProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  children: ReactNode;
  title: string;
  isChecked: boolean;
  icon?: string;
}