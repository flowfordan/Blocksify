import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { IconID } from 'shared/config';

export interface ListItemCheckProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  children?: ReactNode;
  title: string;
  isChecked: boolean;
  icon?: IconID;
  disabled?: boolean;
}
