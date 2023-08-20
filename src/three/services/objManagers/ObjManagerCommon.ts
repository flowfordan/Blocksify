import { SceneModifier } from '../SceneModifier';
import { _ObjManagerFX } from './_ObjManagerFX';
import { _ObjManagerHelpers } from './_ObjManagerHelpers';
import { _ObjManagerMain } from './_ObjManagerMain';

export abstract class ObjManagerCommon {
  sceneModifier: SceneModifier;
  constructor(modifier: SceneModifier) {
    this.sceneModifier = modifier;
  }
}

//HANDLERS
class _ObjManagerTags implements ObjManagerCommon {
  sceneModifier: SceneModifier;
  constructor(modifier: SceneModifier) {
    this.sceneModifier = modifier;
  }
  createObj(): void {
    throw new Error('Method not implemented.');
  }
  updObj(): void {
    throw new Error('Method not implemented.');
  }
  renderObj(): void {
    throw new Error('Method not implemented.');
  }
  removeObj(): void {
    throw new Error('Method not implemented.');
  }
  reset(): void {
    throw new Error('Method not implemented.');
  }
}

const ObjManagersData = {
  main: _ObjManagerMain,
  fx: _ObjManagerFX,
  tags: _ObjManagerTags,
  helpers: _ObjManagerHelpers,
};

type ObjManagersDataType = typeof ObjManagersData;

export class ObjManagerFactory {
  constructor() {
    //
  }

  createObjManager<T extends keyof ObjManagersDataType>(objManagerType: T): ObjManagersDataType[T] {
    return ObjManagersData[objManagerType];
  }
}
