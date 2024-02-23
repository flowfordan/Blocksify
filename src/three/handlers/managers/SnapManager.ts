import * as THREE from 'three';
import { Vector3 } from 'three';
import type { InstrumentsHelpersModel } from 'three/shared';
import { InstrumentHelper, InstrumentHelpersId } from 'shared/types';
//import { toJS } from 'mobx';
import { SceneModifier } from 'three/services/SceneModifier';
import { BASE_DIRECTION } from 'three/config/consts';
import { ObjManagerFactory, _ObjManagerHelpers } from 'three/services';
import { getHypotenusePointCoords } from 'three/lib/lines';

type SnapStatus = {
  isActive: boolean;
  snappedCoords: THREE.Vector3;
  distToOrigin: number;
  isCurrent: boolean;
};

//id - options
export type SnappingStatuses = {
  [K in InstrumentHelpersId]: SnapStatus;
};

//new instance is created when Tool's startDrawing() called
export class SnapManager {
  snapStatuses: SnappingStatuses;
  private sceneModifier: SceneModifier;
  private currentSnapping: InstrumentHelpersId | null;
  helpersModel: InstrumentsHelpersModel;

  baseVector: THREE.Vector3;
  objManagerHelpers: _ObjManagerHelpers;

  constructor(sceneModifier: SceneModifier, helpersModel: InstrumentsHelpersModel) {
    this.helpersModel = helpersModel;
    this.sceneModifier = sceneModifier;
    this.currentSnapping = null;

    this.snapStatuses = this._createDefaultStatuses(helpersModel.helpers);

    this.baseVector = BASE_DIRECTION;

    const objManagerFactory = new ObjManagerFactory();
    this.objManagerHelpers = new (objManagerFactory.createObjManager('helpers'))(sceneModifier);
  }

  //TODO refactor init func - we already loaded stuff in constructor - need only minor upd
  start = () => {
    this.snapStatuses = this._createDefaultStatuses(this.helpersModel.helpers);
  };

  //TODO see about performance when angle snap small and mouse moving fast
  snapToCoords = (pointerCoords: THREE.Vector3, toolState = 1, lastCoords?: THREE.Vector3): THREE.Vector3 => {
    //console.log('SNAP TO COORDS_1', 'grid:', this.snapStatuses);
    //return if non of snapping is active
    if (Object.values(this.snapStatuses).every((o) => o.isActive === false)) {
      return pointerCoords;
    }

    for (const key in this.snapStatuses) {
      this.snapStatuses[key as InstrumentHelpersId].snappedCoords = pointerCoords;
    }

    //Start snapping
    if (this.snapStatuses.snap_grid.isActive) this._snapToGrid(pointerCoords);
    if (this.snapStatuses.snap_step.isActive && toolState > 1) {
      // this._snapToStep(pointerCoords, lastCoords);

      this._snapToStep2(pointerCoords, lastCoords);
    }
    if (this.snapStatuses.snap_angle.isActive && toolState > 1) this._snapToAngle(pointerCoords, lastCoords);

    let newCoords = pointerCoords;
    let distanceToPointer = Infinity;
    let finalSnapType: InstrumentHelpersId | '' = '';

    //iterate snapOptions and reassign if needed
    for (const key in this.snapStatuses) {
      const snapStatus = this.snapStatuses[key as InstrumentHelpersId];
      //iterate only active snaps
      //skip non-Active
      if (!snapStatus.isActive) continue;

      //compare:
      //1 - in SNAPPED status distToOrigin would be smaller then Infinity;
      //2 - distToOrigin was reassigned by prev snap
      if (snapStatus.distToOrigin <= distanceToPointer) {
        distanceToPointer = snapStatus.distToOrigin;
        newCoords = snapStatus.snappedCoords;
        finalSnapType = key as InstrumentHelpersId;
        snapStatus.isCurrent = true;
        this.currentSnapping = key as InstrumentHelpersId;
      }
    }
    //call helpers render
    this.objManagerHelpers.renderHelperLabel(newCoords, finalSnapType, lastCoords);

    return newCoords;
  };

