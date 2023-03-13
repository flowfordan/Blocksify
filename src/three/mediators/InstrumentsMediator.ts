/* eslint-disable @typescript-eslint/no-explicit-any */
import { InstrumentsId } from 'shared/types';
import { IsObjDataOfObjMain } from 'shared/types/objs';
import { InstrumentsModel } from 'three/shared';
//connect with this.instrumentsModel
//recieve data from Instruments, pass data to State

export class InstrumentsMediator {
  private instrumentsModel: InstrumentsModel;
  constructor(instrumentsModel: InstrumentsModel) {
    this.instrumentsModel = instrumentsModel;
  }

  //continous only
  toggleInstrumentActive = (instrId: InstrumentsId) => {
    const instrument = this.instrumentsModel._getInstrument(instrId);
    if (instrument) instrument.isActive = !instrument.isActive;
  };

  setSelectorIntersectedObjData = (obj: THREE.Object3D | null) => {
    // if (obj && IsObjDataOfObjMain(obj.userData)) {
    //   this.instrumentsModel.updSelectorData(obj.userData, 'intersected');
    // } else if (this.instrumentsModel.toolsData['selector'].intersectedObjData) {
    //   this.instrumentsModel.updSelectorData(null, 'intersected');
    // }
  };

  setSelectorSelectedObjData = (obj: THREE.Object3D | null) => {
    // if (obj && IsObjDataOfObjMain(obj.userData)) {
    //   this.instrumentsModel.updSelectorData(obj.userData, 'selected');
    // } else if (this.instrumentsModel.toolsData['selector'].selectedObjData) {
    //   this.instrumentsModel.updSelectorData(null, 'selected');
    // }
  };
}
