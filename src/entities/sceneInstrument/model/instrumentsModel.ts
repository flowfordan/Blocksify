import { DefInstrumentsData } from './../config/instruments';
import { makeAutoObservable } from 'mobx';
import { Instrument, InstrumentsData, InstrumentsId, LvlActiveInstrument } from 'shared/types';
import { DefInstruments } from '../config/instruments';
import { IObjDataProps } from 'shared/types/objs';
export class InstrumentsModel {
  instruments: Array<Instrument>;
  instrumentsData: InstrumentsData;
  currentLvlInstrument: LvlActiveInstrument;
  // currentInstrument: InstrumentsId | null;
  constructor() {
    this.instruments = DefInstruments;
    this.instrumentsData = DefInstrumentsData;
    this.currentLvlInstrument = {
      top: null,
      middle: null,
      low: null,
    };
    // this.currentInstrument = null;

    makeAutoObservable(this);
  }

  /*   top lvl instrument */
  get currentInstrument() {
    const activeInstr = this.instruments.find((el) => el.isActive && el.lvl === 'top');
    if (activeInstr) {
      return activeInstr;
    } else return null;
  }

  toggleInstrumentActive = (instrId: InstrumentsId) => {
    const instr = this._getInstrument(instrId);
    if (!instr) return;
    //toggle one
    instr.isActive = !instr.isActive;
    //check all on the same lvl
    if (instr.isActive && instr.lvl === 'top') {
      const lvl = instr.lvl;
      //toggle instr same level
      for (const i of this.instruments) {
        if (i.lvl === lvl && i.isActive && i.id !== instrId) {
          i.isActive = false;
        }
      }
    }
    //deactivate all dependands
    const dependand = instr.autoTriggerFor;
    if (dependand) this.toggleInstrumentActive(dependand);
  };

  toggleInstrumentAvailable = (instrId: InstrumentsId) => {
    const instr = this._getInstrument(instrId);
    if (instr) {
      instr.isAvailable = !instr.isAvailable;
    }
  };

  setInstrumentsAvailable = (instrId: InstrumentsId, isAvailable = true) => {
    const instr = this._getInstrument(instrId);
    if (!instr) return;
    instr.isAvailable = isAvailable || false;
  };

  _getInstrument = (instrId: InstrumentsId) => {
    const toolData = this.instruments.find((el) => {
      return el.id === instrId;
    });
    return toolData ? toolData : null;
  };

  setInstrumentData = (
    data: IObjDataProps[keyof IObjDataProps] | null,
    instrumentId: InstrumentsId.INSPECTOR,
    type: 'int' | 'sel'
  ) => {
    if (type === 'int') {
      this.instrumentsData[instrumentId].intersectedObjData = data;
    } else {
      this.instrumentsData[instrumentId].selectedObjData = data;
    }
  };
}

export const instrumentsModel = new InstrumentsModel();
