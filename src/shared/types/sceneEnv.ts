import { IControllerOptions } from './options';

/* Types for Scene Environment Options */

export enum SceneEnvOptionId {
  GRID_VIS = 'grid_vis',
  GRID_SIZE = 'grid_size',
  GRID_COLOR = 'grid_color',
  GRID_DIST = 'grid_dist',
  //
  AXIS_VIS = 'axis-vis',
  //
  SUN_POS = 'sun_pos',
  SUN_INTENSITY = 'sun_intensity',
  //
  SKY_COLOR = 'sky_color',
}

export type SceneEnvOptionTitle = 'Visibility' | 'Size' | 'Color' | 'Distance' | 'Position' | 'Intensity' | '_name';
export type SceneEnvOptionType = 'grid' | 'axis' | 'sun' | 'sky' | 'other';

export interface ISceneEnvOption {
  id: SceneEnvOptionId;
  type: SceneEnvOptionType;
  title: SceneEnvOptionTitle;
  isActive: boolean;
  options: IControllerOptions;
}
