import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { getLineMat } from 'three/config/objs3d';
import { ObjManagerCommon } from './ObjManagerCommon';
import { SceneModifier } from '../SceneModifier';
import { InstrumentHelpersId } from 'shared/types';
import { Vector3 } from 'three';

/* 
  Manager to process operations related to render effects caused by helpers
  work - snapping points, angle lines etc.
*/

type RenderedGuidesOptions = {
  points: {
    form: THREE.Points;
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
  };
  lines: {
    form: Line2;
    geometry: LineGeometry;
    material: LineMaterial;
  };
  mainLine: {
    form: Line2;
    geometry: LineGeometry;
    material: LineMaterial;
  };
};

export class _ObjManagerHelpers implements ObjManagerCommon {
  sceneModifier: SceneModifier;
  renderedGuidesOptions: RenderedGuidesOptions;
  constructor(modifier: SceneModifier) {
    this.sceneModifier = modifier;
    //GUIDES - shows snapped points and lines for angles
    //TODO load when Scene is building
    this.renderedGuidesOptions = this._loadInitGuidesOptions();
  }

  renderHelperLabel = (coords: THREE.Vector3, finalSnapType: InstrumentHelpersId | '', fixedCoords?: THREE.Vector3) => {
    switch (finalSnapType) {
      case InstrumentHelpersId.SNAP_GRID:
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0xa7a7a7);
        break;
      case InstrumentHelpersId.SNAP_STEP:
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0x5cc6ff);
        break;
      case InstrumentHelpersId.SNAP_ANGLE:
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0x5cc6ff);
        if (fixedCoords) {
          const guideDist = 10000;
          //temp render line parallel to snapped angle
          const guideV3 = new THREE.Vector3();
          guideV3
            .subVectors(coords, fixedCoords) //newV3 - fixed
            .setLength(guideDist) //TODO define number, infinite?
            .add(fixedCoords);

          const extGuideV3 = fixedCoords.clone().lerp(guideV3, -1);

          this.renderedGuidesOptions.lines.geometry.setPositions([...extGuideV3.toArray(), ...guideV3.toArray()]);

          //render North-South base line
          const baseV3 = new Vector3(1, 0, 0);
          baseV3.setLength(guideDist).add(fixedCoords);

          const extBaseV3 = fixedCoords.clone().lerp(baseV3, -1);

          this.renderedGuidesOptions.mainLine.geometry.setPositions([...extBaseV3.toArray(), ...baseV3.toArray()]);

          this.sceneModifier.addObj(this.renderedGuidesOptions.lines.form);
          this.sceneModifier.addObj(this.renderedGuidesOptions.mainLine.form);
          // this.scene.add(this.renderedGuidesOptions.lines.form);
          // this.scene.add(this.renderedGuidesOptions.mainLine.form);
        }
        break;
      case '':
        return;
      default:
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0xa7a7a7);
        return;
    }
    //helper object - point
    this.renderedGuidesOptions.points.geometry.setFromPoints([coords]);
    this.sceneModifier.addObj(this.renderedGuidesOptions.points.form);
  };

  private _loadInitGuidesOptions = (): RenderedGuidesOptions => {
    const guidesOptions = {
      points: {
        form: new THREE.Points(),
        geometry: new THREE.BufferGeometry(),
        material: new THREE.PointsMaterial({
          color: 0x5cc6ff,
          size: 11,
          sizeAttenuation: false,
          opacity: 0.5,
          transparent: true,
        }),
      },
      lines: {
        form: new Line2(),
        geometry: new LineGeometry(),
        material: getLineMat(0xff2f2f),
      },
      mainLine: {
        form: new Line2(),
        geometry: new LineGeometry(),
        material: getLineMat(0xff8383, 2, false, 0.8),
      },
    };
    guidesOptions.points.material.depthWrite = false;
    guidesOptions.points.material.depthTest = false;

    guidesOptions.points.form = new THREE.Points(guidesOptions.points.geometry, guidesOptions.points.material);
    guidesOptions.lines.form = new Line2(guidesOptions.lines.geometry, guidesOptions.lines.material);
    guidesOptions.mainLine.form = new Line2(guidesOptions.mainLine.geometry, guidesOptions.mainLine.material);

    return guidesOptions;
  };

  removeRenderedLabels = () => {
    this.sceneModifier.removeObj(this.renderedGuidesOptions.lines.form);
    this.sceneModifier.removeObj(this.renderedGuidesOptions.points.form);
    this.sceneModifier.removeObj(this.renderedGuidesOptions.mainLine.form);
  };
}
