import { SceneModifier } from '../SceneModifier';

export abstract class Handler {
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
class HandlerMain implements Handler {
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

class HandlerFX implements Handler {
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

class HandlerTags implements Handler {
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

class HandlerHelpers implements Handler {
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

class HandlerFactory {
  constructor() {
    //
  }

  createHandler(handlerType: 'main' | 'fx' | 'tags' | 'helpers', modifier: SceneModifier) {
    switch (handlerType) {
      case 'main':
        return new HandlerMain(modifier);
      case 'fx':
        return new HandlerFX(modifier);
      case 'tags':
        return new HandlerTags(modifier);
      case 'helpers':
        return new HandlerHelpers(modifier);
      default:
        throw new Error('Handler Type Factory: Handler type is not defined');
    }
  }
}
