/* eslint-disable @typescript-eslint/no-explicit-any */
import { LineMaterial, Line2, LineGeometry } from 'three-fatline';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { sceneState, HelperOptions, SnapOptions, SnapType, SnapStatus, instrumentsState } from '../../shared/model';
import { createBaseV3s } from './createBaseV3s';
import { getLineMat } from 'three/config/objs3d';

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

//new instance is created when Tool's startDrawing() called
class SnapManager {
  options: HelperOptions;
  snapOptions: SnapOptions;
  scene: THREE.Scene;
  currentSnapping: string | null;

  baseVector: THREE.Vector3;

  renderedGuidesOptions: RenderedGuidesOptions;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.options = instrumentsState.helpersOptions;
    this.currentSnapping = null;

    this.snapOptions = this._loadInitSnapOptions();

    this.baseVector = sceneState.baseDirection;

    //GUIDES - shows snapped points and lines for angles
    //TODO load when Scene is building
    this.renderedGuidesOptions = this._loadInitGuidesOptions();
  }

  //TODO refactor init func - we already loaded stuff in constructor - need only minor upd
  start = () => {
    this.snapOptions = this._loadInitSnapOptions();
  };

  //TODO see about performance when angle snap small and mouse moving fast
  snapToCoords = (pointerCoords: THREE.Vector3, toolState = 1, lastCoords?: THREE.Vector3): THREE.Vector3 => {
    //return if non of snapping is active
    if (Object.values(this.snapOptions).every((o) => o.isActive === false)) {
      return pointerCoords;
    }

    console.time('snapping time');
    for (const key in this.snapOptions!) {
      (this.snapOptions as SnapOptions)[key as SnapType].snappedCoords = pointerCoords;
    }

    this._snapToGrid(pointerCoords);
    if (toolState > 1) {
      this._snapToStep(pointerCoords, lastCoords);
      this._snapToAngle(pointerCoords, lastCoords);
    }

    let newCoords = pointerCoords;
    let distanceToPointer = Infinity;
    let finalSnapType = '';
    //iterate snapOptions and reassign if needed
    for (const key in this.snapOptions! as SnapOptions) {
      //iterate only active snaps
      if (this.snapOptions[key as SnapType].isActive) {
        if (this.snapOptions[key as SnapType].distToOrigin <= distanceToPointer) {
          distanceToPointer = this.snapOptions[key as SnapType].distToOrigin;
          newCoords = this.snapOptions[key as SnapType].snappedCoords;
          finalSnapType = key;
          //set current 'chosen' snap type
          this.snapOptions[key as SnapType].isCurrent = true;

          this.currentSnapping = key;
        }
      }
    }
    //call helpers render
    this._renderHelperLabel(newCoords, finalSnapType, lastCoords);
    console.timeEnd('snapping time');

    return newCoords;
  };

  private _snapToGrid = (pointerCoords: THREE.Vector3): void => {
    //depends on active
    if (this.snapOptions!.grid.isActive) {
      const newCoords = Object.assign({}, pointerCoords);

      const precision = this.options[3].value;

      const adjustVal = (coord: number, precision: number): number => {
        let newCoord = 0;
        //case when size<1
        //TODO not 2 but value of 1/size
        if (precision < 1) {
          newCoord = Math.round(coord * 2) / 2;
        } else {
          newCoord = Math.round(coord / precision) * precision;
        }
        return newCoord;
      };

      newCoords.x = adjustVal(newCoords.x, precision);
      newCoords.z = adjustVal(newCoords.z, precision);

      const distanceToCurrent = pointerCoords.distanceTo(newCoords);

      this.snapOptions!.grid.snappedCoords = newCoords;
      this.snapOptions!.grid.distToOrigin = distanceToCurrent;
      return;
    } else {
      return;
    }
  };

  private _snapToStep = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined): void => {
    //find coords
    //TODO search within Options?
    if (this.snapOptions!.step.isActive && fixedCoords) {
      let newCoords = Object.assign({}, pointerCoords);
      const snapValue = this.options[0].value;

      const distToPointer = fixedCoords.distanceTo(pointerCoords);

      //how much chunks(n) of given SIZE could fit in distance
      const snapsAmount = Math.round(distToPointer / snapValue);
      //new distance considering only chunks of given size
      const snapDistance = snapsAmount * snapValue;

      newCoords = new THREE.Vector3();
      newCoords
        //create vector same direction from 0;0
        .subVectors(pointerCoords, fixedCoords) //
        .setLength(snapDistance) //move end coord according tp length
        .add(fixedCoords); //move vector to fixed from 0;0

      console.log('step END', newCoords);

      const distanceToCurrent = pointerCoords.distanceTo(newCoords);

      this.snapOptions!.step.snappedCoords = newCoords;
      this.snapOptions!.step.distToOrigin = distanceToCurrent;
      return;
    } else {
      return;
    }
  };

  private _snapToAngle = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined) => {
    if (fixedCoords) {
      //SAFETY check if angles are not chosen
      //but snapping is active
      const closestV3collection: V3Collection = instrumentsState.anglesSnapV3s;
      if (Object.keys(closestV3collection).length === 0) {
        console.log('Angles for snapping werent chosen, angle snap is off');
        return;
      }

      //const basedV3 = fixedCoords.clone().add(pointerCoords.clone().multiplyScalar(-1));
      const basedV3 = pointerCoords.clone().sub(fixedCoords.clone());

      const currentAngleRad = this.baseVector.angleTo(basedV3);
      const currentAngleDeg = currentAngleRad * (180 / Math.PI);
      //
      // const currentAngleRad_2 = this.baseVector.angleTo(basedV3_2);
      // const currentAngleDeg_2 = currentAngleRad_2 * (180 / Math.PI);
      // console.log(`First, RAD: ${currentAngleRad}, DEG: ${currentAngleDeg}`);
      // console.log(`Second, RAD: ${currentAngleRad_2}, DEG: ${currentAngleDeg_2}`);

      const isYDirectionPositive = pointerCoords.z > fixedCoords.z;

      type V3Collection = {
        [key: number]: Array<Vector3>;
      };

      let closestV3 = new Vector3();
      let angleThreshold = 360;

      for (const [key, value] of Object.entries(closestV3collection)) {
        //choosing closest snapped option angle from collection
        //getting absolute value - delta
        //TODO rename stuff
        const newAngleThreshold = Math.abs(currentAngleDeg - parseInt(key));

        //finding smallest angle threshold
        //use angle-key to get snapping values
        if (newAngleThreshold < angleThreshold) {
          angleThreshold = newAngleThreshold;
          //check 'side' from main NJS Vector
          //assign V3 from snapped angle
          //TODO remove V3 array & change just z for -1 * z
          if (isYDirectionPositive) {
            closestV3 = closestV3collection[key as unknown as keyof V3Collection][0];
          } else {
            closestV3 = closestV3collection[key as unknown as keyof V3Collection][1];
          }
        }
      }

      //longing base UNIT V3 to needed distance
      const basedNewV3 = closestV3.clone().setLength(fixedCoords.distanceTo(pointerCoords));

      //'moving' vector from CENTER to fixed point
      const newV3 = basedNewV3.clone().add(fixedCoords);

      // saving results to obj
      const distanceToCurrent = pointerCoords.distanceTo(newV3);

      this.snapOptions!.angle.snappedCoords = newV3;
      this.snapOptions!.angle.distToOrigin = distanceToCurrent;
    }
  };

  private _renderHelperLabel = (coords: THREE.Vector3, finalSnapType: string, fixedCoords?: THREE.Vector3) => {
    switch (finalSnapType) {
      case 'grid':
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0xa7a7a7);
        break;
      case 'step':
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0x5cc6ff);
        break;
      case 'angle':
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0x5cc6ff);
        if (fixedCoords) {
          console.log('FIXED', fixedCoords);
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

          this.scene.add(this.renderedGuidesOptions.lines.form);
          this.scene.add(this.renderedGuidesOptions.mainLine.form);
        }
        break;
      case '':
        return;
      default:
        this.renderedGuidesOptions.points.material.color = new THREE.Color(0xa7a7a7);
    }
    //helper object - point
    this.renderedGuidesOptions.points.geometry.setFromPoints([coords]);
    this.scene.add(this.renderedGuidesOptions.points.form);
  };

  //INITIALIZATION
  private _loadInitSnapOptions = (): SnapOptions => {
    const snapsArray: Array<SnapType> = ['grid', 'angle', 'step'];

    const statusPreset: SnapStatus = {
      isActive: false,
      snappedCoords: new Vector3(),
      distToOrigin: Infinity,
      isCurrent: false,
    };

    //TODO remove any
    const defaultSnapOptions: any = {};

    for (const i of snapsArray) {
      defaultSnapOptions[i] = { ...statusPreset };
    }

    const snapOptions: any = { ...defaultSnapOptions };

    for (const item of this.options) {
      if (item.type === 'snap') {
        (snapOptions as SnapOptions)[item.name as SnapType].isActive = item.isActive;
        (snapOptions as SnapOptions)[item.name as SnapType].snappedCoords = new Vector3();
        (snapOptions as SnapOptions)[item.name as SnapType].distToOrigin = Infinity;
        (snapOptions as SnapOptions)[item.name as SnapType].isCurrent = false;
      }
    }

    return snapOptions;
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

  resetSnap = () => {
    this._removeRenderedLabels();
    this.currentSnapping = null;
    for (const item of this.options) {
      if (item.type === 'snap') {
        (this.snapOptions as SnapOptions)[item.name as SnapType].isActive = item.isActive;
        (this.snapOptions as SnapOptions)[item.name as SnapType].distToOrigin = Infinity;
        (this.snapOptions as SnapOptions)[item.name as SnapType].snappedCoords = new Vector3();
        (this.snapOptions as SnapOptions)[item.name as SnapType].isCurrent = false;
      }
    }
  };

  private _removeRenderedLabels = () => {
    this.scene.remove(this.renderedGuidesOptions.lines.form);
    this.scene.remove(this.renderedGuidesOptions.points.form);
    this.scene.remove(this.renderedGuidesOptions.mainLine.form);
  };
}

export { SnapManager };
