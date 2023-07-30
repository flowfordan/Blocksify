/* eslint-disable @typescript-eslint/no-explicit-any */
import { InstrumentsId } from 'shared/types';
import { IsObjDataOfObjMain } from 'shared/types/objs';
import type { InstrumentsModel } from 'three/shared';
//connect with this.instrumentsModel
//recieve data from Instruments, pass data to State

export class InstrumentsMediator {
  private instrumentsModel: InstrumentsModel;
  constructor(instrumentsModel: InstrumentsModel) {
    this.instrumentsModel = instrumentsModel;
  }

  //continous only
  toggleInstrumentActive = (instrId: InstrumentsId) => {
    this.instrumentsModel.toggleInstrumentActive(instrId);
  };

  setSelectorIntersectedObjData = (obj: THREE.Object3D | null) => {
    if (obj) {
      if (!IsObjDataOfObjMain(obj.userData)) return;
      this.instrumentsModel.setInstrumentData(obj.userData, InstrumentsId.SELECTOR, 'int');
    } else this.instrumentsModel.setInstrumentData(null, InstrumentsId.SELECTOR, 'int');
    // if (obj && IsObjDataOfObjMain(obj.userData)) {
    //   this.instrumentsModel.updSelectorData(obj.userData, 'intersected');
    // } else if (this.instrumentsModel.toolsData['selector'].intersectedObjData) {
    //   this.instrumentsModel.updSelectorData(null, 'intersected');
    // }
  };

  setSelectorSelectedObjData = (obj: THREE.Object3D | null) => {
    if (obj) {
      if (!IsObjDataOfObjMain(obj.userData)) return;
      this.instrumentsModel.setInstrumentData(obj.userData, InstrumentsId.SELECTOR, 'sel');
    } else this.instrumentsModel.setInstrumentData(null, InstrumentsId.SELECTOR, 'sel');
    // if (obj && IsObjDataOfObjMain(obj.userData)) {
    //   this.instrumentsModel.updSelectorData(obj.userData, 'selected');
    // } else if (this.instrumentsModel.toolsData['selector'].selectedObjData) {
    //   this.instrumentsModel.updSelectorData(null, 'selected');
    // }
  };
}
