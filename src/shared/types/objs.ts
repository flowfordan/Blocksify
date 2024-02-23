/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILayerIDs } from './layers';

//segments names
export enum OBJ_SEGMENT_NAME {
  point_segment = 'point_segment',
  line_segment = 'line_segment',
  polygon_segment = 'polygon_segment',
}

//OBJ GENERAL TYPE
export enum OBJ_GENERAL_TYPE {
  //1 lvl
  OBJ_MAIN = 'OBJ_MAIN',
  OBJ_TEMP = 'OBJ_TEMP',
  //2 lvl
  OBJ_PRIM_PT = 'OBJ_PRIM_PT',
  OBJ_SECOND_PT = 'OBJ_SECOND_PT',
  //3 lvl
  OBJ_SEGMENT = 'OBJ_SEGMENT',
  OBJ_SEGMENT_LINE = 'OBJ_SEGMENT_LINE',
  OBJ_SEGMENT_POINT = 'OBJ_SEGMENT_POINT',
  OBJ_SEGMENT_POLYGON = 'OBJ_SEGMENT_POLYGON',
}

type OBJ_GENERAL_TYPE_UN = `${OBJ_GENERAL_TYPE}`;

export type ICommonObjData<T extends OBJ_GENERAL_TYPE> = {
  OBJ_GENERAL_TYPE: T extends OBJ_GENERAL_TYPE.OBJ_MAIN
    ? OBJ_GENERAL_TYPE.OBJ_MAIN
    : T extends OBJ_GENERAL_TYPE.OBJ_TEMP
    ? OBJ_GENERAL_TYPE.OBJ_TEMP
    : T extends OBJ_GENERAL_TYPE.OBJ_PRIM_PT
    ? OBJ_GENERAL_TYPE.OBJ_PRIM_PT
    : T extends OBJ_GENERAL_TYPE.OBJ_SECOND_PT
    ? OBJ_GENERAL_TYPE.OBJ_SECOND_PT
    : T extends OBJ_GENERAL_TYPE.OBJ_SEGMENT
    ? OBJ_GENERAL_TYPE.OBJ_SEGMENT
    : T extends OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT
    ? OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT
    : T extends OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE
    ? OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE
    : T extends OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON
    ? OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON
    : OBJ_GENERAL_TYPE_UN;
};

//OBJ TEMPLATES
//general_type: type
//propValue: {propData}
//________________________________________________________
type PropEditType = 'constant' | 'calculated' | 'editable';
interface IObjPropData<V extends number | string> {
  editType: PropEditType; //modification type
  value: V;
  pubTitle?: string;
}

interface IObjData_Common<L extends number> extends ICommonObjData<OBJ_GENERAL_TYPE.OBJ_MAIN> {
  layerId: IObjPropData<L>;
  objName: IObjPropData<string>;
}

export type SpecificObjDomainPropName_Calc = 'objLength' | 'objArea';
export type SpecificObjDomainPropName =
  | 'objMaxFloors'
  | 'objMinFloors'
  | 'objWidth'
  | 'objFloors'
  | SpecificObjDomainPropName_Calc;

type IObjData_Specifics = {
  [K in SpecificObjDomainPropName]: IObjPropData<number>;
  // objMaxFloors: IObjPropData<number>;
  // objMinFloors: IObjPropData<number>;
  // //
  // objLength: IObjPropData<number>;
  // objWidth: IObjPropData<number>;
  // objArea: IObjPropData<number>;
  // //
  // objFloors: IObjPropData<number>;
};

export type IObjData_Joined = IObjData_Common<number> & IObjData_Specifics;

//OBJS VARIOUS KINDS
type IObjData_Border<L extends number> = IObjData_Common<L> &
  Pick<IObjData_Specifics, 'objArea' | 'objMaxFloors' | 'objMinFloors'>;
