import { ILayerIDs } from './layers';

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

interface ICommonObjProperties<T, K> {
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

//test various
interface IVariousObjProperties<I, N> extends ICommonObjProperties<I, N> {
  objFloors: IObjPropertyData<number>;
  objArea: IObjPropertyData<number>;
  objLength: IObjPropertyData<number>;
  objWidth: IObjPropertyData<number>;
  objMaxFloors: IObjPropertyData<number>;
  objMinFloors: IObjPropertyData<number>;
}

//Layer Id
export interface IObjProperties {
  [ILayerIDs.borders]: IBorderObjProperties<ILayerIDs.borders, 'Border'>;
  [ILayerIDs.streets]: IStreetObjProperties<ILayerIDs.streets, 'Street'>;
  [ILayerIDs.blocks]: IBlockObjProperties<ILayerIDs.blocks, 'Block'>;
  [ILayerIDs.buildings]: IBuildingObjProperties<ILayerIDs.buildings, 'Building'>;
}

//OBJS - SEGMENTS OF COMMON OBJS
//userdata
//main
interface IObjSegmentData {
  objType: 'main' | 'sub';
}

export {};