  private _snapToGrid = (pointerCoords: THREE.Vector3): void => {
    const newCoords = pointerCoords.clone();

    const grid = this.helpersModel._getItem(InstrumentHelpersId.SNAP_GRID);
    if (!grid) throw new Error('SnapManager: Cant find grid helper options');

    const gridSize = grid.options.value;

    const getCoordByOriginAndGridSize = (coord: number, gridSize: number): number => {
      if (gridSize < 1) {
        return Math.round(coord * 2) / 2;
      } else return Math.round(coord / gridSize) * gridSize;
    };

    newCoords.x = getCoordByOriginAndGridSize(newCoords.x, gridSize);
    newCoords.z = getCoordByOriginAndGridSize(newCoords.z, gridSize);

    this.snapStatuses.snap_grid.snappedCoords = newCoords;
    this.snapStatuses.snap_grid.distToOrigin = pointerCoords.distanceTo(newCoords);
    return;
  };

  private _snapToStep = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined): void => {
    //find coords
    if (!fixedCoords) return;
    let newCoords = pointerCoords.clone();

    const step = this.helpersModel._getItem(InstrumentHelpersId.SNAP_STEP);
    if (!step) throw new Error('SnapManager: Cant find Step helper options');

    const snapValue = step.options.value;

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

    const distanceToCurrent = pointerCoords.distanceTo(newCoords);

    this.snapStatuses.snap_step.snappedCoords = newCoords;
    this.snapStatuses.snap_step.distToOrigin = distanceToCurrent;
  };

  private _snapToStep2 = (pointerCoords: THREE.Vector3, fixedCoords?: THREE.Vector3): void => {
    //find coords
    if (!fixedCoords) return;
    let newCoords = pointerCoords.clone();

    const step = this.helpersModel._getItem(InstrumentHelpersId.SNAP_STEP);
    if (!step) throw new Error('SnapManager: Cant find Step helper options');

    const snapValue = step.options.value;
    const line = getHypotenusePointCoords(
      [fixedCoords.x, fixedCoords.z],
      [pointerCoords.x, pointerCoords.z],
      snapValue
    );
    newCoords = new THREE.Vector3();
    //set x,y,z
    newCoords.fromArray(line);

    const distanceToCurrent = pointerCoords.distanceTo(newCoords);

    this.snapStatuses.snap_step.snappedCoords = newCoords;
    this.snapStatuses.snap_step.distToOrigin = distanceToCurrent;
  };

  private _snapToAngle = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined) => {
    if (!fixedCoords) return;
    //SAFETY check if angles are not chosen
    //but snapping is active
    const angleSnap = this.helpersModel._getItem(InstrumentHelpersId.SNAP_ANGLE);
    if (!angleSnap) throw new Error('Snap Manager error - couldnt find angle snap options');
    const closestV3collection = this.helpersModel.anglesSnapV3s;
    if (!closestV3collection) throw new Error('Snap Manager error - couldnt get V3 collection');
    if (Object.keys(closestV3collection).length === 0) {
      return;
    }

    //const basedV3 = fixedCoords.clone().add(pointerCoords.clone().multiplyScalar(-1));
    const basedV3 = pointerCoords.clone().sub(fixedCoords.clone());

    const currentAngleRad = this.baseVector.angleTo(basedV3);
    const currentAngleDeg = currentAngleRad * (180 / Math.PI);

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

    this.snapStatuses.snap_angle.snappedCoords = newV3;
    this.snapStatuses.snap_angle.distToOrigin = distanceToCurrent;
  };

  private _createDefaultStatuses = (helpers: Array<InstrumentHelper>): SnappingStatuses => {
    const snapHelpers = helpers.filter((h) => h.type === 'snapping');
    const statuses = snapHelpers.reduce((prev, cur) => {
      const isActive = cur.isActive;
      const addValue: SnapStatus = {
        isActive: isActive,
        snappedCoords: new THREE.Vector3(),
        distToOrigin: Infinity,
        isCurrent: false,
      };
      return { ...prev, [cur.id]: addValue };
    }, {} as SnappingStatuses);

    return statuses;
  };

  private _resetStatuses = () => {
    for (const [key, value] of Object.entries(this.snapStatuses)) {
      this.snapStatuses[key as InstrumentHelpersId].isActive = value.isActive;
      this.snapStatuses[key as InstrumentHelpersId].distToOrigin = Infinity;
      this.snapStatuses[key as InstrumentHelpersId].snappedCoords = new Vector3();
      this.snapStatuses[key as InstrumentHelpersId].isCurrent = false;
    }
  };

  resetSnap = () => {
    this.objManagerHelpers.removeRenderedLabels();
    this.currentSnapping = null;
    this._resetStatuses();
  };
}
