import { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SliderProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  minVal: number;
  maxVal: number;
  stepVal: number;
  val: number;
  uiItemId: number;
  onChange?: () => void;
}