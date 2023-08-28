import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface StageBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}
