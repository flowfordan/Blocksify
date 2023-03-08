import { makeAutoObservable, autorun, toJS } from 'mobx';
import { InstrumentHelper, InstrumentHelpersId, InstrumentsHelpersActivity } from 'shared/types/instrumentsHelpers';
import { Vector3 } from 'three';
import { createBaseV3s } from 'three/helpers/createBaseV3s';
import { DefHelpersActivity, DefInstrHelpers } from '../config/helpers';

export type AnglePts = {
  [key: number]: [Vector3, Vector3];
};

class InstrumentsHelpersModel {
  anglesSnapV3s: AnglePts | null;

  helpers: Array<InstrumentHelper>;
  isHelpersActive: InstrumentsHelpersActivity;
  constructor() {
    this.isHelpersActive = DefHelpersActivity;
    this.helpers = DefInstrHelpers;
    this.anglesSnapV3s = null;

    makeAutoObservable(this);
  }

  _getItem = (id: InstrumentHelpersId) => {
    const data = this.helpers.find((el) => {
      return el.id === id;
    });
    return data ? data : null;
  };

  toggleHelperActive = (id: InstrumentHelpersId) => {
    const item = this._getItem(id);
    if (item) {
      item.isActive = !item.isActive;

      //change in activities
      this.isHelpersActive[item.id] = item.isActive;
    }
  };

  setHelperValue = (id: InstrumentHelpersId, value: number) => {
    const item = this._getItem(id);
    if (item) {
      item.options.value = value;
      console.log(item.options.value);
    }
  };
}

export const instrumentsHelpersModel = new InstrumentsHelpersModel();
