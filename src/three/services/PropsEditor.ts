import { toJS } from 'mobx';
import { Layer } from '../../shared/types/layers';

export class PropsEditor {
  constructor() {
    //
  }

  setObjInitProperties = (
    obj: THREE.Object3D<THREE.Event>,
    objLayer: Layer,
    objType: 'layer_joined' | 'part_main' | 'part_sub'
  ) => {
    if (objType === 'layer_joined') {
      const propertiesToSet = toJS(objLayer.objDefaultData);
      obj.userData = Object.assign(propertiesToSet);
    } else if (objType === 'part_main') {
      const propertiesToSet = toJS(objLayer.ptsData.main);
      obj.userData = Object.assign(propertiesToSet);
    } else if (objType === 'part_sub') {
      const propertiesToSet = toJS(objLayer.ptsData.add);
      obj.userData = Object.assign(propertiesToSet);
    }
  };
}
