import { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export interface CheckMatrixProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  items: Array<number>;
  selected: Array<number>;

}