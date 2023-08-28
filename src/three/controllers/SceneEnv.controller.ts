import { reaction } from 'mobx';
import { SceneEnvOptionId } from 'shared/types';
import * as THREE from 'three';
import { getGridHelper } from 'three/presets/gridHelper';
import { dirLight, dirLightHelper, hemiLight } from 'three/presets';
import { SceneModifier } from 'three/services/SceneModifier';
import { SceneEnvModel } from 'three/shared';

export class SceneEnvController {
  axesHelper: THREE.AxesHelper;
  gridHelper: THREE.GridHelper;
  sceneModifier: SceneModifier;
  private readonly envModel: SceneEnvModel;
  constructor(modifier: SceneModifier, envModel: SceneEnvModel) {
    this.sceneModifier = modifier;
    this.envModel = envModel;
    //red green blue lines in 0,0
    this.axesHelper = new THREE.AxesHelper(10);
    this.gridHelper = getGridHelper(10);
    this.sceneModifier.scene.background = new THREE.Color(0xb3deff);

    this.sceneModifier.addUtilObjs([dirLight, dirLightHelper, hemiLight]);
    this.sceneModifier.addUtilObjs([this.axesHelper]);
    this.sceneModifier.addUtilObjs([this.gridHelper]);

    this._storeSubscribe();
  }

  toggleGridVisibility = (isVisible: boolean) => {
    this.gridHelper.visible = isVisible;
  };

  private _storeSubscribe = () => {
    reaction(
      () => {
        const gridVis = this.envModel._getItem(SceneEnvOptionId.GRID_VIS);
        if (!gridVis) return null;
        return gridVis.isActive;
      },
      (cur, prev) => {
        if (cur === null || prev === null) return;
        if (cur !== prev) {
          this.toggleGridVisibility(cur);
        }
      }
    );
  };
}
