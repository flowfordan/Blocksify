type OptionsControllerType = 'range' | 'selection' | 'none';

export interface IControllerOptions {
  controller: OptionsControllerType;
  value: number;
  defaultValue?: number;
  rangeTitle?: string;
  rangeMin: number;
  rangeMax: number;
  rangeStep: number;
  selVariants: Array<number>;
  selValues: Array<number>;
}
