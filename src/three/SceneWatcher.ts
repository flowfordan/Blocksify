export class SceneWatcher {
  constructor() {
    //
  }
  //onObjAdded - upd layer status
  //onObjRemoved
  //onPropChanged
  onObjAdded = (obj: THREE.Object3D) => {
    if (obj.userData['type'] === 'main') {
      console.log('RENDERED:', obj.name, 'Layer ID:', obj.layers.mask);
      //send signal to upd layer status
    }
  };

  onObjRemoved = (obj: THREE.Object3D) => {
    if (obj.userData['type'] === 'main') {
      console.log('REMOVED:', obj.name, 'Layer ID:', obj.layers);
    }
  };

  onObjPropChanged = (obj: THREE.Object3D) => {
    console.log('PROP CHANGED:', obj);
  };
}
