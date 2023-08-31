import { makeAutoObservable, autorun, toJS } from 'mobx';
import { InstrumentHelper, InstrumentHelpersId, InstrumentsHelpersActivity } from 'shared/types/instrumentsHelpers';
import { Vector3 } from 'three';
import { DefHelpersActivity, DefInstrHelpers } from '../config/helpers';
import { createBaseV3s } from 'three/lib/createBaseV3s';

export type AnglePts = {
  [key: number]: [Vector3, Vector3];
};

export class InstrumentsHelpersModel {
  anglesSnapV3s: AnglePts | null;

  helpers: Array<InstrumentHelper>;
  isHelpersActive: InstrumentsHelpersActivity;
  constructor() {
    this.isHelpersActive = DefHelpersActivity;
    this.helpers = DefInstrHelpers;
    //TODO rewrite
    this.anglesSnapV3s = createBaseV3s(this.helpers[1].options.selValues);

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
    if (!item) return;

    if (item.options.controller === 'range') {
      item.options.value = value;
    } else if (item.options.controller === 'selection') {
      const idx = item.options.selValues.indexOf(value);
      if (idx > -1) {
        //remove
        item.options.selValues = [...item.options.selValues.slice(0, idx), ...item.options.selValues.slice(idx + 1)];
      } else {
        //add
        item.options.selValues.push(value);
      }

      //upd angles
      if (item.id === InstrumentHelpersId.SNAP_ANGLE) {
        this.anglesSnapV3s = createBaseV3s(this.helpers[1].options.selValues);
      }
    }
  };
}

export const instrumentsHelpersModel = new InstrumentsHelpersModel();
