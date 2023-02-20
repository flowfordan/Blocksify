import { ILayerIDs } from './layers';

//COMMON PROPS FOR ALL CREATED AND ADDED OBJS
type GeneralObjType = 'joined_title_obj' | 'main_pt_obj' | 'sub_pt_obj' | 'temp_obj';
interface IObjCommonData {
  objGeneralType: GeneralObjType;
}

type ModType = 'constant' | 'calculated' | 'editable';

//COMMON LAYER OBJS (JOINED) - USER DATA
interface IObjPropertyData<T extends number | string> {
  modType: ModType; //modification type
  value: T;
}

interface IObjIdData<T> {
  modType: Extract<ModType, 'constant'>; //modification type
  value: T;
}

interface IObjNameData<T> {
  modType: Extract<ModType, 'constant'>; //modification type
  value: T;
}

interface ICommonObjProperties<T, K> extends IObjCommonData {
  layerId: IObjIdData<T>;
  name: IObjNameData<K>;
}

//objs
interface IBorderObjProperties<I, N> extends ICommonObjProperties<I, N> {
  objArea: IObjPropertyData<number>;
  objMaxFloors: IObjPropertyData<number>;
  objMinFloors: IObjPropertyData<number>;
}

interface IStreetObjProperties<I, N> extends ICommonObjProperties<I, N> {
  objLength: IObjPropertyData<number>;
  objWidth: IObjPropertyData<number>;
}

interface IBlockObjProperties<I, N> extends ICommonObjProperties<I, N> {
  objArea: IObjPropertyData<number>;
}

interface IBuildingObjProperties<I, N> extends ICommonObjProperties<I, N> {
  objFloors: IObjPropertyData<number>;
}

export interface IObjProperties {
  [ILayerIDs.borders]: IBorderObjProperties<ILayerIDs.borders, 'Border'>;
  [ILayerIDs.streets]: IStreetObjProperties<ILayerIDs.streets, 'Street'>;
  [ILayerIDs.blocks]: IBlockObjProperties<ILayerIDs.blocks, 'Block'>;
  [ILayerIDs.buildings]: IBuildingObjProperties<ILayerIDs.buildings, 'Building'>;
}
