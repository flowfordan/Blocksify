import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { InstrumentHelpersId } from 'shared/types';

export interface HelperInstrItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  helperId: InstrumentHelpersId;
}
