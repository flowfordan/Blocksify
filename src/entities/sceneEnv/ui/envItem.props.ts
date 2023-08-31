import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { SceneEnvOptionId } from 'shared/types';

export interface EnvItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  envItemId: SceneEnvOptionId;
}
