import { LayersMediator } from './../mediators/LayersMediator';
import { IsObjDataOfObjMain } from 'shared/types/objs';
import { SceneGetter } from './SceneGetter';
import { myLine } from 'three/config/geometry/geometry';
import { setParallelLine } from './getParallelLine';
import { GeneratorMediator } from 'three/mediators/GeneratorMediator';
import { PropsEditor } from './PropsEditor';

export class SceneObjsWatcher {
  layersMediator: LayersMediator;
  generatorMediator: GeneratorMediator;
  sceneGetter: SceneGetter;
  propsEditor: PropsEditor;
  constructor() {
    this.layersMediator = new LayersMediator();
    this.generatorMediator = new GeneratorMediator();
    //layersMediator
    this.sceneGetter = new SceneGetter();
    this.propsEditor = new PropsEditor();
  }

  onObjAdded = (obj: THREE.Object3D) => {
    if (IsObjDataOfObjMain(obj.userData)) {
      console.log('onObjAdded main', obj);
      // console.log(this.sceneGetter.);
      //trigger auto generation
      //call generation service - obj add + obj data
      this.generatorMediator.setGenerationTask(obj, obj.userData.layerId.value, 'add');
      //upd layer stats
      this._registerLayerObjsChange('add', obj.userData.layerId.value);
      //update auto calc obj values
      this._onUpdCalculatedProps(obj, obj.userData.layerId.value);
    }
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
    this.layersMediator.updLayerObjsCount(multiplier, layerId);
    if (operation === 'add') {
      //calc auto props
    }
  };

  private _onUpdCalculatedProps = (obj: THREE.Object3D, layerId: number) => {
    this.propsEditor.updObjAutoProps(obj, layerId);
  };
}
