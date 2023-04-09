import { SceneModifier } from '../SceneModifier';
import { _HandlerFX } from './_HandlerFX';
import { _HandlerMain } from './_HandlerMain';

export abstract class AHandler {
  sceneModifier: SceneModifier;
  constructor(modifier: SceneModifier) {
    this.sceneModifier = modifier;
  }

  // abstract createObj(): void;
  // abstract updObj(): void;
  // abstract renderObj(): void;
  // abstract removeObj(): void;
  // abstract reset(): void;
}

//HANDLERS
class _HandlerTags implements AHandler {
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

class _HandlerHelpers implements AHandler {
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

const HandlersData = {
  main: _HandlerMain,
  fx: _HandlerFX,
  tags: _HandlerTags,
  helpers: _HandlerHelpers,
};

type HandlersType = typeof HandlersData;
export class HandlerFactory {
  constructor() {
    //
  }

  createHandler<T extends keyof HandlersType>(handlerType: T): HandlersType[T] {
    return HandlersData[handlerType];
  }
}
