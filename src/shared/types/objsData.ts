/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILayerIDs } from './layers';

//COMMON PROPS FOR ALL CREATED AND ADDED OBJS
export enum CommonObjPropNames {
  objGeneralType = 'objGeneralType',
}

export enum CommonObjGeneralTypeNames {
  JoinedObjType = 'joined_title_obj',
}
type JoinedObjType = 'joined_title_obj';
type PtObjType = 'main_pt_obj' | 'sub_pt_obj';
type GeneralObjType = JoinedObjType | PtObjType | 'temp_obj';
export interface IObjCommonData {
  [CommonObjPropNames.objGeneralType]: GeneralObjType;
}

type ModType = 'constant' | 'calculated' | 'editable';

//COMMON LAYER OBJS (JOINED) - USER DATA
export interface IObj_PROP_Data<T extends number | string> {
  modType: ModType; //modification type
  value: T;
  pubPropTitle?: string;
}

interface IObj_ID_Data<T extends number> extends IObj_PROP_Data<T> {
  modType: Extract<ModType, 'constant'>;
  value: T;
}

interface IObj_NAME_Data<T extends string> extends IObj_PROP_Data<T> {
  modType: Extract<ModType, 'constant'>;
  value: T;
}

//TODO add public prop_title
interface ICommonObjProperties<T extends number, K extends string> extends IObjCommonData {
  layerId: IObj_ID_Data<T>;
  name: IObj_NAME_Data<K>;
}

//objs
interface IBorderObjProperties<I extends number, N extends string> extends ICommonObjProperties<I, N> {
  objArea: IObj_PROP_Data<number>;
  objMaxFloors: IObj_PROP_Data<number>;
  objMinFloors: IObj_PROP_Data<number>;
}

interface IStreetObjProperties<I extends number, N extends string> extends ICommonObjProperties<I, N> {
  objLength: IObj_PROP_Data<number>;
  objWidth: IObj_PROP_Data<number>;
}

interface IBlockObjProperties<I extends number, N extends string> extends ICommonObjProperties<I, N> {
  objArea: IObj_PROP_Data<number>;
}

interface IBuildingObjProperties<I extends number, N extends string> extends ICommonObjProperties<I, N> {
  objFloors: IObj_PROP_Data<number>;
}

interface IObjProperties {
  [ILayerIDs.borders]: IBorderObjProperties<ILayerIDs.borders, 'Border'>;
  [ILayerIDs.streets]: IStreetObjProperties<ILayerIDs.streets, 'Street'>;
  [ILayerIDs.blocks]: IBlockObjProperties<ILayerIDs.blocks, 'Block'>;
  [ILayerIDs.buildings]: IBuildingObjProperties<ILayerIDs.buildings, 'Building'>;
}

function IsObjDataOfJoinedObj(objUD: Record<any, any>): objUD is IObjProperties[keyof IObjProperties] {
  if (
    objUD[CommonObjPropNames.objGeneralType] &&
    objUD[CommonObjPropNames.objGeneralType] === CommonObjGeneralTypeNames.JoinedObjType
  ) {
    return true;
  } else {
    return false;
  }
}
