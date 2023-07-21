import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ObjDataPropProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  propName?: string;
  propValue: string | number;
  isEditable?: boolean;
}
