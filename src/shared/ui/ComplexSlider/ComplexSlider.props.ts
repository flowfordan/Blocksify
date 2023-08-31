import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ComplexSliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  minVal: number;
  maxVal: number;
  stepVal: number;
  val: number;
  uiItemId?: number;
  valName?: string;
  onSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChanged?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  variant?: 'default' | 'dark';
  disabled?: boolean;
}
