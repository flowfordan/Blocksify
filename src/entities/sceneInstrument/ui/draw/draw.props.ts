import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { InstrumentsId } from 'shared/types';

export interface DrawInstrItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  instrId: InstrumentsId;
}
