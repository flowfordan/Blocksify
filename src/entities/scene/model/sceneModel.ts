import { makeAutoObservable, toJS } from 'mobx';
import type { PointerCoords } from 'shared/types';
import { Vector3 } from 'three';

const SceneStageIDs = ['start', 'bordered', 'divided', 'blocksified'] as const;
type SceneStageId = (typeof SceneStageIDs)[number];
interface IStage {
  id: SceneStageId;
  order: number;
  title: string;
  status: 'not_started' | 'current' | 'completed';
}

const stages: Array<IStage> = [
  {
    id: 'start',
    order: 0,
    title: 'start',
    status: 'completed',
  },
  {
    id: 'bordered',
    order: 1,
    title: 'bordered',
    status: 'current',
  },
  {
    id: 'divided',
    order: 2,
    title: 'divided',
    status: 'not_started',
  },
  {
    id: 'blocksified',
    order: 3,
    title: 'blocksyfied',
    status: 'not_started',
  },
];

export class SceneModel {
  private _isFetchingPointerCoords: boolean;
  currentPointerCoordsGlobal: PointerCoords;
  readonly baseDirection: Vector3;
  stages: Array<IStage> = stages;

  constructor() {
    this._isFetchingPointerCoords = true;
    this.currentPointerCoordsGlobal = {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    };

    this.baseDirection = new Vector3(1, 0, 0);

    makeAutoObservable(this);
  }

  toggleCoordsFetching = (status: boolean) => {
    this._isFetchingPointerCoords = status;
    if (!status) {
      this.currentPointerCoordsGlobal.x = 0;
      this.currentPointerCoordsGlobal.y = 0;
      this.currentPointerCoordsGlobal.z = 0;
    }
  };

  setPointerCoords = (coords: PointerCoords) => {
    this.currentPointerCoordsGlobal.x = coords.x;
    this.currentPointerCoordsGlobal.y = coords.y;
    this.currentPointerCoordsGlobal.z = coords.z;
  };

  setStageNext = () => {
    //set current
    //set prev as completed
    let currentIdx = 0;
    for (let i = 0; i < this.stages.length; i++) {
      //
      if (this.stages[i].status === 'current') {
        currentIdx = i;
        this.stages[i].status = 'completed';
      }
    }
    this.stages[currentIdx + 1].status = 'current';
  };

  setStagePrev = () => {
    //set current
    //set prev as completed
    for (let i = this.stages.length - 1; i > -1; i--) {
      if (this.stages[i].status === 'current') {
        this.stages[i].status = 'not_started';
        this.stages[i - 1].status = 'current';
        break;
      }
    }
  };

  resetStagesToStart = () => {
    for (let i = 0; i < this.stages.length; i++) {
      if (i === 0) {
        this.stages[i].status = 'current';
      } else this.stages[i].status = 'not_started';
    }
  };

  get currentStage() {
    return this.stages.find((stage) => stage.status === 'current');
  }
}

export const sceneModel = new SceneModel();
