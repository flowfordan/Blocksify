import { instrumentsState } from 'shared/model';
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
    if (obj) {
      //check props - joined layer obj
      //check layer id
    }

    //set state
    //call
    //instrumentsState
  };
}