type IObjData_Street<L extends number> = IObjData_Common<L> & Pick<IObjData_Specifics, 'objLength' | 'objWidth'>;
type IObjData_Block<L extends number> = IObjData_Common<L> & Pick<IObjData_Specifics, 'objArea'>;
type IObjData_Building<L extends number> = IObjData_Common<L> & Pick<IObjData_Specifics, 'objFloors'>;

export interface IObjDataProps {
  [ILayerIDs.borders]: IObjData_Border<ILayerIDs.borders>;
  [ILayerIDs.streets]: IObjData_Street<ILayerIDs.streets>;
  [ILayerIDs.blocks]: IObjData_Block<ILayerIDs.blocks>;
  [ILayerIDs.buildings]: IObjData_Building<ILayerIDs.buildings>;
}

export function IsObjDataOfObjMain(objUD: Record<any, any>): objUD is IObjDataProps[keyof IObjDataProps] {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_MAIN) {
    return true;
  } else {
    return false;
  }
}

export function IsObjDataOfObjPrimPt(objUD: Record<any, any>): objUD is ICommonObjData<OBJ_GENERAL_TYPE.OBJ_PRIM_PT> {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_PRIM_PT) {
    return true;
  } else {
    return false;
  }
}

export function IsObjDataOfObjSecondaryPt(
  objUD: Record<any, any>
): objUD is ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SECOND_PT> {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_SECOND_PT) {
    return true;
  } else {
    return false;
  }
}

export function IsObjDataOfObjLineSegment(
  objUD: Record<any, any>
): objUD is ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE> {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE) {
    return true;
  } else {
    return false;
  }
}

export function IsObjDataOfObjPointSegment(
  objUD: Record<any, any>
): objUD is ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT> {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT) {
    return true;
  } else {
    return false;
  }
}

export function IsObjDataOfObjPolygonSegment(
  objUD: Record<any, any>
): objUD is ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON> {
  if (objUD['OBJ_GENERAL_TYPE'] && objUD['OBJ_GENERAL_TYPE'] === OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON) {
    return true;
  } else {
    return false;
  }
}

export function IsPropIsPropData(prop: unknown): prop is IObjPropData<string | number> {
  if (typeof prop === 'object' && prop) {
    return true;
  } else {
    return false;
  }
}

export const getObjBasicPoints = (obj: THREE.Object3D) => {
  //if not main throw error
  if (!IsObjDataOfObjMain(obj.userData)) throw new Error('Object is not main');
  //get primary pt
  const primPt = obj.children.find((o) => {
    if (IsObjDataOfObjPrimPt(o.userData)) return true;
  });
  if (!primPt) throw new Error('No primary part found');
  //point segment
  const pointSegment = primPt.children.find((o) => {
    if (IsObjDataOfObjPointSegment(o.userData)) return true;
  });
  if (!pointSegment) throw new Error('No point segment found');
  //getting array of points
  const ptsPos = Array.from((pointSegment as THREE.Points).geometry.attributes.position.array);
  return ptsPos;
};

const getObjSecondaryPt = (obj: THREE.Object3D) => {
  //if not main throw error
  if (!IsObjDataOfObjMain(obj.userData)) throw new Error('Object is not main');
  //get primary pt
  const secPt = obj.children.find((o) => {
    if (IsObjDataOfObjSecondaryPt(o.userData)) return true;
  });
  if (!secPt) throw new Error('No secondary part found');
  return secPt;
};

export const getPtPointsObjects = (obj: THREE.Object3D) => {
  const secPt = getObjSecondaryPt(obj);
  //point segment
  const pointSegments = secPt.children.filter((o) => {
    //TODO check userdata
    //temp solution
    if (o.type === 'Points') return true;
  });
  return pointSegments;
};

export const getPointsSegmentPointsArray = (segment: THREE.Object3D) => {
  const ptsPos = Array.from((segment as THREE.Points).geometry.attributes.position.array);
  return ptsPos;
};
