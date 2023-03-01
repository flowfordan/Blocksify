import { makeAutoObservable } from 'mobx';
import { InstrumentHelper, InstrumentsHelpersActivity } from 'shared/types/instrumentsHelpers';
import { Vector3 } from 'three';
import { createBaseV3s } from 'three/helpers/createBaseV3s';
import { DefHelpersActivity, DefInstrHelpers } from '../config/helpers';

export type AnglePts = {
  [key: number]: [Vector3, Vector3];
};

class InstrumentsHelpersModel {
  anglesSnapV3s: AnglePts | null;

  helpersOptions: Array<InstrumentHelper>;
  isHelpersActive: InstrumentsHelpersActivity;
  constructor() {
    this.isHelpersActive = DefHelpersActivity;
    this.helpersOptions = DefInstrHelpers;
    this.anglesSnapV3s = null;

    makeAutoObservable(this);
  }
}

export const instrumentsHelpersModel = new InstrumentsHelpersModel();
