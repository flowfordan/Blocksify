import { ILayerIDs } from 'shared/types';
import { Object3D } from 'three';

//set obj layer by id
//in place
//returns void
export const setObjsLayers = (layerId: ILayerIDs, ...objs: Object3D[]) => {
  for (let i = 0; i < objs.length; i++) {
    objs[i].layers.set(layerId);
  }
};
