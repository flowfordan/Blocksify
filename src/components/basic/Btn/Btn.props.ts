import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface BtnProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  heightConfiguration?: 'contained' | 'spilled';
}
