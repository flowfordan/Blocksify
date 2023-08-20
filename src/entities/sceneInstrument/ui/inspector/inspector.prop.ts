import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { IObjTypeControls } from 'shared/config';

export interface ObjDataPropProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  propName?: string;
  propValue: string | number;
  isEditable?: boolean;
  controls: IObjTypeControls | null;
  propId: string;
}
