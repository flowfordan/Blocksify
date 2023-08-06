/* 
{
  layer1: {
    obj1: {
      controlType: ...'
      min
      max
      step
},
    obj2: {}
  }
}
*/

import { ILayerIDs } from 'shared/types';
import { SpecificObjDomainPropName } from 'shared/types/objs';

export type IObjTypeControls = {
  [K in SpecificObjDomainPropName]?: IObjControlsData;
};

type IObjLayerControls = {
  [K in ILayerIDs]: IObjTypeControls | null;
};

interface IObjControlsData {
  /** UI control type */
  controlType: 'slide' | 'select' | 'input';
  minVal: number;
  maxVal: number;
  /** applicable only if > 0 */
  step: number;
}

export const LAYERS_OBJ_CONTROLS: IObjLayerControls = {
  '0': null,
  '2': null,
  '3': {
    objWidth: {
      controlType: 'slide',
      minVal: 1,
      maxVal: 100,
      step: 1,
    },
  },
  '4': null,
  '5': null,
};
