/* eslint-disable @typescript-eslint/no-explicit-any */
import { instrumentsState, ToolName } from 'shared/model';
import { IsObjDataOfObjMain } from 'shared/types/objs';
//connect with InstrumentsState
//recieve data from Instruments, pass data to State

export class InstrumentsAcceptor {
  constructor() {
    //
  }

  setSelectorIntersectedObjData = (obj: THREE.Object3D | null) => {
    if (obj && IsObjDataOfObjMain(obj.userData)) {
      instrumentsState.updSelectorData(obj.userData, 'intersected');
    } else if (instrumentsState.toolsData['selector'].intersectedObjData) {
      instrumentsState.updSelectorData(null, 'intersected');
    }
  };

  setSelectorSelectedObjData = (obj: THREE.Object3D | null) => {
    if (obj && IsObjDataOfObjMain(obj.userData)) {
      instrumentsState.updSelectorData(obj.userData, 'selected');
    } else if (instrumentsState.toolsData['selector'].selectedObjData) {
      instrumentsState.updSelectorData(null, 'selected');
    }
  };
}
