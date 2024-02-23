import { LayersAdapter } from '../adapters/LayersAdapter';
import { IsObjDataOfObjMain } from 'shared/types/objs';
import { SceneGetter } from './SceneGetter';
import { setParallelLine } from './getParallelLine';
import { GeneratorAdapter } from 'three/adapters/GeneratorAdapter';
import { PropsEditor } from './PropsEditor';

export class SceneObjsWatcher {
  layersAdapter: LayersAdapter;
  generatorAdapter: GeneratorAdapter;
  sceneGetter: SceneGetter;
  propsEditor: PropsEditor;
  constructor() {
    this.layersAdapter = new LayersAdapter();
    this.generatorAdapter = new GeneratorAdapter();
    //layersAdapter
    this.sceneGetter = new SceneGetter();
    this.propsEditor = new PropsEditor();
  }

  //before obj added to scene
  onObjAdd = (obj: THREE.Object3D) => {
    if (!IsObjDataOfObjMain(obj.userData)) return;
    //trigger auto generation
    //call generation service - obj add + obj data
    this.generatorAdapter.setGenerationTask(obj, obj.userData.layerId.value, 'add');
  };

  //after obj added to scene
  onObjAdded = (obj: THREE.Object3D) => {
    if (!IsObjDataOfObjMain(obj.userData)) return;
    this.generatorAdapter.setGenerationTask(obj, obj.userData.layerId.value, 'added');
    //upd layer stats
    this._registerLayerObjsChange('add', obj.userData.layerId.value);
    //update auto calc obj values
    this._onUpdCalculatedProps(obj, obj.userData.layerId.value);
  };

  onObjRemoved = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      this._registerLayerObjsChange('remove', obj.userData.layerId.value);
    }
  };

  //reaction on user input prop change
  onObjPropChanged = (obj: THREE.Object3D) => {
    console.log('PROP CHANGED:', obj);
  };

  private _registerLayerObjsChange = (operation: 'add' | 'remove', layerId: number) => {
    const multiplier = operation === 'add' ? 1 : -1;
    this.layersAdapter.updLayerObjsCount(multiplier, layerId);
    if (operation === 'add') {
      //calc auto props
    }
  };

  private _onUpdCalculatedProps = (obj: THREE.Object3D, layerId: number) => {
    this.propsEditor.updObjAutoProps(obj, layerId);
  };
}
