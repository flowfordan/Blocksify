import { SceneModifier } from 'three/services/SceneModifier';
import * as THREE from 'three';
import { Vector2, Vector3 } from 'three';

import { ObjManagerCommon } from './ObjManagerCommon';
import { FXBuilder } from '../FXBuilder';

//objs handler
//stores objs created
//commands to render

export class _ObjManagerFX implements ObjManagerCommon {
  //objBuilder: ObjBuilder; //actual main objects
  fxBuilder: FXBuilder; //temporal effect-objects
  sceneModifier: SceneModifier;

  constructor(modifier: SceneModifier) {
    //this.objBuilder = new ObjBuilder();
    this.fxBuilder = new FXBuilder();
    this.sceneModifier = modifier;
    //generator
  }
  //_____________
  //TRACK OBJECTS SHOWING REAL TIME MOVING
  createTrack = (isPolygon?: boolean) => {
    this.fxBuilder.initTrack(isPolygon);
  };

  updTrack = (coords: Array<number>) => {
    this.fxBuilder.updTrack(coords);
  };

  updTrackPolygon = (pt1: Vector2, pt2: Vector2, pointerCoords: Vector3) => {
    //remove track poly
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.polygon.form);
    this.fxBuilder.updTrackPolygon(pt1, pt2, pointerCoords);
  };

  renderTrack = (isPolygon = false) => {
    if (isPolygon) {
      this.sceneModifier.addObj(this.fxBuilder.trackObjs.polygon.form);
    }
    this.sceneModifier.addObj(this.fxBuilder.trackObjs.line.form);
  };

  removeTrack = () => {
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.line.form);
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.polygon.form);
  };
  //_____________
  //OVERLAY OBJECTS (Selection)
  createOverlayObj = (baseObj: THREE.Object3D<THREE.Event> | undefined, type: 'temp' | 'perm') => {
    if (baseObj) {
      this.fxBuilder.initOverlayObj(baseObj, type);
      this.renderOverlayObj(type);
    }
  };

  private renderOverlayObj = (type: 'temp' | 'perm') => {
    if (type === 'temp') {
      this.sceneModifier.addObj(this.fxBuilder.overlayObjTemp.form);
    } else {
      this.sceneModifier.addObj(this.fxBuilder.overlayObjPerm.form);
    }
  };

  removeOverlayObj = (type: 'temp' | 'perm' | 'all') => {
    if (type === 'temp') {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjTemp.form);
    } else if (type === 'perm') {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjPerm.form);
    } else {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjTemp.form);
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjPerm.form);
    }
  };
}
