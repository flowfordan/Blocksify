import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ComplexSliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  minVal: number;
  maxVal: number;
  stepVal: number;
  val: number;
  uiItemId: number;
  valName?: string;
}
