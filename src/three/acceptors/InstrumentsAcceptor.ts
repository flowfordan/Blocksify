/* eslint-disable @typescript-eslint/no-explicit-any */
import { instrumentsState } from 'shared/model';
import { CommonObjGeneralTypeNames, CommonObjPropNames, IObjCommonData, IObjProperties } from 'shared/types/objsData';
//connect with InstrumentsState
//recieve data from Instruments, pass data to State

export class InstrumentsAcceptor {
  constructor() {
    //
  }

  setSelectorSelectedObjData = (obj: THREE.Object3D | null) => {
    console.log('SET SELECTOR OBJ DATA:', obj?.userData);
    //checks
    //obj.userData
    if (!obj) return;
    const data = obj.userData;
    //check if object JOINED_TITLE_OBJ
    if (IsObjDataOfJoinedObj(data)) {
      //set data to state
      instrumentsState.updSelectorData(data, 'selected');
    } else {
      return;
    }
  };
}

function IsObjDataOfJoinedObj(objUD: Record<any, any>): objUD is IObjProperties[keyof IObjProperties] {
  if (
    objUD[CommonObjPropNames.objGeneralType] &&
    objUD[CommonObjPropNames.objGeneralType] === CommonObjGeneralTypeNames.JoinedObjType
  ) {
    return true;
  } else {
    return false;
  }
}
