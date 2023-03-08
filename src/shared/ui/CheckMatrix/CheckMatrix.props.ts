import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CheckMatrixProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  items: Array<number>;
  selected: Array<number>;
  handleCollectionUpd: (value: number) => void;
}
