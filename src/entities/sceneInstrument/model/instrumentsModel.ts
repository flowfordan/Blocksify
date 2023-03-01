import { DefInstrumentsData } from './../config/instruments';
import { makeAutoObservable } from 'mobx';
import { Instrument, InstrumentsData, InstrumentsId, LvlActiveInstrument } from 'shared/types';
import { DefInstruments } from '../config/instruments';
class InstrumentsModel {
  instruments: Array<Instrument>;
  instrumentsData: InstrumentsData;
  currentLvlInstrument: LvlActiveInstrument;
  constructor() {
    this.instruments = DefInstruments;
    this.instrumentsData = DefInstrumentsData;
    this.currentLvlInstrument = {
      top: null,
      middle: null,
      low: null,
    };

    makeAutoObservable(this);
  }

  toggleInstrumentActive = (instrId: InstrumentsId) => {
    const instr = this._getInstrument(instrId);
    if (instr) {
      //toggle one
      instr.isActive = !instr.isActive;
      //check all on the same lvl
      if (instr.isActive) {
        const lvl = instr.lvl;
        //toggle instr same level
        for (const i of this.instruments) {
          if (i.lvl === lvl && i.isActive && i.id !== instrId) {
            i.isActive = false;
          }
        }
      } else {
        //deactivate all dependands
        const dependand = instr.autoTriggerFor;
        if (dependand) this.toggleInstrumentActive(dependand);
      }
    }
  };

  toggleInstrumentAvailable = (instrId: InstrumentsId) => {
    const instr = this._getInstrument(instrId);
    if (instr) {
      instr.isAvailable = !instr.isAvailable;
    }
  };

  _getInstrument = (instrId: InstrumentsId) => {
    const toolData = this.instruments.find((el) => {
      return el.id === instrId;
    });
    return toolData ? toolData : null;
  };
}

export const instrumentsModel = new InstrumentsModel();
