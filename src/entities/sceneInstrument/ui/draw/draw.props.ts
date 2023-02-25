import { ToolNameTest } from 'entities/sceneInstrument/model/instrumentsModel';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DrawInstrItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  tool: ToolNameTest;
}
