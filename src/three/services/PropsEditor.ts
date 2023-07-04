import { toJS } from 'mobx';
import { Layer } from '../../shared/types/layers';
import { ICommonObjData, OBJ_GENERAL_TYPE } from 'shared/types/objs';

export class PropsEditor {
  constructor() {
    //
  }

  setSegmentInitProperties = (
    obj: THREE.Object3D<THREE.Event>,
    segmentType: 'common' | 'point' | 'line' | 'polygon'
  ) => {
    switch (segmentType) {
      case 'common':
        const props: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT,
        };
        obj.userData = Object.assign(props);
        break;
      case 'point':
        const propsPoint: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT,
        };
        obj.userData = Object.assign(propsPoint);
        break;
      case 'line':
        const propsLine: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE,
        };
        obj.userData = Object.assign(propsLine);
        break;
      case 'polygon':
        const propsPolygon: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON,
        };
        obj.userData = Object.assign(propsPolygon);
        break;
    }
  };

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
