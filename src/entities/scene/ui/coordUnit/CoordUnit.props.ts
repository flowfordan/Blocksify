import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { InstrumentHelpersId } from 'shared/types';

export interface CoordsUnitProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  coord: 'X' | 'Y' | 'Z';
  value: number;
  fixValue?: number;
}
