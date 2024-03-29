import { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SliderProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  minVal: number;
  maxVal: number;
  stepVal: number;
  val: number;
  uiItemId?: number;
  onSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChanged?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  variant?: 'default' | 'dark';
}
